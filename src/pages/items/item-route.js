import expressRouter from 'express-promise-router'
import Item from './item-model'

import * as itemController from './item-controller'

import { schema } from './item-helper'
import { validateBody, validateParam } from '../../common/route-helper'

const router = expressRouter({ mergeParams: true })

router
  .route('/')
  .get(itemController.index)
  .post(validateBody(schema.default), itemController.create)

router
  .route('/:itemId')
  .get(validateParam(schema.id, [Item], 'itemId'), itemController.get)
  .delete(validateParam(schema.id, [Item], 'itemId'), itemController.remove)

export default router
