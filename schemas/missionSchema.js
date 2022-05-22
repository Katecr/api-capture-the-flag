// export library to validate data
const Joi = require('joi');

// Create variables for each field with their data types
const id = Joi.string().uuid();
const title = Joi.string().min(3);
const description = Joi.string().min(3);
const points= Joi.number().integer().min(1).max(300);
const skills= Joi.string().min(6).max(13);
const role = Joi.string();
const time = Joi.number().integer().min(60).max(120);
const flag = Joi.string().uuid();
const category = Joi.string().min(6).max(13);
const visualization = Joi.boolean();
const competence = Joi.boolean();
const isAvailable = Joi.boolean();

// Scheme to create missions
const createMissionsSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  points: points.required(),
  skills: skills.required(),
  role: role.required(),
  time: time.required(),
  flag: flag.required(),
  category: category.required(),
  visualization: visualization.required(),
  competence: competence.required()
});

// Scheme to update missions
const updateMissionsSchema = Joi.object({
  title: title,
  description: description,
  points: points,
  skills: skills,
  role: role,
  time: time,
  flag: flag,
  category: category,
  visualization: visualization,
  competence: competence,
  isAvailable: isAvailable
});

// Scheme to validate in the get to be an id
const getMissionSchema = Joi.object({
  id: id.required(),
});

module.exports = { createMissionsSchema, updateMissionsSchema, getMissionSchema }
