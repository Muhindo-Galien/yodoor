import React, { useState } from 'react'
import { useAlert } from "react-alert";

const Register = () => {
        const alert = useAlert();
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handelSubmit = ()=>{
                alert('Send user into backend');
        }
        const registerForm = ()=>(

                <form onSubmit = {handelSubmit}>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <p>show the form</p>
                        <button type='submit'>submit</button>
                </form>
        )
        

        return (
                 <> 
                        {registerForm()}
                </>)
}
export default Register