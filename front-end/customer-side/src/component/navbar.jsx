import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    Logout = () =>{
      localStorage.removeItem("student")
        localStorage.removeItem("token")
        window.location = '/login'
    }
    render(){
        return(
              <div className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
     <a className="navbar-brand">Moklet SPP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapase" id="navbarText">
      <ul className="navbar-nav mt-3">
        
        <li className="nav-item">
        <Link to="/" className="nav-link">
            History
        </Link>
        </li>                  
         <li className="nav-item"><Link className="nav-link" onClick={() => this.Logout()}>Logout</Link>
         </li>
      </ul>
     
    </div>
  </div>
</div>
        )
    }
}
export default Navbar