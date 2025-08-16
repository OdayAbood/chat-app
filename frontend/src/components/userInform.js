import React from "react";
import { Link } from "react-router-dom";
import { Functions } from "../Lib/functions";

const UserInform = ({user})=>{
    const { userLoggedOut } = Functions();
    return(
        (user && (
              <div className="relative">
        <div className='w-40 h-40 rounded-xl bg-pink-800 absolute left-1/2 -translate-x-1/2 '>
             <div className="absolute w-8 h-8 rounded-sm bg-white -right-2 -bottom-2"></div>
             <div className="absolute w-8 h-8 rounded-sm bg-white -left-2 -bottom-2"></div>
             <div className="absolute w-8 h-8 rounded-sm bg-white -right-2 -top-2"></div>
             <div className="absolute w-8 h-8 rounded-sm bg-white -left-2 -top-2"></div>
        </div>
        <div className="border-4 border-pink-500 mt-8 translate-y-40 ">
            <div className="text-pink-800 font-bold border-t-2 border-pink-500 p-2">Your Name is : {user.firstname} {user.lastname}</div>
            <div className="text-pink-800 font-bold border-t-2 border-pink-500 p-2">Your UserId is : {user._id} </div>
            <div className="text-pink-800 font-bold border-t-2 border-pink-500 p-2">Status : active </div>
            <div className="text-pink-800 font-bold border-t-2 border-pink-500 p-2">LoggedOut : <button onClick={userLoggedOut}>Click Here</button> </div>
        </div> 
    </div>
        ))
  
    )

}
export default UserInform