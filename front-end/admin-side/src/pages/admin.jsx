import React from 'react'
import Navbar from '../component/navbar'
import {base_url}from'../config'
import axios from 'axios'
import $ from 'jquery'
export default class Admin extends React.Component{
    constructor(){
        super()
        this.state={
            token:'',
            action:'',
            admin:[],
            admin_id:'',
            name:'',
            level:"",
            username:'',
            password:'',
            fillPassword:true
        }
          if(localStorage.getItem("token")&&JSON.parse(localStorage.getItem("admin")).level==="admin"){
            this.state.token = localStorage.getItem("token")
        }
        else{
            window.location = "/login"
            localStorage.removeItem("admin")
            localStorage.removeItem("token")
        }
        this.headerConfig.bind(this)
    }
    headerConfig(){
        let header = {headers:{Authorization:'Bearer '+this.state.token}}
        return header
    }
    getadmin(){
        let url = base_url+"/petugas"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({admin:r.data})
        }).catch(e=>{
            if(e.response){
                if(e.response.status){
                    window.alert(e.response.data.message)
                    this.props.history.push('/login')
                }
            }
            else{
                console.log(e);
            }
        })
    }
    componentDidMount(){
        this.getadmin()
    }
    Add(){
$("#modal_admin").modal("show")
this.setState({
    action:'insert',
    admin_id:0,
    name:'',
    username:'',level:"",
    password:''
})
}
Edit=(i)=>{
    $("#modal_admin").modal("show")
    this.setState({
        action:'update',
        admin_id:i.id_petugas,
        name:i.nama_petugas,
        username:i.username,level:i.level,
        password:'',
        fillPassword:false
    })

    }
    Drop(item){
        if(window.confirm("are sure will delete this item?")){
            let url = base_url+"/petugas/"+item.id_petugas
            axios.delete(url,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getadmin()
            }).catch(e=>console.log(e))
        }
    }
    Save(e){
        e.preventDefault()
        $("#modal_admin").modal("hide")
        let i = this.state
        let form ={
            id_petugas:i.admin_id,nama_petugas:i.name,username:i.username,level:i.level
        }
        if(i.fillPassword){
            form.password=i.password
        }
        let url = base_url+"/petugas"
        if(i.action==="insert"){
            axios.post(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getadmin()
            }).catch(er=>console.log(er))
        }
        else if(i.action==="update"){
            axios.put(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getadmin()
            }).catch(er=>console.log(er))
        }
    }
    render(){

        return(
            JSON.parse(localStorage.getItem("admin")).level==="admin"?
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">
                        Admin List
                    </h3>
                    <table??className="table table-bordered" style={{padding:"0"}}>
????????????????????????????????????????????????????????????????????????<thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Option</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.admin.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{`${index+1}`}</td>
                                                <td>{item.nama_petugas}</td>
                                                <td>{item.username}</td>
                                                <td>
                                                <button className="btn btn-sm btn-info m-1" onClick={()=>this.Edit(item)}>Edit</button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={()=>this.Drop(item)}>Drop</button>
                                                </td>
                                            </tr>
                                            
                                        ))}
                                      
                                    </tbody>
????????????????????????????????????????????????????????????????</table>??
<button className="btn btn-success" onClick={()=>this.Add()}>Add Admin</button>
<div className="modal" id="modal_admin">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-white bg-info">
                                        <h4>Form Customer</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(ev)=>this.Save(ev)}>
                                            Admin Name <input type="text" className="form-control mb-1" value={this.state.name} onChange={ev=>{this.setState({name:ev.target.value})}}/>
                                            Username <input type="text" className="form-control mb-1" value={this.state.username} onChange={ev=>{this.setState({username:ev.target.value})}}/>
                                            {this.state.action==="update"&&this.state.fillPassword===false?
                                            (
                                            <button className="btn btn-sm btn-block mb-1 btn-secondary" onClick={()=>this.setState({fillPassword:true})}>Change Admin Password</button>
                                            ):
                                            (
                                            <div>
                                               Password <input type="password" className="form-control mb-1" value={this.state.password} onChange={ev=>this.setState({password:ev.target.value})}/>
                                            </div>
                                            )
                                            }
                                             Level: 
                                            <select className="form-select block" aria-label="Default select example" onChange={ev=>{this.setState({level:ev.target.value})}}>
                                            {["admin","petugas"].map(i=>this.state.level!==`${i}`?(  
                                            <option value={i}>{i}</option>):<option selected value={i}>{i}</option>
                                            )}
                                            </select>
                                            <button type="submit" className="btn btn-block btn-success">
                                                Save Data
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>:null
        )
    }
}
