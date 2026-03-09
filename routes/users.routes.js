import express from 'express'
import { deleteUserById, getUserById, getUsers, updateUserById, createUser, replaceUserById,} from '../controller/users.controller.js';



const router = express.Router();


router.get('/users',getUsers);
router.get('/user/:id',getUserById);

router.post('/user',createUser);
router.put('/user/:id',replaceUserById);


router.patch('/user/:id',updateUserById);

router.delete('/user/:id',deleteUserById);

export default router
