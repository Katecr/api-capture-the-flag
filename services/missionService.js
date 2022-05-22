//library to enter false data
const faker = require('@faker-js/faker');

//error capturing library
const boom = require('@hapi/boom');

class MissionsService{

  constructor(){
    this.missions = [];
    this.generate();
  }

  generate(){
    const listSkills = ['ANALISTA', 'ASEGURADOR','CAZADOR','COORDINADOR', 'INVESTIGADOR', 'MONITOREADOR'] ;
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.missions.push({
          id: faker.datatype.uuid(),
          title: faker.lorem.sentence(3),
          description:faker.lorem.paragraph(),
          points:faker.datatype.number({ min: 1, max: 300}),
          skills:listSkills[faker.datatype.number({ min: 0, max: 5})],
          role: faker.lorem.sentence(2) ,
          time: faker.datatype.number({ min: 60, max: 120}),
          flag: faker.datatype.uuid() ,
          category: listSkills[faker.datatype.number({ min: 0, max: 5})],
          visualization:faker.datatype.boolean(),
          competence:faker.datatype.boolean(),
          isAvailable: faker.datatype.boolean(),
        });
    }
  }

  async create(data){
    const newMission = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.missions.push(newMission);
    return newMission;
  }

  async find(){
    return this.missions;
  }

  async findOne(idMission){
    const mission = this.missions.find(mission => mission.id === idMission);
    if(!mission){
      throw boom.notFound('mission not found');
    }
    if(mission.isAvailable){
      throw boom.conflict('mission not available');
    }
    return mission;
  }

  async update(idMission, changes){
    const index = this.missions.findIndex(mission => mission.id === idMission);
    if(index === -1){
      throw boom.notFound('mission not found');
    }
    const missionCurrent =  this.missions[index];
    this.missions[index] = {
      ...missionCurrent,
      ...changes
    };
    return this.missions[index];
  }

  async delete(idMission){
    const index = this.missions.findIndex(mission => mission.id === idMission);
    if(index === -1){
      throw boom.notFound('mission not found');
    }
    this.missions.splice(index, 1);
    return {
      idMission
    };
  }
}

module.exports = MissionsService;
