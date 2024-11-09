import { useState } from "react";
import signupImage from "../assets/images/sign up.png";
import Footer from "./footer";
import Header from "./Header";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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

    try {
      createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <>
      <Header color='gradient-to-br from-[#77536f] to-[#5f4359]' btn='white' buttondisble = 'false'/>
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
          <div className="md:w-1/2 hidden md:block">
            <img
              src={signupImage}
              alt="Sign Up Illustration"
              className="object-cover h-full w-full"
            />
          </div>
          
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-[#5f4359] text-center mb-6">Create Your Account</h2>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
             
                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
      

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-2 px-4 text-white font-semibold bg-[#77536F] rounded-lg shadow-md hover:bg-[#5e4258] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                Sign Up
              </button>
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  Log in here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer   color='gradient-to-br from-[#77536f] to-[#5f4359]'/>
    </>
  );
}
