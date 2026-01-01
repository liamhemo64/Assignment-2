"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
router.post("/", userController_1.default.create.bind(userController_1.default));
router.delete("/:_id", userController_1.default.delete.bind(userController_1.default));
router.put("/:_id", userController_1.default.update.bind(userController_1.default));
router.get("/", userController_1.default.get.bind(userController_1.default));
router.get("/:_id", userController_1.default.getById.bind(userController_1.default));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map