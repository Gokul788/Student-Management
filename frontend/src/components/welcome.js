import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";

function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <Header color='white/10' btn='purple-500' btn2='purple-700' buttondisble = 'false' />
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-semibold mb-4">Welcome to Student Management Portal</h2>
        <p className="mb-6 text-lg max-w-lg">
          Manage student records, track performance, and streamline your institution's administration effortlessly.
        </p>
        <div>
          <Link to="/login" className="px-6 py-3 mx-2 text-lg font-semibold bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-3 mx-2 text-lg font-semibold bg-purple-500 rounded-lg shadow-lg hover:bg-purple-700">
            Signup
          </Link>
        </div>
      </main>
      <Footer color='white/10'/>
    </div>
  );
}

export default WelcomePage;
