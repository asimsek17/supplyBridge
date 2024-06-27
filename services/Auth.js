require("dotenv").config();
const { comparePasswords, generateToken } = require("../helpers/utils");
const { User } = require("../models");
const { RESPONSE_CODES } = require("../helpers/constants/response_codes");
const AuthService = {
  register: async (params) => {
    const existingUser = await User.findOne({ where: { email: params.email } });
    if (existingUser) {
      throw {
        code: RESPONSE_CODES.USER_EXISTS.CODE,
        message: RESPONSE_CODES.USER_EXISTS.MESSAGE,
        isHandled: true,
        status: 400,
      };
    }

    const user = await User.create(params);
    const token = generateToken(user.id);

    return { message: "User registered successfully", token };
  },

  login: async (params) => {
    const { email, password } = params;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePasswords(password, user.password))) {
      throw {
        code: RESPONSE_CODES.INVALID_CREDENTIALS.CODE,
        message: RESPONSE_CODES.INVALID_CREDENTIALS.MESSAGE,
        isHandled: true,
        status: 400,
      };
    }
    const token = generateToken(user.id);
    return { message: "Login successful", token };
  },
  getUserById: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw {
        code: RESPONSE_CODES.USER_NOT_FOUND.CODE,
        message: RESPONSE_CODES.USER_NOT_FOUND.MESSAGE,
        isHandled: true,
        status: 400,
      };
    }
    return user;
  },
};

module.exports = AuthService;
