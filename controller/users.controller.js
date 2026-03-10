import { getAllUsers, getUserByIdService, getUserQuery, UsersRoleCount,} from "../services/users.service.js"

export const getUsers = (req, res) =>{
    const users = getAllUsers();
    // res.send('users data');
    // res.status(200).send('ok');
    res.status(200).json({
        status: 200 ,
        message : "ok",
        data : users});
}

export const getUserById = (req, res) =>{
    const id = Number(req.params.id);
    const data = getUserByIdService(id);

    if(!data){
        return res.status(404).json({message : "user not found"});
    }
    res.json(data);
}

export const getUserbyQuery = (req, res) => {
    const {name, age} = req.query
    console.log(name,age);
    
    const searchQuery = getUserQuery(name, age);

    if(searchQuery.length === 0){
       return res.status(404).json({
        status : 404,
        message : `${name} data not found`,
       });
    }
    res.json({
        status : 200,
        message : 'ok',
        data : searchQuery
    })
}


export const getUserRoleCount = (req, res)=>{
    const roleCount = UsersRoleCount();
    res.json({
        status: 200,
        message: "ok",
        data: roleCount
           })
}

export const createUser = (req, res) =>{
    res.status(201).json({
        status : 200,
        message : "data has been posted",
    })
}


export const replaceUserById = (req, res) =>{
    const id = Number(req.params.id);
    res.status(201).json({
        status : 200,
        message : `id ${id} has been updated`,
    })
}

export const updateUserById = (req, res) =>{
    const id = Number(req.params.id);
    res.status(201).json({
        status : 200,
        message : `id ${id} has been updated`,
    })
}

export const deleteUserById = (req, res) =>{
    const id = Number(req.params.id);
    res.status(201).json({
        status : 200,
        message : `id ${id} has been been deleted`,
    })
}

