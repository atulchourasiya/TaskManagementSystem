import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Main from "./Component/Main";
import TaskDetail from "./Component/TaskDetail";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import PrivateRoute from "./utils/PrivateRoute";


const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Login />
            </>
          }></Route>
        <Route
          path='/signup'
          element={
            <>
              <SignUp />
            </>
          }></Route>
        <Route
          path='/task'
          element={
            <PrivateRoute Component={Main}/>
          }></Route>
        <Route
          path='/taskDetail/:id?'
          element={
            <PrivateRoute Component={TaskDetail}/>
          }></Route>
      </Routes>
    </Router>
  );
};

export default App;
