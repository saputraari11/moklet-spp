const jwt = require("jsonwebtoken")
const SECRET_KEY = ["AdminItuAdalahRaja","SiswaItuAdalahGenerasiRaja"]
const admin = (req, res, next) => {
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    let jwtHeader = {
        algorithm: "HS256"
    }
    if(token == null){
        res.status(401).json({ message: "Unauthorized"})
    }else{
        jwt.verify(token, SECRET_KEY[0], jwtHeader, (error,user) => {
            if((req.baseUrl==="/store/api/v1/spp"||req.baseUrl==="/store/api/v1/spp/pembayaran/:id_pembayaran")&&(req.baseUrl==="/store/api/v1/spp"&&req.method!=="POST")){
                if (error) {
                    res
                    .status(401)
                    .json({
                        message: "Invalid token"
                    })
                    
                } else {
                    console.log(user);
                    next()
                }
            }
            else{
                if(user.level!=="petugas"){
                    if (error) {
                        res
                        .status(401)
                        .json({
                            message: "Invalid token"
                        })
                        
                    } else {
                        console.log(user);
                        next()
                    }
                }
                else{
                    res
                        .status(401)
                        .json({
                            message: "Invalid token"
                        })
                }
            }
           
        })
    } 
}

const student = (req, res, next) => {
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]
    console.log(req.params);
    let jwtHeader = {
        algorithm: "HS256"
    }
    if(token == null){
        res.status(401).json({ message: "Unauthorized"})
    }else{
        jwt.verify(token, SECRET_KEY[1], jwtHeader, (error,user) => {
            if (error) {
                res
                .status(401)
                .json({
                    message: "Invalid token"
                })
            } else {
                console.log(user);
                next()
            }
        })
    } 
}

module.exports = {admin,student}