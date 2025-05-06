const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 8000;
const server = http.createServer(app); // move this line up

initializeSocket(server); // now it's defined correctly

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
