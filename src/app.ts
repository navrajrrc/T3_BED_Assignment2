import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
// Importing morgan
import express, {Application, Request, Response} from "express";
import morgan from "morgan";
import { getHelmetConfig } from "../config/helmetConfig";

import {HTTP_STATUS} from "./constants/httpConstants";
import employeeRoutes from "./routes/employeesroutes";
import branchRoutes from "./routes/branchRoutes"
const app: Application = express();

// alows app to read json
app.use(express.json());
app.use(helmet(getHelmetConfig()));
// Use morgan for HTTP request logging
app.use(morgan("combined"));

//Interface for a health check endpoint
interface HealthCheckResponse {
    status: number;
    uptime: number;
    timestamp: string;
    version: string;
}

app.get("/health", (req: Request, res: Response) => {
    const healthData: HealthCheckResponse = {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.status(HTTP_STATUS.OK).send("Server is healthy");
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes)

export default app; 