import 'reflect-metadata'; // Enable the use of annotations/decorators

import dotenv from 'dotenv';

import App from './app';

dotenv.config();

function main(): void {
  const app = new App();
  app.start();
}

main();
