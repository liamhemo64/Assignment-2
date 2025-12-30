import express from "express";
const router = express.Router();
import userController from "../controllers/userController.ts";

router.post("/", userController.create.bind(userController));
router.delete("/:_id", userController.delete.bind(userController));
router.put("/:_id", userController.update.bind(userController));
router.get("/", userController.get.bind(userController));
router.get("/:_id", userController.getById.bind(userController));

export default router;
