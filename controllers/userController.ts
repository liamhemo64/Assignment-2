import { userModel, type IUser } from "../models/userModel.ts";
import genericController from "./genericController.ts";

class userController extends genericController<IUser> {
  constructor() {
    super(userModel);
  }
}

export default new userController();
