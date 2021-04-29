/* eslint-disable operator-linebreak */
import express from 'express';
import Controller from './controller';
import { auth } from '../../config';

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
  const { email } = req.body;
  const { emailPassword } = req.body;

  // Security check
  if (
    typeof email !== typeof '' ||
    typeof emailPassword !== typeof '' ||
    email !== auth.email ||
    emailPassword !== auth.emailPassword
  ) {
    res.json({ error: true, message: 'Internal server error' });
  } else {
    ctrl
      .insert()
      .then((response) => {
        res.json({ error: false, message: response });
      })
      .catch((reason) => {
        console.log(reason);

        res.json({ error: true });
      });
  }
});

export default router;
