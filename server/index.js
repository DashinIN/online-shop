require('dotenv').config();
const express = require('express');
const sequelize = require("./bd");
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || 5000;
//прикол 
// otvet na prikol
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);



app.get("/", (req, res) => {
    res.send('<h1>HEE</h1>')
})


const start = async () => {
    try {
       await sequelize.authenticate();
       await sequelize.sync();
       app.listen(PORT, () => console.log(`server start on port ${PORT}`));
    } catch (e){
        console.log(e);

    }
}

start();
