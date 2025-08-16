import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export const Functions = ()=>{
    const Authent = useContext(AuthContext);
    const checkIfUser = async(getUser)=>{
       try{
            const res = await fetch("http://localhost:4000/" , {
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
            // console.log(err);
        }
    }
    const  userLoggedOut = async ()=>{
        // console.log("The user logged out roght now");

        try{
            const res = await fetch("http://localhost:4000/api/user/logout",{
                method : "GET",
                credentials : 'include',

            });
            // console.log(res);

            const json = await res.json() ;

            // console.log(json);
            Authent.disconnectSocket();

        }
        catch(err){
            // console.log(err);
        }
    }
    return {checkIfUser , userLoggedOut } ;
}