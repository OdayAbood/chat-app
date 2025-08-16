import {useState , useContext , useEffect} from 'react'
import { AuthContext } from '../context/AuthContext';
import { messageContext } from '../context/messageContext';

export const MessageHook = (socketRef)=>{
    const [isLoading , setLoading] = useState(false);

    const [messages , setMessages] = useState([]);

    const Authent = useContext(AuthContext);
    const messContext = useContext(messageContext);
    // console.log( useContext(messageContext));



    const getMessages = async(id)=>{
        setLoading(true);

        // console.log("The selected user id is" , id)
        try{
            const res = await fetch(`http://localhost:4000/api/message/allmessages/${id}`, {
                method: "GET" ,
                credentials : 'include'
            }) ;

            // console.log("The response is" , res)

            const json = await res.json();

            if(json.succeed){
               setMessages(json.allMessages);
            }

            // console.log(json);
        }
        catch(err){
            // console.log("We have some error here",err);
        }
    }

    const sendMessage = async (message)=>{
        // console.log(messages);
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/api/message/send",
                {
                    method : "POST" , 
                    headers : {"Content-Type" : "application/json"} , 
                    credentials : 'include',
                    body : JSON.stringify(message)
                }
            )
            const json = await res.json();
            console.log(Authent);
            console.log(socketRef.current);
            // Authent.socketRef.current.emit("sendMessage" , (message));
              socketRef.current.on("theSendItMessage" , (message)=>{
              console.log("The message in real time from the front is : " , message)
              setMessages([...messages , message])
            }
            )
              console.log("messages after send a new message" , messages);
        }
        
        catch(err){
            setLoading(false);
            console.log(err);
        }
    }
    const updateMessage = async (updatedMessage , id)=>{
             console.log(messages);
        setLoading(true);
        // console.log("message : " , updatedMessage, "Id : " , id);
        try{
            const res = await fetch(`http://localhost:4000/api/message/update/${id}`,{
                method : "PATCH" , 
                headers : {"Content-Type" : "application/json"},
                credentials : 'include' ,
                body : JSON.stringify(updatedMessage)
            })
            const json = await res.json();
            console.log("The json from th ebackend is",json);
                  console.log(socketRef.current);
                socketRef.current.on("updateMessage" , (message)=>{
                messages.map(mess =>{
                    if(mess._id === message._id) {
                        mess.message = message.message
                    }
                    console.log(mess._id === message._id , message)

                })
             });
        }
        catch(err){
            setLoading(false);
            // console.log(err);
        }
    }
    const deleteMessage = async (id)=>{
              console.log(socketRef.current);
             console.log(messages);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/message/delete/${id}`,{
                method : "DELETE" , 
                headers : {"Content-Type" : "application/json"} ,
                credentials : 'include'
            })
            const json = await res.json();
            // console.log(json);
                socketRef.current.on("deleteMessage" , (message)=>{
                console.log("The id of the message is" , message._id );
                setMessages(messages.filter(mess => mess._id !== message._id ));
                console.log("The messages after deleting :" , messages)
                console.log("From the deleteing message in real time",message);
             });
        }
        catch(err){
            setLoading(false);
            // console.log(err);
        }
    }
    return {sendMessage , updateMessage , deleteMessage , isLoading , getMessages , messages} ;
}