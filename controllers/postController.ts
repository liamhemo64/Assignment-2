import { postModel, type IPost} from "../models/postModel.ts";
import genericController from "./genericController.ts";

class postController extends genericController<IPost> {
  constructor() {
    super(postModel);
  }
}

export default new postController();