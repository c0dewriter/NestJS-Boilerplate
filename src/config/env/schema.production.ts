import Joi from "joi";

export default Joi.object({
  NODE_ENV: Joi.string().valid("production"),
});
