const express = require("express")
const models = require("../models/index")
const spp = models.spp
const pembayaran = models.pembayaran
const siswa = models.siswa
const app = express()
const { Op } = require("sequelize");
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const {admin, student}= require("../auth")



app.get("/",admin, async (req, res) =>{
    let result = await pembayaran.findAll({
        where:{id_petugas:!null},
        include: [ "petugas",
            {
                model: models.siswa,
                as : "siswa",
                include: ["spp"]
            }
        ]
    })
    
    let data = []
    result.forEach(e=>{
        if(e.petugas!==null){
            data.push({nisn:e.siswa.nisn,nama_petugas:e.petugas.nama_petugas,nama_siswa:e.siswa.nama,tgl_bayar:e.tgl_bayar,spp_bulan:e.bulan_bayar,total_bayar:e.jumlah_bayar,status:e.id_petugas===null?"Belum bayar":"Lunas",valid:new Date(e.updatedAt).toString()})
        }
          })
    res.json(data)
})
app.get("/list",admin, async (req, res) =>{
    let result = await spp.findAll()
    res.json(result)
})
app.get("/proses",admin, async (req, res) =>{
    let result = await pembayaran.findAll({
        where:{id_petugas:null},
        include: [ "petugas",
            {
                model: models.siswa,
                as : "siswa",
                include: ["spp"]
            }
        ]
    })
    
    let data = []
    result.forEach(e=>{
        if(e.petugas===null){
            data.push({nisn:e.siswa.nisn,nama_siswa:e.siswa.nama,tgl_bayar:e.tgl_bayar,spp_bulan:e.bulan_bayar,total_bayar:e.jumlah_bayar,status:e.id_petugas===null?"Belum bayar":"Lunas",id_pembayaran:e.id_pembayaran})
        }
          })
    res.json(data)
})
app.get("/:nisn",student, async (req, res) =>{
    let result = await pembayaran.findAll({
        where:{"nisn":req.params.nisn},
        include: [ "petugas",
            {
                model: models.siswa,
                as : "siswa",
                include: ["spp"]
            }
        ]
    })
    let data = []
    result.forEach(e=>{
        
        if(e.petugas!==null){
            data.push({id_spp:e.siswa.id_spp,nisn:e.siswa.nisn,nama_siswa:e.siswa.nama,tgl_bayar:e.tgl_bayar,spp_bulan:e.bulan_bayar,total_bayar:e.jumlah_bayar,status:e.id_petugas===null?"Belum bayar":"Lunas"})
        }
          })
    res.json(data)
})

app.post("/pembayaran/:id_pembayaran/:nisn",admin,(req,res)=>{
       let data={
            id_petugas:req.body.id_petugas,
        }
        pembayaran.update(data,{where:{id_pembayaran:req.params.id_pembayaran,nisn:req.params.nisn}}).then(r=>res.json({message:"spp has been confirmed"})).catch(e=>res.json({message:e.message}))
})
app.post("/",admin,async(req,res)=>{
    let current =[ new Date().toISOString().split("T")[0],new Date().toString().split(" ")[1],new Date().toString().split(" ")[3]]

    if(req.body.jumlah_bayar){
       
       
        let sis = await siswa.findAll({include:"spp"})
        let data = []
        sis.forEach(element => {
            data.push({
                id_petugas:null,
                nisn:element.nisn,
                tgl_bayar:current[0],
                bulan_bayar:current[1],
                tahun_bayar:current[2],
                id_spp:element.id_spp,
                jumlah_bayar:req.body.jumlah_bayar
            })
        });
        pembayaran.bulkCreate(data).then(r=>res.json({message:"data has been created"})).catch(e=>res.json({message:e.message}))
   
         }
    else {
        let data = {
            tahun:current[2],
            nominal:req.body.nominal
        }
        spp.create(data).then(r=>res.json({message:"data has been created",data:r})).catch(e=>res.json({message:e.message}))
           
    }
})
app.delete("/:id_spp",admin,async(req,res)=>{
    try {
        let param = {id_spp:req.params.id_spp}
        await pembayaran.destroy({where: param})
        await spp.destroy({where: param})
        await siswa.update({id_spp:null},{where:param})
        res.json({
            message : "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})
module.exports = app