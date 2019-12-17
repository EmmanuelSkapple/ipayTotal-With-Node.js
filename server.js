
var express = require('express');
var app = express();
const axios = require('axios');
var md5 = require('md5');


app.get('/', function (req, res) {

  let valoresPago = req.body.nombre+','+req.body.apellido+','+req.body.direccion+','+req.body.NumeroOrden+','+req.body.pais.iso2+','+req.body.estado+','+req.body.ciudad+','+req.body.userData.PostaleCode+','+req.body.ipAddress+','+req.body.userData.correo+','+req.body.userData.Phone+','+req.body.CardType+','+req.body.Amount+','+req.body.CardNumber+','+req.body.month+','+req.body.year+','+req.body.CVV;
  runner.exec("php apiCall.php" + " " +valoresPago, function (error, stdout, stderr) {
    let objCompra = NormalizaUrl(stdout);
    if (objCompra.status == 'success') {
      console.log("pago exitoso");
      res.send(true);
    }else{
     res.send(false);
   }
 });
});


function NormalizaUrl(url){
  var new_url = url.replace(/-|\s/g,"");
  let status = new_url.split('~')[0];
  let id_orden = new_url.split('~')[1];
  return {status : status, id_orden:id_orden};
}

app.listen(process.env.PORT || 4000 ,function(){
  console.log("up and running on port "+process.env.PORT);
});

