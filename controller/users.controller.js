import mongoose from "mongoose";
import {
  deleteUserId,
  deleteUsersId,
  findUserId,
  fullUpdateUserService,
  getAllUsers,
  getUserByIdService,
  getUserQuery,
  NewUserRegister,
  replaceUserService,
  updataUserService,
  UsersRoleCount,
} from "../services/users.service.js";
import { User } from "../models/users.models.js";

export const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const data = getUserByIdService(id);

  if (!data) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(data);
};

export const getUserbyQuery = (req, res) => {
  const { name, age } = req.query;

  const searchQuery = getUserQuery(name, age);

  if (searchQuery.length === 0) {
    return res.status(404).json({
      status: 404,
      message: `${name} data not found`,
    });
  }
  res.json({
    status: 200,
    message: "ok",
    data: searchQuery,
  });
};

export const getUserRoleCount = (req, res) => {
  const roleCount = UsersRoleCount();
  res.json({
    status: 200,
    message: "ok",
    data: roleCount,
  });
};

export const createUser = async (req, res) => {
  try {
    const user = await NewUserRegister(req.body);

    res.status(201).json({
      status: 201,
      message: "data has been posted",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

export const replaceUserById = (req, res) => {
  const id = Number(req.params.id);
  res.status(201).json({
    status: 200,
    message: `id ${id} has been updated`,
  });
};

export const updateUserById = (req, res) => {
  const id = Number(req.params.id);
  res.status(201).json({
    status: 200,
    message: `id ${id} has been updated`,
  });
};

export const deleteUserById = (req, res) => {
  const id = Number(req.params.id);
  res.status(201).json({
    status: 200,
    message: `id ${id} has been been deleted`,
  });
};

//---------------------------------------------------------------------------------------------------

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  if (users.length === 0) {
    return res.status(400).json({
      status: 400,
      message: "data not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "ok",
    data: users,
  });
};

export const UserRegister = async (req, res) => {
  const data = req.body;

  if (!data.name || !data.email || !data.phoneNumber) {
    return res.status(404).json({
      status: 404,
      message: "fill the required information",
    });
  }

  try {
    const user = await NewUserRegister(data);
    res.status(201).json({
      status: 201,
      message: `new user has been created`,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export const findUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findId = await findUserId(id);

    if (!findId) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "ok",
      data: findId,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const Userdelete = await deleteUsersId(id);
    res.status(200).json({
      status: 200,
      message: `Document ${id} successfully deleted`,
      data: Userdelete,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

//----------------------------default delete ----------------------------//

export const deleteId = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid id",
    });
  }
  const user = findUserId(id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "data not found",
    });
  }

  try {
    const data = await deleteUserId(id);
    if (data.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: `user not found with this ${id}`,
      });
    }

    res.status(200).json({
      status: 200,
      message: `${id} data has been deleted`,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

//--------------------- put method ---------------------------------

export const replaceUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phoneNumber, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid id",
    });
  }

  try {
    const update = await replaceUserService(id, {
      name,
      email,
      phoneNumber,
      role,
    });

    if (!update) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "user has been updated",
      data: update,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export const fullUpdate = async (req, res) =>{
  const email = req.params.email;
  console.log(email);
  const {name , phoneNumber, role} = req.body

  const updateUser = await fullUpdateUserService(email, {name , phoneNumber, role} )

  try{
    if(!updateUser){
      return res.status(404).json({
        status : 404,
        message : 'user not found'
      })
    }
    res.status(200).json({
      status : 200,
      message : 'ok',
      data : updateUser
    })
  }
  catch(err){
    res.status(500).json({
      status : 500,
      message : err.message
    })
  }
}

//------------------------- patch method ---------------------------

export const userUpdate = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid id",
    });
  }

  try {
    const UpdateUser = await updataUserService(id, updateData);

    if (!UpdateUser) {
      return res.status(404).json({
        status: 404,
        message: "data not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "ok",
      data: UpdateUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};
