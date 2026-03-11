import { getAllUsers, getUserByIdService, getUserQuery, NewUserRegister, UsersRoleCount,} from "../services/users.service.js"

export const getUsers = async (req, res) =>{
    const users = await getAllUsers();
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

export const createUser = async (req, res) =>{
    try {
        const user = await NewUserRegister(req.body);

        res.status(201).json({
            status : 201,
            message : "data has been posted",
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            status : 400,
            message : err.message,
        });
    }
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


export const UserRegister = async(req, res)=>{
    try {
    const data = req.body

    console.log(data)
    const user = await NewUserRegister(data);
    res.status(201).json({
        status : 201,
        message : `new user has been created`,
        data : user
    })
}
catch(err){
    res.status(400).json({
        status : 400,
        message :err.message
    })
}
    
};


