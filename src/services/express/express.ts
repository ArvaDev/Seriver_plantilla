import express from 'express';
import cors from 'cors';
import routes from '../../entities/routes';

const app = express();
const PORT = 3000;

export const startServer = () => {
    app.use(express.json());
    app.use(cors());

    if (!routes)
        console.log('🔴 error');
    else 
        console.log('🟢 routes loaded');
        app.use(routes);

    app.get('/', (_, res) => {
        res.send('Hello World!');
    });

    app.listen(PORT, () => {
        console.log(`🟢 Server run in ${PORT}`);
    });
}