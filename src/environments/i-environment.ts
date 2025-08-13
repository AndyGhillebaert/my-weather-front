export interface IEnvironment {
  appVersion: string;
  production: boolean;
  domaine: string;
  apiPath: string;
  baseHref: string;
  port: number;
  meteoblueApiKey: string;
  defaultWeatherLocation: {
    city: string;
    lat: number;
    lon: number;
  };
  apiUrl: string;
}
