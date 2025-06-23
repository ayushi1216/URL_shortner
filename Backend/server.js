const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const sequelize = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', urlRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
}).catch(err => console.log('DB connection error: ', err));

