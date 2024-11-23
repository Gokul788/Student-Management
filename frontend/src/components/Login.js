import { Link } from "react-router-dom";
import login from "../assets/images/login.png";
import Footer from "./footer";
import Header from "./Header";
import auth from "../config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";  // Import Axios for backend communication

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user UID from Firebase
      const user = userCredential.user;

      if (user.emailVerified) {
        // Get Firebase token after login
        const token = await user.getIdToken();

        // Store Firebase UID in localStorage
        localStorage.setItem("userUid", user.uid);

        // Optionally, you can send a request to your backend API to add user data to MongoDB
        try {
          const studentData = {
            name: "John Doe", // Add your student data here
            age: 21,
            grade: "A",
            rollNumber: "12345",
            contact: "9876543210",
          };

          // Make a POST request to your backend to add student data
          const response = await axios.post(
            "http://localhost:5000/students/add",  // Replace with your actual backend URL
            studentData,
            {
              headers: {
                Authorization: `Bearer ${token}`,  // Include the Firebase token in the header
              },
            }
          );

          // Handle the response, for example, you could store the added student data in localStorage
          localStorage.setItem("studentData", JSON.stringify(response.data));

          // Redirect to home page after successful login and data submission
          navigate("/home");
        } catch (apiError) {
          console.error("Error adding student data:", apiError);
          setError("Failed to add student data. Please try again.");
        }
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/user-not-found") {
        setError("User not found. Please check your email.");
      } else if (errorCode === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to login. Please try again.");
      }

      console.error("Error logging in:", errorMessage);
    }

    setLoading(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <>
      <Header color="blue-600" btn="white" buttondisable="false" />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
  {/* Background Enhancements */}
  <div className="absolute inset-0">
    <img
      src="/background-image.jpg" // Replace with your background image URL
      alt="Background Design"
      className="w-full h-full object-cover opacity-20"
    />
    <div className="absolute top-16 left-10 w-[180px] h-[180px] bg-purple-400 rounded-full blur-2xl opacity-50"></div>
    <div className="absolute bottom-20 right-20 w-[250px] h-[250px] bg-yellow-400 rounded-full blur-3xl opacity-40"></div>
  </div>

  {/* Main Card */}
  <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
    {/* Left Section */}
    <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-tr from-blue-50 to-blue-100 p-8">
      <img
        src={login}
        alt="Login Illustration"
        className="w-3/4 mb-6 rounded-md shadow-lg"
      />
      <h3 className="text-3xl font-extrabold text-gray-800 mb-3">
        Welcome Back!
      </h3>
      <p className="text-gray-600 text-center">
        Log in to access your dashboard and explore new opportunities.
      </p>
    </div>

    {/* Right Section: Form */}
    <div className="flex-1 p-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Log In
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Enter your credentials to get started.
      </p>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-600 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6 max-w-md mx-auto"
      >
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@domain.com"
            value={email}
            onChange={handleEmailChange}
            className={`w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              emailError
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              passwordError
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>

      {/* Forgot Password */}
      <p className="text-sm text-center text-gray-500 mt-4">
        <span
          onClick={() => navigate("/forgot-password")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Forgot your password?
        </span>
      </p>

      {/* Sign Up Redirect */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-green-600 font-semibold hover:underline cursor-pointer"
        >
          Sign up here
        </span>
      </p>
    </div>
  </div>
</div>

      <Footer />
    </>
  );
}
