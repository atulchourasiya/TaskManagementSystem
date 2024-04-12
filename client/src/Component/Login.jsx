import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch , useSelector  } from "react-redux";
import { loginUser } from "../Redux/Slice/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLogin} = useSelector(state=>state.user)
    console.log(isLogin)
    const [userObj, setUserObj] = useState({
        email : "",
        password : ""
    })
    
    const handleChange = (e)=>{
        setUserObj({
            ...userObj,
            [e.target.name] : e.target.value
        })
    }
    useEffect(()=>{
       if(isLogin)
       navigate('/task')
    }, [ isLogin ])
  return (
    <div className='container col-4 mt-5'>
      <div className='formContainer p-3 rounded'>
      <div className='tableHeader'>
        <h2 className='p-2 m-0'>Login</h2>
        <hr className='m-0 p-0' />
      </div>
        <form onSubmit={(e)=>{
            e.preventDefault();
            dispatch(loginUser(userObj));
        }}>
          <div className='form-group my-3'>
            <label for='userEmail'>Email address</label>
            <input
              type='email'
              className='form-control'
              name="email"
              onChange={handleChange}
              id='userEmail'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <div className='form-group mt-3'>
            <label for='userPassword'>Password</label>
            <input
              type='password'
              className='form-control '
              onChange={handleChange}
              name="password"
              id='userPassword'
              placeholder='Password'
            />
          </div>
          <div className='d-flex'>
            <button type='submit' className='btn btn-info mt-3'>
              Submit
            </button>
          </div>
        </form>
        <hr />
        <p>
          New here ? <Link to={"/signup"}>Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
