import fs from 'fs'
import { User } from '../models/users.models.js'

export const getAllUsers = async() => {
    const users = await User.find({});

    return users    
}


export const getUserByIdService = (id) =>{
    const users = JSON.parse(fs.readFileSync('./data/data.json'));
    const find_id = users.find((user)=> user.id === id);
    return find_id
}

export const getUserQuery = (name, age) => {
    const data = JSON.parse(fs.readFileSync('./data/data.json'));
    const filterByName = data.users.filter((u) =>
    u.name.toLowerCase().includes(String(name).toLowerCase()) && (age ? u.age === Number(age) : true));
    return filterByName
}

export const getUsersForPut = () => {
    const users = JSON.parse(fs.readFileSync('./data/data.json'));
    return users    
}

export const UsersRoleCount = ()=>{
    const data = JSON.parse(fs.readFileSync('./data/data.json'));
    const users = data.users || []

    let admin = 0;
    let user = 0;

    for(let u of users){
        const role = String(u.role || "").toLowerCase().trim();

        if(role === "admin") admin ++;
        else if (role === "user") user++
    }
        return{
            admin,
            user,
            toatl : users.length
        }

    }


    export const NewUserRegister = async (data)=>{
        console.log(data);
        const Users = await User.create(data);
        return Users;

    }
