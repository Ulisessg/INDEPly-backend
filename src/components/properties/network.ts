/* eslint-disable operator-linebreak */
import express from 'express';
import Controller from './controller';
import { auth, dbConfig } from '../../config';
import Responses from '../../utils/Responses';

const Response = new Responses();
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
        Response.success(req, res, info);
      })
      .catch((err) => {
        Response.error(req, res, err);
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
        Response.success(req, res, info);
      })
      .catch((err) => {
        Response.error(req, res, err);
      });
  }
});

// Insert Info in DB
router.post('/add-info', (req, res) => {
  const { email } = req.body;
  const { emailPassword } = req.body;

  // Security check
  if (
    typeof email === 'undefined' ||
    typeof emailPassword === 'undefined' ||
    email !== auth.email ||
    emailPassword !== auth.emailPassword
  ) {
    Response.error(req, res, 'Security check failed');
  } else {
    ctrl
      .insert()
      .then((data) => {
        Response.success(req, res, data);
      })
      .catch((reason) => {
        Response.error(req, res, reason);
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
      Response.success(req, res, data);
    })
    .catch((reason) => {
      Response.error(req, res, reason);
    });
});

// Get the properties types existing
router.get('/property-types', (req, res) => {
  ctrl
    .getAllInfo(
      `SELECT TipoInmueble FROM ${dbConfig.dbName}.properties GROUP BY TipoInmueble`,
    )
    .then((data) => {
      Response.success(req, res, data);
    })
    .catch((reason) => {
      Response.error(req, res, reason);
    });
});

router.get('/data-comparation', (req, res) => {
  // Three posible filters: Municipios, federal entities, properties types
  const { filter } = req.body;

  ctrl
    .mostRecurrent(filter)
    .then((data: any) => {
      Response.success(req, res, data);
    })
    .catch((reason) => {
      Response.error(req, res, reason);
    });
});

export default router;
