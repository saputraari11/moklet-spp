const express = require("express")
const models = require("../models/index")
const kelas = models.kelas
const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
const {admin}=require("../auth")
app.use(admin)

app.get("/", async(req, res) => {
    let result = await kelas.findAll()
    res.json(result)
})

app.post("/",(req,res)=>{
    let data = {
        nama_kelas:req.body.nama_kelas,
        kompetensi_keahlian:req.body.kompetensi_keahlian
       }
    kelas.create(data).then(r=>res.json({message:"data has been inserted",data:r})).catch(e=>res.json({message:e.message}))
})
app.put("/",(req,res)=>{
    let param={id_kelas:req.body.id_kelas}
    let data = {
        nama_kelas:req.body.nama_kelas,
        kompetensi_keahlian:req.body.kompetensi_keahlian
     }
    kelas.update(data,{where:param}).then(r=>res.json({message:"data has been updated"})).catch(e=>res.json({message:e.message}))
})
app.delete("/:id_kelas",(req,res)=>{
    let param={id_kelas:req.params.id_kelas}
    kelas.destroy({where:param}).then(r=>res.json({message:"data has been deleted"})).catch(e=>res.json({message:e.message}))

})
module.exports = app