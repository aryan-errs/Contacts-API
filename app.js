const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Contact = require('./model')
const port = process.env.port || 3000;

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/restApi', {
    useNewurlParser: true,
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
})


app.get('/api', (req,res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to my first REST API'
    })
})

app.get('/api/contacts', async (req,res) => {
    const contacts = await Contact.find({});
    res.json({
        data: contacts
    })
    // res.send("IT WORKED!!")
})

app.post('/api/contacts', async (req,res) => {
    let contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email;
    contact.gender = req.body.gender;
    contact.phone  = req.body.phone;
    await contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'New contact created!',
                data: contact
            });
        });
    // res.send("This is a post request!!")
})

app.get('/api/contacts/:id', async (req,res) => {
    const { id } = req.params;
    Contact.findById(id, function(err, contact){
        if(err){
            res.json(err);
        }
        else{
            res.json({
                message: 'Contact details loading..',
                data: contact
            });
        }
    });
})

app.patch('/api/contacts/:id', async (req,res) => {
    const { id } = req.params;
    Contact.findById(id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender ? req.body.gender : contact.gender;
        contact.email = req.body.email? req.body.email : contact.email;
        contact.phone = req.body.phone ? req.body.phone : contact.phone;
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
})
app.put('/api/contacts/:id', async (req,res) => {
    const { id } = req.params;
    Contact.findById(id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender ? req.body.gender : contact.gender;
        contact.email = req.body.email? req.body.email : contact.email;
        contact.phone = req.body.phone ? req.body.phone : contact.phone;
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
})
app.delete('/api/contacts/:id', async (req,res) => {
    const { id } = req.params;
    Contact.findByIdAndDelete(id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "SUCCESS",
            message: 'Contact Deleted'
        });
    });
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})