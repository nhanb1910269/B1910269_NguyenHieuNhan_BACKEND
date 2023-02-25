
/*
const app = require("./app");
const config = require("./app/config");

const port = config.app.port;
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}    )`);
});
*/



const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer(){
    try {
        await MongoDB.connect(config.db.url);
        console.log("Connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Sever is running on port ${PORT}`);
        })
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();