import { App } from './src/app-config';
import { mongoURL, port } from "./src/configs";

const startServer = () => {
    try {
        const app = new App(mongoURL);
        app.getApp.listen(port, () => {
            console.log(`[HTTP] Server listening in port ${port}.`);
        });
    } catch {
        process.exit(1);
    }
};

startServer();
