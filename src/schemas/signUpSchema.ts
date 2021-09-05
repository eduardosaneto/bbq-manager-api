import joi from "joi";

export default joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});
