var express = require('express');
var router = express.Router();
var domino = require('domino');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hotel'});
});

router.get('/forms', function (req, res, next) {
  res.render('form', {title: 'form page'})
})
router.post('/forms', function (req, res, next) {
  var radios = document.getElementsByName('rates');

  for (var i = 0, length = radios.length; i < length; i++)
  {
   if (radios[i].checked)
   {
    // do whatever you want with the checked radio
    alert(radios[i].value);
    return res.render('index',{title: 'hotel'});

    // only one radio can be logically checked, don't check the rest
    break;
   }
  }
});
module.exports = router;
