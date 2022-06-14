var express = require('express');
var router = express.Router();
var sql = require("mysql");
var app = express();
var conn = require("../connection/connect")

function getEdition(edition){
  if(edition.includes('Double')){
    return '2XM';
  }
  else if(edition.includes('Alliances')){
    return 'ALL'
  }
  else if(edition.includes('Eternal')){
    return 'EMA'
  }
  else if(edition.includes('Judge')){
    return 'J14'
  }
  else if(edition.includes('Amonkhet')){
    return 'MP2'
  }
  else if(edition.includes('World')){
    return 'WC87'
  }
  else {
    return '';
  }
}
//show all Users
router.get('/api/Users',(req, res) => {
    let sql = "SELECT * FROM users";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

//add new User
router.post('/api/User',(req, res) => {
    let data = {name: req.query.name, country: req.query.country, number: req.query.number};
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
   
  //update User
  router.put('/api/User/:id',(req, res) => { 
    let sql = "UPDATE users SET name='"+req.query.name+"', country='"+req.query.country+"', number='"+req.query.number+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      //  console.log(req.query)
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
   
  //Delete User
  router.delete('/api/User/:id',(req, res) => {
    let sql = "DELETE FROM users WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify(results));
    });
  });
  
  //show single User
  router.get('/api/User/:id',(req, res) => {
    let sql = "SELECT * FROM users WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //show all SCG products have same name and edition as query
  router.get('/api/scgbynameedition',(req, res) => {
    let edition = req.query.edition ? req.query.edition : '';
    let sql = "SELECT * FROM scg_price WHERE name LIKE '%" + req.query.name + "%' AND edition LIKE '%" + edition + "%' LIMIT 10;";
    let query = conn.query(sql, (err, results) => {
      console.log()
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  //show all CKD products have same name and edition as query
  router.get('/api/cardbyname',(req, res) => {
    result = {};
    scgprice_history = []
    let sql_scgbyname = "SELECT * FROM scg_price WHERE name LIKE '%" + req.query.name + "%' LIMIT 1;";
    let query_scgbyname = conn.query(sql_scgbyname, (err, results_scgbyname) => {
      if (results_scgbyname.length > 0) {
        scgprice_history = results_scgbyname[0]['price'];
        let edition = getEdition(results_scgbyname[0]['edition']);
        // let name = getEdition(results_scgbyname[0]['name']);
        let sql_ckd = "SELECT artist ,availability,colorIdentity,colors,convertedManaCost,finishes,flavorText,hasFoil,hasNonFoil,isPromo,isReprint,isStarter,keywords,layout,manaCost,manaValue,name,number,power,printings,promoTypes,purchaseUrls,rarity,setCode,subtypes,supertypes,text,toughness,type,types,uuid FROM cards WHERE availability LIKE '%paper%' AND name LIKE '%"+ req.query.name + "%' AND setCode LIKE '%" + edition +"%' LIMIT 1;";
        let query_ckd = conn.query(sql_ckd, (err, results_ckd) => {      
          if(err) throw err;
          let uuid = ''
          if (results_ckd.length > 0) {
            result = results_ckd[0];
            uuid = results_ckd[0]['uuid']
            
            let sql_ckdprice = "SELECT * FROM ckd_price WHERE uuid='"+uuid + "';";
            let query_ckdprice = conn.query(sql_ckdprice, (err, results_ckdprice) => {
              if(err) throw err;
              result['currency'] = ''
              result['price_history'] = {}
              if(results_ckdprice.length > 0) {
                result['currency'] = results_ckdprice[0]['currency'];
                result['price_history'] = JSON.parse(results_ckdprice[0]['price_history']);
              }
              result['price_history']['starcitygame'] = scgprice_history;

              /*------ Caculation of Local Market Price Here -------*/
              let local_price = 0;
              let latest_ckd = 0;
              let latest_scg = 0;
              // calculation of latest price of CKD card
              let ckd_history = result['price_history']['cardkingdom']  // array for ckd price history
              let len_ckdhistory = ckd_history.length;
              let latest_ckd_dict = ckd_history[len_ckdhistory - 1]  // latest_ckd_dict = {"2022-3-27":"110.99"}
              Object.keys(latest_ckd_dict).forEach(date => {
                latest_ckd = latest_ckd_dict[date];
              });
              console.log(latest_ckd);              
              local_price = Math.round(latest_ckd);
              console.log(local_price);
              result['local_price'] = local_price;
              

              /*------ Get legality infomation ------- */
              result['legalities'] = {}
              let sql_legality = "SELECT format, status FROM legalities WHERE uuid='"+ uuid + "';";
              let query_legality = conn.query(sql_legality, (err, results_legalities) => {
                if(err) throw err;
                results_legalities.forEach(element => {
                  result['legalities'][element['format']] = element['status'];
                });
                res.send(JSON.stringify(result));
              });              
            });
          }
          else {
            res.send(JSON.stringify(result));
          }
          
        });
      }
    });
  });

  //show all products by uuid
  router.get('/api/ckdpricebyuuid',(req, res) => {
    let sql = "SELECT * FROM ckd_price WHERE uuid='"+req.query.uuid + "';";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  //show all CKD products have same name and edition as query
  router.get('/api/ckdallbyname',(req, res) => {
    result = {};
    let sql = "SELECT * FROM cards WHERE availability LIKE '%paper%' AND name LIKE '%"+ req.query.name + "%' LIMIT 10;";
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));      
    });
  });

  module.exports = router;