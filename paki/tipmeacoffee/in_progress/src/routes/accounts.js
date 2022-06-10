const emailValidator = require("email-validator");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const nodemailer = require("nodemailer");
const breej = require('breej')
const CryptoJS = require("crypto-js");
const dbName = 'besocial'; var db;
const helper = require('./helper');
const fetchTags = helper.getTags
const category = helper.categories
const getAccountPub = (username) => { return new Promise((res, rej) => { breej.getAccount(username, function (error, account) { if(error) rej(error); if(!account) rej(); if(account.pub) res(account.pub);}) })}
const validateToken = async(username, token) => {if(!username || !token) return false; try { var decrypted = CryptoJS.AES.decrypt(token, msgkey, { iv: iv }); return breej.privToPub(decrypted.toString(CryptoJS.enc.Utf8)) === await getAccountPub(username); }catch(err){return false;} }

const msgkey = process.env.msgKey; const iv = process.env.breezval;
MongoClient.connect("mongodb://localhost:27017/besocial", function(err, client) { assert.equal(null, err);console.log("Connected successfully to server"); db = client.db(dbName); });

async function logout(req, res) { try { res.clearCookie('breeze_username'); res.clearCookie('token'); res.send({ error: false }); } catch (error) { res.send({ error: true, message: error['error'] }) } }

async function login(req, res) {
    try {
        var user = req.body; var key = user.pivkey; var loginUser=user.username.trim();var username=loginUser.toLowerCase();
        breej.getAccount(username, function (error, account) {
            if (account.error) { res.send({ error: true, message: 'Not a valid user' }); return false }
            try { pubKey = breej.privToPub(key) } catch (e) { res.send({ error: true, message: 'Password (privkey) seems incorrect' }); return }
            if (account.pub !== pubKey) { res.send({ error: true, message: 'Password (privkey) validation fails' }); } else {
                var encrypted = CryptoJS.AES.encrypt(key, msgkey, { iv: iv }); var token = encrypted.toString();
                res.cookie('breeze_username', username, { expires: new Date(Date.now() + 86400000000), httpOnly: false });
                res.cookie('token', token, { expires: new Date(Date.now() + 86400000000), httpOnly: true });
                res.send({ error: false });
            }
        })
    } catch (error) { res.send({ error: true, message: error['error'] }) }
}
async function signup(req, res) {
    try {
        let post = req.body;let uName=post.name.toLowerCase();let inputName=uName.trim();let allowed_name = /^[0-9a-z]+$/; if (!inputName.match(allowed_name)) { res.send({ error: true, message: 'Only alphanumeric usernames allowed (all lowercase)' }); return false; };
        if (inputName.length < 5) { res.send({ error: true, message: 'Username length should not be less than 5' }); return false; };
        if (!emailValidator.validate(post.email)) { res.send({ error: true, message: 'Not a valid email address' }); return false; };
        breej.getAccounts([inputName], function (error, accounts) {
            if (!accounts || accounts.length === 0) {
                db.collection('users').findOne({ email: req.body.email }, function(err, user) {
                    if(user){res.send({ error: true, message: 'phew... Email is already in use' });
                    }else{ const crypto = require('crypto');const vtoken = crypto.randomBytes(16).toString('hex');
                        let userData = {username: inputName,email: req.body.email,token: vtoken,isvarified: false,ref: req.body.ref, createdAt: new Date()}
                        db.collection('users').insertOne(userData, function(err) {
                        if(err){res.send({ error: true, message: err });}else{
                            const token_url = "https://tipmeacoffee.com/verify/"+vtoken;
                            const email_msg='<html><body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;"><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4" class="gwfw"><tr><td align="center" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding-bottom: 40px;" class="pb0"><table width="650" border="0" cellspacing="0" cellpadding="0" class="m-shell"><tr><td class="td" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding: 60px 40px 35px 40px;" class="p30-15"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr></tr></table></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 6px 6px 0px 0px;"><tr><td style="padding: 40px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th class="column" width="100%" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:center;"><img src="https://i.postimg.cc/wjvZZwJX/tipmeacoffee.jpg" width="248" height="84" mc:edit="image_1" style="max-width:240px;" border="0" alt=""/></td></tr></table></th><th style="padding-bottom:20px !important; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;" class="column" width="1"></th><th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"><table width="100%" border="0" cellspacing="0" cellpadding="0"></table></th></tr></table></td></tr></table><div mc:repeatable="Select" mc:variant="Title + Full-Width Image + Text Center + Button"><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tr><td style="padding: 0px 40px 40px 40px;" class="p0-15-30"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr mc:hideable><td class="h3 center" style="padding-bottom: 10px; color:#444444; font-family: Yantramanav, Arial, sans-serif; font-size:18px; line-height:37px; font-weight:300; text-align:left;"><div mc:edit="text_9">Hello '+req.body.name+',</div></td></tr><tr mc:hideable><td class="text left" style="padding-bottom: 26px; color:#666666; font-family:Arial, sans-serif; font-size:16px; line-height:30px; min-width:auto !important; text-align:left;"><div mc:edit="text_10">Please verify your email address to proceed signup process. To verify your email address click the link below.</div></td></tr><tr mc:hideable><td align="center"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="text-button" style="color:#ffffff; background:#444444; border-radius:5px; font-family: Yantramanav, Arial, sans-serif; font-size:14px; line-height:18px; text-align:center; font-weight:500; padding:12px 25px;"><div mc:edit="text_11"><a href="'+token_url+' " target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Verify Email</span></a></div></td></tr></table></td></tr><tr mc:hideable><td class="h3 left" style="padding-top: 20px; color:#444444; font-family:Yantramanav, Arial, sans-serif; font-size:14px; line-height:37px; font-weight:600; text-align:left;"><div mc:edit="text_9">-- Tip Me A Coffee Team</div></td></tr></table></td></tr></table></div><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tr><td style="padding: 20px 10px; border-top: 3px solid #f4f4f4;" class="p30-15"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr mc:hideable><td class="text-footer m-center" style="padding-bottom: 15px; color:#999999; font-family:Arial, sans-serif; font-size:14px; line-height:18px; text-align:center; min-width:auto !important;"><div mc:edit="text_18">TipMeACoffee.com - TMAC.finance - Breeze.foundation</div></td></tr></table></th></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>';
                            verifyMail(req.body.email, email_msg);
                            res.send({ error: false });}
                        }) 
                    }
                })
            } else { res.send({ error: true, message: 'phew.. Username already exist' }); }
        })
    } catch (err) { console.log(err); res.send({ error: true, message: err }) }
}

async function verify(req, res) {
    try {
        let vtoken = req.params.token;let token = req.cookies.token; let user = req.cookies.breeze_username; let nTags = await fetchTags();
        if (token && await validateToken(req.cookies.breeze_username, req.cookies.token)) {
            res.redirect('/profile/' + user);
        } else {
            db.collection('users').findOne({ token: vtoken }, function (err, result) {
                if(result && result.isvarified==false){v_token='valid', username=result.username.toLowerCase()
                }else if(result && result.isvarified==true){v_token='verified', username=result.username.toLowerCase()}else{v_token='invalid', username=''}
                loguser = ""; res.render('common/verify', { vtoken: v_token, user_id: username, trendingTags: nTags, loguser: loguser, category: category });
            })
        }
    } catch (err) { console.log(err); res.send({ error: true, message: err }) }
}

async function keygen(req, res) {
    try {
        let post = req.body; let allowed_name = /^[0-9a-z]+$/; if (!post.name.match(allowed_name)) { res.send({ error: true, message: 'Only alphanumeric usernames allowed (all lowercase)' }); return false; };
        if (post.name.length < 5) { res.send({ error: true, message: 'Username length should not be less than 5' }); return false; };
        breej.getAccounts([post.name], function (error, accounts) {
            if (!accounts || accounts.length === 0) {let ref='';
                db.collection('users').updateOne({ username: req.body.name}, {$set: { isvarified: true}})
                db.collection('users').findOne({ username: req.body.name }, function (err, result) {if(result){
                    ref=result.ref;let keys = breej.keypair(); let pub = keys.pub; let priv = keys.priv;
                    let newTx = { type: 0, data: { name: post.name, pub: pub, ref: ref } }; let privAc = process.env.privKey; let signedTx = breej.sign(privAc, 'breeze', newTx)
                    breej.sendTransaction(signedTx, (error, result) => {
                        if (error === null) {
                            res.send({ error: false, priv: priv });
                            let newVTx = { type: 14, data: { receiver: post.name, amount: parseInt(90) } };
                            let signedVTx = breej.sign(privAc, 'breeze', newVTx);
                            breej.sendTransaction(signedVTx, (error, result) => { })
                            let newBTx = { type: 15, data: { receiver: post.name, amount: parseInt(1500) } };
                            let signedBTx = breej.sign(privAc, 'breeze', newBTx);
                            breej.sendTransaction(signedBTx, (error, result) => { })
                        } else { res.send({ error: true, message: error['error'] }); }
                    })
                }else {res.send({ error: true, message: 'phew.. Not a verified user' });} })
            } else { res.send({ error: true, message: 'phew.. Username already exist' }); }
        })
    } catch (err) { console.log(err); res.send({ error: true, message: err }) }
}

async function verifyMail(rAddress, message) {
    let transporter = nodemailer.createTransport({ host: process.env.TRANSMAIL_HOST, port: 465, secure: true,
        auth: { user: process.env.TRANSMAIL_KEY, pass: process.env.TRANSMAIL_PASS, }, tls: { rejectUnauthorized: false }
    });
    let info = await transporter.sendMail({ from: 'Tip Me A Coffee <verify@tipmeacoffee.com>', to: rAddress, subject: "Verify Email Address", html: message, });
}

module.exports = { login, logout, signup, verify, keygen }