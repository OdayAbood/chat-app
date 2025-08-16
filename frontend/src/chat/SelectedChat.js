import React,{useState , useEffect , useContext} from 'react'

import { MessageHook } from '../hooks/messageHook';
// import { Socket } from 'socket.io-client';

// import { AuthContext } from '../context/AuthContext';

// import { messageContext } from '../context/messageContext';

const SelectedChat = ({ user , selectedUser , socketRef  })=>{
    const [showIcon , setShowIcon] = useState(null);
    const [showForm , setShowForm] = useState(null);
    const [messageUpdating , setMessageUpdating] = useState("");
    const senderMessage = "flex w-full mt-4 flex-row-reverse" ;
    const recieverMessage = "flex w-full mt-4";
    const { sendMessage , updateMessage , isLoading , getMessages , deleteMessage , messages} = MessageHook(socketRef);
    const [message , setMessage] = useState("");
    // const [messages , setMessages] = useState([]);
    const handleSubmit =async (e)=>{
        e.preventDefault();
        
    } 
    const handleSendMessage = ()=>{
        const newMesage = {message , sender:user._id, reciever :selectedUser._id} ;
        setMessage("");
        sendMessage(newMesage);
    }
    useEffect(()=>{
        if(selectedUser._id)
            getMessages(selectedUser._id);
    },[selectedUser , messages])
    return(
    <div className='w-full h-auto bg-pink-600 overflow-hidden'>
    {(selectedUser.firstname) ? ( 
        <div className = "flex flex-col h-screen">
          <div className="relative  font-bold
          text-pink-300 w-full bg-pink-800 rounded-2xl text-center ">
          {selectedUser.firstname.toUpperCase()} {selectedUser.lastname.toUpperCase()}
          </div>
        <div className="relative top-6 overflow-y-auto flex-1 overflow-x-hidden"> 
            {
             (messages.length !== 0) ? (
              messages.map((message)=>{
                return(
                <div key={message._id} className={(message.sender === user._id) ? (senderMessage) : (recieverMessage)}>
                 <div key={selectedUser._id} className='w-12 h-12 rounded-xl bg-pink-800 '></div> 
                 {/* //message with no image */}
                 <div key={message._id} className={(message.sender === user._id) ? ("messageSender") : ("messageReciever")}
                    onMouseEnter = {()=>{setShowIcon(message._id)}} onMouseLeave = {()=>{setShowIcon(null)}}>
                    {message.message}
                    <div className="absolute flex w-10 justify-evenly items-center bottom-0 ">
                      <button className={(showIcon === message._id && user._id === message.sender )? ("absolute w-4 h-4 rounded-sm  ") :  
                      ("absolute w-4 h-4 rounded-sm bg-slate-500 hidden")}
                       onMouseEnter = {()=>{setShowForm(message._id); setMessageUpdating(message.message)}}  onMouseLeave = {()=>{setShowForm(null)}}
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="absolute left-1/2 -translate-x-1/2 -top-1 w-5 text-slate-800">
                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 
                        1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 
                        0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 
                        1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 
                        1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 
                        0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                        </svg>
                     </button>
                       <button className={(showIcon === message._id)? ("absolute w-4 h-4 rounded-sm translate-x-8 opacity-100") :  
                       ("absolute w-4 h-4 rounded-sm bg-slate-500 translate-x-8 opacity-0 text-white ")}
                         onClick={()=>{deleteMessage(message._id )}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="absolute left-1/2 -translate-x-1/2 -top-1 w-5  text-slate-800 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107  
                            1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 
                            48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 
                            0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                         </button>
                    </div>
                        {(showForm === message._id) && (
                            <form className="absolute top-0 left-0
                            border shadow-lg w-full h-full
                             md:w-80 rounded-lg bg-slate-300 flex box-border p-1" onMouseEnter = {()=>{setShowForm(message._id)}}
                            onMouseLeave = {()=>{setShowForm(null)}}
                            onSubmit = {handleSubmit}>
                             <textarea type= "text" className="border p-2 box-border w-full  rounded" value={messageUpdating}
                             onChange = {(e)=>{setMessageUpdating(e.target.value)}}/>
                             <button className="bg-blue-500 text-white font-bold rounded box-border "
                             onClick={()=>{setShowForm(null);
                                const messageAfterUpdate = {messageUpdating}
                               updateMessage(messageAfterUpdate,message._id)}} disabled={user._id !== message.sender}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" >
                                     <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 
                                     16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 
                                     1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                            </form>
                            )}
                     </div>
                     {/* end message with no image */}
                    </div>
                            )
                        })
                    ) : 
                    (
                    <div className="relative left -translate-x-1/2 top-1/2 -translate-y-1/2 font-bold
                  text-pink-300 w-full">
                    Start your conversaiton
                    </div>
                    )
                 }
            </div> 
                <form className="flex w-full items-center fixed bottom-1"onSubmit={(e)=>{
                    e.preventDefault()
                }} >
                    <input type="text" value={message} placeholder="Your message" className="bg-white rounded-md border-pink-900 border-2  mt-4 p-2 box-border
        text-pink-500 focus:outline-none font-bold  w-1/2 md:translate-x-5 " onChange={(e)=>{setMessage(e.target.value)} }/>
                    <button className="md:translate-x-5" onClick={handleSendMessage }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                    className="size-6 text-white relative top-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg></button>
                </form>
        </div>)
            : ( <div className="relative left -translate-x-1/2 top-1/2 -translate-y-1/2 font-bold
             text-pink-300 w-full">
                Selectc a user and chat wit them
            </div>)
            }
          
        </div>
    )
}
export default SelectedChat