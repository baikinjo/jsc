/**
 * ./backend/src/pages/items/item-route
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import expressRouter from 'express-promise-router'

/* Models ======================================================================================== */
import Item from './item-model'

/* Controllers =================================================================================== */
import * as itemController from './item-controller'

/* Helpers ======================================================================================= */
import { schema } from './item-helper'
import { validateBody, validateParam } from '../../common/route-helper'

/* Routes ======================================================================================== */
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
