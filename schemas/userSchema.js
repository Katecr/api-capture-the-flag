// export library to validate data
const Joi = require('joi');

// Create variables for each field with their data types
const id = Joi.string().uuid();
const name = Joi.string().min(3);
const lastname = Joi.string().min(3);
const email= Joi.string().email();
const password= Joi.string();
const role = Joi.string().min(4).max(5);
const avatar = Joi.string().uri();

// Scheme to create users
const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required()
});

// Scheme to update users
const updateUserSchema = Joi.object({
  name: name,
  lastname: lastname,
  email: email,
  password: password,
  role:role,
  avatar: avatar
});

// Scheme to validate in the get to be an id
const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }



