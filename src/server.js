import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

const io = sailsIOClient(socketIOClient);

//io.sails.url="https://121.40.219.227/";
io.sails.url="https://www.opt.com.cn/";
io.sails.useCORSRouteToGetCookie = false;

export default io