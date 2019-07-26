import Joi from '@hapi/joi'
import _ from 'lodash'

/**
 * Validate post body
 */
export const validateBody = schema => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema)

    if (result.error) {
      return res.status(400).json(result.error)
    }

    if (!req.value) {
      req.value = {}
    }
    req.value['body'] = result.value
    next()
  }
}

/**
 * Validate paramteters
 * @param {*} schema format to match using Joi
 * @param {*} models array of corresponding models for each paramater in order
 * @param {*} names a string with name of params separated by a space in order
 */
export const validateParam = (schema, models, names) => {
  return async (req, res, next) => {
    const result = names.split(' ')

    result.forEach(function(name) {
      const result = Joi.validate({ param: req.params[name] }, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      }

      if (!req.value) {
        req.value = {}
      }
      if (!req.value.params) {
        req.value.params = {}
      }

      req.value.params[name] = result.value.param
    })

    if (req.value) {
      const params = _.values(req.value.params)

      for (let i = 0; i < params.length; ++i) {
        const obj = await models[i].findById(params[i])
        req.value.params[result[i]] = obj

        if (!obj) {
          return res
            .status(404)
            .json({ success: false, message: `invalid ${result[i]}` })
        }
      }
    }

    next()
  }
}
