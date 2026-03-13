import fs from "fs";
import { User } from "../models/users.models.js";

export const getUserByIdService = (id) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json"));
  const users = data.users || [];
  const find_id = users.find((user) => user.id === id);
  return find_id;
};

export const getUserQuery = (name, age) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json"));
  const filterByName = data.users.filter(
    (u) =>
      u.name.toLowerCase().includes(String(name).toLowerCase()) &&
      (age ? u.age === Number(age) : true),
  );
  return filterByName;
};

export const getUsersForPut = () => {
  const users = JSON.parse(fs.readFileSync("./data/data.json"));
  return users;
};

export const UsersRoleCount = () => {
  const data = JSON.parse(fs.readFileSync("./data/data.json"));
  const users = data.users || [];

  let admin = 0;
  let user = 0;

  for (let u of users) {
    const role = String(u.role || "")
      .toLowerCase()
      .trim();

    if (role === "admin") admin++;
    else if (role === "user") user++;
  }
  return {
    admin,
    user,
    toatl: users.length,
  };
};

//--------------------------------------------------------------------

export const getAllUsers = async () => {
  const users = await User.find({
    email: "soumya@gmal.com",
    name: "Soumya Thakur",
    role: "admin",
  });
  console.log(users, "users");

  return users;
};

export const NewUserRegister = async (data) => {
  const Users = await User.create(data);
  return Users;
};

export const findUserId = async (id) => {
  const findUser = await User.findById(id);
  return findUser;
};

export const deleteUsersId = async (id) => {
  const deleteUser = await User.deleteOne({ _id: id });

  return deleteUser;
};

//------------default delete + find ----------

export const findUerId = async (id) => {
  const findUser = await User.findById(id);
  return findUser;
};

export const deleteUserId = async (id) => {
  const data = findUerId(id);

  if (!data) {
    return null;
  }
  const deleteUser = await User.deleteOne({ _id: id });
  return deleteUser;
};

//------------------------ put method -----------------------------

export const replaceUserService = async (id, updateData) => {
  const user = await User.findById(id);

  if (!user) {
    return null;
  }
  const userUpadate = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return userUpadate;
};

export const fullUpdateUserService = async (email, updatedata) => {
  const finduser = await User.find({email});

  if (!finduser) {
    return null;
  }

  const userFound = await User.findOneAndUpdate(
    {email},
    updatedata,

    { new: true },
  );

  return userFound;
};

//------------------ patch --------------------------

export const updataUserService = async (id, updatedata) => {
  const user = await User.findByIdAndUpdate(id, updatedata, {
    $set: updatedata,
    new: true,
  });

  return user;
};
