import { environmentDefault } from 'src/environments/environment.default';
import { IEnvironment } from 'src/environments/i-environment';

export const environment: IEnvironment = {
  ...environmentDefault,
  production: true,
  domaine: 'meteo.ics.corp',
  get apiUrl(): string {
    return `https://${this.domaine}${this.apiPath}`;
  },
};
