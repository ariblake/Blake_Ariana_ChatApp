// imports always go first - if we're importing anything

// this is getting loaded in from our node_modules folder - make a socket variable and instantiate it here
const socket = io();

// the packet is whatever data we senf through with the connect event from the server
function setUserId(packet) {
    //debugger;
    console.log(packet);
}

function showDisconnectMessage() {
    console.log('a user disconnected');
}


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);