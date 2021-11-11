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
    else console.log("Successfully connected");
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

const pet_sitter_schema = {
    email:String,
    password: String,
    name: String,
    location:String,
    bookings: [booking_schema],
    aadhar_number:Number,
    ph_no: Number,
    address:String,
    days_available:[],
    timing_from:String,
    timing_to: String,
    no_of_pets: Number,
    total_earnings: Number,
    description: String,
    completed_bookings:Number,
    reviews: [String],
    rating:Number,
    skills: [String],
    current_status:Boolean,
}

const normal_user = mongoose.model("normalUser", normal_user_schema);
const pet_sitter = mongoose.model("petsitter", pet_sitter_schema)
app.get("/", (req,res)=> {
    res.send("Hello PawPet")
})

app.post('/registerSitter', async(req, res)=> {
    console.log(req.body)
    const new_pet_sitter = new pet_sitter ({
        email: req.body.email,
        name: req.body.name,
        aadhar_number:req.body.aadhar_number,
        ph_no: req.body.ph_no,
        address:req.body.address,
        days_available:req.body.days_available,
        timing_from:req.body.timing_from,
        timing_to: req.body.timing_to,
        no_of_pets: req.body.no_no_of_pets,
        description:req.body.description,
    })

    new_pet_sitter.save((err)=> {
        if(err){
            console.log(err)
            res.send(err)
        } else {
            res.json({isRegistered: true});
        }
    })
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
            res.json({isRegistered: false})
        } else {
            res.json({isRegistered: true});
        }
    })
});

app.post('/login',async(req,res)=>{
    console.log(req.body)
    let isLoggedIn = false;
    const foundUser= await normal_user.find({email:req.body.email},(err, record)=>{
        if (err){
            console.log(err);
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