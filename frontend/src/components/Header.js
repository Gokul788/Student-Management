import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom'; 
import auth from '../config';
import { signOut } from 'firebase/auth';

export default function Header(props) {
  const navigate = useNavigate();
  const [logoutActive,setLogoutActive] = useState(false) 
   const handleLogut = () =>{
    setLogoutActive(true)
   }
  const confirmLogout = () => {
    signOut(auth).then(() => {
      navigate('/login'); 
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

    return(
        <>
          <header className={`py-6 shadow-lg bg-${props.color}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Student Management</h1>
          <div>
           {props.buttondisble === 'false' && <Link to="/login" className={`px-4 py-2 mx-2 text-white rounded-lg hover:bg-${props.btn2}`}>
              Login
            </Link>} 
            {props.buttondisble === 'false' && <Link to="/signup" className={`px-4 py-2 mx-2 bg-${props.btn} rounded-lg hover:bg-${props.btn2}`}>
              Signup
            </Link>}

            {props.logoutbotton === 'true' &&  <button onClick={handleLogut} className={`px-4 py-2 mx-2 bg-${props.btn} rounded-lg hover:bg-${props.btn2}`}>Logout</button>}
             
           
          </div>
        </div>
      </header>

      {logoutActive && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Are you Logout !!!
             
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() =>setLogoutActive(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}


        </>
    )
     
    
}