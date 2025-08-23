import React , {useContext , useEffect , useState} from 'react'
import SelectedChat from './SelectedChat'
import {AuthContext} from '../context/AuthContext'
import { messageContext } from '../context/messageContext'
import {Link} from 'react-router-dom'
import { Functions } from '../Lib/functions'


const ChatUi = ()=>{
    const {users , getUsers , user , getUser , socketRef , setSocket , onlineUsers } = useContext(AuthContext);
    const [selectedUser , setSelectedUser] = useState({});
    const {checkIfUser , connectSocket} = Functions();
  
    // if(onlineUsers.length !== 0 ){

    //     // console.log("the onlineUsers are" , onlineUsers);
    // }

    
    
    useEffect(()=>{
        getUsers();
        checkIfUser(getUser);
    },[])

    return(
        <div className='flex justify-around height overflow-hidden '>
             <div className=" relative top-0 left-0 md:w-80 overflow-y-auto bg-pink-200">
               {(users) ? ( users.map(user=>{
                return (
                    <Link key={user._id} onClick={()=>{ setSelectedUser(user); }} className='flex flex-wrap justify-evenly items-center border-b-2
              border-pink-700 hover:bg-pink-400 box-border p-3 min-w-32 -translate-x-3 md:w-full transition'>
                     <div className='w-12 h-12 rounded-xl bg-pink-800'></div>
                     <div className="md:font-bold  md:text-clip md:block hidden md:w-36 text-center ">{user.firstname} {user.lastname}</div>
                </Link>
                )
               })) : (<div>There is no user to chat with</div>)  }
             </div>
            <SelectedChat user={user} selectedUser={selectedUser} messaheHandle ={useContext(messageContext)} socketRef={socketRef} />
        </div>
    )
}
export default ChatUi;