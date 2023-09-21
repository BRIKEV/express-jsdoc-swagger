// Type definitions for express-jsdoc-swagger
// Project: https://github.com/BRIKEV/express-jsdoc-swagger
// Definitions by: Kevin MArtínez <https://github.com/kevinccbsg>
// Definitions: https://github.com/BRIKEV/express-jsdoc-swagger/index.d.ts
// TypeScript Version: 3.9.7

import { EventEmitter } from "events";
import express from "express";
import { SwaggerUiOptions } from "swagger-ui-express";

interface ContactObject {
  name: string;
  url?: string;
  email?: string;
}

interface LicenseObject {
  name: string;
  url?: string;
  email?: string;
}

interface InfoObject {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
}

type SecurityObject = {
  scheme: 'http' | 'https' | 'ws' | 'wss'
  description?: string
} & (
  | {
      type: 'basic'
    }
  | {
      type: 'apiKey'
      name: string
      in: 'query' | 'header'
    }
  | ({
      type: 'oauth2'
      scopes: { [key: string]: string }
    } & (
      | {
          flow: 'implicit'
          authorizationUrl: string
        }
      | {
          flow: 'password'
          tokenUrl: string
        }
      | {
          flow: 'application'
          tokenUrl: string
        }
      | {
          flow: 'accessCode'
          authorizationUrl: string
          tokenUrl: string
        }
    ))
)

interface Security {
  [key: string]: SecurityObject;
}

interface Servers {
  url: string;
  description: string;
  variables?: object;
}

interface Options {
  info: InfoObject;
  baseDir: string;
  filesPattern: string | string[];
  security?: Security;
  servers?: string[] | Servers[];
  exposeSwaggerUI?: boolean;
  swaggerUIPath?: string;
  exposeApiDocs?: boolean;
  apiDocsPath?: string;
  swaggerUiOptions?: SwaggerUiOptions;
  notRequiredAsNullable?: boolean;
}

type UserSwagger = Record<string, unknown>;

type EventEmiterHandler = (options: Options, userSwagger?: UserSwagger) => EventEmitter;

export default function expressJSDocSwagger(app: express.Application): EventEmiterHandler;
