import itemRoute from '../components/items/item-route'

export default app => {
  app.use('/api/items', itemRoute)
}
