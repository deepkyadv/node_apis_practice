const express = require("express");
const router = express();
const storage = require('../middleware/Multer');
const multer = require("multer");

const userController = require("../controlers/userController");
const uploads = multer({ storage: storage.storage }); 

// router.post("/add-user", uploads.single('file'), userController.postData);
router.post("/add-user", userController.postData);

router.get("/get-user", userController.getUser);
router.put("/update-user", userController.updateUsers);
router.delete("/delete-user", userController.deleteUser);
router.post('/user-login', userController.loginUser);
// router.get('/verifyMail', userController.verifyMail);


module.exports = router;