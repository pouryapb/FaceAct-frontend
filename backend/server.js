import { createServer } from "http";
import app from "./app";

const port = process.env.PORT || 8000;

const server = createServer(app);

server.listen(port);
