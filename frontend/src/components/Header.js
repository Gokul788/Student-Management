import React from 'react';
import { useNavigate ,Link} from 'react-router-dom'; // Keep only one import
import auth from '../config';
import { signOut } from 'firebase/auth';

export default function Header(props) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login'); // Navigate to the login page after logout
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

            {props.logoutbotton === 'true' &&  <button onClick={handleLogout} className={`px-4 py-2 mx-2 bg-${props.btn} rounded-lg hover:bg-${props.btn2}`}>Logout</button>}
             
           
          </div>
        </div>
      </header>

        </>
    )
     
    
}