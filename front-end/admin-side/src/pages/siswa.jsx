import React from 'react'
import Navbar from '../component/navbar'
import {base_url}from'../config'
import axios from 'axios'
import $ from 'jquery'
export default class Siswa extends React.Component{
    constructor(){
        super()
        this.state={
            token:'',
            action:'',
            siswa:[],
            kelas:[],
            nisn:'',
            nis:'',id_kelas:0,alamat:"",no_telp:"",id_spp:"",nama:"",
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
    getStudent(){
        let url = base_url+"/siswa"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({siswa:r.data})
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
    getClass(){
        let url = base_url+"/kelas"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({kelas:r.data})
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
        this.getStudent()
        this.getClass()
    }
    Add(){
$("#modal_siswa").modal("show")
this.setState({
    action:'insert',
            nisn:'',
            nis:'',id_kelas:0,alamat:"",no_telp:"",nama:"",id_spp:0,
            username:'',
            password:'',
})
}
Edit=(i)=>{
    $("#modal_siswa").modal("show")
    this.setState({
        action:'update',
        nisn:i.nisn,
        nis:i.nis,id_kelas:i.id_kelas,alamat:i.alamat,no_telp:i.no_telp,nama:i.nama,id_spp:i.id_spp,
        username:i.username,
        password:"",
        fillPassword:false
    })

    }
    Drop(item){
        if(window.confirm("are sure will delete this item?")){
            let url = `${base_url}/siswa/${item.nisn}`
            axios.delete(url,this.headerConfig()).then(r=>{
                window.alert(r.data.message)                
                this.getStudent()
            }).catch(e=>console.log(e))
        }
    }
    Save(e){
        e.preventDefault()
        $("#modal_siswa").modal("hide")
        let i = this.state
        let form ={
            nisn:i.nisn,
            nis:i.nis,id_kelas:i.id_kelas,alamat:i.alamat,no_telp:i.no_telp,
            username:i.username,nama:i.nama
                }
        if(i.fillPassword){
            form.password=i.password
        }
        let spp = {
        nominal:500000
        }
        let url = base_url+"/siswa"
        if(i.action==="insert"){
            axios.post(`${base_url}/spp`,spp,this.headerConfig()).then(re=>{
                form.id_spp=re.data.data.id_spp
                axios.post(url,form,this.headerConfig()).then(r=>{
                    window.alert(r.data.message)
                    this.getStudent()
                }).catch(er=>console.log(er))   
            }).catch(er=>console.log(er))
            
            
        }
        else if(i.action==="update"){
            axios.put(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getStudent()
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
                        Student List
                    </h3>
                    <table className="table table-dark table-bordered border-secondary table-hover" style={{padding:"0"}}>
                                    <thead>
                                    <tr>
                                        <th>Nisn</th>
                                        <th>Name</th>
                                        <th>Class Name</th>
                                        <th>Username</th>
                                        <th>No Spp</th>
                                        <th>Option</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.siswa.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{item.nisn}</td>
                                                <td>{item.nama}</td>
                                                <td>{item.kelas.nama_kelas}</td>
                                                <td>{item.username}</td>
                                                <td>{item.id_spp}</td>
                                                <td>
                                                <button className="btn btn-sm btn-info m-1" onClick={()=>this.Edit(item)}>Edit</button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={()=>this.Drop(item)}>Drop</button>
                                                </td>
                                            </tr>
                                            
                                        ))}
                                      
                                    </tbody>
                                </table> 
<button className="btn btn-success" onClick={()=>this.Add()}>Add Student</button>
<div className="modal" id="modal_siswa">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-white bg-info">
                                        <h4>Form Student</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(ev)=>this.Save(ev)}>
                                            Nisn <input type="text" className="form-control mb-1" minLength="10" maxLength="10" value={this.state.nisn} onChange={ev=>{this.setState({nisn:ev.target.value})}} datatype="number" required="true"/>
                                            Nis <input type="text" className="form-control mb-1" value={this.state.nis} onChange={ev=>{this.setState({nis:ev.target.value})}} />
                                            Student Name <input type="text" className="form-control mb-1" value={this.state.nama} onChange={ev=>{this.setState({nama:ev.target.value})}}/>
                                             Alamat <input type="text" className="form-control mb-1" value={this.state.alamat} onChange={ev=>{this.setState({alamat:ev.target.value})}}/>
                                            No.<input type="text" className="form-control mb-1" value={this.state.no_telp} onChange={ev=>{this.setState({no_telp:ev.target.value})}}/>
                                            Username <input type="email" className="form-control mb-1" value={this.state.username} onChange={ev=>{this.setState({username:ev.target.value})}}/>
                                            Class Name: 
                                            <select className="form-select block" aria-label="Default select example" onChange={ev=>{this.setState({id_kelas:ev.target.value})}}>
                                            {this.state.kelas.map(i=>this.state.id_kelas!==i.id_kelas?(  
                                            <option value={i.id_kelas}>{i.nama_kelas}</option>):<option selected value={i.id_kelas}>{i.nama_kelas}</option>
                                            )}
                                            </select>
                                            {this.state.action==="update"&&this.state.fillPassword===false?
                                            (
                                            <button className="btn btn-sm btn-block mb-1 btn-secondary" onClick={()=>this.setState({fillPassword:true})}>Change Student Password</button>
                                            ):
                                            (
                                            <div>
                                               Password <input type="password" className="form-control mb-1" value={this.state.password} onChange={ev=>this.setState({password:ev.target.value})}/>
                                            </div>
                                            )
                                            }
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
