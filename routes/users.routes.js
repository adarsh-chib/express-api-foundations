import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
  createUser,
  replaceUserById,
  getUserbyQuery,
  getUserRoleCount,
  UserRegister,
  findUser,
  deleteUser,
  deleteId,
} from "../controller/users.controller.js";

const router = express.Router();

router.get("/user/:id", getUserById);
router.get("/user", getUserbyQuery);
router.get("/users/count", getUserRoleCount);

router.post("/user", createUser);
router.put("/user/:id", replaceUserById);

router.patch("/user/:id", updateUserById);

//-----------------------------------------------------

router.get("/users", getUsers); //---user list
router.post("/user/create", UserRegister);
router.get("/user/find/:id", findUser);
router.delete("/user/delete/:id", deleteUser);
router.delete("/delete/:id", deleteId);

export default router;
