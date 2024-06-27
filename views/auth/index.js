const express = require("express");
const AuthService = require("../../services/Auth");
const { validateLogin, validateCreate } = require("./schemas");
const respond = require("../../helpers/utils/respond");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validateCreate(req.body);
  if (error) return respond(res, { status: 400, data: error.details });

  try {
    const result = await AuthService.register(req.body);
    respond(res, { status: 200, data: result });
  } catch (error) {
    console.error(error);
    respond(res, {
      status: error.status,
      data: { code: error.code, message: error.message },
    });
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return respond(res, { status: 400, data: error.details });

  try {
    const result = await AuthService.login(req.body);
    respond(res, { status: 200, data: result });
  } catch (error) {
    console.error(error);
    respond(res, {
      status: error.status,
      data: { code: error.code, message: error.message },
    });
  }
});

module.exports = router;
