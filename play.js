// const request = require('request-promise')
// const cheerio = require('cheerio')

// const url = 'https://www.amazon.co.uk/dp/B002QYW8LW?th=1'
// const query =
//   '#prodDetails > div > div.column.col2 > div:nth-child(1) > div.content.pdClearfix > div > div > table > tbody > tr:nth-child(1) > td.value'
// request(url, function(error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html)
//     console.log($(query).text())
//   }
// })
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const DEPARTMENT_ID = 'wayfinding-breadcrumbs_feature_div'
const AMAZON_BEST_SELLERS_RANK = 'Amazon Best Sellers Rank'
const BEST_SELLERS_RANK = 'Best Sellers Rank'
const PRODUCT_DIMENSIONS = 'Product Dimensions'
const LIST_CLASS = 'li'
const SALES_ID = 'SalesRank'
const ASIN = 'B07L4PL653'
const URL = `https://www.amazon.com/dp/${ASIN}`

JSDOM.fromURL(URL).then(dom => {
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
    }
  }

  const parsed = {
    category,
    dimension,
    rank,
    baseURL: URL
  }
  console.log(parsed)
})
