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
            // const res = await InstanceAxios.post("/api/user/signin" , user)
            const res = await fetch("http://localhost:4000/api/user/signin",{
            method : "POST" ,
            credentials : 'include' ,
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify(user)
        })
            // console.log(res);
            const json = await res.json();
            // console.log(json);
            if(json.succeed){
                Navigate("/chat");
                  window.location.reload();
                  connectSocket(json.user);

                //   console.log(socket);
            }
            if(res.ok || res.statusText.includes("Error") || res.statusText.includes("Bad") ){
                setIsLodaing(false);
            }
        }
        catch(err){
            // console.log(err);
        }
    
        }
        return {isLoading , signIn}
    }
