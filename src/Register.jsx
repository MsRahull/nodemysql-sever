import React, { useState, useEffect } from 'react';
import './Register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'jquery-validation';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize jQuery validation
    $('#registerForm').validate({
      rules: {
        name: {
          required: true,
          minlength: 3
        },
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
        name: {
          required: 'Please enter your name',
          minlength: 'Your name must be at least 3 characters long'
        },
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
        alert("Register SuccessFully");
        handleSubmit();
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/register', values)
      .then(res => navigate('/login'))
      .catch(err => console.log(err));
  };

  return (
    <section className="h-50 bg-dark">
      <div className="container py-0 h-50">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="card card-registration my-1">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1807.jpg" alt="Registration" />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Register Form</h3>
                    <form id="registerForm" onSubmit={handleSubmit}>
                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="form-control form-control-lg" onChange={(e) => setValues({ ...values, name: e.target.value })} />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-control form-control-lg" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="form-control form-control-lg" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                      </div>
                      <p>Already Have an Account <Link to="/login">Login</Link></p>
                      <button type="submit" className="btn btn-warning btn-lg">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
