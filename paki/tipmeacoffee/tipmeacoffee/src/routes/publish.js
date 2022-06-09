const express = require('express')
const breej = require('breej')
const helper = require('./helper');
const videoParser = require("js-video-url-parser");
const fs = require('fs')
const path = require('path')
const { create } = require('ipfs-http-client')
//const ipfsAPI = create('https://ipfs.infura.io:5001/api/v0')
const ipfsAPI = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const tldts = require("tldts");
const randomstring = require("randomstring")
const getSlug = require('speakingurl')
const CryptoJS = require("crypto-js")
const isUrl = require("is-url")
const Meta = require('html-metadata-parser')
const { limit, substr } = require('stringz')
const fetchTags = helper.getTags
const category = helper.categories
const getAccountPub = (username) => { return new Promise((res, rej) => { breej.getAccount(username, function (error, account) { if(error) rej(error); if(!account) rej(); if(account.pub) res(account.pub);}) })}
const validateToken = async(username, token) => {if(!username || !token) return false; try { var decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); return breej.privToPub(decrypted.toString(CryptoJS.enc.Utf8)) === await getAccountPub(username); }catch(err){return false;} }
const nkey = async(token) => {try{let decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); let uKey = decrypted.toString(CryptoJS.enc.Utf8);return uKey;}catch(err){return false;} }
const msgkey = process.env.msgKey; const iv = process.env.breezval;

async function share(req, res) {
  try {
    if (await validateToken(req.cookies.breeze_username, req.cookies.token)) { let post = req.body; 
      if (!isUrl(post.url)) {res.send({ error: true, message: 'Not a valid URL' });
      } else {let newUrl = tldts.parse(post.url); let domainName=newUrl.domain;
        if(helper.sites.includes(domainName)){res.send({ error: true, message: 'unable to share form this url' });return false;
        } else { const urlType = videoParser.parse(post.url); if(!(urlType)){type='0'}else{type='1'}
          //Meta.parser(post.url, function (err, result) { //});
            try{
              var result = await Meta.parser(post.url);
              if(result){let meta = result['og']; 
                if(!meta.title){res.send({ error: true, message: 'Phew.. Unable to fetch shared link' });
                } else {res.send({ error: false, meta: meta, link: domainName, type: type });}
              } else {res.send({ error: true, message: 'Unable to Parse URL' });}
            } catch (err) { console.log(err); res.send({ error: true, message: err }) }
           
        }
      }
    } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }   
  } catch (err) { console.log(err); res.send({ error: true, message: err }) }
}

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath)
  const fileAdded = await ipfsAPI.add({path:fileName, content:file})
  const fileHash = fileAdded.cid
  return fileHash
}
async function post(req, res) {
  try {
    if (await validateToken(req.cookies.breeze_username, req.cookies.token)) {
      let token = req.cookies.token;let wifKey = await nkey(req.cookies.token);let author = req.cookies.breeze_username;let post = req.body;
      let allowed_tags=/^[a-z\d\_\s]+$/i;
      if (!allowed_tags.test(post.tags)) {res.send({ error: true, message: 'Only alphanumeric tags, no Characters.' });return false}
      let tags=post.tags.replace(/\s\s+/g, ' ');let tags_arr=tags.trim().split(' ');
      if (post.description.length < 60) {res.send({ error: true, message: 'Add description of minimum 60 characters' });return false}
      let description=post.description;
      
      let status_link=randomstring.generate({ length: 13, capitalization: 'lowercase', readable: true, charset: 'numeric'});
      let permlink = author+'-status-'+status_link;
      if (tags_arr.length < 2) {res.send({ error: true, message: 'Add at least two related tags' });return false}

      if(req.body.type == '3'){
        let content = { body: description, category: 'status', type: req.body.type, tags: tags_arr };
        let newTx = { type: 4, data: { link: permlink, json: content } };
        breej.getAccount(author, function (error, account) {
          if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
          } else { newTx = breej.sign(wifKey, author, newTx);
            breej.sendTransaction(newTx, function (err, response) { if (err === null) { res.send({ error: false, link: permlink }); } else { res.send({ error: true, message: err['error'] }); } })
          }
        })
      }else if(req.body.type == '2') {
        const file = req.files.file;const fileName = req.body.filename;const filePath = path.resolve('files/'+fileName);
        file.mv(filePath, async (err) => {
          if (err) {return res.send({error: true, message: 'IPFS issues for image uploading'});}
          const fileHash = await addFile(fileName, filePath)
          fs.unlink(filePath, (err) =>{ if (err) console.log(err); })
          image='https://ipfs.io/ipfs/'+fileHash;
          let content = { body: description, category: 'status', image: image, type: req.body.type, tags: tags_arr };
          let newTx = { type: 4, data: { link: permlink, json: content } };
          breej.getAccount(author, function (error, account) {
            if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
            } else { newTx = breej.sign(wifKey, author, newTx);
              breej.sendTransaction(newTx, function (err, response) { if (err === null) { res.send({ error: false, link: permlink }); } else { res.send({ error: true, message: err['error'] }); } })
            }
          })
        })
      }else if(req.body.type == '1') {
        if(!post.title){res.send({ error: true, message: 'Not a valid title' });
        }else{ let permlink = getSlug(post.title);let description=limit(post.description, 120, '');
          let video=videoParser.parse(post.exturl);let videoId=video.id
          let content = { title: post.title, body: description, category: post.category, url: post.exturl, image: post.image, type: req.body.type, videoid: videoId, tags: tags_arr };
          let newTx = { type: 4, data: { link: permlink, json: content } };
          breej.getAccount(author, function (error, account) {
            if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
            } else { newTx = breej.sign(wifKey, author, newTx);
              breej.sendTransaction(newTx, function (err, response) {
                if (err === null) { res.send({ error: false, link: permlink }); } else { res.send({ error: true, message: err['error'] }); }
              })
            }
          })
        }
      }else if(req.body.type == '0') {
        if(!post.title){res.send({ error: true, message: 'Not a valid title' });
        }else{ let permlink = getSlug(post.title);let description=limit(post.description, 120, '');
          let content = { title: post.title, body: description, category: post.category, url: post.exturl, image: post.image, type: req.body.type, tags: tags_arr };
          let newTx = { type: 4, data: { link: permlink, json: content } };
          breej.getAccount(author, function (error, account) {
            if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
            } else { newTx = breej.sign(wifKey, author, newTx);
              breej.sendTransaction(newTx, function (err, response) {
                if (err === null) { res.send({ error: false, link: permlink }); } else { res.send({ error: true, message: err['error'] }); }
              })
            }
          })
        }
      }else{
        if(!post.title){res.send({ error: true, message: 'Not a valid title' });
        }else{ let permlink = getSlug(post.title);let description=limit(post.description, 120, '');
          let content = { title: post.title, body: description, category: post.category, url: post.exturl, image: post.image, type: '0', tags: tags_arr };
          let newTx = { type: 4, data: { link: permlink, json: content } };
          breej.getAccount(author, function (error, account) {
              if (breej.privToPub(wifKey) !== account.pub) {res.send({ error: true, message: 'Unable to validate user' });
              } else { newTx = breej.sign(wifKey, author, newTx);
                  breej.sendTransaction(newTx, function (err, response) {
                  if (err === null) { res.send({ error: false, link: permlink }); } else { res.send({ error: true, message: err['error'] }); }
                  })
              }
          })
        }
      }
    } else { res.send({ error: true, message: 'phew.. User Validation Fails' }); }
  } catch (err) { console.log(err); res.send({ error: true, message: err }) }
}

module.exports = { post, share }