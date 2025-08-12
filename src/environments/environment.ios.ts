import { environmentDefault } from 'src/environments/environment.default';
import { IEnvironment } from 'src/environments/i-environment';

const env: Partial<typeof environmentDefault> = {
  production: true,
  domaine: 'meteo.ics.corp'
};

export const environment: IEnvironment = {
  ...environmentDefault,
  ...env,
};
