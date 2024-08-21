import Joi from 'joi';


export const getProductsByQuery = {
    query: Joi.object().keys({
        status: Joi.string().valid("active","inactive"),
        title: Joi.string().optional(),
        sortKey: Joi.string().valid('createdAt','title','price').optional(),
        sortValue: Joi.string().valid('asc','desc').optional(),
        page: Joi.number().integer().min(1).optional(),
        limit: Joi.number().integer().min(1).max(100).optional()
    })
 }