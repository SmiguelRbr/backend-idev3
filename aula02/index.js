//class base Usuario
class Usuario {
        constructor(nome, email, senha){
            this.name = nome
            this.email = email
            this._senha = senha //Atributo privado

        }

autenticar(senha){
    return senha === this._senha
}

alterar(novaSenha){
    this._senha = novaSenha
    console.log('Senha alterada com sucesso')
}

}

class Admin extends Usuario{
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha)
        this.nivelAcesso = nivelAcesso
    }

    banirUsuario(Usuario){
        console.log (`${Usuario.nome} foi banido pelo adm ${this.nome}`)
    }

    autenticar(senha){
        return senha === this._senha && this.nivelAcesso ==='alto'
    }
}

const usuario1 = new Usuario('Luiz', 'luiz@gmail', '1234')
console.log (usuario1.autenticar('12345'))
console.log (usuario1.alterar('teste'))
console.log (usuario1.autenticar('12345'))
console.log (usuario1.autenticar('teste'))

