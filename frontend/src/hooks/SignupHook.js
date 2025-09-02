import  {useState} from 'react'
import { useNavigate } from 'react-router-dom';



export const SignupHook = ()=>{
    const Navigate = useNavigate()

    const [isLoading , setIsLodaing] = useState(null);

    const signUp = async  (user )=>{
        setIsLodaing(true)
        try{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,{
            method : "POST" ,
            headers : {"Content-Type" : "application/json"} ,
            body : JSON.stringify(user)

        })
   
        const json = await res.json();
 
        if(json.succeed){
            Navigate(json.redirect)
        }
        if(res.ok || res.statusText.includes("Error") || res.statusText.includes("Bad") || res.status === 401){
            setIsLodaing(false);
        }
    }
    catch(err){
   
    }

    }
    return {isLoading , signUp}
}