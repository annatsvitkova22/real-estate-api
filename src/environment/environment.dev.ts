import { Enviroment } from 'src/models';

const fs = require('fs');

export const environmentDev: Enviroment = {
    production: false,
    name: 'development',
    tokenSecret: fs.readFileSync('src/secrets/domain.key'),
    tokenLife: 1000,
};
