const express = require("express")
const md5 = require("md5")
const models = require("../models/index")
const petugas = models.petugas
const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const {admin}= require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "AdminItuAdalahRaja"

app.get("/",admin,async(req,res)=>{
    try{
        let result=await petugas.findAll()
        res.json(result)
    }catch(e){res.json(e.er.name)}
    

})
app.post("/",admin,(req,res)=>{
    let data = {
        username:req.body.username,
        password:md5(req.body.password),
        nama_petugas:req.body.nama_petugas,
        level:req.body.level
    }
    petugas.create(data).then(r=>res.json({message:"data has been inserted",data:r})).catch(e=>res.json({message:e.message}))
})
app.put("/",admin,(req,res)=>{
    let param={id_petugas:req.body.id_petugas}
    let data = {
        username:req.body.username,
        nama_petugas:req.body.nama_petugas,
        level:req.body.level
    }
    if(req.body.password){
        data.password=md5(req.body.password)
    }
    petugas.update(data,{where:param}).then(r=>res.json({message:"data has been updated"})).catch(e=>res.json({message:e.message}))
})
app.delete("/:nisn",admin,(req,res)=>{
    let param={id_petugas:req.params.id_petugas}
    petugas.destroy({where:param}).then(r=>res.json({message:"data has been deleted"})).catch(e=>res.json({message:e.message}))

})
app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: params})
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