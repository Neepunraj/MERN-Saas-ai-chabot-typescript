import express from "express";
import morgan from 'morgan';
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map