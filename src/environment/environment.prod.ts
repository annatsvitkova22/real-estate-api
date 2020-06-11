import { Enviroment } from '../models';

const fs = require('fs');

export const environmentProd: Enviroment = {
    production: true,
    name: 'production',
    tokenSecret: fs.readFileSync('src/secrets/domain.key'),
    tokenLife: 1000,
};
