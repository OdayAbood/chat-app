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
        // console.log("connect")
      if(user._id && !socketRef.current){
            socketRef.current = io("http://localhost:4000" , {
                query : {
                    userId : user._id
                }
            });
            console.log(socketRef.current);
        }
        socketRef.current.on("getOnlineUsers" , (usersId)=>{
            setOnlineUsers(usersId);
            console.log(usersId);
            console.log("The online users is : ",onlineUsers);
        })
  }
      const disconnectSocket = ()=>{
        //   console.log("disconnect")
      if(socketRef.current){
        console.log(socketRef.current);
            socketRef.current.disconnect();
            socketRef.current = null ;
        }
  }
  
  

    const getUsers = async ()=>{
        const res = await fetch("http://localhost:4000/api/user/users",{
            method : "GET",
            credentials : 'include'
        });
        // console.log(res);
        const json = await res.json();

        if(json.succeed ===true){
            setUsers(json.users);
        }
        else {
            // console.log(json.mess);
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

