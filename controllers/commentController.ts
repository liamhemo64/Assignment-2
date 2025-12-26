import { commentModel, type IComment } from "../models/commentModel.ts";
import genericController from "./genericController.ts";
import type { Request, Response } from "express";

class commentController extends genericController<IComment> {
  constructor() {
    super(commentModel);
  }
}

export default new commentController();
