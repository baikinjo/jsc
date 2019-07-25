import itemRoute from '../pages/items/item-route'

export default app => {
  app.use('/items', itemRoute)
}
