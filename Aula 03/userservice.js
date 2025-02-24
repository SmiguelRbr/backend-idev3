const User = require('./user')
const path = require('path')
const fs = require ('fs')
const { error } = require('console')

class userService{
    constuctor(){
        this.filePath = path.join(__dirname, 'user.json')
        this.users = []
        this.nextId = 1
    }

    loadUser(){
        try{
       
            if(fs.existsSync(this.filePath)){
                const data = fs.readFileSync(this.filePath)
                return JSON.parse(data)
            }
        }catch(erro){
            console.log('Erro ao carregar o arquivo', erro)
        }
    }

    getNextID(){
        try{
            if(this.users.lenght === 0) return 1;
            return Math.max(...this.users.map(user => user.id))+1
        }catch(erro){
            console.log('Erro ao buscar o proximo id', erro)
        }
    }

    addUser(nome, email){
        const user = new User(this.nextId++, nome, email)
        this.users.push(user)
        return user
    }

    getUsers(){
        return this.users
    }

  

}



module.exports = new userService