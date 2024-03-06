const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../utils");

// const emailRegexp = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      // match: [emailRegexp, "Email is invalid"],
      unique: true,
    },

    password: {
      type: String,
      minLenght: [6, "Passwords must be at least 6 characters long."],
      required: [true, "Password is required"],
    },

    firstName: {
      type: String,
      minLenght: [2, "First Name must be at least 2 characters long."],
    },

    token: {
      type: String,
      default: null,
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const sigUpInSchema = Joi.object({
  email: Joi.string()
    // .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(2).required(),
});

const logInShema = Joi.object({
  email: Joi.string()
    // .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  register: sigUpInSchema,
  logIn: logInShema,
};

const User = model("users", userSchema);

module.exports = { User, schemas };
