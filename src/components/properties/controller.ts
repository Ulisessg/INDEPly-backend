/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { dbConfig } from '../../config';
import propertyType from '../../types/propertyType';
import queryInfo from '../../utils/queryInfo';
import insertinfo from '../../utils/insertInfo';

const connectionConfig = {
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  password: dbConfig.dbPassword,
  user: dbConfig.dbUsername,
  database: dbConfig.dbName,
};

class PropertiesController {
  getAllInfo(query: string): Promise<Array<propertyType | any>> {
    const config = {
      ...connectionConfig,
      query,
    };

    return queryInfo(config);
  }

  private insertMany(query: string, data: any) {
    const insertManyConfig = {
      ...connectionConfig,
      query,
      data,
    };

    return insertinfo(insertManyConfig);
  }

  private requestIndepInfo() {
    return axios.get(
      'http://datos.sae.gob.mx/ArchivosDatos/Bienes/CatalogoBienesInmueblesAdmon/Actual/Catalogo_de_Bienes_Inmuebles_en_administracion_susceptibles_de_venta.json',
    );
  }

  compareIndepData() {
    const indepInfo = this.requestIndepInfo();
    const dbData = this.getAllInfo('SELECT * FROM indeply_db.properties');
    const documentsLengt = this.getAllInfo(
      'SELECT count(*) FROM indeply_db.properties;',
    );

    return Promise.all([indepInfo, dbData, documentsLengt]);
  }

  insert(): Promise<any> {
    return new Promise((resolve, reject) => {
      const documentsToInsertInDB: Array<Array<string>> = [];

      this.compareIndepData().then((data) => {
        const indepInfoRequested = data[0].data;
        const numberOfDocumentsInDb: number = Object.values(
          <number>data[2][0],
        )[0];

        if (indepInfoRequested.length === numberOfDocumentsInDb) {
          // If documents requested are iqual to documents in DB
          resolve('Properties already exist :)');
        } else {
          let j = 1;
          let counter = numberOfDocumentsInDb;
          indepInfoRequested.map((property: propertyType) => {
            if (j > numberOfDocumentsInDb) {
              // Assign id and covert in an array (https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp)
              const transformedProperty = property;
              transformedProperty.id = counter + 1;

              counter += 1;
              documentsToInsertInDB.push(
                <Array<string>>Object.values(transformedProperty),
              );
            }

            j += 1;
          });

          this.insertMany(
            'INSERT INTO indeply_db.properties (NumeroSIAB, Estatus, DescripcionEstatus, Vocacion, TipoInmueble, Ubicacion, EntidadFederativa, Municipio, SuperficieTerrenoEnM2, SuperficieConstruccionEnM2, Copropiedad, EntidadTransferente, ProblematicaJuridica, DescripcionProblematicaJuridica, EventoActual, id) VALUES ?',
            [documentsToInsertInDB],
          )
            .then(() => resolve('Properties inserted successfully :)'))
            .catch((err) => reject(err || 'Error inserting properties'));
        }
      });
    });
  }
}

export default PropertiesController;
