const Users=  require('../models/userModel');
import queryString from 'query-string'
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);


export const createConnectAccount = async(req,res)=>{
    // 1 find user from the bd
    const user = await Users.findById(req.user.id).exec();
    // console.log("User from DB ==>",user.stripe_account_id);

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
const updateDelayDays = async(accountId)=>{
    const account = await stripe.accounts.update(accountId,{
        settings:{
            payouts:{
                schedule:{
                    delay_days:7
                },
            },
        },
    });
    return account;
}

export const getAccountStatus = async(req,res)=>{
    // console.log("Get account status from the server");
    // 1 find user from the bd
    const user = await Users.findById(req.user.id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("USER ACCOUNT RETRIEVE",account);
        // update   delay_days
    const updatedAccount = await updateDelayDays(account.id);
    const updatedUser = await Users.findByIdAndUpdate(
        user._id,
        {
            stripe_seller: updatedAccount,
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
export const getAccountBalance = async(req,res)=>{
    // 1 find user from the bd
    const user = await Users.findById(req.user.id).exec();
    const balance =  await stripe.balance.retrieve({
        stripeAccount: user.stripe_account_id,
    })
    res.json(balance);
    // console.log("Get Account Balance", balance);
} 

export const payoutSetting= async(req,res)=>{
    try {
        // 1 find user from the bd
        const user = await Users.findById(req.user.id).exec();
        const loginLink = await stripe.accounts.createLoginLink(
            user.stripe_account_id,{
                redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
            }
        )
        
        console.log("LOGIN KINK PAYOUT SETTING", loginLink);
        res.json(loginLink)
    } catch (error) {
        console.log("Stripe payout setting error",error);   
    }
}