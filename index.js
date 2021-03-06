// username: safin_ahmed
// pass: cuM0sBMP65wUeJGz
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jjl8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanic');
        const servicesCollection = database.collection('services');

        // GET API 
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        // GET Single Service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        // POST API 
        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
          console.log('hit the post api', service);
          res.json(service);
        })

        // DELETE API 
        app.delete('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        })
    }   
    finally {
        //await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Running Genius Server');
})
app.get('/hello', (req, res) => {
    res.send("Hello Guys! I am going to update heroku");
})
app.listen(port, () => {
    console.log("Listening to port", port);
})

/* 
    one time: 
    1. Create an Account on heroku
    2. Install Heroku Software

    Every Project: 
    1. git init 
    2. .gitignore (node_modules, env)
    3. push everything to git
    4. Make sure you have these scripts : 'start': 'node index.js'
    5. Make sure to put process.env.PORT || 5000 inside port variable
    6. Heroku Login 
    7. Heroku Create (Only one time for a project)
    8. Command: git push heroku main

    Update: 
    1. save everything and check locally then git add, git commit-m , git push 
    2. git push heroku main
*/