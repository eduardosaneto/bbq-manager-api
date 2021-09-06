import joi from "joi";

const signInSchema = joi.object({
  name: joi.string().required(),
  date: joi.date().min("now"),
  description: joi.string().min(6),
  observations: joi.string().min(6),
  amountCollected: joi.number().integer(),
  totalParticipants: joi.number().integer(),
  userId: joi.number().integer(),
});

export default signInSchema;
