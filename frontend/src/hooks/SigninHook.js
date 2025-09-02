import { useState } from "react";

import {useNavigate} from "react-router-dom"  ;

import { Functions } from "../Lib/functions";



// import { InstanceAxios} from '../Lib/axiosInstanse'

export const SignInHook = ()=>{
    const [isLoading , setIsLodaing] = useState(null);

    const {connectSocket} = Functions();
    const Navigate = useNavigate();
    
        const signIn = async  (user )=>{
            setIsLodaing(true)
            let jsonRes ; 
            try{
            
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signin`,{
            method : "POST" ,
            credentials : 'include' ,
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify(user)
        })
          
            const json = await res.json();
            
            if(json.succeed){
                Navigate("/chat");
                  window.location.reload();
                  connectSocket(json.user);

                
            }
            if(res.ok || res.statusText.includes("Error") || res.statusText.includes("Bad") ){
                setIsLodaing(false);
            }
        }
        catch(err){
            
        }
    
        }
        return {isLoading , signIn}
    }
