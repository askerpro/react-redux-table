import Ajv from 'ajv';
import schema from './products-response-data-schema.json';
import { Response, Coin } from './models';

const validator = new Ajv();

const getAll = async (): Promise<Coin[]> => {
  const response = await fetch(process.env.REACT_APP_PRODUCTS_ENDPOINT!, {
    headers: {
      Accept: 'json',
    },
  });

  if (!response.ok) {
    throw new Error(`Api fetch error: ${response.statusText}`);
  }

  const responeData: Response = await response.json();
  console.log(responeData);
  const isValid = validator.validate(schema, responeData);
  if (!isValid) {
    console.log(validator.errors);
    throw new Error(`Api data validation error: ${validator.errors?.join(',')}`);
  }
  return responeData.data;
};

export default {
  getAll,
};
