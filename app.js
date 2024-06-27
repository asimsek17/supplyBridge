require('dotenv').config();
const express = require('express');

const componentApi = require("./views/component");
const oemApi = require("./views/oem");
const supplierApi = require("./views/supplier");
const vehicleApi = require("./views/vehicle");
const authApi = require("./views/auth");



const app = express();

app.use(express.json());


app.use('/api/component', componentApi);
app.use('/api/oem', oemApi);
app.use('/api/supplier', supplierApi);
app.use('/api/vehicle', vehicleApi);
app.use('/api/auth', authApi);





let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on ${port} `);
});




