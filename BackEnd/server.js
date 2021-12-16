const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');

const strConnection = 'mongodb+srv://admin:gmit1@cluster0.nfzxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

const userSchema = new mongoose.Schema({
    Website:String,
    Username:String,
    Password:String
});

const userModel = mongoose.model('user', userSchema);


app.get('/users', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/users', (req,res)=>{
    console.log('user stored');
    console.log(req.body.Website);
    console.log(req.body.Username);
    console.log(req.body.Password);

    userModel.create({
        Website:req.body.Website,
        Username:req.body.Username,
        Password:req.body.Password
    });
    res.send('Data Sent to Server!')
})

app.get('/api/users/:id',(req, res)=>{
    console.log(req.params.id);

    userModel.findById(req.params.id,(error,data)=>{
        res.json(data);
    })
})

app.delete('/api/users/:id', (req, res)=>{
    console.log('Deleteing : '+req.params.id);

    userModel.deleteOne({_id:req.params.id},
        (error, data)=>{
            if(error)
                res.send(error)
            res.send(data);
        })
})

app.put('/api/users/:id',(req, res)=>{
    console.log('update');
    console.log(req.body);
    console.log("Updating: " + req.params.id);

    userModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })

})



app.get('/api/users', (req, res) => {
    userModel.find((err, data)=>{
        res.json(data);
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})