import { Router } from "express";
const userRoute = new Router();
import {
  DeleteAccount,
  Login,
  Register,
  UpdateUser,
} from "../controllers/User";
import { verifyToken } from "../middleware/auth";

// routes //

userRoute.post("/users/register", Register);
userRoute.post("/users/login", Login);
userRoute.put("/users/update", UpdateUser);
userRoute.delete("/users/delete_account", DeleteAccount);

export default userRoute;
