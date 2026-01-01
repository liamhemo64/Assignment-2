"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commentController_1 = __importDefault(require("../controllers/commentController"));
router.post("/", commentController_1.default.create.bind(commentController_1.default));
router.delete("/:_id", commentController_1.default.delete.bind(commentController_1.default));
router.put("/:_id", commentController_1.default.update.bind(commentController_1.default));
router.get("/", commentController_1.default.get.bind(commentController_1.default));
router.get("/:_id", commentController_1.default.getById.bind(commentController_1.default));
exports.default = router;
//# sourceMappingURL=commentRoutes.js.map