import { commentModel, type IComment } from "../models/commentModel.ts";
import genericController from "./genericController.ts";
import type { Request, Response } from "express";

class commentController extends genericController<IComment> {
  constructor() {
    super(commentModel);
  }
  
  async delete(req: Request, res: Response) {
    const id = req.params._id;
    try {
      const response = await this.model.findByIdAndDelete(id);

      if (!response) {
        return res.status(404).json({ error: `Item with id ${id} not found` });
      } 

      res.status(200).json(response);
      
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
}

export default new commentController();