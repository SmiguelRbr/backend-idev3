const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res)=>{
    res.send('Pagina Principal')
})

app.get('/home', (req, res)=>{
    res.send('Pagina Home')
})

app.get('/login', (req, res)=>{
    res.send('Pagina Login')
})

app.listen(port, ()=>{
    console.log(`Porta rodando em http://localhost:${port}`)
})