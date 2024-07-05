import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CreateBook = () => {

    const [values, setValues] = useState({
        nname: "",
        nemail: "",
        nmobile: "",
       ngender: ""
    })
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3030/create', values)
        .then(res => navigate('/'))
        .catch(err => console.log(err));
    }
    return (
        <div className='container'>

            <div className='d-flex align-items-center flex-column mt-3'>

                <h4>Create Users</h4>
                <form className='w-50' onSubmit={handleSubmit} >
                    <div className="form-group mb-3 mt3">
                        <label htmlFor="nname">Name</label>
                        <input type="text" className="form-control" id="nname" name='nname' placeholder="Enter Your Name" onChange={(e) => setValues({...values, nname: e.target.value})}/>
                    </div>
                    <div className="form-group mb-3 mt3">
                        <label htmlFor="nemail">Email address</label>
                        <input type="email" className="form-control" id="nemail" name='nemail' placeholder="Enter email" onChange={(e) => setValues({...values, nemail: e.target.value})}/>
                    </div>
                    <div className="form-group mb-3 mt3">
                        <label htmlFor="nmobile">Mobile</label>
                        <input type="number" className="form-control" id="nmobile" name='nmobile' placeholder="Enter Your Mobile Number" onChange={(e) => setValues({...values, nmobile: e.target.value})}/>
                    </div>

                    <div className="form-group mb-3 mt-3">
                        <label htmlFor="gender">Gender</label>
                        <select id="ngender" name='ngender' className="form-control"
                        onChange={(e) => setValues({ ...values, ngender: e.target.value })}
                        >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div>

                    <Link to="/books" className="btn btn-success col-5 me-2">View Record</Link>
                    <button type="submit" className="btn btn-danger col-6">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateBook