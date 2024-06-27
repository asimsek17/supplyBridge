const bcrypt = require("bcryptjs");

const comparePasswords = async (given, hashed) => {
    return await bcrypt.compare(given, hashed);
};

module.exports = comparePasswords;