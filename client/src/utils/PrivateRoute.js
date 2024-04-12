import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
   const user = JSON.parse(localStorage.getItem("user"));
   return (
      user !== null ? <Component/> : <Navigate to={'/'}/>
   );
};

export default PrivateRoute;