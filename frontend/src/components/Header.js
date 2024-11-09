import { Link } from "react-router-dom"
export default function Header(props){
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
           
          </div>
        </div>
      </header>

        </>
    )
     
    
}