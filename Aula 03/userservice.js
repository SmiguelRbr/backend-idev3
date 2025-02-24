const User = require('./user')
const path = require('path')
const fs = require ('fs')

class userService{
    constuctor(){
        this.users = []
        this.nextId = 1
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