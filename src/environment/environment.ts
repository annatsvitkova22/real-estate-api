import { environmentDev, environmentProd } from 'src/environment';
import { Enviroment } from 'src/models';

export const getEnv = (): Enviroment => {
    let environment: Enviroment;
    environment = environmentDev;

    if (process.env.NODE_ENV === 'production') {
        environment = environmentProd;
    }
    return environment;
};