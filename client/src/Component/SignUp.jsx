import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/Slice/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container col-4 mt-5'>
      <div className='formContainer p-3 rounded'>
        <div className='tableHeader'>
          <h2 className='p-2 m-0'>Register</h2>
          <hr className='m-0 p-0' />
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await dispatch(registerUser(user));
            if(result.meta.requestStatus==='fulfilled'){
                navigate('/')
            }
          }}>
          <div className='form-group my-3'>
            <label for='exampleInputEmail1'>Email address</label>
            <input
              type='email'
              className='form-control'
              name='email'
              onChange={handleChange}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <div className='form-group my-3'>
            <label for='exampleInputEmail1'>Name</label>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter Name'
            />
          </div>
          <div className='form-group mt-3'>
            <label for='exampleInputPassword1'>Password</label>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              className='form-control '
              id='exampleInputPassword1'
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
          Already have a account ? <Link to={"/"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
