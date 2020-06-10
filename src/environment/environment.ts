import { environmentDev, environmentProd } from './index';
import { Environment } from '../models';

export const getEnv = (): Environment => {
    let environment: Environment;
    environment = environmentDev;

    if (process.env.NODE_ENV === 'production') {
        environment = environmentProd;
    }
    return environment;
};
