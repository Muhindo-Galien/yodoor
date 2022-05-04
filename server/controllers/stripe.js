const Users=  require('../models/userModel');
import queryString from 'query-string'
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);


export const createConnectAccount = async(req,res)=>{
    // 1 find user from the bd
    const user = await Users.findById(req.user.id).exec();
    console.log("User from DB ==>",user.stripe_account_id);

    // 2 fi user doesn't have any account, create one now
    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({type: 'express'}); 
        // console.log("Stripe account ==>", account);
        user.stripe_account_id = account.id;
        user.save();
    }
    
    // 3 create a login link based on the id (for the fronted to complete on boarding )
    let accountLink =  await stripe.accountLinks.create({
        account:user.stripe_account_id,
        refresh_url:process.env.STRIPE_REDIRECT,
        return_url:process.env.STRIPE_REDIRECT,
        type: 'account_onboarding',
    })
    // prefill such as email

    accountLink = Object.assign(accountLink,{
        "stripe_user[email]": user.email || undefined,
    })
    // console.log(accountLink);
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
    console.log(`${accountLink.url}?${queryString.stringify(accountLink)}`);
}

export const getAccountStatus = async(req,res)=>{
    // console.log("Get account status from the server");
    // 1 find user from the bd
    const user = await Users.findById(req.user.id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("USER ACCOUNT RETRIEVE",account);
    const updatedUser = await Users.findByIdAndUpdate(
        user._id,
        {
            stripe_seller: account,
        },
        {
            new:true
        }
        )
        .select("-password")
        .exec();
    
        // console.log(updatedUser);
        res.send(updatedUser)

}