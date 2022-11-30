//---------- 0 start
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware ------1
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');

//-------- 2
app.get("/", (req, res) => {
  res.send("Route is working! Broooooo!");
});

// ---------- 4
// Posting to database --------------
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);

// -------3
module.exports = app;

// last -> 9


// will start : 7-3 Delete documents using mongoose --- 7 mimit finish

