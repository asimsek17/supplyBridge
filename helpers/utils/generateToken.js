const jwt = require("jsonwebtoken");
require('dotenv').config(); 
function generateToken(id) {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET);
}

module.exports = generateToken;