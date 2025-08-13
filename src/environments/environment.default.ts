import packageJson from 'package.json';
import { IEnvironment } from './i-environment';

export const environmentDefault: IEnvironment = {
  appVersion: packageJson.version + '-dev',
  production: false,
  domaine: 'localhost',
  apiPath: '/api',
  baseHref: '/',
  port: 3005,
  meteoblueApiKey: 'YOUR_METEOBLUE_API_KEY', // Remplacez par votre clé API MeteoBlue
  defaultWeatherLocation: {
    city: 'Mouans Sartoux',
    lat: 43.607479,
    lon: 6.9532,
  },
  get apiUrl(): string {
    return `//${this.domaine}${this.apiPath}`;
  },
};
