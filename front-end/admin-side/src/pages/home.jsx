import React from 'react'
import Navbar from '../component/navbar'
import {base_url}from'../config'
import axios from 'axios'
export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            token:"",
            adminCount:0,studentCount:0,classCount:0,sppCount:0,prosesCount:0,historyCount:0,adminName:""
        }
       
          if(localStorage.getItem("token")&&localStorage.getItem("admin")){
            this.state.token = localStorage.getItem("token")
        }
        else{
            window.location = "/login"
            localStorage.removeItem("admin")
            localStorage.removeItem("token")
        }
        this.headerConfig.bind(this)
        this.state.adminName = JSON.parse(localStorage.getItem("admin")).nama_petugas
    }
    headerConfig(){
        let header = {headers:{Authorization:'Bearer '+this.state.token}}
        return header
    }
    getadmin(){
        let url = base_url+"/petugas"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({adminCount:r.data.length})
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
    getStudent(){
        let url = base_url+"/siswa"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({studentCount:r.data.length})
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
            this.setState({classCount:r.data.length})
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
    getSpp(){
        let url = base_url+"/spp/list"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({sppCount:r.data.length})
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
    getProses(){
        let url = base_url+"/spp/proses"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({prosesCount:r.data.length})
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
    getHistory(){
        let url = base_url+"/spp"
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({historyCount:r.data.length})
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
        this.getClass()
        this.getStudent()
        this.getSpp()
        this.getHistory()
        this.getProses()
    }
  

    render(){
        
        return(
            JSON.parse(localStorage.getItem("admin")).level==="admin"?
            <div>
                <Navbar/>
                <div className="container mt-2">
            <h3 className="my-2">
                <strong>welcome back,{this.state.adminName}</strong>
            </h3>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-success">
                            <h4 className="text-dark"><strong>Class Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.classCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-info">
                            <h4 className="text-dark"><strong>Student Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.studentCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-danger">
                            <h4 className="text-dark"><strong>Admin Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.adminCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-warning">
                            <h4 className="text-dark"><strong>SPP Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.sppCount}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-warning">
                            <h4 className="text-dark"><strong>PROSES Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.prosesCount}</strong></h1>
                        </div>
                    </div>
                </div><div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-body bg-warning">
                            <h4 className="text-dark"><strong>HISTORY Count</strong></h4>
                            <h1 className="text-white"><strong>{this.state.historyCount}</strong></h1>
                        </div>
                    </div>
                </div>
                
            </div>
                </div>
            </div>:null
        )
    }
}
