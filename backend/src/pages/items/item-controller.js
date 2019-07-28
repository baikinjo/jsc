/**
 * ./backend/src/pages/items/item-controller
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import _ from 'lodash'
import { JSDOM } from 'jsdom'

/* Models ======================================================================================== */
import Item from './item-model'

/* Constants ===================================================================================== */
const DEPARTMENT_ID = 'wayfinding-breadcrumbs_feature_div'
const AMAZON_BEST_SELLERS_RANK = 'Amazon Best Sellers Rank'
const BEST_SELLERS_RANK = 'Best Sellers Rank'
const PRODUCT_DIMENSIONS = 'Product Dimensions'
const LIST_TAG = 'li'
const SALES_ID = 'SalesRank'

/* Controller ==================================================================================== */

/**
 * Get all items
 */
export const index = async (req, res, next) => {
  const items = await Item.find().sort({ createdAt: -1 })

  res.status(200).json({ items })
}

/**
 * Create an item using JSDOM to fetch base url information
 */
export const create = async (req, res, next) => {
  const asin = req.value.body.asin
  const exists = await Item.find({ asin })
  const baseURL = `https://www.amazon.com/dp/${asin}`

  // Store temp found parsed values
  let temp = {}

  // Store all fetched information into parsed
  let parsed = {}

  // Check for duplicate ASIN value and return 403 if it exists
  if (exists.length > 0) {
    return res.status(403).json({
      success: false,
      message: `Item with '${req.value.body.asin}' already exists`
    })
  }

  /**
   * Using JSDOM fromURL() to fetch the information, if the baseURL isn't valid return 404
   * There were 4 different use-cases of displaying product information - rank, and product dimension:
   * a. Product Dimension & Rank in table element with id SalesRank
   * b. Product Dimension & Rank in list element with id SalesRank
   * c. Product Dimension & Rank in table element using either th or td tag
   * d. Missing Product Dimension - ex. e-books or Rank with using list element
   * For each cases with be handled differently by looping through either table elements list or list elements list
   * Product dimension is constant on most of the products
   * For rank information there were two cases: 'Amazon Best Sellers Rank' and 'Best Sellers Rank'
   * While looping through it will check both values to see if the value exsists
   * All functions are listed very bottom of the page
   * */
  await JSDOM.fromURL(baseURL)
    .then(dom => {
      // Get the parent element of department breadcrumb of the dom using department id
      const department = dom.window.document.getElementById(DEPARTMENT_ID)

      // Assign the text content of the first child element of the department id element
      const category = department.childNodes[1].childNodes[1].textContent.trim()

      // List of table tag elements to match condition a, c described above
      const tableElements = dom.window.document.getElementsByTagName('*')

      // List of list tag elements to match condition b, d described above
      const listElements = dom.window.document.getElementsByTagName(LIST_TAG)

      // Check if the product information uses unique SalesRank id, it will return null if none
      let salesRank = dom.window.document.getElementById(SALES_ID)

      /**
       * To match condition a - has a SalesRank id within the table element
       */
      if (salesRank && salesRank.parentElement.tagName == 'TBODY') {
        // check if values are found and store them into temp
        temp = tableElementsSearch(tableElements, temp)

        // Generate information accordingly and store them into parsed
        parsed = tableElementsInfo(temp, parsed)

        /**
         * To match condition b - has a SalesRank id within the unordered or ordered list element
         */
      } else if (salesRank) {
        // To check if the product had dimension - as mentioned some product doesn't have physical dimension
        temp = listElementsSearch(listElements, salesRank, temp)
        parsed = listElementsInfo(temp, parsed)

        /**
         * To match condition c & d - doesn't have Sales Rank id or if the product doesn't have any rank information
         * First to deteremine if the product uses table elements then if value found - go through table case a method
         * If no value was found on table element search, then try the list element search and go through list case b method
         */
      } else {
        temp = tableElementsSearch(tableElements, temp)

        // Check if any values found - then proceeds to table elements info generate otherwise go to list element info generate
        if (
          typeof temp.foundDimension !== undefined ||
          typeof temp.foundRank !== undefined
        ) {
          parsed = tableElementsInfo(temp, parsed)
        } else {
          temp = listElementsSearch(listElements, temp)
          parsed = listElementsInfo(parsed)
        }
      }

      // Return all stored parsed value as well as category, and baseURL
      return (parsed = {
        ...parsed,
        category,
        baseURL
      })
    })
    .catch(err => {
      console.log(err)
    })
  console.log(parsed)

  // If the size of parsed is zero, meaning JSDOM cound't get the product information so return 404 product not found
  if (_.size(parsed) <= 0) {
    return res.status(404).json({
      success: false,
      message: 'Page Not Found'
    })
  }

  //store ASIN number as well as parsed values
  const newBody = {
    ...req.value.body,
    ...parsed
  }

  const newItem = new Item(newBody)
  await newItem.save()

  res.status(201).json({
    success: true,
    message: 'New Item Created'
  })
}

/**
 * Get a single item
 */
export const get = async (req, res, next) => {
  const { itemId } = req.value.params
  const foundItem = await Item.findById(itemId)

  res.status(200).json(foundItem)
}

/**
 * Remove a single item
 */
export const remove = async (req, res, next) => {
  const { itemId } = req.value.params

  await itemId.remove(res)

  res.status(200).json({
    success: true,
    message: 'Item Deleted'
  })
}

/**
 * For condition a, c searching function where it seeds the tableElement lists to find the information
 * Returns found values into temp
 * @param {*} tableElements
 */
function tableElementsSearch(tableElements, temp = {}) {
  let foundDimension, foundRank
  // Loop through the table elements list to find product dimension and rank
  for (let i = 0; i < tableElements.length; i++) {
    // If found td or th with product dimension, skip to the next if block to find rank
    if (tableElements[i].textContent.trim() == PRODUCT_DIMENSIONS) {
      foundDimension = tableElements[i]
      continue
    }

    // If found td or th with rank, stop the search
    if (
      tableElements[i].textContent.trim() == AMAZON_BEST_SELLERS_RANK ||
      tableElements[i].textContent.trim() == BEST_SELLERS_RANK
    ) {
      foundRank = tableElements[i]
      break
    }
  }

  // store them into temp
  return (temp = {
    foundDimension,
    foundRank
  })
}

/**
 * Generate information function for table elements
 * Returns generated values to parsed
 * @param {*} temp
 */
function tableElementsInfo(temp, parsed = {}) {
  let dimension, rank
  // Since it is a table elemnt go to next sibling elements text context to find the dimension
  dimension = temp.foundDimension.nextElementSibling.textContent.trim()

  /**
   * Same approach as dimension but most of the rank description showed: # in category (See category)
   * Only needed the rank in certain category, so split every words starts with '(' and return
   */
  rank = temp.foundRank.nextElementSibling.textContent.trim().split(' (')[0]

  // store them into parsed
  return (parsed = {
    dimension,
    rank
  })
}

/**
 * For condition b, d searching listElements list to find the information
 * In this case we do not look for sales rank specifically, it only looks for dimension
 * Return found values temp
 * @param {*} listElements
 * @param {*} salesRank
 */
function listElementsSearch(listElements, salesRank, temp = {}) {
  let foundDimension

  // Loop through the list elements to find product dimension and rank
  for (let i = 0; i < listElements.length; i++) {
    /**
     * Since required info is stored in one li tag, find value that includes 'product dimension'
     * if found value, stop search
     */
    if (listElements[i].textContent.trim().includes(PRODUCT_DIMENSIONS)) {
      foundDimension = listElements[i]
      break
    }
  }

  return (temp = {
    foundDimension,
    salesRank
  })
}
/**
 * Generate information function for list elements
 * Return generated values to store
 * @param {*} temp
 */
function listElementsInfo(temp, parsed = {}) {
  let dimension, rank
  if (temp.foundDimension) {
    /**
     * Unlike table element, info has format of 'Product Dimensions: # x # x # inches' format
     * Replace all unused spaces then split pop anywords before ':' then split anywords behind ';'
     */
    dimension = temp.foundDimension.textContent
      .trim()
      .replace(/\s/g, '')
      .split(':')
      .pop()
      .split(' ;')[0]
  }

  // To double check the li tag using Sales Rank id
  if (temp.salesRank) {
    // Same approch as dimension cut any words before 'Rank:' and split words after '(' and return
    rank = temp.salesRank.textContent
      .trim()
      .split('Rank: ')
      .pop()
      .split(' (')[0]
  }

  // stored them into parsed
  return (parsed = {
    dimension,
    rank
  })
}
