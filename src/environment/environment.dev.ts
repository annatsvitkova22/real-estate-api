import { Enviroment } from '../models';

const fs = require('fs');

export const environmentDev: Enviroment = {
    production: false,
    name: 'development',
    tokenSecret: fs.readFileSync('src/secrets/domain.key'),
    tokenLife: 1000,
    refreshTokenLife: 31536000,
    stripeApiKey: 'sk_test_4kwhS3Jsc0uRQZow1C7Q7b6I002UgJ1GHf'
};
