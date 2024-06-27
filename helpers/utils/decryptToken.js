const jwt = require("jsonwebtoken");
require('dotenv').config(); 
function decryptToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = decryptToken;