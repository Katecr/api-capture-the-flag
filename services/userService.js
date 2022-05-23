//library to enter false data
const faker = require('@faker-js/faker');

//error capturing library
const boom = require('@hapi/boom');

class UsersService {

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: '5765b9119834c0b14193f792ce86d0ff',
        role: 'player',
        avatar: 'https://ui-avatars.com/api/?name=capture+flag'
      });
    }
  }

  async create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      // express operator
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find(){
    return this.users;
  }

  async findOne(idUser){
    const user = this.users.find(user => user.id === idUser);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(idUser, changes){
    const index = this.users.findIndex(user => user.id === idUser);
    if(index === -1){
      throw boom.notFound('user not found');
    }
    const userCurrent =  this.users[index];
    this.users[index] = {
      ...userCurrent,
      ...changes
    };
    return this.users[index];
  }

  async delete(idUser){
    const index = this.users.findIndex(user => user.id === idUser);
    if(index === -1){
      throw boom.notFound('user not found');
    }
    this.users.splice(index, 1);
    return {
      idUser
    }
  }
}

module.exports = UsersService;

