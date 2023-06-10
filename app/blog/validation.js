const Joi = require('joi');
const response = require('../../utils/response');

const form = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isActive: Joi.bool().required(),
    category: Joi.string().required(),
    deletedImage: Joi.string().default([]),
  }),
};

const file = async (req, res, next) => {
  const { media } = req.files || {};
  if (!media) { return response.resBadRequest(res, 'please upload media file'); }
  if (!media.length) { return response.resBadRequest(res, 'please upload media file'); }
  const checkMedia = Array.isArray(media) ? media : [media];
  if (checkMedia.some((x) => x.size > 1000000)) return response.resBadRequest(res, 'media file size exceed, maximum is 1MB');
  return next();
};

module.exports = { form, file };
