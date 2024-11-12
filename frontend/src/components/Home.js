import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./footer";
import axios from "axios";

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
  console.log(formData)
  console.log(students)
  console.log(editingStudentId)
  console.log(showModal)
 
  useEffect(() => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudentId) {
      
      await updateStudent(editingStudentId, formData); 
    } else {
      await addStudent(formData); 
    }
    setFormData({ name: "", age: "", grade: "", rollNumber: "", contact: "" }); 
    setEditingStudentId(null);
    setShowModal(false); 
  };

  
  const addStudent = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/students/add", data);
      setStudents([...students, response.data]);
      
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Roll number or contact already exists")
    }
  };

  
  const deleteStudent = async (id) => {
    try {
      
      await axios.delete(`http://localhost:5000/students/${id}`);
      

      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      
      console.log("Couldn't delete the student:", error);
    }
  };
  

  
const updateStudent = async (id, data) => {
  try {
   
    const response = await axios.put(`http://localhost:5000/students/${id}`, data);

    
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
    
    setEditingStudentId(students._id);
    setShowModal(true);
  };

  return (
    <>
      <Header buttonDisable="true" color="gradient-to-br from-blue-500 to-blue-700" btn="red-500" logoutbotton ="true"/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Student Management</h1>

       
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Grade</label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    pattern="[0-9]{10}"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Student List</h2>
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-gray-600">Age: {student.age}</p>
                <p className="text-gray-600">Grade: {student.grade}</p>
                <p className="text-gray-600">Roll Number: {student.rollNumber}</p>
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
                  onClick={() => deleteStudent(student._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
