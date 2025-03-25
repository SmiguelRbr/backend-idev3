const express = require('express');
const userService = require('./userservice');

const app = express()
app.use(express.json())

app.post('/users', async (req, res)=>{
    const {nome, email, senha, endereco, telefone, cpf} = req.body
    if(!nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json
        ({error: "Nome e email são obrigatorios"})
    }

    const user =  await userService.addUser(nome, email, senha, endereco, telefone, cpf)
    res.status(200).json({user})
})

app.get('/users', (req, res)=>{
    res.json(userService.getUsers())

})

app.delete('/users/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    try{
        const resultado = userService.deleteUser(id)
        res.status(200).json(resultado)
    }catch (erro){
        res.status(400).json({error: erro.message})
    }
})

app.put('/users/:id', (req, res)=>{
    const id = parseInt(req.params.id); // Pega o ID da URL e converte para número
    const novosDados = req.body; // Pega os novos dados do corpo da requisição

    const usuarioEditado = userService.editUser(id, novosDados); // Chama a função de editar

    if (!usuarioEditado) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso", usuario: usuarioEditado });
})

port= 3000

app.listen(port, ()=>{
    console.log("Rodando na porta 3000")
})