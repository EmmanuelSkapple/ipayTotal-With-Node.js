
var express = require('express');
var app = express();
const axios = require('axios');
var md5 = require('md5');
const objetoHash={
  method:'createAccount',
  formEmail:'erick.hinojosa@ceif-logistics.network',
  username:'adanDeSantiago',
  firstName:'adan',
  lastName:'de santiago',
  idn:'identi123',
  citizenship:'mx',
  residenceCountry:'mx',
  birthday:'1995-02-26',
  ocupation:'12',
  currency:'USD',
  phoneCountryCode:'52',
  phone:'3318282444',
  phoneType:'2',
  streetName:'Francisco Villa',
  streetNumber:'3229',
  country:'mx',
  state:'jal',
  city:'Zapopan',
  postalCode:'45085',
  addressStatus:'1',
};

const API_SHARED_SECRET= '115f89503138416a242f40fb7d7f338e';

const hashing=hashear(objetoHash,API_SHARED_SECRET);
const objeto={
  method:'createAccount',
  formEmail:'erick.hinojosa@ceif-logistics.network',
  username:'adanDeSantiago',
  firstName:'adan',
  lastName:'de santiago',
  idn:'identi123',
  citizenship:'mx',
  residenceCountry:'mx',
  birthday:'1995-02-26',
  ocupation:'12',
  currency:'USD',
  phoneCountryCode:'52',
  phone:'3318282444',
  phoneType:'2',
  streetName:'Francisco Villa',
  streetNumber:'3229',
  country:'mx',
  state:'jal',
  city:'Zapopan',
  postalCode:'45085',
  addressStatus:'1',
  key:hashing,
  sandbox:'ON',
  return:'51'

};


app.get('/', function (req, res) {
  res.send('Hello World!');
  axios.post('https://secure.paydek.com/payment/api/paymentAPI.php',objeto
  )
    .then(response => {
      console.log(response.data);

    })
    .catch(error => {
      console.log(error);
    });

});

axios.post('https://secure.paydek.com/payment/api/paymentAPI.php',objeto
)
  .then(response => {
    console.log(response.data);

  })
  .catch(error => {
    console.log(error);
  });


function hashear(o,key){
  var key= md5(key+o.userName+o.firstName+o.lastName+o.idn+o.country+o.city);
  return key;
}


app.listen(process.env.PORT || 4000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});

