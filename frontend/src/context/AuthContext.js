import React , { createContext, useState , useRef , useEffect } from 'react';

// import { Functions } from '../Lib/functions';
import { io } from 'socket.io-client';

export const AuthContext = createContext();

const AuthContetxProvider = ({children})=>{
    // const {checkIfUser} = Functions();
    const [user , setUser] = useState({});
    const[users ,setUsers] = useState([]);
    const [onlineUsers , setOnlineUsers] = useState([]);
    const socketRef = useRef(null);

      const connectSocket = ()=>{
        
      if(user._id && !socketRef.current){
            socketRef.current = io(`${process.env.REACT_APP_BACKEND_URL}` , {
                query : {
                    userId : user._id
                }
            });
         
        }
        socketRef.current.on("getOnlineUsers" , (usersId)=>{
            setOnlineUsers(usersId);
        
        })
  }
      const disconnectSocket = ()=>{
     
      if(socketRef.current){
            socketRef.current.disconnect();
            socketRef.current = null ;
        }
  }
  
  

    const getUsers = async ()=>{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/users`,{
            method : "GET",
            credentials : 'include'
        });
       
        const json = await res.json();

        if(json.succeed ===true){
            setUsers(json.users);
        }
        else {
          
            if(json.succeed === false){
                // console.log("Error" , json.err);
            }
        }
    }
    const getUser = (newUser)=>{
        setUser(newUser);
    }

    return (
        <AuthContext.Provider value={{user , users  , getUsers , getUser , connectSocket , disconnectSocket , socketRef , onlineUsers}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContetxProvider ;

