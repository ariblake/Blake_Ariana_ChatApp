// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

// this is getting loaded in from our node_modules folder - make a socket variable and instantiate it here
const socket = io();

// // append text if someone is online
// socket.on('is_online', function(username) {
//     $('#messages').append($('<li>').html(username));
// });
// // ask username
// var username = prompt('Please tell me your name');
// socket.emit('username', username);

// the packet is whatever data we senf through with the connect event from the server
// referring to the object key from app.js, just choosing sID rather than everything - data destructuring (look up on MDN)
function setUserId({sID}) {
    //debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('a user disconnected');
    io.emit('a user has disconnected');
}

function appendMessage(message) {
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        message: "", // store whatever we type in the text area
        nickname: "",
        //typing: false,
        messages: [
            // {
            //     name: "Ariana",
            //     content: "hey"
            // }
        ]
    },

    methods: {
        // emit a message event to the server so thay it can in turn send this to anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');

            // the double pipe || is an "or" operator
            // if the first value is set, use it, else use whatever comes after the "or" operator
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })

            this.message = "";
        }
    },

    mounted: function() {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);