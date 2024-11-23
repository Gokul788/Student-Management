import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./footer";
import axios from "axios";
import auth from "../config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    rollNumber: "",
    contact: "",
  });
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [rollNumberError, setRollNumberError] = useState("");
  const [contactError, setContactError] = useState("");
  const [studentToDelete, setStudentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      if(user) navigate('/home');
      else navigate('/login');
   });
   
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "name") {
      setNameError(
        e.target.value.trim() === "" ? "Name field cannot be empty" : ""
      );
    }

    if (e.target.name === "age") {
      setAgeError(
        e.target.value <= 0 || e.target.value.trim() === ""
          ? "Age must be a positive number"
          : ""
      );
    }

    if (e.target.name === "grade") {
      setGradeError(
        e.target.value.trim() === "" ? "Grade field cannot be empty" : ""
      );
    }

    if (e.target.name === "rollNumber") {
      setRollNumberError(
        e.target.value.trim() === "" ? "Roll Number cannot be empty" : ""
      );
    }

    if (e.target.name === "contact") {
      setContactError(
        e.target.value.length < 10
          ? "Contact must be a valid 10-digit number"
          : ""
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages before validation
    setNameError("");
    setAgeError("");
    setGradeError("");
    setRollNumberError("");
    setContactError("");

    let isValid = true;

    // Validation checks
    if (formData.name.trim() === "") {
      setNameError("Name field cannot be empty");
      isValid = false;
    }

    if (
      formData.age.trim() === "" ||
      isNaN(formData.age) ||
      formData.age <= 0
    ) {
      setAgeError("Age must be a positive number");
      isValid = false;
    }

    if (formData.grade.trim() === "") {
      setGradeError("Grade field cannot be empty");
      isValid = false;
    }

    if (formData.rollNumber.trim() === "") {
      setRollNumberError("Roll Number cannot be empty");
      isValid = false;
    }

    if (
      formData.contact.trim().length !== 10 ||
      !/^\d+$/.test(formData.contact)
    ) {
      setContactError("Contact must be a valid 10-digit number");
      isValid = false;
    }

    // If any validation fails, stop submission
    if (!isValid) {
      return;
    }

    try {
      if (editingStudentId) {
        await updateStudent(editingStudentId, formData);
      } else {
        await addStudent(formData);
      }

      // Reset form and close modal after successful submission
      setFormData({
        name: "",
        age: "",
        grade: "",
        rollNumber: "",
        contact: "",
      });
      setEditingStudentId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting student data:", error);
    }
  };

  const addStudent = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/students/add",
        data
      );
      setStudents([...students, response.data]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteConfirmation = (student) => {
    setStudentToDelete(student);
    
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/students/${studentToDelete._id}`
      );
      setStudents(
        students.filter((student) => student._id !== studentToDelete._id)
      );
      setStudentToDelete(null);
    } catch (error) {
      console.error("Couldn't delete the student:", error);
    }
  };

  const updateStudent = async (id, data) => {
    try {
      const response = await axios.put(
      ` http://localhost:5000/students/${id}`,
        data
      );

      setStudents((students) => {
        return students.map((student) =>
          student._id === id ? { ...student, ...response.data } : student
        );
      });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEdit = (students) => {
    setFormData({
      name: students.name,
      age: students.age,
      grade: students.grade,
      rollNumber: students.rollNumber,
      contact: students.contact,
    });
    console.log(students)

    setEditingStudentId(students._id);
    setShowModal(true);
  };

  return (
    <>
      
<Header
        buttonDisable="true"
        color="gradient-to-br from-blue-500 to-blue-700"
        btn="red-500"
        logoutbotton="true"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Student Management
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Add Student
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {editingStudentId ? "Edit Student" : "Add Student"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      nameError ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                      nameError ? "focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  />
                  {nameError && (
                    <p className="text-red-600 text-sm">{nameError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      ageError ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                      ageError ? "focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                  />
                  {ageError && (
                    <p className="text-red-600 text-sm">{ageError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Grade</label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      gradeError ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                      gradeError
                        ? "focus:ring-red-500"
                        : "focus:ring-indigo-500"
                    }`}
                  />
                  {gradeError && (
                    <p className="text-red-600 text-sm">{gradeError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      rollNumberError ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                      rollNumberError
                        ? "focus:ring-red-500"
                        : "focus:ring-indigo-500"
                    }`}
                  />
                  {rollNumberError && (
                    <p className="text-red-600 text-sm">{rollNumberError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    pattern="[0-9]{10}"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      contactError ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                      contactError
                        ? "focus:ring-red-500"
                        : "focus:ring-indigo-500"
                    }`}
                  />
                  {contactError && (
                    <p className="text-red-600 text-sm">{contactError}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    {editingStudentId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="w-full max-w-md mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Student List
          </h2>
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-gray-600">Age: {student.age}</p>
                <p className="text-gray-600">Grade: {student.grade}</p>
                <p className="text-gray-600">
                  Roll Number: {student.rollNumber}
                </p>
                <p className="text-gray-600">Contact: {student.contact}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteConfirmation(student)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {studentToDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Are you sure you want to delete{" "}
              <span className="font-bold">{studentToDelete.name}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => setStudentToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer    color="gradient-to-br from-blue-500 to-blue-700"/>
    </>
  );
};

export default Home;