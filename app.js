// import pakages
const express = require("express");
const app = express();
const { urlencoded } = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");
// inport dotenv file
const dotenv = require("dotenv");
dotenv.config({path:'./confin.env'}) 
 
// PORT
const PORT = process.env.PORT || 2000;


// import mongoose module
const {login,chating} = require('./db')

// express needed file uses for use form data
app.use(urlencoded({extended:true}));
app.use(express.json());

// for use passport js in app
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const session = require('express-session');
const oauth2Client = new OAuth2(process.env.GOOGLE_CLINT_ID, process.env.GOOGLE_CLINT_SECRET, process.env.GOOGLE_URL);


app.use(session({
    secret: 'YOUR_SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }));

  app.get('/auth/google', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/userinfo.profile'];
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    res.redirect(url);
  });

//   app.get('/auth/google/callback', async (req, res) => {
//     const { tokens } = await oauth2Client.getToken(req.query.code);
//     oauth2Client.setCredentials(tokens);
//     const oauth2 = google.oauth2({
//       auth: oauth2Client,
//       version: 'v2',
//     });
//     const { data } = await oauth2.userinfo.get();
//     req.session.user = data;
//     res.redirect('/');
//   });




 // app server 
app.get('/',(req,res)=>{
    res.send("done")
})

// app.post('/login',async(req,res)=>{
//     try {
//         const a = await req.body;
//         let find = await login.findOne({email:a.email});
//         if (find) {
            
//         }
//         else{
//             res.status(404).send("user not found");
//         }
//     } catch (error) { 
//         console.log(error); 
//         res.send(error)
//     }
// })

// app.post('/reg',async(req,res)=>{
//     try {
//         let a = await req.body;
//     let salt = await bcrypt.genSaltSync(10);
//     const pass = await bcrypt.hashSync(a.password,salt);
//     let b = new login({
//         email:a.email,
//         number:a.number,
//         name:a.name,
//         password:pass
//     })
//     let s = await b.save(); 
//     console.log(s);
//     res.send("form fill successfully");
//     } catch (error) {
//         console.log(error); 
//     }   
// });  
   


 
app.listen(PORT,()=>{
    PORT ? console.log("works"):console.log("not works");
})  