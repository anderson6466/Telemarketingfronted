import express from 'express';

const router = express.Router();
const app = express();

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
});

router.post('/registerLogger', (req, res) => {
    console.log('Stored data! ' + req.body.key);
    console.log('Stored data! ' + JSON.stringify(req.body.value));
    res.status(200).json({app: 'Logger', codigoRespuesta: '01'});
});

module.exports = {
    path: '/api',
    handler: router
}