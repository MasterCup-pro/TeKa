var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://dbs:z7AeOeMJnzThWZoC@signindb.5hoyj.mongodb.net/signindb?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connection to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email= req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data ={
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted succesfully");
    });

    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('signup.html')
}).listen(3000);



console.log("Listening on PORT 3000");