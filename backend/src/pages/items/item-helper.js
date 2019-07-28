/**
 * ./backend/src/pages/items/item-helper
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import Joi from '@hapi/joi'

/* Schema ======================================================================================== */
export const schema = {
  default: Joi.object().keys({
    baseURL: Joi.string(),
    category: Joi.string(),
    rank: Joi.string(),
    dimension: Joi.string(),
    asin: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  }),
  id: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
}
