const app = require("./app");
const connectDb = require("./config/db");

const startServer = async () => {
    try {
        const PORT = process.env.PORT;
        const server = app;
        server.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`)
        })
        // await connectDb()
    } catch (error) {
        console.log("Error while starting server");
        process.exit(1);
    }
}

startServer();
