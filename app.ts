import { AppConfig } from './src/app-config';
import { logger, mongoURL, port } from "./src/configs";

const startServer = async () => {
    try {
        const app = new AppConfig(mongoURL);
        app.getApp.listen(port, () => {
            logger.info(`[HTTP] Server listening in port ${port}.`);
        });
    } catch {
        process.exit(1);
    }
};

startServer().then();
