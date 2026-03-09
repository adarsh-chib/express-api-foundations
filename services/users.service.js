import fs from 'fs'

export const getAllUsers = () => {
    const users = JSON.parse(fs.readFileSync('./data/data.json'));
    return users    
}


export const getUserByIdService = (id) =>{
    const users = JSON.parse(fs.readFileSync('./data/data.json'));
    const find_id = users.find((user)=> user.id === id);
    return find_id
}

export const getUsersForPut = () => {
    const users = JSON.parse(fs.readFileSync('./data/data.json'));
    return users    
}

