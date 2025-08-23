import {createContext , useState} from 'react'

import { Functions } from '../Lib/functions';

import { MessageHook } from '../hooks/messageHook';
// import { subscribe } from 'diagnostics_channel';

export const messageContext = createContext();


const MessageContextProvider = ({children})=>{
    const { sendMessage , updateMessage , isLoading , getMessages , deleteMessage} = MessageHook();

    const [messages , setMessages] = useState([]);

    const getMessagesContext = (selectedUserId)=>{
        
        getMessages(selectedUserId , setMessages);

        
    }

    const sendMessageContext = (newMesage)=>
        sendMessage(newMesage , subscribeMessage);

    const updateMessageContext = (messageAfterUpdate , message_id)=>{
        updateMessage(messageAfterUpdate , message_id)
    }
    const deleteMessageContext = (message_id)=>{
        deleteMessage(message_id);
    }
    const subscribeMessage=(newMesage)=>{
        
        setMessages([...messages , newMesage])
      
    }
    return (
        <messageContext.Provider value = {{messages , getMessagesContext , sendMessageContext ,
         updateMessageContext , deleteMessageContext , isLoading , subscribeMessage }}>
            {children}
        </messageContext.Provider>
    )
    }




export default MessageContextProvider;