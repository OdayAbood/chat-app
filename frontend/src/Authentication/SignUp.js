import React , {useState} from 'react'
import { SignupHook } from '../hooks/SignupHook';

const SignUp = ()=>{
    const {isLoading , signUp} = SignupHook();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [firstname , setFirst] = useState('');
    const [lastname , setLast] = useState('');
    const user = {email , password , firstname , lastname};
    const handleSubmit = (e)=>{
        e.preventDefault();
        signUp(user);
        // console.log(user)
    }
    return(
        <div className='cont '>
            <form className='' onSubmit={handleSubmit} >
                <label className='form-label'>Enter your First Name</label>
                <input className='form-input' type='text' value={firstname} onChange={(e)=>{
                    setFirst(e.target.value)
                }}/>
                <div className='error'></div>
                <label className='form-label'>Enter your Last Name</label>
                <input className='form-input' type='text' value={lastname} onChange={(e)=>{
                    setLast(e.target.value);
                }}/>
                <div className='error'></div>
                <label className='form-label'>Enter your email</label>
                <input className='form-input' type='email' id='email' value={email}  onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <div className='error'></div>
                <label className='form-label'>Enter your password</label>
                <input className='form-input' type='password' id='password' value={password}  onChange={(e)=>{
                    setPassword(e.target.value) }} />
                <div className='error'></div>
                <div className='w-80 '>
                    <button className=' btn '  disabled={isLoading}>{(isLoading)? ("Waiting..."):("SignUp") }</button>
                </div>
            </form>
        </div>
    )
}
export default SignUp