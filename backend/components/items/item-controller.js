import DomParser from 'dom-parser'
import Item from './item-model'

const parser = new DomParser()

export const index = async (req, res, next) => {
  const items = await Item.find().sort({ createdAt: -1 })

  res.status(200).json({ items })
}

export const create = async (req, res, next) => {
  const exists = await Item.find({ asin: req.value.body.asin })

  if (exists.length > 0) {
    return res.status(403).json({
      success: false,
      message: `Item with '${req.value.body.asin}' already exists`
    })
  }
  const newBody = {
    ...req.value.body,
    name: 'injo',
    dimension: '20x20',
    rank: 3
  }
  const newItem = new Item(newBody)
  await newItem.save()

  res
    .status(201)
    .json({
      success: true,
      message: 'New Item Created'
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: `${err}`
      })
    )
}

export const get = async (req, res, next) => {
  const { itemId } = req.value.params
  const foundItem = await Item.findById(itemId)

  res
    .status(200)
    .json(foundItem)
    .catch(err =>
      res.status(404).json({
        success: false,
        message: `${err}`
      })
    )
}

export const remove = async (req, res, next) => {
  const { itemId } = req.value.params

  await itemId.remove(res)

  res
    .status(200)
    .json({
      success: true,
      message: 'Item Deleted'
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: `${err}`
      })
    )
}
