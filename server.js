import express from 'express'
import router from './routes/users.routes.js';
import { requestLogger } from './middleware/request-logger.middleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(requestLogger);
app.use('/api',router);

app.listen(PORT, ()=>{
    console.log(`sever has been started at http://localhost:${PORT}`);
});

