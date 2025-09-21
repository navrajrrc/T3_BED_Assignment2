import app from "./app";

import { Server } from "http";

const PORT: number | string = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) as Server;

export default Server;