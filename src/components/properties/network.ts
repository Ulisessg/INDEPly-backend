import express from 'express';
import Controller from './controller';

const ctrl = new Controller();

const router = express.Router();

router.get('/', (req, res) => {
  ctrl
    .getAllInfo('SELECT * FROM indeply_db.properties')
    .then((info) => {
      res.json({ error: false, data: info });
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: true, message: 'Internal server error' });
    });
});

router.post('/add-info', (req, res) => {
  ctrl
    .insert()
    .then((response) => {
      res.json({ error: false, message: response });
    })
    .catch((reason) => {
      console.log(reason);

      res.json({ error: true });
    });
});

export default router;
