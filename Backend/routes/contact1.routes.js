const express = require("express");
const router = express.Router();
const { imageUpload } = require("../middleware.js/upload");
const contactController = require("../controller/contact1.controller");

router.post("/create", imageUpload.single("picture"), contactController.createContact);

router.get("/all", contactController.getContacts);

router.put("/update/:id", imageUpload.single("picture"), contactController.updateContact);
router.delete("/delete/:id", contactController.deleteContact);
module.exports = router;
