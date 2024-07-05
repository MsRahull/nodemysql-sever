import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Book from './Book'
import Nav from './Nav'
import CreateBook from './CreateBook'
import UpdateBook from './UpdateBook'
import Register from './Register'
import Login from './Login'
import { isAuthenticated } from "./Auth";

function App() {
  return (
    <>
    <Nav />
      <BrowserRouter>
        <Routes>
            
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>

            <Route path="/books" element={isAuthenticated() ? <Book /> : <Navigate to="/login" />} />
          <Route path="/create" element={isAuthenticated() ? <CreateBook /> : <Navigate to="/login" />} />
          <Route path="/update/:id" element={isAuthenticated() ? <UpdateBook /> : <Navigate to="/login" />} />
          
          <Route path="*" element={<Navigate to={isAuthenticated() ? "/books" : "/login"} />} />

        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
