import express from 'express';
import { checkStreamKey, setNewStreamKey } from '../utils/firestore/verifiaction';
import errorStrings from '../utils/errors';

var router = express.Router();

router.post('/setuserkey', async function (req, res, next) {
    let data = {uid: req.body.name};

    setNewStreamKey(data.uid).then(key => {
        res.status(200).send(key)
    }).catch(error => {
        res.status(500).send(error.message)
    });
});

router.post('/checkuserkey', async function (req, res, next) {
    let data = {uid: req.body.name, key: req.body.key};

    checkStreamKey(data.uid, data.key).then(result => {
        res.status(200).send('key correcta')
    }).catch(error => {
        let msg = error.message
        if(msg === errorStrings.NO_USER || msg === errorStrings.WRONG_KEY)
            res.status(401).send(msg)
        else
            res.status(500).send(msg)
    });
});

export default router;
