const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const siswa = require("./router/siswa")
const petugas = require("./router/petugas")
const spp = require("./router/spp")
const kelas = require("./router/kelas")
app.use("/store/api/v1/siswa", siswa)
app.use("/store/api/v1/petugas", petugas)
app.use("/store/api/v1/spp", spp)
app.use("/store/api/v1/kelas", kelas)



app.listen(8000, () => {
    console.log("Server run on port 8000");
})