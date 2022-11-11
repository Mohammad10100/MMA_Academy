const express = require("express");
const path = require("path");
const app = express();
let alert = require('alert'); 
// const popup = require('popups');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactMMA' ,{useNewUrlParser: true});
const port = 80;

// define mongoose scheme 
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
  });

//modeling the schema
var Contact = mongoose.model('Contact', contactSchema);


app.use('/static' ,express.static('static'));


// EXPRESS SPECIFIC STUFFS
app.use('/static', express.static('static'))// For serving static files
app.use(express.urlencoded());



// PUG SPECIFIC STUFFS
app.set('view engine', 'pug');// Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));// Set the views directory
 
// Our pug demo endpoint
app.get("/home", (req, res)=>{ 
    const params= {};
    res.status(200).render("home.pug", params);
})
app.get("/contact", (req, res)=>{ 
    const params= {};
    res.status(200).render("contact.pug", params);
})
app.post("/contact", (req, res)=>{ 
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        // res.send("The data has been sent and stored")
        // res.jsonp({success : true})
        // popup.alert({
        //     content: 'Success!: The form has been submitted'
        // });
        alert("Success!: The form has been submitted")
    }).catch(()=>{
        res.status(400).send("Faliure: The data has not been stored");
    })
    // res.status(200).render("contact.pug");

})



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
