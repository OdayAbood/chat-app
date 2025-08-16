import Raact , {useContext , useEffect} from 'react'
import Home from "./components/home";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Profile from './components/profile';
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Navbar from "./components/NavBar";
import ChatUi from "./chat/ChatUi";
import AuthContetxProvider from "./context/AuthContext";
import { AuthContext } from './context/AuthContext';
import { Functions } from './Lib/functions';
import MessageContextProvider from './context/messageContext';


function App() {
  const {user , getUser} = useContext(AuthContext);
     
  const {checkIfUser} = Functions();

  useEffect(()=>{
    checkIfUser(getUser);
  })
  // console.log("The user from app" , user);
  return (
    <div className="App">
      <AuthContetxProvider>
      <BrowserRouter>
       <Navbar/>
      <MessageContextProvider>
       <Routes>
         <Route path="/chat" element={(user) ? (<ChatUi/>) : (<Home/>)}/>
         <Route path="/profile" element={(user) ? (<Profile/>) : (<Home/>)}/>
         <Route path="/" element={<Home/>}/>
         <Route path="/signup" element={(user) ? (<Home/>) : (<SignUp/>)}/>
        <Route path="/signin" element={(user) ? (<Home/>) : (<SignIn/>)}/>
       </Routes>
      </MessageContextProvider>
      </BrowserRouter>
      </AuthContetxProvider>
      
    </div>
  );
}

export default App;
