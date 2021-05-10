import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
  constructor(){
    super()
    this.state={admin:JSON.parse(localStorage.getItem("admin"))}
  }
    Logout = () =>{
      localStorage.removeItem("admin")
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
        {this.state.admin.level==="admin"?( 
           <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
        </li>):null}
        {this.state.admin.level==="admin"?( 
        <li className="nav-item">
        <Link to="/kelas" className="nav-link">
            Class
        </Link>
        </li>):null}
        {this.state.admin.level==="admin"?( 
           <li className="nav-item">
           <Link to="/siswa" className="nav-link">
               Student
           </Link>
           </li>):null}
          <li className="nav-item">
        <Link to="/proses" className="nav-link ">
            Proses
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/history" className="nav-link">
            History
        </Link>
        </li>          
        {this.state.admin.level==="admin"?( 
           <li className="nav-item">
           <Link to="/admin" className="nav-link">
               Administrator
           </Link>
           </li>):null}
        
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