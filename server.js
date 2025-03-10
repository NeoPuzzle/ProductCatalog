const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("src/mocks/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default server;