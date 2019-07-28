/**
 * ./backend/src/routes/index
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import itemRoute from '../pages/items/item-route'

export default app => {
  app.use('/api/items', itemRoute)
}
