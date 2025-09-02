import React ,{useContext , useEffect}from 'react'
import SignIn from '../Authentication/SignIn';
import { AuthContext } from '../context/AuthContext';
import { Functions } from '../Lib/functions';

const Home = ()=>{
     const {user , getUser } = useContext(AuthContext);
     const {checkIfUser , printSocket} = Functions();

     console.log(process.env.REACT_APP_BACKEND_URL);
    

    //   connectSocket(user , socket , getSocket);

    

  useEffect(()=>{
    checkIfUser(getUser );
  })
    return(
        <div className='flex justify-around md:mt-5 mt-5 '>
            <SignIn/>
            <div className='md:flex justify-center items-center gap-2 md:w-96 md:h-full  flex-wrap  hidden '>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
                <div className='squre'></div>
            </div>
        </div>
    )
}
export default Home;