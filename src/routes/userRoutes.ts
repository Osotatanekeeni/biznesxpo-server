import express from "express";
import { body } from "express-validator";
import controller from "../controllers/userController";

const router = express.Router();

router.post(
    "/register",
    body("firstName").isAlpha(),
    body("lastName").isAlpha(),
    body("phoneNumber").isLength({ min: 11, max: 11 }),
    body("email").isEmail(),
    controller.registerUser
  );
  router.get("/user/:id", controller.getUserDetails);
  router.put("/user/:id", controller.updateUserDetails);

  export default router;