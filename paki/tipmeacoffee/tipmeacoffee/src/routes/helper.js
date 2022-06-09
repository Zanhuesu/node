const breej = require('breej')
const axios = require('axios')
const moment = require('moment');
const mcache = require('memory-cache');

const api = 'https://api.breezescan.io'; breej.init({ api: 'https://api.breezescan.io', bwGrowth: 36000000000, vpGrowth: 120000000000 })
const categories = ['News','Cryptocurrency','Food','Sports','Technology','LifeStyle','Health','Gaming','Business','General'];

const getTags = async (maxTags) => { if(!maxTags) maxTags = 6; let timeNow = new Date().getTime(); let postsTime = timeNow - 86400000; let tagsAPI = await axios.get(api+`/trending?after=${postsTime}&limit=100`); let posts = tagsAPI.data; let tags = {};
  for (let p in posts) if (posts[p].json && posts[p].json.tags) { let postTags = posts[p].json.tags;for (let t in postTags) if (!tags[postTags[t]]) { tags[postTags[t]] = 1 } else { tags[postTags[t]] += 1 }}; let tagArr = [];
  for (let t in tags) tagArr.push({ m: t, v: tags[t] }); tagsArr = tagArr.sort((a, b) => b.v - a.v); tagsArr = tagsArr.slice(0, maxTags); return tagsArr
}

var cache = (duration) => {
  return (req, res, next) => { let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) { res.send(cachedBody)
      return
    } else { res.sendResponse = res.send
      res.send = (body) => { mcache.put(key, body, duration * 1000); res.sendResponse(body)}
      next()
    }
  }
}
var sites = ["wikipedia.org","facebook.com","tiktok.com", "pinterest.com","twitter.com","bloomberg.com","pornhub.com","imgur.com","amazon.com","imgbb.com","freepik.com"];

const thousandSeperator = (num) => { let num_parts = num.toString().split("."); num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); return num_parts.join(".") }
function aUser(user) { return '<a href="/profile/' + user + '">@' + user + '</a>'}
function aContent(content) {return '<a href="/post/' + content + '">@' + content + '</a>'}

function data_process(tx) {
  let result = aUser(tx.sender)
  switch (tx.type) {
    case 0:
      return result + ' created new account ' + aUser(tx.data.name)
    case 1:
      return result + ' approved witness ' + aUser(tx.data.target)
    case 2:
      return result + ' disapproved witness ' + aUser(tx.data.target)
    case 3:
      result = result + ' transferred ' + tx.data.amount / 1000000 + ' TOK to ' + aUser(tx.data.receiver)
      if (tx.data.memo)
          result += ', memo: ' + tx.data.memo
      return result
    case 4:
      return result + ' shared new post ' + aContent(tx.sender + '/' + tx.data.link)
    case 5:
      return result + ' upvoted ' + aContent(tx.data.author + '/' + tx.data.link)
    case 6:
      return result + ' update profile'
    case 7:
      return result + ' followed ' + aUser(tx.data.target)
    case 8:
        return result + ' unfollowed ' + aUser(tx.data.target)
    case 10:
        return result + ' created a custom key with id ' + tx.data.id
    case 11:
        return result + ' removed a custom key with id ' + tx.data.id
    case 12:
        return result + ' changed the master key'
    case 13:
        return result + ' boost the link ' + aContent(tx.sender + '/' + tx.data.link) + ' by burning ' + (tx.data.burn / 1000000) + ' TOK '
    case 14:
        return result + ' transferred ' + tx.data.amount + ' VP to ' + aUser(tx.data.receiver)
    case 15:
        return result + ' transferred ' + tx.data.amount + ' bytes to ' + aUser(tx.data.receiver)
    case 16:
        return result + ' set a limit on account voting power to ' + tx.data.amount + ' VP'
    case 18:
        return result + ' updated witness key for block production'
    case 20:
        return result + ' created a custom key with id ' + tx.data.id + ' and weight ' + tx.data.weight
    case 21:
        return result + ' set signature thresholds'
    case 22:
        return result + ' set master key weight to ' + tx.data.weight
    case 23:
        return result + ' initiated withdrawal'
    case 24:
      return result + ' withdrawal status updated'
    case 25:
      return result + ' tokens deposit initiated'
    case 26:
      return result + ' subscribed to category'
    case 27:
      return result + ' unsubscribed to category'
    case 28:
      return result + ' checked notifications'
    default:
      return 'Unknown transaction type ' + tx.type
  }
}

module.exports = {api, getTags, categories, cache, sites, data_process}