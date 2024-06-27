require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: false });
  } catch (err) {
    process.exit(1); 
  }
};


module.exports = sequelize;
