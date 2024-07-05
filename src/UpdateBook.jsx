import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBook = () => {

    const {id} = useParams()
    const [values, setValues] = useState({
        nname: "",
        nemail: "",
        nmobile: "",
       ngender: ""
    })

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:3030/update/'+id, values)
        .then(res => navigate('/'))
        .catch(err => console.log(err));
    }

    useEffect(() => {
      axios.get('http://localhost:3030/getrecord/'+id)
          .then(res => setValues({...values, nname: res.data[0].nname, nemail: res.data[0].nemail, nmobile: res.data[0].nmobile, ngender: res.data[0].ngender}))
          .catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
            <div className='d-flex align-items-center flex-column mt-3'>
                <h4>Update Users</h4>
                <form className='w-50' onSubmit={handleSubmit} >
                    <div className="form-group mb-3 mt3">
                        <label htmlFor="nname">Name</label>
                        <input type="text" className="form-control" id="nname" name='nname' placeholder="Enter Your Name" value={values.nname} onChange={(e) => setValues({...values, nname: e.target.value})}/>
                    </div>
                    <div className="form-group mb-3 mt3">
                        <label htmlFor="nemail">Email address</label>
                        <input type="email" className="form-control" id="nemail" name='nemail' placeholder="Enter email" value={values.nemail} onChange={(e) => setValues({...values, nemail: e.target.value})}/>
                    </div>
                    <div className="form-group mb-3 mt3">
                        <label htmlFor="nmobile">Mobile</label>
                        <input type="password" className="form-control" id="nmobile" name='nmobile' placeholder="Mobile" value={values.nmobile} onChange={(e) => setValues({...values, nmobile: e.target.value})}/>
                    </div>

                    <div className="form-group mb-3 mt-3">
                        <label htmlFor="gender">Gender</label>
                        <select id="ngender" name='ngender' className="form-control"
                        value={values.ngender} onChange={(e) => setValues({ ...values, ngender: e.target.value })}
                        >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary mb-3 mt3">Submit</button>
                </form>
            </div>
        </div>
  )
}

export default UpdateBook