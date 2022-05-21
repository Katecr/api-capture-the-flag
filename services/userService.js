const faker = require('@faker-js/faker');

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
        password: null,
        role: 'user',
        avatar: faker.image.avatar()
      });
    }
  }

  create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      // express operator
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find(){
    return this.users;
  }

  findOne(idUser){
    return this.users.find(user => user.id === idUser);
  }

  update(idUser, changes){
    const index = this.users.findIndex(user => user.id === idUser);
    if(index === -1){
      throw new Error('user not found');
    }
    const userCurrent =  this.users[index];
    this.users[index] = {
      ...userCurrent,
      ...changes
    };
    return this.users[index];
  }

  delete(idUser){
    const index = this.users.findIndex(user => user.id === idUser);
    if(index === -1){
      throw new Error('user not found');
    }
    this.users.splice(index, 1);
    return {
      idUser
    }
  }
}

module.exports = UsersService;

