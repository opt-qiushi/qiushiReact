import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

const io = sailsIOClient(socketIOClient);

io.sails.url="http://121.40.219.227/";

export default io