import { Environment } from 'src/models';

const fs = require('fs');

export const environmentProd: Environment = {
    production: true,
    name: 'production',
    tokenSecret: fs.readFileSync('src/secrets/domain.key'),
    tokenLife: 1000,
};
