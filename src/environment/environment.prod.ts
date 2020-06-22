import { Enviroment } from '../models';

const fs = require('fs');

export const environmentProd: Enviroment = {
    production: true,
    name: 'production',
    tokenSecret: fs.readFileSync('src/secrets/domain.key'),
    tokenLife: 1000,
    refreshTokenLife: 15768000,
    stripeApiKey: 'sk_test_4kwhS3Jsc0uRQZow1C7Q7b6I002UgJ1GHf'
};
