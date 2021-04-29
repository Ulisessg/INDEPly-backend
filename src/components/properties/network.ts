/* eslint-disable operator-linebreak */
import express from 'express';
import Controller from './controller';
import { auth, dbConfig } from '../../config';

const ctrl = new Controller();

const router = express.Router();

// Get info
router.get('/', (req, res) => {
  const { propertyType } = req.query;
  const { federalEntity } = req.query;
  let { limit } = req.query;
  let { offset } = req.query;

  if (typeof limit === 'undefined') {
    limit = '10';
  }

  if (typeof offset === 'undefined') {
    offset = '0';
  }

  if (
    typeof propertyType === 'undefined' &&
    typeof federalEntity === 'undefined'
  ) {
    ctrl
      .getAllInfo(
        `SELECT * FROM ${dbConfig.dbName}.properties LIMIT ${limit} OFFSET ${offset}`,
      )
      .then((info) => {
        res.json({ error: false, data: info });
      })
      .catch((err) => {
        console.log(err);
        res.send({ error: true, message: 'Internal server error' });
      });
  } else {
    ctrl
      .filterWithQuery(
        <string | undefined>propertyType,
        <string | undefined>federalEntity,
        <string>limit,
        <string>offset,
      )
      .then((info) => {
        res.json({ error: false, data: info });
      })
      .catch((err) => {
        console.log(err);
        res.send({ error: true, message: 'Internal server error' });
      });
  }
});

// Insert Info in DB
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
