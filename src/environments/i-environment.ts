export interface IEnvironment {
  appVersion: string;
  production: boolean;
  domaine: string;
  apiPath: string;
  baseHref: string;
  apiUrl: string
  port: number;
  meteoblueApiKey: string;
  defaultWeatherLocation: {
    city: string;
    lat: number;
    lon: number;
  };
}
