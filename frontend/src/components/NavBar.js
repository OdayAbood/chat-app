import React , {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const NavBar = ()=>{
    const {user} = useContext(AuthContext);

    // console.log("The user logged in from the nav" , user);
    return(
        <div className='flex justify-between w-full bg-pink-500 h-10 items-center'>
            <NavLink  to="/" className="ml-5 text-white hover:-translate-y-1 transition font-bold">Home</NavLink>
            <ul className='flex justify-between items-center w-auto h-fit rounded-md mr-5  '>
                {
                    (user) ? (
                            <ul className='flex justify-between items-center w-60 h-fit rounded-md mr-5  '>
                <li className='link-nav'><NavLink to="/chat" className="hover:-translate-y-1 transition">Hello,{user.firstname}</NavLink></li>
                 <li className='link-nav'><NavLink to="/profile" className="hover:-translate-y-1 transition">Profile</NavLink></li>
                <li className='link-nav'><NavLink to="/chat" className="hover:-translate-y-1 transition">Chat</NavLink></li>
                            </ul>
                        ) :(
                        <ul className='flex justify-between items-center w-60 h-fit rounded-md mr-5  '>
                <li className='link-nav'><NavLink to="/signin" className="hover:-translate-y-1 transition">SignIn</NavLink></li>
                <li className='link-nav'><NavLink to="/signup" className="hover:-translate-y-1 transition">SignUp</NavLink></li>     
                        </ul>
                    )
                }
            </ul>
        </div>
    )

} 
export default NavBar;