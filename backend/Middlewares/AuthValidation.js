const Joi = require("joi");
const jwt = require("jsonwebtoken");

const commonFields = {
  contact: Joi.number().min(6000000000).required(9999999999),
  password: Joi.string().min(4).max(10).required(),
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(403).json({ message: "Access denied. Token missing." });
  }

  const token = authHeader.split(" ")[1]; 
  console.log(token);// Extract the token
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = decoded; // Attach decoded data to the request object
      next();
  } catch (error) {
      res.status(401).json({ message: "Invalid or expired token." });
  }
};

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]+$/).required().messages({
      "string.pattern.base": "Full name must contain only alphabets and spaces.",
    }),
    password: commonFields.password,
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords do not match." }),
    contact: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": "Contact must be a valid 10-digit mobile number starting with 6-9.",
      }),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    locality: Joi.string().required(),
    district: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().integer().min(100000).max(999999).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ message: "Validation error", error: message });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    contact: commonFields.contact,
    password: commonFields.password,
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ message: "Validation error", error: message });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,verifyToken
};
