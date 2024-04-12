import React, { useEffect } from "react";
import { useDispatch  } from "react-redux";
import { fetchAllTask } from "../Redux/Slice/taskSlice";
import { useNavigate } from "react-router-dom";
import { setIsLogin } from "../Redux/Slice/userSlice";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllTask());
    // eslint-disable-next-line
  }, []);

  return (
    <header>
      <nav className='px-4 navbar d-flex justify-content-between bg-body-tertiary'>
        <div>
          <span className='navbar-brand mb-0 h1'>Task Management System</span>
        </div>
        <div>
          {
          JSON.parse(localStorage.getItem("user")) !== null &&    <button className='btn btn-info' onClick={()=>{
            dispatch(setIsLogin(false))
            localStorage.setItem("user" , null);
            navigate('/')
          }}>Logout</button>
          }
       
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
