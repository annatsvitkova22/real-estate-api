import { environmentDev, environmentProd } from './index';
import { Enviroment } from '../models';

export const getEnv = (): Enviroment => {
    let environment: Enviroment;
    environment = environmentDev;

    if (process.env.NODE_ENV === 'production') {
        environment = environmentProd;
    }
    return environment;
};
