const express = require("express");
const router = express.Router();
const SupplierService = require("../../services/Supplier");
const { validateUpdate, validateCreate } = require("./schemas");
const { respond, authRequired } = require("../../helpers/utils");

router.post("/create", authRequired, async (req, res) => {
  const { error } = validateCreate(req.body);
  if (error) return respond(res, { status: 400, data: error.details });

  SupplierService.create(req.body)
    .then((result) => {
      respond(res, { status: 201, data: result });
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

  SupplierService.update(req.params.id, req.body)
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

router.get("/get/:id", async (req, res) => {
  SupplierService.get(req.params.id)
    .then((result) => {
      respond(res, { data: result });
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
  SupplierService.list()
    .then((result) => {
      respond(res, { data: result });
    })
    .catch((error) => {
      console.error(error);
      respond(res, {
        status: error.status,
        data: { code: error.code, message: error.message },
      });
    });
});

router.delete("/:id", authRequired, async (req, res) => {
  SupplierService.delete(req.params.id)
    .then((result) => {
      respond(res, { data: result });
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
