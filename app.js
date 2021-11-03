const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ld = require("lodash");

const app = express();


app.use(bodyParser.json());

// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true );
mongoose.connect("mongodb+srv://testboy:ashu1234@cluster0.1k9qq.mongodb.net/pawpet?retryWrites=true&w=majority", {
    useUnifiedTopology:true,
    useNewUrlParser:true

}, function(err){
    if (err) throw err;
    else console.log("Succesfuly connected");
});

const transaction_schema={
    amount:Number,
    id:Number,
    date:Date
    
}

const booking_schema={
    name:String,	
    amount:Number,
    date:Date,	
    no_pets:Number
}

const normal_user_schema = {
    email:String,
    password:String, 
    token:String, 
    bookings:[booking_schema]
};

const normal_user = mongoose.model("normalUser", normal_user_schema);
app.get("/", (req,res)=> {
    res.send("Hello pawpet")
})
app.post('/register', async(req,res)=>{
    console.log(req.body);
    const normalUser = new normal_user({
        email: req.body.email,
        password: req.body.password
    })

    normalUser.save((err)=> {
        if(err){
            console.log(err)
        } else {
            res.send("User successfully registered.")
        }
    })
});

app.post('/login',async(req,res)=>{
    console.log(req.body)
    let isLoggedIn = false;
    const foundUser= await normal_user.find({email:req.body.email},(err, record)=>{
        if (err){
            console.log("error");
        }
        else{
            if (req.body.password === record[0].password){
                console.log("Password Matched")
                isLoggedIn = true;
                res.json({isLoggedIn: isLoggedIn});
            } else {
                res.json({isLoggedIn: isLoggedIn});
            }
            console.log(record);
        }
    }).clone()

})

app.listen(4000, function(){
    console.log("Server is running on port 4000");
});