import { environmentDefault } from 'src/environments/environment.default';
import { IEnvironment } from 'src/environments/i-environment';

export const environment: IEnvironment = {
  ...environmentDefault,
  domaine: 'mameteo.app',
  get apiUrl(): string {
    return `https://${this.domaine}${this.apiPath}`;
  },
};
