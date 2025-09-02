import {useState , useContext , useEffect} from 'react'
import { AuthContext } from '../context/AuthContext';
import { messageContext } from '../context/messageContext';

export const MessageHook = (socketRef)=>{
    const [isLoading , setLoading] = useState(false);

    const [messages , setMessages] = useState([]);

    const Authent = useContext(AuthContext);
    const messContext = useContext(messageContext);
 



    const getMessages = async(id)=>{
        setLoading(true);

       
        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/message/allmessages/${id}`, {
                method: "GET" ,
                credentials : 'include'
            }) ;

           

            const json = await res.json();

            if(json.succeed){
               setMessages(json.allMessages);
            }

            
        }
        catch(err){
          
        }
    }

    const sendMessage = async (message)=>{
        
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/message/send`,
                {
                    method : "POST" , 
                    headers : {"Content-Type" : "application/json"} , 
                    credentials : 'include',
                    body : JSON.stringify(message)
                }
            )
            const json = await res.json();
     
       
              socketRef.current.on("theSendItMessage" , (message)=>{
            
              setMessages([...messages , message])
            }
            )
             
        }
        
        catch(err){
            setLoading(false);
          
        }
    }
    const updateMessage = async (updatedMessage , id)=>{
         
        setLoading(true);
       
        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/message/update/${id}`,{
                method : "PATCH" , 
                headers : {"Content-Type" : "application/json"},
                credentials : 'include' ,
                body : JSON.stringify(updatedMessage)
            })
            const json = await res.json();
            
                
                socketRef.current.on("updateMessage" , (message)=>{
                messages.map(mess =>{
                    if(mess._id === message._id) {
                        mess.message = message.message
                    }
                    

                })
             });
        }
        catch(err){
            setLoading(false);
            
        }
    }
    const deleteMessage = async (id)=>{
              
            
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/message/delete/${id}`,{
                method : "DELETE" , 
                headers : {"Content-Type" : "application/json"} ,
                credentials : 'include'
            })
            const json = await res.json();
          
                socketRef.current.on("deleteMessage" , (message)=>{
                setMessages(messages.filter(mess => mess._id !== message._id ));
             });
        }
        catch(err){
            setLoading(false);
            
        }
    }
    return {sendMessage , updateMessage , deleteMessage , isLoading , getMessages , messages} ;
}