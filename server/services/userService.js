const query=require('./SQLRequests') ;
const db = require('../tools/db');

const createUser=(user)=>{
    const {full_name, email, password_hash, phone, role}=user
    return query.queryPost('users',{email:email,password:password_hash,name:full_name,phone:phone,role:role})  
}

const getUserById=(id)=>{
    return query.queryGet('clients', id)
}

const getAllUsers = async () => {
    const [rows] = await db.queryGet('users');
    return rows;
}

const getUserByCredentials = async (username, password) => {
    const [rows] = await db.query(
        `SELECT u.* FROM users u
         JOIN passwords p ON u.id = p.userId
         WHERE u.username = ? AND p.password = ?`,
        [username, password]
    );
    return rows[0] || null;
}

const deleteUser=async (id)=>{
    return query.queryDelete('users', id)
}

const updateUser=async (id, name)=>{
    return query.queryUpdate('users', id, {name: name})
}

module.exports={createUser, getUserById, getAllUsers, getUserByCredentials, deleteUser, updateUser}