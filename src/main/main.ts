import 'reflect-metadata'; // Enable the use of annotations/decorators
import 'module-alias/register'; //enable module aliases

import App from './app';

function main(): void {
  const app = new App();
  app.start();
}

main();
