import React from 'react'
import Navbar from '../component/navbar'
import {base_url}from'../config'
import axios from 'axios'
import $ from 'jquery'
export default class Proses extends React.Component{
    constructor(){
        super()
        this.state={
            token:'',
            action:'',
            proses:[],petugas:[],bulan:"",
            total_bayar:0
            
        }
          if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
            this.state.petugas = JSON.parse(localStorage.getItem("admin"))
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
    getProses(){
        let url = base_url+"/spp/proses"
        axios.get(url,this.headerConfig()).then(r=>{
            axios.get(`${base_url}/spp`,this.headerConfig()).then(re=>{
                this.setState({proses:r.data,bulan:r.data[0]!==undefined?r.data[0].spp_bulan:re.data.reverse()[0].spp_bulan})
            })
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
        this.getProses()
    }
    Add(){
$("#modal_proses").modal("show")
this.setState({
    action:'insert',
    total_bayar:0
})
}
confirm=(i)=>{
    if(window.confirm("are you sure to confirm this record?")){
    let param = [i.id_pembayaran,i.nisn]
let data = {id_petugas:this.state.petugas.id_petugas}
let url = `${base_url}/spp/pembayaran/${param[0]}/${param[1]}`
axios.post(url,data,this.headerConfig()).then(r=>{
    window.alert(r.data.message)                
    this.getProses()
}).catch(e=>console.log(e))
}
}

    
    Save(e){
        e.preventDefault()
        $("#modal_proses").modal("hide")
        let i = this.state
        let form ={
            jumlah_bayar:i.total_bayar
        }
       
        let url = base_url+"/spp"
        if(i.action=="insert"){
            axios.post(url,form,this.headerConfig()).then(r=>{
                window.alert(r.data.message)
                this.getProses()
            }).catch(er=>console.log(er))
        }
       
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">
                    Process Payment
                    </h3>
                    <table className="table table-bordered" style={{padding:"0"}}>
                                    <thead>
                                    <tr>
                                        <th>Nisn</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Option</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.proses.map((item,index)=>(
                                            <tr key={index}>
                                                <td>{item.nisn}</td>
                                                <td>{item.nama_siswa}</td>
                                                <td>{`${item.spp_bulan}-${item.tgl_bayar.split("-")[2].split("T")[0]}`}</td>
                                                <td>Rp.{item.total_bayar}</td>
                                                <td className="text-danger">{item.status}</td>
                                                <td className="text-center">
                                                <button className="btn btn-sm btn-warning text-white" onClick={()=>this.confirm(item)}>Confirm</button>
                                                </td>
                                            </tr>
                                            
                                        ))}
                                      
                                    </tbody>
                                </table> 
{
this.state.bulan===new Date("2021-05-04T02:00:49.000Z").toString().split(" ")[1]?null:(<button className="btn btn-success" onClick={()=>this.Add()}>Add Payment</button>)
}
<div className="modal" id="modal_proses">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-white bg-info">
                                        <h4>Form Payment</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(ev)=>this.Save(ev)}>
                                            Nominal <input type="number" className="form-control mb-1" value={this.state.total_bayar} onChange={ev=>{this.setState({total_bayar:ev.target.value})}}/>
                                            
                                            <button type="submit" className="btn btn-block btn-success">
                                                Save Data
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
