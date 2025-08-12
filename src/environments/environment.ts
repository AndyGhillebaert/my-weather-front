import { environmentDefault } from 'src/environments/environment.default';
import { IEnvironment } from 'src/environments/i-environment';

const env: Partial<typeof environmentDefault> = {
  domaine: 'meteo.cellarmoon.fr',
  apiPath: '/api',
  get apiUrl(): string {
    return `https://${this.domaine}${this.apiPath}`;
  },
};

export const environment: IEnvironment = {
  ...environmentDefault,
  ...env,
};
