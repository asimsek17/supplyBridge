const router = require("express").Router();
const { respond, authRequired } = require("../../helpers/utils");
const CompService = require("../../services/Component");
const { validateUpdate, validateCreate } = require("./schemas");

router.get("/get/:id", async (req, res) => {
  CompService.get(req.params.id)
    .then((result) => {
      respond(res, { status: 200, data: result });
    })
    .catch((error) => {
      console.error(error);

      respond(res, {
        status: error.status,
        data: { code: error.code, message: error.message },
      });
    });
});
router.get("/list", async (req, res) => {
  CompService.list()
    .then((result) => {
      respond(res, { data: result });
    })
    .catch((error) => {
      respond(res, {
        status: error.status,
        data: { code: error.code, message: error.message },
      });
    });
});

router.delete("/:id", authRequired, async (req, res) => {
  CompService.delete(req.params.id)
    .then((result) => {
      respond(res, { status: 200, data: result });
    })
    .catch((error) => {
      console.error(error);
      respond(res, {
        status: error.status,
        data: { code: error.code, message: error.message },
      });
    });
});

router.put("/update/:id", authRequired, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return respond(res, { status: 400, data: error.details });

  CompService.update(req.params.id, req.body)
    .then((result) => {
      respond(res, { status: 200, data: result });
    })
    .catch((error) => {
      console.error(error);
      respond(res, {
        status: error.status,
        data: { code: error.code, message: error.message },
      });
    });
});
router.post("/create", authRequired, async (req, res) => {
  const { error } = validateCreate(req.body);
  if (error) return respond(res, { status: 400, data: error.details });

  CompService.create(req.body)
    .then((result) => {
      respond(res, { status: 201,  data: result });
    })
    .catch((error) => {
      console.error(error);
      respond(res, {
        status: error.status,
        data: { code: error.code, message: error.message },
      });
    });
});

module.exports = router;
