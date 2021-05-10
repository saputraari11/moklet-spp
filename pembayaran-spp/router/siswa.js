const express = require("express")
const models = require("../models/index")
const siswa = models.siswa
const pembayaran = models.pembayaran
const app = express()
const md5 = require("md5")
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const {admin,student}= require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "SiswaItuAdalahGenerasiRaja"

app.get("/",admin,async(req,res)=>{
    try{
        let result=await siswa.findAll({include:"kelas"})
        res.json(result)
    }catch(e){res.json(e.message)}
    

})
app.get("/:nisn",student,async(req,res)=>{
    try{
        let result=await siswa.findOne({where:{nisn:req.params.nisn}})
        res.json({data:result})
    }catch(e){res.json(e.message)}
    

})
app.post("/",admin,(req,res)=>{
    let data = {
        nisn:req.body.nisn,
        nis:req.body.nis,
        nama:req.body.nama,
        id_kelas:req.body.id_kelas,
        alamat:req.body.alamat,
        no_telp:req.body.no_telp,
        id_spp:req.body.id_spp,
        username:req.body.username,
        
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    siswa.create(data).then(r=>res.json({message:"data has been inserted",data:r})).catch(e=>res.json({message:e.message}))
})
app.put("/",admin,(req,res)=>{
    let param={nisn:req.body.nisn}
    let data = {
        nis:req.body.nis,
        nama:req.body.nama,
        id_kelas:req.body.id_kelas,
        alamat:req.body.alamat,
        no_telp:req.body.no_telp,
        id_spp:req.body.id_spp,
        username:req.body.username,
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    siswa.update(data,{where:param}).then(r=>res.json({message:"data has been updated"})).catch(e=>res.json({message:e.message}))
})
app.delete("/:nisn",admin,async(req,res)=>{
    try {
        let param = {nisn:req.params.nisn}
        await pembayaran.destroy({where: param})
        await siswa.destroy({where:param})
        res.json({
            message : "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await siswa.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app