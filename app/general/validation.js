const Joi = require('joi');
const response = require('../../utils/response');

const form = {
  body: Joi.object({
    phoneNumber: Joi.string().required(),
    email: Joi.string().required(),
    operationalHours: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

const file = async (req, res, next) => {
  const { media } = req.files || {};
  if (!media) return response.resBadRequest(res, 'please upload media file');
  if (Array.isArray(media)) return response.resBadRequest(res, 'can not upload multiple logo');
  if (media.size > 500000) return response.resBadRequest(res, 'max size for logo is 500KB');
  return next();
};

module.exports = { form, file };
