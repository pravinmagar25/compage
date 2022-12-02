import express, {Application, Request, Response, Router} from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import helmet from "helmet";
import compageRouter from "./routes/compage";
import githubRouter from "./routes/github";
import authRouter from "./routes/auth";
import {config} from "./util/constants";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet())

// Enabled Access-Control-Allow-Origin", "*" in the header to by-pass the CORS error.
app.use((req: Request, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    //Needed for PUT requests
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.get('/', (req: Request, res: Response) => {
    res.send('TS App is Running')
})

const routes = Router();
routes.use('/compage', compageRouter);
routes.use('/github', githubRouter);
routes.use('/auth', authRouter);
app.use(routes)

app.get("*", (req, res) => {
    return res.status(200).json("you have reached default route");
});

app.listen(config.server_port, () => {
    console.log(`server is running on PORT ${config.server_port}`)
})