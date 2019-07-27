import { JSDOM } from 'jsdom'

import Item from './item-model'

export const index = async (req, res, next) => {
  const items = await Item.find().sort({ createdAt: -1 })

  res.status(200).json({ items })
}

export const create = async (req, res, next) => {
  const asin = req.value.body.asin
  const exists = await Item.find({ asin })
  const DEPARTMENT_ID = 'wayfinding-breadcrumbs_feature_div'
  const AMAZON_BEST_SELLERS_RANK = 'Amazon Best Sellers Rank'
  const BEST_SELLERS_RANK = 'Best Sellers Rank'
  const PRODUCT_DIMENSIONS = 'Product Dimensions'
  const LIST_CLASS = 'a-text-bold'
  const SALES_ID = 'SalesRank'
  const URL = `https://www.amazon.com/dp/${asin}`

  if (exists.length > 0) {
    return res.status(403).json({
      success: false,
      message: `Item with '${req.value.body.asin}' already exists`
    })
  }
  let parsed = {}
  await JSDOM.fromURL(URL).then(dom => {
    const department = dom.window.document.getElementById(DEPARTMENT_ID)
    const category = department.childNodes[1].childNodes[1].textContent.trim()

    let salesRank = dom.window.document.getElementById(SALES_ID)

    let foundDimension, foundRank, dimension, rank

    if (salesRank && salesRank.parentElement.tagName == 'TBODY') {
      const tableElements = dom.window.document.getElementsByTagName('*')

      for (let i = 0; i < tableElements.length; i++) {
        if (tableElements[i].textContent.trim() === PRODUCT_DIMENSIONS) {
          foundDimension = tableElements[i]
          continue
        }
        if (
          tableElements[i].textContent.trim() === AMAZON_BEST_SELLERS_RANK ||
          tableElements[i].textContent.trim() === BEST_SELLERS_RANK
        ) {
          foundRank = tableElements[i]
          break
        }
      }

      dimension = foundDimension.nextElementSibling.textContent.trim()
      rank = foundRank.nextElementSibling.textContent.trim().split(' (')[0]
    } else if (salesRank) {
      const listElements = dom.window.document.getElementsByTagName(LIST_CLASS)

      for (let i = 0; i < listElements.length; i++) {
        if (listElements[i].textContent.trim().includes(PRODUCT_DIMENSIONS)) {
          foundDimension = listElements[i]
          break
        }
      }
      if (foundDimension) {
        dimension = foundDimension.textContent
          .trim()
          .replace(/\s/g, '')
          .split(':')
          .pop()
          .split(' ;')[0]
      }
      if (salesRank) {
        rank = salesRank.textContent
          .trim()
          .split('Rank: ')
          .pop()
          .split(' (')[0]
      }
    } else {
      const tableElements = dom.window.document.getElementsByTagName('*')

      for (let i = 0; i < tableElements.length; i++) {
        if (tableElements[i].textContent.trim() === PRODUCT_DIMENSIONS) {
          foundDimension = tableElements[i]
          continue
        }
        if (
          tableElements[i].textContent.trim() === AMAZON_BEST_SELLERS_RANK ||
          tableElements[i].textContent.trim() === BEST_SELLERS_RANK
        ) {
          foundRank = tableElements[i]
          break
        }
      }
      if (foundDimension || foundRank) {
        dimension = foundDimension.nextElementSibling.textContent.trim()
        rank = foundRank.nextElementSibling.textContent.trim().split(' (')[0]
      } else {
        const listElements = dom.window.document.getElementsByTagName(
          LIST_CLASS
        )

        for (let i = 0; i < listElements.length; i++) {
          if (listElements[i].textContent.trim().includes(PRODUCT_DIMENSIONS)) {
            foundDimension = listElements[i]
            break
          }
        }
        if (foundDimension) {
          dimension = foundDimension.textContent
            .trim()
            .replace(/\s/g, '')
            .split(':')
            .pop()
            .split(' ;')[0]
        }
        if (salesRank) {
          rank = salesRank.textContent
            .trim()
            .split('Rank: ')
            .pop()
            .split(' (')[0]
        }
      }
    }

    return (parsed = {
      category,
      dimension,
      rank,
      baseURL: URL
    })
  })
  const newBody = {
    ...req.value.body,
    ...parsed
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
