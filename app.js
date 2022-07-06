const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const user = require('./model/usermodel');
const cons = require('consolidate');

const PORT = 5000 || process.env.PORT;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Snakegame:Snakegameplay2help@cluster0.xbzsl.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log('Server is Connected');
})


const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.engine('html',cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');

app.get('/',(req,res)=>{
   res.render('user');
})
app.get('/register',(req,res)=>{
    res.render('register');
})
app.get('/snakegame',(req,res)=>{
    res.render('index');
})

app.post('/register',(req,res)=>{
    try{
    let{email,name,pass}= req.body;
    email = email.trim();
    name = name.trim();
    pass= pass.trim();
 user.find({email},(err,data)=>{
    if(data[0]){
        console.log("data")
        res.redirect('/register');
    }
    else{
        console.log("data is available")
          bcrypt.genSalt(10,(err,s)=>{
              bcrypt.hash(pass,s,async(err,pass)=>{
                 const users = new user({
                  email,
                  name,
                  pass
                })
                await users.save();
                res.redirect('/');
            })
        })
    }
       
 })
}catch(err){
    console.log(err);
}
 
})

app.post('/',(req,res)=>{
try {
    let {name,pass} = req.body;
    name = name.trim();
    pass = pass.trim();
    user.findOne({name},async(err,data)=>{
    var check = await bcrypt.compare(pass,data.pass);     
      if(check){
         res.redirect('/snakegame');
      }else{
          res.redirect('/');
      }
    })
} catch (error) {
    console.log(error);
}
   
})
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})