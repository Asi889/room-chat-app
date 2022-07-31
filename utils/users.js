const users = [];

//Join user to chat
function userJoin(id, username, room) {

    const user = { id, username, room };

    users.push(user);

    return user;
};

//Get current username, room
function getCurrentUser(id) {
    return users.find(user => user.id === id)
};

//user leaves chat room
function userLeave(id) {
    const index = users.find(user => user.id === id);
    const indexof = users.indexOf(index);
    
    users.splice(indexof, 1); 
    
    return index;
};

// get room users 
function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}


module.exports = {

    getCurrentUser,
    userJoin,
    userLeave,
    getRoomUsers
}
