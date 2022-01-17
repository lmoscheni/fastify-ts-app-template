import 'reflect-metadata'; // Enable the use of annotations/decorators

import App from './app';

function main(): void {
  const app = new App();
  app.start();
}

main();
