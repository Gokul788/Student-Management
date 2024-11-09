import { Link } from "react-router-dom";
import login from "../assets/images/login.png"; // Replace with your login image path
import Footer from "./footer";
import Header from "./Header";
import auth from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  
  const handleSubmit =  () => {
    if (email === "" || password === "") {
      setError("Please fill out all fields.");
      return;
    }

    
       signInWithEmailAndPassword(auth, email, password).then(()=>{
        navigate("/home");
       }).catch(()=>{
        setError("Failed to Login. Please try again.");
       })
      
    
     
    
  };
/*   useEffect(()=>{
    auth.onAuthStateChanged(function(email){
      if(email){
        navigate('/home')
      }
      else{
        navigate('/login')
      }
    })
  },[navigate])
  */


  return (
    <>
      <Header color='gradient-to-br from-blue-500 to-blue-700' btn='white' buttondisble = 'false'/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden md:block md:w-1/2">
            <img className="w-full h-full object-cover" src={login} alt="Login Illustration" />
          </div>
    
          <div className="flex flex-col items-center p-6 w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Welcome Back</h2>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form  onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer color='gradient-to-br from-blue-500 to-blue-700' />
    </>
  );
}
