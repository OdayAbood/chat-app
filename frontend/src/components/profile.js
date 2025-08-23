import React , {useContext , useEffect} from "react";
import { Functions } from "../Lib/functions";
import { AuthContext } from "../context/AuthContext";
import UserInform from "./userInform";

const Profile = ()=>{
      const {user , getUser } = useContext(AuthContext);
     const {checkIfUser , connectSocket} = Functions();
     


  useEffect(()=>{
    checkIfUser(getUser );
  })
    return(
         <div className='flex justify-around md:mt-5 mt-5 '>
                <UserInform user={user}/>
                 <div className='md:flex justify-center items-center gap-2 md:w-96 md:h-full  flex-wrap  hidden '>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                     <div className='squre'></div>
                 </div>
             </div>
    )

}

export default Profile;