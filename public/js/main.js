const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get Username and room from url;
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});



const socket = io()

//Join Chat room 
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

//message from server
socket.on('message', message => {

    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// message submit 
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value

    //emiting message to server
    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

})


// output message to doom
function outputMessage(message) {

    const div = document.createElement('div')
    div.classList.add('p-3');
    div.classList.add('mb-4');
    div.classList.add('mt-[6px]');
    div.classList.add('mx-[7px]');
    if(username === message.username){
        div.classList.add('user-message');
        div.classList.add('bg-green-300');
        div.classList.add('text-end');
    }else{
        div.classList.add('income-message');
        div.classList.add('bg-gray-200');
    }
    div.innerHTML = `
    <p class="text-4 font-bold text-purple-800 opacity-70 mb-2">${message.username} <span class="text-gray-600">${" " + message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)

};

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.classList.add('text-xl')
        li.innerText = user.username;
        userList.appendChild(li);
    });
}

function outputRoomName(room) {
    roomName.innerText = room;
};

