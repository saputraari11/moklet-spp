import React from 'react'
import Navbar from '../component/navbar'
import {base_url}from'../config'
import axios from 'axios'
import $ from 'jquery'
export default class Kelas extends React.Component{
    constructor(){
        super()
        this.state={
            token:'',
            action:'',
            kelas:[],
            id_kelas:'',
            tingkat:"",
            no:"",
            kompetensi_keahlian:''
           
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
        this.getClass()
    }
    Add(){
$("#modal_kelas").modal("show")
this.setState({
    action:'insert',
    id_kelas:0,
    tingkat:'',
    no:'',
    kompetensi_keahlian:''
})
}
Edit=(i)=>{
    $("#modal_kelas").modal("show")
    this.setState({
        action:'update',
        id_kelas:i.id_kelas,
        tingkat:i.nama_kelas.includes("R")?i.nama_kelas.split("R")[0]:i.nama_kelas.split("T")[0],
        no:i.nama_kelas.includes("R")?i.nama_kelas.split("R")[1]:i.nama_kelas.split("T")[1],        
        kompetensi_keahlian:i.kompetensi_keahlian
    })
    }
    Drop(item){
        if(window.confirm("are u sure will delete this item?")){
            let url = base_url+"/kelas/"+item.id_kelas
            axios.delete(url,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getClass()
            }).catch(e=>console.log(e))
        }
    }
    Save(e){
        e.preventDefault()
        $("#modal_kelas").modal("hide")
        let i = this.state
        let form ={
            id_kelas:i.id_kelas,nama_kelas:`${i.tingkat}${i.kompetensi_keahlian.split("")[0]}${i.no}`,kompetensi_keahlian:i.kompetensi_keahlian
        }
        let url = base_url+"/kelas"
        if(i.action=="insert"){
            axios.post(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getClass()
            }).catch(er=>console.log(er))
        }
        else if(i.action=="update"){
            axios.put(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getClass()
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
                        Class List
                    </h3>
                    <table className="table table-bordered" style={{padding:"0"}}>
                                    <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Option</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.kelas.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{`${index+1}`}</td>
                                                <td>{item.nama_kelas}</td>
                                                <td>{item.kompetensi_keahlian}</td>
                                                <td>
                                                <button className="btn btn-sm btn-info m-1" onClick={()=>this.Edit(item)}>Edit</button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={()=>this.Drop(item)}>Drop</button>
                                                </td>
                                            </tr>
                                            
                                        ))}
                                      
                                    </tbody>
                                </table> 
<button className="btn btn-success" onClick={()=>this.Add()}>Add Class</button>
<div className="modal" id="modal_kelas">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-white bg-info">
                                        <h4>Form Class</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(ev)=>this.Save(ev)}>
                                            Class number: 
                                            <select className="form-select" aria-label="Default select example" onChange={ev=>{this.setState({no:ev.target.value})}}>
                                            <option selected value={this.state.no}>{this.state.no}</option>
                                            {[1,2,3,4,5,6,7,8].map(i=>this.state.no!==`${i}`?(  
                                            <option value={`${i}`}>{`${i}`}</option>):null)}
                                            </select>
                                            Role: 
                                            <select className="form-select block" aria-label="Default select example" onChange={ev=>{this.setState({kompetensi_keahlian:ev.target.value})}}>
                                            <option selected value={this.state.kompetensi_keahlian}>{this.state.kompetensi_keahlian}</option>
                                            {["RPL","TKJ"].map(i=>this.state.kompetensi_keahlian!==i?(  
                                            <option value={i}>{i}</option>):null)}
                                            </select>
                                            Level: 
                                            <select className="form-select block" aria-label="Default select example" onChange={ev=>{this.setState({tingkat:ev.target.value})}}>
                                            <option selected value={this.state.tingkat}>{this.state.tingkat}</option>
                                            {["X","XI","XII"].map(i=>this.state.tingkat!==`${i}`?(  
                                            <option value={i}>{i}</option>):null)}
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
