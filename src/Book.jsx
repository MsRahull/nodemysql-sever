import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './Auth';

const Book = () => {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        
        axios.get('http://localhost:3030/books')
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }, []);
    
    const handleDelete = (id) => {

        axios.delete('http://localhost:3030/delete/'+id)
        // .then(res => window.location.reload())
        .then(response => {
            if (response.data.success) {
               alert("Are You Sure Delete Record!");
               navigate('/create')
            } else {
                alert("Falied To Deleted Record!");
                navigate('/books')
            }
          })

        .catch(err => console.log(err))
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    

    return (
        <div className='container'>

            <Link to="/create" className='btn btn-success me-2'>Create</Link>
            <button className='btn btn-danger me-2' onClick={handleLogout}>
                    Logout
                </button>            {books.length !== 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(books) && books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.nname}</td>
                                <td>{book.nemail}</td>
                                <td>{book.nmobile}</td>
                                <td>{book.ngender}</td>
                            
                                <td>
                                    <Link to={`/update/${book.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                                    <button type='button' onClick={() => handleDelete(book.id)} className='btn btn-danger btn-sm'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2>No Records</h2>
            )}
        </div>
    );
};

export default Book;
