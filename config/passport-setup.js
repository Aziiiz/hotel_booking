const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const keys = require('./keys');
const User = require('../models/user-models');



passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
  new GoogleStrategy({
  // options for the google start
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, function(accessToken, refreshToken, profile, done) {
 console.log(profile);
  //passport callback function
  User.findOne({accountid: profile.id}).then((currentUser)=>{
    if(currentUser){
      console.log('user is', currentUser);
      done(null,currentUser);

    }else {
      new User({
        username: profile.displayName,
        accountid: profile.id,
        thumbnail: profile._json.image.url
      }).save().then((newUser) => {
      console.log('new user has been created' + newUser);
      done(null, newUser);
    });
    }
  })

  console.log('hi there');


})

);
passport.use(
  new FacebookStrategy({
      // options for facebook start
      callbackURL: '/auth/facebook/redirect',
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret
       // getting data from facebook by using callback func
  }, function(accessToken, refreshToken, profile, cb, done) {
    // it logs to console profile data from facebook
    console.log(profile);
    User.findOne({accountid: profile.id}).then((currentUser)=>{
      if(currentUser){
        console.log('user is ',currentUser);
        return cb(null, currentUser);
      }
      else {
        new User({
          username: profile.displayName,
          accountid: profile.id,


        }).save().then((newUser) => {
        console.log('new user has been created' + newUser);
        done(null, newUser);
      });
      }
    })
  })
)

passport.use(
  new KakaoStrategy({

        callbackURL: '/auth/kakao/redirect',
        clientID: keys.kakao.clientID
        // clientSecret key is not neccessery for KakaoStrategy
  }, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({accountid: profile.id}).then((currentUser)=>{
      if(currentUser){
        console.log('user is', currentUser);
        done(null, currentUser);

      }
      else {
        new User({
          username: profile.displayName,
          accountid: profile.id,
          thumbnail: profile._json.properties.profile_image

        }).save().then((newUser)=>{
          console.log('new user has been created' + newUser);
          done(null, newUser);
        });
      }
    })
    console.log('hi there');
  })
)
