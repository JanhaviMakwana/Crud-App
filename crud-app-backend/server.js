const express = require("express"); //for building rest api
const bodyParser = require("body-parser"); //helps to parse the request and create the req.body object
const cors = require("cors") // provides express middleware to enable CORS with various options
/* const router = require('./app/routes/routes'); */
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})


app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        allowHeaders: ['Access-Control-Allow-Origin'],
        credentials: true
    }
});
 

require("./app/routes/routes")(app);
const db = require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to crud application" });
});


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});