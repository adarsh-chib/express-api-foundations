import express from 'express'
import router from './routes/users.routes.js';
import { requestLogger } from './middleware/request-logger.middleware.js';
import dotenv from 'dotenv'
import { connectDB } from './config/config.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(requestLogger);
app.use('/api',router);


const startServer = async() =>{
    await connectDB();
    app.listen(PORT, ()=>{
    console.log(`sever has been started at http://localhost:${PORT}`);
});
}

startServer()



