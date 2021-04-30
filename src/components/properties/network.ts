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

// Get the federal entities existing
router.get('/federal-entitie', (req, res) => {
  ctrl
    .getAllInfo(
      `SELECT EntidadFederativa FROM ${dbConfig.dbName}.properties GROUP BY EntidadFederativa`,
    )
    .then((data) => {
      res.json({ error: false, message: data });
    })
    .catch((reason) => {
      console.log(reason);
      res.json({ error: true, message: 'Internal Server Error' });
    });
});

// Get the properties types existing
router.get('/property-types', (req, res) => {
  ctrl
    .getAllInfo(
      `SELECT TipoInmueble FROM ${dbConfig.dbName}.properties GROUP BY TipoInmueble`,
    )
    .then((data) => {
      res.json({ error: false, message: data });
    })
    .catch((reason) => {
      console.log(reason);
      res.json({ error: true, message: 'Internal Server Error' });
    });
});

router.get('/current', (req, res) => {
  // Three posible filters: Municipios, federal entities, properties types
  const { filter } = req.body;

  ctrl
    .mostRecurrent(filter)
    .then((data: any) => {
      res.json({ error: false, message: data });
    })
    .catch((reason) => {
      console.log(reason);
      res.json({ error: true, message: 'Internal Server Error' });
    });
});

export default router;
