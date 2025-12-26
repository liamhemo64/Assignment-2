import type { Request, Response } from "express";
import { userModel, type IUser } from "../models/userModel.ts";
import genericController from "./genericController.ts";

class UserController extends genericController<IUser> {
  constructor() {
    super(userModel);
  }

  async update(req: Request, res: Response) {
    // IMPORTANT: It must be '_id' because your router says "/:_id"
    const id = req.params._id;
    const { email, password, username } = req.body;

    try {
      // Check if ID is missing
      if (!id) {
        return res.status(400).json({ error: "ID parameter is missing" });
      }

      // 1. Check for email uniqueness (excluding current user)
      if (email) {
        const existingUser = await userModel.findOne({
          email,
          _id: { $ne: id },
        });

        if (existingUser) {
          return res.status(400).json({ error: "Email is already in use" });
        }
      }

      // 2. Perform the update
      const updatedUser = await userModel
        .findByIdAndUpdate(
          id,
          { email, password, username },
          { new: true, runValidators: true }
        )
        .select("-password");

      if (!updatedUser) {
        return res.status(404).json({ error: `User not found with id ${id}` });
      }

      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
}

export default new UserController();
