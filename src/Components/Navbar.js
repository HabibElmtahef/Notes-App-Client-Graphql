import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {DataContext} from '../store/GlobalState'

const Navbar = () => {
  const {state, dispatch} = useContext(DataContext)
  const {auth} = state

  const AdminNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to='/' className="nav-link" >Home</Link>
      </li>
      <li className="nav-item">
        <Link to='/users' className="nav-link" >Management</Link>
      </li>
      <li className="nav-item">
        <Link to='/notes' className="nav-link" > <img src={auth.user.avatar} style= {{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', marginTop:'-2px'}} alt="" /> 
        <strong className="ml-2">{auth.user.username}</strong> </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" 
        onClick={() => { dispatch({type: 'AUTH', payload: {}})
         localStorage.removeItem('token')
        }
        } >Sign Out</Link>
      </li>
    </ul>
    )
  }

  const UserNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to='/' className="nav-link" >Home</Link>
      </li>
      <li className="nav-item">
        <Link to='/notes' className="nav-link" > <img src={auth.user.avatar} style= {{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', marginTop:'-2px'}} alt="" /> 
        <strong className="ml-2">{auth.user.username}</strong> </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" 
        onClick={() => { dispatch({type: 'AUTH', payload: {}})
         localStorage.removeItem('token')
        }
        }
        >Sign Out</Link>
      </li>
    </ul>
    )
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent border-0">
  <Link to="/" className="navbar-brand font-weight-bold" >Notes App</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    {
      auth.token ? 
          auth.user.role === "ADMIN" ? <AdminNav/> : <UserNav/> 
      : 
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to='/' className="nav-link" >Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" >Sign In</Link>
      </li>
    </ul>
    }
  </div>
</nav>

    )
}

export default Navbar
