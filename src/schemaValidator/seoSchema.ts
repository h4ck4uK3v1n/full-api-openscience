import Joi from 'joi';

export const seoSchema = Joi.object({
    meta_title: Joi.string().required(),
    og_title: Joi.string().required(),
    og_url: Joi.string().uri().required(),
    meta_description: Joi.string().required(),
    og_type: Joi.string().required(),
    og_image: Joi.string().optional(),
    og_image_height: Joi.number().optional().when('og_image', { is: Joi.exist(), then: Joi.required() }),
    og_image_width: Joi.number().optional().when('og_image', { is: Joi.exist(), then: Joi.required() })
});
