import React , {useState , useContext} from 'react'
import { NavLink  } from 'react-router-dom';
import { SignInHook } from '../hooks/SigninHook';
import {AuthContext} from '../context/AuthContext';

const SignIn = ()=>{
    const {user , getUser} = useContext(AuthContext);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const user1= {email , password}; 
    const {isLoading , signIn} = SignInHook();
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const Theuser = await signIn(user1);
        // getUser(Theuser);

    } 

    return(
        <div className='cont'>
            <form className='' onSubmit={handleSubmit}>
                <label className='form-label'>Enter your email</label>
                <input type='email' id='email' value={email}  onChange={(e)=>{
                    setEmail(e.target.value)
                }} className='form-input' />
                <div className='error'></div>
                <label className='form-label'>Enter your password</label>
                <input type='password' id='password' value={password}  onChange={(e)=>{
                    setPassword(e.target.value) }} className='form-input' />
                <div className='error'></div>
                <div className='w-80 '>
                    <button className=' btn ' disabled={isLoading}>{isLoading ? ("Waiting..."):("SignIn")}</button>
                </div>
                <div className='text-pink-600 sm:text-xl mt-5 font-bold'>Do not have an account : ? 
                    <NavLink to="/signup" className="text-pink-900 hover:text-red-600 -translate-y-1 transition font-bold"> Go and create one </NavLink>
                    </div>
            </form>
        </div>
    )
}
export default SignIn