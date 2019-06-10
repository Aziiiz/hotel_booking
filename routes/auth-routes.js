const router = require('express').Router();
const passport = require('passport');


router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});

// auth logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
  scope:['profile']
}));
  // auth with facebook
router.get('/facebook', passport.authenticate('facebook'));


// callback for redirect

router.get('/google/redirect', passport.authenticate('google'), function (req, res, next) {
  res.redirect('/profile');
  //res.send('you are here');
});

router.get('/facebook/redirect', passport.authenticate('facebook'), function(req, user, info, res, nex) {
  res.redirect('/profile');
  console.log(user, info);
});

// kakao auth router callback
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/redirect', passport.authenticate('kakao'), function(req, res, next)
{
  res.redirect('/profile');
});



module.exports = router;
