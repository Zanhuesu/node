const express = require('express')
const breej = require('breej')
const CryptoJS = require("crypto-js")
const axios = require('axios')
const moment = require('moment')
const tldts = require("tldts");
const helper = require('./helper')
const fetchTags = helper.getTags
const api_url = helper.api
const category = helper.categories
const msgkey = process.env.msgKey; const iv = process.env.breezval;
const getAccountPub = (username) => { return new Promise((res, rej) => { breej.getAccount(username, function (error, account) { if(error) rej(error); if(!account) rej(); if(account.pub) res(account.pub);}) })}
const validateToken = async(username, token) => {if(!username || !token) return false; try { var decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); return breej.privToPub(decrypted.toString(CryptoJS.enc.Utf8)) === await getAccountPub(username); }catch(err){return false;} }

async function page(req, res) {
    try {
        let author = req.params.name; let link = req.params.link; let nTags = await fetchTags(); let postAPI = await axios.get(api_url+`/content/${author}/${link}`);
  		let post_category = postAPI.data.json.category; 
  		let simAPI = await axios.get(api_url+`/new?category=${post_category}`);
  		let userAPI = await axios.get(api_url+`/account/${author}`); 
  		let post_title = postAPI.data.json.title; res.locals.title = post_title;
  		let post_body = postAPI.data.json.body.replace(/"/g, "'"); 
  		let post_description = post_body.split(" ").splice(0,20).join(" ").replace(/\s+((?=\<)|(?=$))/g, ' ').replace(/(?:&nbsp;|<br>)/g,''); 
  		res.locals.description = post_description.replace(/(<([^>]+)>)/gi, '').replace(/\s\s+/g, ' ');
  		let post_link = postAPI.data._id;res.locals.link='https://tipmeacoffee.com/post/'+post_link;
  		let post_img = postAPI.data.json.image;res.locals.image=post_img;
        let newUrl = tldts.parse(postAPI.data.json.url); let domain=newUrl.domain;
  		if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { loguser = req.cookies.breeze_username;let actAPI = await axios.get(api_url+`/account/${loguser}`);let noticeAPI = await axios.get(api_url+`/unreadnotifycount/${loguser}`); res.render('post', {article: postAPI.data, simPosts: simAPI.data, moment: moment, trendingTags: nTags, loguser: loguser, acct: actAPI.data, user: userAPI.data, category: category,notices:noticeAPI.count, domain: domain }) } else { loguser = ""; res.render('post', { article: postAPI.data, simPosts: simAPI.data, moment: moment, trendingTags: nTags, loguser: loguser, user: userAPI.data, category: category, domain: domain }) }
    } catch (error) { console.log(error);res.send({ error: true, message: error['error'] }) }
}

module.exports = { page}