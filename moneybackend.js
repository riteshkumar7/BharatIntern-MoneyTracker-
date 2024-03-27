var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static("Expences"))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://127.0.0.1:27017/expence");
var db=mongoose.connection
db.on("error",()=>console.log("error"))
db.once("open",()=>console.log("connect with moneybackend"))

app.post("/submit",(req,res)=>{
    var category = req.body.category
    var amount = req.body.amount
    var date = req.body.date

    var data={
        "category":category,
        "amount":amount,
        "date":date
    }
    db.collection("transaction").insertOne(data,(err,result)=>{
        if(err){
            throw err;
        }
        console.log("transaction collected in backend")
        res.json(data);
    })  
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-acces-Allow-Origin":"*"
    })
    return res.redirect("/MoneyT.html")
}).listen(9000);
console.log("Server has connected with 9000 localhost");