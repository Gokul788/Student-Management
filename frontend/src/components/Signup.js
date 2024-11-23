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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setError("Please fill out all fields.");
      return;
    }

    if (emailError || passwordError) {
      setError("Please correct the errors above.");
      return;
    }

    setLoading(true);

    try {
     await createUserWithEmailAndPassword(auth, email, password);
     
      alert("Registered Successfully");

      // Navigate to the login page after successful registration
      navigate("/login");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    }

    setLoading(false);
  };

  // Handle Firebase error messages
  const getFirebaseErrorMessage = (err) => {
    const errorCode = err.code;

    if (errorCode === "auth/email-already-in-use") {
      return "This email is already in use. Please try another.";
    } else if (errorCode === "auth/invalid-email") {
      return "The email address is not valid.";
    } else if (errorCode === "auth/weak-password") {
      return "The password is too weak. Please choose a stronger password.";
    } else {
      return "Failed to create an account. Please try again.";
    }
  };

  return (
    <>
      <Header color="gradient-to-br from-[#77536f] to-[#5f4359]" btn="white" buttondisble="false" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
          <div className="md:w-1/2 hidden md:block">
            <img src={signupImage} alt="Sign Up Illustration" className="object-cover h-full w-full" />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-[#5f4359] text-center mb-6">Create Your Account</h2>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Email Input */}
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 border ${emailError ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${emailError ? "focus:ring-red-500" : "focus:ring-indigo-500"
                  }`}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

              {/* Password Input */}
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${passwordError ? "focus:ring-red-500" : "focus:ring-indigo-500"
                  }`}
              />
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-2 px-4 text-white font-semibold bg-[#77536F] rounded-lg shadow-md hover:bg-[#5e4258] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                {loading ? "Signing Up..." : "Sign Up"}
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
      <Footer color="gradient-to-br from-[#77536f] to-[#5f4359]" />
    </>
  );
}
