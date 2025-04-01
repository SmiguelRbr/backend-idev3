const express = require('express');
const userService = require('./userservice');

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone, cpf } = req.body
        if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
            return res.status(400).json
                ({ error: "Nome e email são obrigatorios" })
        }

        const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf)
        res.status(200).json({ user })
    } catch (erro) {
        res.status(401).json({ error: erro.message })
    }
})

app.get('/users', (req, res) => {
    res.json(userService.getUsers())

})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const resultado = userService.deleteUser(id)
        res.status(200).json(resultado)
    } catch (erro) {
        res.status(400).json({ error: erro.message })
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { senha, ...novosDados } = req.body;

        const usuarioEditado = await userService.editUser(id, senha, novosDados); // Aguarda a edição

        res.json({ mensagem: "Usuário atualizado com sucesso", usuario: usuarioEditado });
    } catch (erro) {
        if (erro.message === "Email já cadastrado") {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});



port = 3000

app.listen(port, () => {
    console.log("Rodando na porta 3000")
})