const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/master.controller.js");

router.get("/:type", ctrl.getAll);          // /api/master/class
router.get("/one/:id", ctrl.getOne);        // /api/master/one/:id
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.put("/deactivate/:id", ctrl.deactivate);

module.exports = router;
