const express = require('express');
const userService = require('./userservice');

const app = express()
app.use(express.json)

app.post('/users', (req, res)=>{
    const {nome, email} = req.body
    if(!nome || !email){
        return res.status(400).json
        ({error: "Nome e email são obrigatorios"})
    }

    const user =  userService.addUser(nome, email)
    res.status(200).json({user})
})

app.get('/users', (req, res)=>{
    res.json(userService.getUsers())

})

port= 3000

app.listen(port, ()=>{
    console.log("Rodando na porta 3000")
})