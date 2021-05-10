import React from 'react'
import Navbar from '../component/navbar'
import {base_url}from'../config'
import axios from 'axios'
export default class Proses extends React.Component{
    constructor(){
        super()
        this.state={
            token:'',
            action:'',
            history:[],siswa:[],
            total_bayar:0
            
        }
          if(localStorage.getItem("token")&&localStorage.getItem("student")){
            this.state.token = localStorage.getItem("token")
            this.state.siswa=JSON.parse(localStorage.getItem("student"))
        }
        else{
            window.location = "/login"
        }
        this.headerConfig.bind(this)
 
    }
    headerConfig(){
        let header = {headers:{Authorization:'Bearer '+this.state.token}}
        return header
    }
    getHistory(){
        let url = base_url+"/spp/"+this.state.siswa.nisn
        axios.get(url,this.headerConfig()).then(r=>{
            this.setState({history:r.data})
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
        this.getHistory()
    } 
    render(){
        return(
            localStorage.getItem("student")?
            <div>
                
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">
                    History Payment
                    </h3>
                    <table className="table table-bordered" style={{padding:"0"}}>
                                    <thead>
                                    <tr>
                                        <th>Nisn</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.history.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{item.nisn}</td>
                                                <td>{item.nama_siswa}</td>
                                                <td>{`${item.spp_bulan}-${item.tgl_bayar.split("-")[2].split("T")[0]}`}</td>
                                                <td>Rp.{item.total_bayar}</td>
                                                <td className="text-success">{item.status}</td>
                                            </tr>
                                        ))}
                                      
                                    </tbody>
                                </table> 
                </div>
            </div>:null
        )
    }
}
