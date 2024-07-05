import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'jquery-validation';
import { storageUserData } from './Storage';
import { isAuthenticated } from './Auth';

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

    const navigate = useNavigate();
    useEffect(() => {
        $('#loginForm').validate({
          rules: {
            email: {
              required: true,
              email: true
            },
            password: {
              required: true,
              minlength: 6
            }

          },
          messages: {
         
            email: {
              required: 'Please enter your email',
              email: 'Please enter a valid email address'
            },
            password: {
              required: 'Please enter your password',
              minlength: 'Your password must be at least 6 characters long'
            }
          },
          submitHandler: function(form) {
            handleLogin();
          }
        });
      }, []);


      const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3030/login', loginInfo)
          .then(response => {
            if (response.data.success) {
                alert("Login Successfully");
              navigate('/books');
              storageUserData(response.data.id);

            } else {
                alert("Invalid Username or Password!!");
              navigate('/login');
            }
          })
          .catch(err => console.log(err));
      };

    if(isAuthenticated()){
        navigate('/books'); 
    }

    return (
        <section className="h-100 bg-dark">
            <div className="container py-0 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">Login</h3>
                                        <form id="loginForm" onSubmit={handleLogin}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example8">Email</label>
                                                <input
                                                    type="email"
                                                    id="email" name="email"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example8">Password</label>
                                                <input
                                                    type="password"
                                                    id="password" name="password"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                                                />
                                            </div>
                                            <p>I don't have an account <Link to="/register">Register</Link></p>
                                            <button type="submit" className="btn btn-warning btn-lg">Login</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://img.freepik.com/premium-vector/digital-illustration-man-standing-large-tablet-displaying-login-page_136558-153649.jpg"
                                        alt="Sample photo"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
