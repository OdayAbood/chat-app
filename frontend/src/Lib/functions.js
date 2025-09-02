import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export const Functions = ()=>{
    const Authent = useContext(AuthContext);
    const checkIfUser = async(getUser)=>{
       try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/` , {
              method : "GET" ,
              credentials : 'include'
            });

            const json = await res.json();

            getUser( json.user ) ;
            if(json.succeed){
                Authent.connectSocket();
            }

        }
        catch(err){
           
        }
    }
    const  userLoggedOut = async ()=>{
    

        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,{
                method : "GET",
                credentials : 'include',

            });
          

            const json = await res.json() ;

          
            Authent.disconnectSocket();

        }
        catch(err){
         
        }
    }
    return {checkIfUser , userLoggedOut } ;
}