const User = require("./user")
const path = require("path") //path cria um caminho virtual que pode ser acessado de qualquer lugar da pasta Aula 3 ou tudo da frente da pasta (caminho relativo) (módulo para manipular caminhos)
const fs = require("fs") //fs é FileSystem (módulo para manipular arquivos)
const bcrypt = require('bcryptjs') //Criptografar senhas e etc...
const { error } = require("console")

class userService {
  constructor() { //quando não passa parâmetro traz um valor fixo, que não muda
    this.filePath = path.join(__dirname, 'users.json') //a biblioteca path vem de um caminho, puca um diretorio virtual (dirname) e puxa o arquivo users.json
    this.users = this.loadUsers() //[] é um array, esse array é pra armazenar o user
    this.nextID = this.getNextID() //contador para gerar id
  }

  loadUsers() { //função pra carregar usuários
    try { //vai tentar isso enquanto der certo
      if (fs.existsSync(this.filePath)) { //se dentro do arquivo Json existir algum dado, ele da true e entra no if
        const data = fs.readFileSync(this.filePath) //quando true, ele da um read, ele lê o arquivo Json e salva na Data
        return JSON.parse(data) //ele transforma a data do json em um Array de objetos
      }
    } catch (erro) { //se o try der errado, ele vai mostrar que deu erro
      console.log('Erro ao carregar arquivo', erro) //vai ler o erro que deu no console
    }
    return [] //se não der true, roda um array vazio
  }


  //definir o proximo id a ser utilizado
  getNextID() { //função para buscar o proximo id
    try {
      if (this.users.length === 0) return 1//se eu tiver um user dentro, ele não vai entrar, se tiver com 0 usuários ele entra e coloca ID 1
      return Math.max(...this.users.map(user => user.id)) + 1 //mostra pra gente o maior valor possível de um ID, ai ele mapeia o o ultimo user, e se o proximo for maior (vai ser maior por ser o próximo]) ele adiciona +1 no ID
    } catch (erro) {
      console.log('Erro ao buscar próximo ID', erro)
    }
  }

  saveUsers() { //função pra salvar usuários
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users)) //writefile salva o arquivo, e depois eu mostro pra ele onde está o arquivo ou seja "Vai salvar aquivo no filepath em formato json"
    } catch (erro) {
      console.log('Erro ao salvar arquivo', erro)
    }
  }

  async addUser(nome, email, senha, endereco, telefone, cpf) { //função pra adicionar usuários
    try {
      const senhacrypt = await bcrypt.hash(senha, 10)
      const user = new User(this.nextID++, nome, email, senhacrypt, endereco, telefone, cpf)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id

      const checkuser = this.users.find(user => user.email === email)
      if (checkuser) {
        throw new Error('Email ja cadastrado')
      }


      this.users.push(user) //da um push pra armazenar esse user no array de usuarios
      this.saveUsers();
      return user
    } catch (erro) {
      console.log('Erro ao cadastrar usuário', erro)
      throw erro
    }
  }



  getUsers() { //função pra puxar usuários
    try {
      return this.users
    } catch (erro) {
      console.log('Erro ao chamar usuário', erro)
    }
  }

  deleteUser(id) {
    try {
      this.users = this.users.filter(user => user.id !== id)
      this.saveUsers()
    } catch (erro) {
      console.log('Erro ao deletar o usuário')
    }
  }

  async editUser(id, senha, novosDados) {
    try {

        if (!senha || typeof senha !== 'string' || senha.trim() === '') {
            throw new Error('A senha fornecida não é válida');
        }
        
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            console.log(`Usuário com ID ${id} não encontrado.`);
            return null;
        }

        // Hash da nova senha
        const senhacrypt = await bcrypt.hash(senha, 10);

        // Atualizando os dados do usuário, incluindo a senha criptografada
        this.users[index] = { ...this.users[index], ...novosDados, senha: senhacrypt };

        const checkuser = this.users.find(user => user.email === novosDados.email);
        if (checkuser && checkuser.id !== id) {
            throw new Error('Email já cadastrado');
        }

        this.saveUsers();

        return this.users[index];

    } catch (erro) {
        console.log('Erro ao editar Usuário:', erro.message);
        throw erro;
    }
}

}

module.exports = new userService