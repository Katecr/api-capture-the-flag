const faker = require('@faker-js/faker');

class UserService {

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

  create(){

  }

  find(){
    return this.users;
  }

  findOne(idUser){
    return this.users.find(user => user.id === idUser);
  }

  update(){

  }

  delete(){

  }
}

module.export = UserService;
