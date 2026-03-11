import express from 'express'
import { deleteUserById, getUserById, getUsers, updateUserById, createUser, replaceUserById, getUserbyQuery, getUserRoleCount, UserRegister,} from '../controller/users.controller.js';



const router = express.Router();


router.get('/users',getUsers);
router.get('/user/:id',getUserById);
router.get('/user',getUserbyQuery);
router.get('/users/count',getUserRoleCount)

router.post('/user',createUser);
router.put('/user/:id',replaceUserById);


router.patch('/user/:id',updateUserById);

router.delete('/user/:id',deleteUserById);

router.post('/user/create',UserRegister);

export default router
