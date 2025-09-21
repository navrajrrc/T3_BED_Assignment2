// Importing morgan
import express, {Application, Request, Response} from "express";
import morgan from "morgan";

import {HTTP_STATUS} from "./constants/httpConstants";

const app: Application = express();

// alows app to read json
app.use(express.json());
// Use morgan for HTTP request logging
app.use(morgan("combined"));

//Interface for a health check endpoint
interface HealthCheckResponse {
    status: number;
    uptime: number;
    timestamp: string;
    version: string;
}

app.get("/api/v1/health", (req: Request, res: Response) => {
    const healthData: HealthCheckResponse = {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
})
export default app; 