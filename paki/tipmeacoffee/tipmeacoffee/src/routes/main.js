const express = require('express')
const cors = require('cors')
const path = require('path')
const breej = require('breej')
const CryptoJS = require("crypto-js")
const axios = require('axios')
const moment = require('moment')
const pathParse = require("path-parse")
const isUrl = require("is-url")
const isImageURL = require('image-url-validator').default;
const { getBaseUrl } = require("get-base-url")
const { limit, substr } = require('stringz')
var msgkey = process.env.msgKey; var iv = process.env.breezval;
const router = express.Router()
const helper = require('./helper')
const api_url = helper.api
const fetchTags = helper.getTags
const category = helper.categories

const getAccountPub = (username) => { return new Promise((res, rej) => { breej.getAccount(username, function (error, account) { if(error) rej(error); if(!account) rej(); if(account.pub) res(account.pub);}) })}
const validateToken = async(username, token) => {if(!username || !token) return false; try { var decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); return breej.privToPub(decrypted.toString(CryptoJS.enc.Utf8)) === await getAccountPub(username); }catch(err){return false;} }
const nkey = async(token) => {try{let decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); let uKey = decrypted.toString(CryptoJS.enc.Utf8);return uKey;}catch(err){return false;} }

router.get('', async (req, res) => { res.locals.title='Tip Me A Coffee - Social Media on Blockchain'; res.locals.description='TipMeACoffee - A social media platform built on blockchain where you share to earn TMAC tokens. Share what you like - Earn if community likes it.';
  let index = req.query.index | 0; let postsAPI = await axios.get(api_url+`/new/${index}`); let nTags = await fetchTags(); let promotedAPI = await axios.get(api_url+`/promoted`); let promotedData = []; let finalData = postsAPI.data; 
  if (promotedAPI.data.length > 0) promotedData = promotedAPI.data.slice(0, 3).map(x => ({ ...x, __promoted: true }));
  if (promotedData.length > 0) finalData.splice(1, 0, promotedData[0]); 
  if (promotedData.length > 1) finalData.splice(5, 0, promotedData[1]); 
  if (promotedData.length > 2) finalData.splice(10, 0, promotedData[2]);
  let _finalData = await Promise.all( finalData.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); let ago = moment.utc(post.ts).fromNow(); return { ...post, user: userAPI.data.json, ago: ago } }) );
  let nPosts=await axios.get(api_url+`/new/${index}`);let iPosts=nPosts.data; let sPosts = await Promise.all( iPosts.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); let ago = moment.utc(post.ts).fromNow(); return { ...post, user: userAPI.data.json, ago: ago } }) );
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let actAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); 
    if(index == 0){ res.render('index', { articles: _finalData, moment: moment, trendingTags: nTags, loguser: loguser, acct: actAPI.data, category: category, notices: noticeAPI.data.count }) } else {res.send({articles: sPosts, moment: moment, trendingTags: nTags, loguser: loguser, acct: actAPI.data, category: category, notices:noticeAPI.data.count}); }
  } else { loguser = ""; if(index == 0) {res.render('index', { articles: _finalData, moment: moment, trendingTags: nTags, loguser: loguser, category: category, notices:'0' }) } else{ res.send({articles: sPosts, moment: moment, trendingTags: nTags, loguser: loguser, category: category, notices:'0'});}
  }
})

router.get('/profile/:name', async (req, res) => { 
  breej.getAccount(req.params.name, async function (error, account) {if(account.error){res.redirect('/404');}else{
    let name = req.params.name; let userAPI = await axios.get(api_url+`/account/${name}`); 
    res.locals.baseUrl=getBaseUrl; let nTags = await fetchTags(); let act = userAPI.data; let vp = breej.votingPower(act); let bw = breej.bandwidth(act); let blogAPI = await axios.get(api_url+`/blog/${name}`); let likesAPI = await axios.get(api_url+`/votes/${name}`); 
    if (blogAPI.data.length > 0) _finalData = await Promise.all(blogAPI.data.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); return { ...post, user: userAPI.data.json || false } }));else _finalData = blogAPI.data
    if (likesAPI.data.length > 0) _finalDataL = await Promise.all(likesAPI.data.map(async (post) => { let userLAPI = await axios.get(api_url+`/account/${post.author}`); return { ...post, user: userLAPI.data.json || false } }));else _finalDataL = likesAPI.data
    res.locals.title= name.charAt(0).toUpperCase() + name.slice(1) +' Profile - TipMeACoffee';
    if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let actAPI = await axios.get(api_url+`/account/${loguser}`);let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); res.render('profile', { user: userAPI.data, articles: _finalData, likes: _finalDataL, moment: moment, bw: bw, vp: vp, loguser: loguser, profName: name, trendingTags: nTags, acct: actAPI.data, category: category, notices: noticeAPI.data.count}) } else { loguser = ""; res.render('profile', { user: userAPI.data, articles: _finalData, likes: _finalDataL, moment: moment, bw: bw, vp: vp, loguser: loguser, profName: name, trendingTags: nTags, category: category}) }
    }})
})

router.get('/tags/:tag', async (req, res) => {
  let tag = req.params.tag;res.locals.title = "#"+ tag+" Updates. Latest "+ tag +" news shared on Tip";res.locals.description = "Looking for latest news and updates for #"+ tag +"? Now get all updates related to #"+ tag +" on TipMeACoffee.";let postsAPI = await axios.get(api_url+`/new?tag=${tag}`); let nTags = await fetchTags(); let _finalData = [];
  if (postsAPI.data.length > 0) _finalData = await Promise.all(postsAPI.data.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); return { ...post, user: userAPI.data.json || false } }));
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let actAPI = await axios.get(api_url+`/account/${loguser}`);let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`);  res.render('tags', { articles: _finalData, moment: moment, trendingTags: nTags, calledTag: tag, loguser: loguser, acct: actAPI.data, category: category, notices: noticeAPI.data.count }) } else { loguser = ""; res.render('tags', { articles: _finalData, moment: moment, trendingTags: nTags, calledTag: tag, loguser: loguser, category: category }) }
})

router.get('/category/:catg', async (req, res) => {
  let catg = req.params.catg; let catg_title = catg.charAt(0).toUpperCase() + catg.slice(1);res.locals.title = catg_title+ " News - Latest "+ catg +" updates shared on TipMeACoffee";res.locals.description = "Latest "+ catg +" updates shared on TipMeACoffee Get latest "+ catg +" News on TipMeACoffee. Share to earn with TipMeACoffee social media.";let postsAPI = await axios.get(api_url+`/new?category=${catg}`); let nTags = await fetchTags();
  if (postsAPI.data.length > 0) _finalData = await Promise.all(postsAPI.data.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); return { ...post, user: userAPI.data.json || false } })); else _finalData = postsAPI.data
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); res.render('category', { articles: _finalData, moment: moment, trendingTags: nTags, calledCatg: catg, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }) } else { loguser = ""; res.render('category', { articles: _finalData, moment: moment, trendingTags: nTags, calledCatg: catg, loguser: loguser, category: category }) }
})

router.get('/witnesses', async (req, res, next) => {
  res.locals.title = "Breeze Witnesses";res.locals.page = "witness";
  let nTags = await fetchTags(); let witnessAPI = await axios.get(api_url+`/rank/witnesses`); let approved = [];
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`);let act = userAPI.data; let approved = act.approves; res.render('witnesses', { witnesses: witnessAPI.data, approved: approved, trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }); } else { loguser = ""; res.render('witnesses', { witnesses: witnessAPI.data, approved: approved, trendingTags: nTags, loguser: loguser, category: category }); }
})

router.get('/wallet', async (req, res) => {res.locals.page = "wallet";
  let token = req.cookies.token; let user = req.cookies.breeze_username;
  if (token && await validateToken(req.cookies.breeze_username, token)) { let decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); let wifKey = decrypted.toString(CryptoJS.enc.Utf8); let pubKey = breej.privToPub(wifKey);let earnAPI = await axios.get(api_url+`/distributed/${user}/today`); let transferAPI = await axios.get(api_url+`/transfers/${user}`); let userAPI = await axios.get(api_url+`/account/${user}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${user}`);let nTags = await fetchTags(); res.render('wallet', { activities: transferAPI.data, acct: userAPI.data, trendingTags: nTags, loguser: user, earnToday: earnAPI, category: category,wifKey:wifKey,pubKey:pubKey, notices: noticeAPI.data.count }) } else { res.redirect('/welcome'); }
})

router.get('/share', async (req, res) => {res.locals.page = "share";let token = req.cookies.token;
  if (!token || !await validateToken(req.cookies.breeze_username, req.cookies.token)) { res.redirect('/welcome'); } else { loguser = req.cookies.breeze_username; let actAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`);let nTags = await fetchTags(); res.render('share', { loguser: loguser, trendingTags: nTags, acct: actAPI.data, category: category, notices: noticeAPI.data.count }) }
})

router.get('/rewards', async (req, res) => {
  let nTags = await fetchTags(); let votesAPI = await axios.get(api_url+`/votestoday`);
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let actAPI = await axios.get(api_url+`/account/${loguser}`);let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); res.render('rewards', { loguser: loguser, trendingTags: nTags, acct: actAPI.data, todayVotes: votesAPI.data, category: category, notices: noticeAPI.data.count }) } else { loguser = ""; res.render('rewards', { loguser: loguser, trendingTags: nTags, todayVotes: votesAPI.data, category: category }) }
})

router.get('/welcome', async (req, res) => {let token = req.cookies.token; let user = req.cookies.breeze_username;
  if (token && await validateToken(req.cookies.breeze_username, req.cookies.token)) { res.redirect('/profile/' + user); } else { let ref = ''; let nTags = await fetchTags(); let loguser = ''; res.render('welcome', { ref: ref, user: loguser, loguser: loguser, trendingTags: nTags, category: category }) }
})

router.get('/welcome/:name', async (req, res) => {let token = req.cookies.token; let user = req.cookies.breeze_username; 
  if (!token || await validateToken(req.cookies.breeze_username, req.cookies.token)) { let name = req.params.name; let nTags = await fetchTags(); let loguser = ''; res.render('welcome', { ref: name, loguser: loguser, trendingTags: nTags, category: category }) } else { res.redirect('/profile/' + user); }
})

router.get('/trending', async (req, res) => {
  let nTags = await fetchTags(); let timeNow = new Date().getTime(); let postsTime = timeNow - 86400000; let postsAPI = await axios.get(api_url+`/trending?after=${postsTime}`);
  if (postsAPI.data.length > 0) _finalData = await Promise.all(postsAPI.data.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); return { ...post, user: userAPI.data.json || false } }));
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let actAPI = await axios.get(api_url+`/account/${loguser}`);let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); res.render('trending', { articles: _finalData, moment: moment, trendingTags: nTags, loguser: loguser, acct: actAPI.data, category: category, notices:noticeAPI.data.count}) } else { loguser = ""; res.render('trending', { articles: _finalData, moment: moment, trendingTags: nTags, loguser: loguser, category: category }) }
})

router.get('/notifications', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { 
    res.locals.page = "notifications"; let user = req.cookies.breeze_username;let send_data = [];let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${user}`);let historyAPI = await axios.get(api_url+`/history/${user}/0`);let actAPI = await axios.get(api_url+`/account/${user}`); let nTags = await fetchTags(); let temps = historyAPI.data;
    temps.forEach(function (temp) { send_data.push(helper.data_process(temp)+ " " + "<a href='https://breezescan.io/#/tx/"+ temp.hash +"' target='_blank'><span class='trx_id'>" + temp.hash.substring(0,6) + "</span></a>"); });
    res.render('notifications', { activities: send_data, acct: actAPI.data, trendingTags: nTags, loguser: user, category: category, notices:noticeAPI.data.count })
  } else { res.redirect('/welcome');}
})

router.get('/lpmining', async (req, res, next) => {res.locals.page = "mining"; let nTags = await fetchTags();
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); let act = userAPI.data; res.render('lpmining', { trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }); } else { loguser = ""; res.render('lpmining', { trendingTags: nTags, loguser: loguser, category: category }); }
})

router.get('/staking', async (req, res, next) => { res.locals.title = "TipMeACoffee Staking - Earn BNB - Top DeFi Project"; res.locals.page = "staking"; let nTags = await fetchTags();
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); let act = userAPI.data; res.render('staking', { trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }); } else { loguser = ""; res.render('staking', { trendingTags: nTags, loguser: loguser, category: category }); }
})


router.get('/explore', async (req, res, next) => {res.locals.page = "explore";
  let nTags = await fetchTags();let nTagsAll = await fetchTags(10);
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`);let userAPI = await axios.get(api_url+`/account/${loguser}`); let act = userAPI.data; res.render('explore', { trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category,trendingTagsAll: nTagsAll, kind: '', notices:noticeAPI.data.count }); } else { loguser = ""; res.render('explore', { trendingTags: nTags, loguser: loguser, category: category,trendingTagsAll: nTagsAll, kind: '', notices: '0' }); }
})

router.get('/explore/:kind', async (req, res, next) => {res.locals.page = "explore"; let kind = req.params.kind; let nTagsAll = await fetchTags(10); let nTags = nTagsAll.slice(0, 6);
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {  loguser = req.cookies.breeze_username;  let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); let act = userAPI.data; 
    res.render('explore', { trendingTags: nTags, trendingTagsAll: nTagsAll, loguser: loguser, acct: userAPI.data, kind: kind, category: category, notices: noticeAPI.data.count }); 
  } else {loguser = ""; res.render('explore', {trendingTagsAll: nTagsAll, trendingTags: nTags, loguser: loguser, kind: kind,category: category, notices: '0'}); }
})

router.get('/feed', async (req, res, next) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username;
    let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); let postsAPI = await axios.get(api_url+`/categoryfeed/${loguser}`);let userAPI = await axios.get(api_url+`/account/${loguser}`); let act = userAPI.data; let nTags = await fetchTags(); let promotedAPI = await axios.get(api_url+`/promoted`); let promotedData = []; let finalData = postsAPI.data;
    if (promotedAPI.data.length > 0) promotedData = promotedAPI.data.slice(0, 3).map(x => ({ ...x, __promoted: true }));
    if (promotedData.length > 0) finalData.splice(1, 0, promotedData[0]); if (promotedData.length > 1) finalData.splice(5, 0, promotedData[1]); if (promotedData.length > 2) finalData.splice(10, 0, promotedData[2]);
    let _finalData = await Promise.all(finalData.map(async (post) => { let userAPI = await axios.get(api_url+`/account/${post.author}`); return { ...post, user: userAPI.data.json } }));
    res.render('feed', {  articles: postsAPI.data, moment: moment, trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }); 
  } else { res.redirect('/'); }
})

router.post('/upvote', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { let post = req.body; let voter = req.cookies.breeze_username;
    let newTx = { type: 5, data: { link: post.postLink, author: post.author } };let wifKey = await nkey(req.cookies.token);
    breej.getAccount(voter, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
      } else { newTx = breej.sign(wifKey, voter, newTx);
        breej.sendTransaction(newTx, async function (err, response){ 
          if (err === null) { 
            let postIncomeAPI = await axios.get(api_url+`/content/${post.author}/${post.postLink}`); 
            let postIncome = postIncomeAPI.data.dist; let likes=postIncomeAPI.data.likes;
            res.send({ error: false, income: postIncome, likes:likes }); 
          } else { res.send({ error: true, message: err['error'] }); } })
      }
    })
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }  
});

router.post('/witup', async (req, res) => {
  let post = req.body;let voter = req.cookies.breeze_username;let wifKey = await nkey(req.cookies.token);
  let newTx = { type: 1, data: { target: post.nodeName } }; 
  breej.getAccount(voter, function (error, account) {
    if (breej.privToPub(wifKey) !== account.pub) { res.send({ error: true, message: 'Not a valid user' }) } else {
      newTx = breej.sign(wifKey, voter, newTx)
      breej.sendTransaction(newTx, function (err, response) { if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); } })
    }
  })
});

router.post('/witunup', async (req, res) => {
  let post = req.body;let voter = req.cookies.breeze_username;
  let newTx = { type: 2, data: { target: post.nodeName } };let wifKey = await nkey(req.cookies.token);
  breej.getAccount(voter, function (error, account) {
    if (breej.privToPub(wifKey) !== account.pub) {  res.send({ error: true, message: 'Not a valid user' }) } else {
      newTx = breej.sign(wifKey, voter, newTx)
      breej.sendTransaction(newTx, function (err, response) {
        if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }
      })
    }
  })
});

router.post('/notify', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {
    let loguser = req.cookies.breeze_username;let timestamp = new Date().getTime();
    let newTx = { type: 28, data: {} };let wifKey = await nkey(req.cookies.token);
    breej.getAccount(loguser, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) { res.send({ error: true, message: 'Not a valid user' }) } else {
        newTx = breej.sign(wifKey, loguser, newTx)
        breej.sendTransaction(newTx, function (err, response) {
          if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }
        })
      }
    })
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); } 
});

router.post('/follow', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {
    let post = req.body; let token = req.cookies.token; let loguser = req.cookies.breeze_username;
    let newTx = { type: 7, data: { target: post.followName } }; let wifKey = await nkey(req.cookies.token);
    breej.getAccount(loguser, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Not a valid user' })
      } else { newTx = breej.sign(wifKey, loguser, newTx);
        breej.sendTransaction(newTx, function (err, response) {
          if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }
        })
      }
    })
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
});

router.post('/unfollow', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token))
  { let post = req.body; let loguser = req.cookies.breeze_username;
    let newTx = { type: 8, data: { target: post.unfollowName } }; let wifKey = await nkey(req.cookies.token);
    breej.getAccount(loguser, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) { res.send({ error: true, message: 'Not a valid user' })
      } else {newTx = breej.sign(wifKey, loguser, newTx);
        breej.sendTransaction(newTx, function (err, response) {
          if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }
        })
      }
    })
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); } 
});

router.post('/followCatg', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) 
  { let post = req.body;let loguser = req.cookies.breeze_username;
    let newTx = { type: 26, data: { category: post.catgName } };let wifKey = await nkey(req.cookies.token);
    breej.getAccount(loguser, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) { res.send({ error: true, message: 'Not a valid user' }) 
      } else {newTx = breej.sign(wifKey, loguser, newTx)
          breej.sendTransaction(newTx, function (err, response) {
          if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }
        })
      }
    })
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
});

router.post('/unfollowCatg', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) 
  { let post = req.body; let loguser = req.cookies.breeze_username;
    let newTx = { type: 27, data: { category: post.catgName.toLowerCase() } };let wifKey = await nkey(req.cookies.token);
    breej.getAccount(loguser, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) { res.send({ error: true, message: 'Not a valid user' }) 
      } else { newTx = breej.sign(wifKey, loguser, newTx);
        breej.sendTransaction(newTx, function (err, response) {
          if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }
        })
      }
    })
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
});

router.post('/pupdate', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {let post = req.body; let loguser = req.cookies.breeze_username;
    if(post.acc_img){let avatarImg=await isImageURL(post.acc_img);
      if(avatarImg){
        if(post.acc_cover_img){let profCover=await isImageURL(post.acc_cover_img); if(!profCover){res.send({error: true, message: 'Not a valid profile cover image url'});return false; } }
        if(post.acc_website){if(!isUrl(post.acc_website)){res.send({error: true, message: 'Not a valid web url'});return false; } }
        let about=post.acc_about;if(post.acc_about && post.acc_about.length>50){about=limit(post.acc_about, 50, '')};
          let wifKey = await nkey(req.cookies.token);let content = { about: about, website: post.acc_website, location: post.acc_location, cover_image: post.acc_cover_img, avatar: post.acc_img };
          breej.getAccount(loguser, function (error, account) {
            if (breej.privToPub(wifKey) !== account.pub) { res.send({ error: true }) } else {
              let newTx = { type: 6, data: { json: { profile: content } } };
              newTx = breej.sign(wifKey, loguser, newTx)
              breej.sendTransaction(newTx, function (err, response) { if (err === null) { res.send({ error: false }); } else { res.send({ error: true, message: err['error'] }); }  })
            }
          })
      } else {res.send({error: true, message: 'Not a valid avatar image url'})}
    } else {res.send({error: true, message: 'Add valid avatar image'}) }
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
});

router.post('/keys', async (req, res, next) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) 
    { let loguser = req.cookies.breeze_username; let wifKey = await nkey(req.cookies.token);
      breej.getAccount(loguser, function (error, account) {
        if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
        } else { let keys=breej.keypair(); let pub=keys.pub;let priv=keys.priv;
        let newTx = { type: 12, data: {pub: keys.pub } };  let signedTx = breej.sign(wifKey, loguser, newTx);
          breej.sendTransaction(signedTx, (error, result) => {
            if (error === null) {res.send({ error: false, priv: priv, pub:pub});
            } else { res.send({ error: true, message: error['error']}); }
          })
        }
      })  
    } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
})

router.post('/transfer', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {
    let post = req.body; let sender = req.cookies.breeze_username;let wifKey = await nkey(req.cookies.token);
    breej.getAccounts([post.rec_user], function (error, account) {
      if (!account || account.length === 0) {
        res.send({ error: true, message: 'Not a valid receiver' });
      } else if (sender == post.rec_user) {
        res.send({ error: true, message: "Can't transfer to yourself"});
      } else {
        let amount = parseInt((post.trans_amount) * 1000000);
        breej.getAccount(sender, function (error, account) {
          if (breej.privToPub(wifKey) !== account.pub) {
            res.send({ error: true, message: 'Unable to validate user' });
          } else if (amount <  500000) {
            res.send({ error: true, message: 'Min 0.5 tokens allowed' });
          } else if (post.trans_amount > (account.balance) / 1000000) {
            res.send({ error: true, message: 'Not enough balance' });
          } else {
            let newTx = { type: 3, data: { receiver: post.rec_user, amount: amount, memo: post.memo } };
            let signedTx = breej.sign(wifKey, sender, newTx);
            breej.sendTransaction(signedTx, (error, result) => { if (error === null) { res.send({ error: false }); } else { res.send({ error: true, message: error['error'] }); } })
          }
        });
      }
    });
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
});

router.post('/boost', async (req, res, next) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {
    let post = req.body; let sender = req.cookies.breeze_username;let wifKey = await nkey(req.cookies.token);
    let amount = parseInt((post.boost_amount) * 1000000);
    breej.getAccount(sender, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
        } else if (amount > account.balance) {
          res.send({ error: true, message: 'Not enough balance' });
        } else if (amount < 100000) {
          res.send({ error: true, message: 'Min bid amount is 0.1 tokens' });
        } else if (!isUrl(post.boost_url)) {
          res.send({ error: true, message: 'Not a valid URL' });
        } else { let boostUrl = pathParse(post.boost_url); let boostLink = boostUrl.base;
          let newTx = { type: 13, data: { link: boostLink, burn: amount } };
          let signedTx = breej.sign(wifKey, sender, newTx);
          breej.sendTransaction(signedTx, (error, result) => { if (error === null) { res.send({ error: false }); } else { res.send({ error: true, message: error['error'] }); } })
        }
    });
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }  
});

router.post('/withdraw', async (req, res) => {
  if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {
    let post = req.body;let sender = req.cookies.breeze_username;let wifKey = await nkey(req.cookies.token);
    let amount = parseInt((post.wid_amount) * 1000000);
    const Validator = require('wallet-validator');let valid = Validator.validate(post.wid_addr, 'ETH');
    breej.getAccount(sender, function (error, account) {
      if (breej.privToPub(wifKey) !== account.pub) {
        res.send({ error: true, message: 'Unable to validate user' });
      } else if (amount > account.balance) {
            res.send({ error: true, message: 'Not enough balance' });
      } else if (amount <  1000000) {
            res.send({ error: true, message: 'Min withdrawal amount is 1 token' }); 
      } else if (!valid) {
            res.send({ error: true, message: 'Not a valid BSC wallet address' });
      } else {
        let wAmount = parseInt(amount);
        let newTx = { type: 23, data: { destaddr: post.wid_addr, network: 'BSC', amount: wAmount } };
        let signedTx = breej.sign(wifKey, sender, newTx);
        breej.sendTransaction(signedTx, (error, result) => { if (error === null) { res.send({ error: false }); } else { res.send({ error: true, message: error['error'] }); } })
      }
    });
  } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
});

router.get('/tos', async (req, res) => {let nTags = await fetchTags(); if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); let act = userAPI.data; res.render('common/tos', { trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }); } else { loguser = ""; res.render('common/tos', { trendingTags: nTags, loguser: loguser, category: category }); } });
router.get('/robots.txt', function (req, res) { res.type('text/plain'); res.send("User-agent: *\nDisallow:"); });
router.use(async (req, res) => { let nTags = await fetchTags(); if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username; let userAPI = await axios.get(api_url+`/account/${loguser}`); let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); let act = userAPI.data; res.status(404).render('common/404', { trendingTags: nTags, loguser: loguser, acct: userAPI.data, category: category, notices: noticeAPI.data.count }); } else { loguser = ""; res.status(404).render('common/404', { trendingTags: nTags, loguser: loguser, category: category }); } });

module.exports = router;