const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const chatHeader = document.querySelectorAll('.chat-header');
const chatHeaderText = document.querySelectorAll('.chat-header-text');
const chatinfo = document.querySelector('.chaters');
const chatbartext = document.querySelectorAll('.chatbar-text');
const sendbtn = document.querySelector('.chat-send-btn')

let storage = localStorage.getItem('color-mode');
let colorMode = storage === "white-mode" ? "white-mode" : "darkMode";




// Get Username and room from url;
const { username, room, whitemode } = Qs.parse(location.search, {
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
    if (username === message.username) {
        div.classList.add('user-message');
        div.classList.add('bg-green-300');
        div.classList.add('text-end');
    } else {
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
    const colorMode = localStorage.getItem('color-mode');
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.classList.add('text-xl')
        if (colorMode === "darkMode") {
            li.classList.add('text-black')

        } else {

            li.classList.add('text-[#ff9376]')
        }
        li.innerText = user.username;
        userList.appendChild(li);
    });
}

function outputRoomName(room) {
    roomName.innerText = room;
};



window.addEventListener('load', () => {
    console.log("shubeeee");
    const colorMode = localStorage.getItem('color-mode');
    if (colorMode === "darkMode") {
        document.body.classList.toggle('dark');
        // chatHeader.classList.toggle('dark');
        chatHeader.forEach(text => text.classList.toggle('dark'));
        chatHeaderText.forEach(text => text.classList.toggle('dark'));
        chatinfo.classList.toggle('dark');
        chatbartext.forEach(text => text.classList.toggle('dark'));
        sendbtn.classList.toggle('dark');
    }

});

checkbox.addEventListener('change', () => {
    const colorMode = localStorage.getItem('color-mode');
    colorMode
    if (colorMode === "darkMode") {
        localStorage.setItem('color-mode', "whit-mode")
    } else {
        localStorage.setItem('color-mode', "darkMode")

    }
    document.body.classList.toggle('dark');
    // chatHeader.classList.toggle('dark');
    chatHeader.forEach(text => text.classList.toggle('dark'));
    chatHeaderText.forEach(text => text.classList.toggle('dark'));
    chatinfo.classList.toggle('dark');
    chatbartext.forEach(text => text.classList.toggle('dark'));
    sendbtn.classList.toggle('dark');

});
