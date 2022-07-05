const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const user = require('./model/usermodel');
const cons = require('consolidate');
const PORT = 5000 || process.env.PORT;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Todolist:Todolist123@todolistapp.7xgc9.mongodb.net/?retryWrites=true&w=majority",()=>{
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
    if(data){
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
    const {name,pass} = req.body;
    user.findOne({name},(err,data)=>{
    var check = bcrypt.compare(pass,data.pass);     
      if(check){
         res.redirect('/snakegame');
      }else{
          res.redirect('/');
      }
    })
})
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})