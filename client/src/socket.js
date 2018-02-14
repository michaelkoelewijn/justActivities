// import openSocket from 'socket.io-client';
// export default openSocket('http://localhost:8000');
var host = window.location.hostname;

const io = require('socket.io-client')  
const HOST = ``
console.log(HOST);
export default io(HOST)

