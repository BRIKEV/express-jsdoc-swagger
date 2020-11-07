// Type definitions for express-jsdoc-swagger
// Project: https://github.com/BRIKEV/express-jsdoc-swagger
// Definitions by: Dailos Díaz <https://github.com/ddialar>
// Definitions: https://github.com/BRIKEV/express-jsdoc-swagger/index.d.ts
// TypeScript Version: 3.9.7

import { EventEmitter } from 'events';
import { Express } from 'express';

interface Options {
	info?: string;
	servers?: string[];
	security?: string;
	baseDir?: string;
	filesPattern?: string;
	swaggerUIPath?: string;
}

type UserSwagger = Record<string, unknown>;

type EventEmiterHandler = (options: Options, userSwagger: UserSwagger) => EventEmitter;

export default function expressJSDocSwagger(app: express.Application): EventEmiterHandler;
