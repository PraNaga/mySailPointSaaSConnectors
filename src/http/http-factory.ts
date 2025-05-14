import { Config } from "../model/config";
import { AxiosWrapper } from "./axios-wrapper";
import { HTTP } from "./http";

export class HTTPFactory {
  static getHTTP(config: Config): HTTP {
  
    // Always return the real HTTP client (AxiosWrapper) initialized with the config
    return new AxiosWrapper(config);
  }
}