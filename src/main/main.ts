import 'reflect-metadata' // Enable the use of annotations/decorators

import dotenv from 'dotenv'

import App from './app'

import MongoDbConnection from '@utils/MongoDbConnection'
import { getRequestContext } from '@utils/RequestContext'
import { Configuration } from '@config/index'

dotenv.config()
Configuration.init()

function main(): void {
  const context = getRequestContext()

  const app = new App()

  MongoDbConnection.connect()
    .then(() => {
      app.start()
    })
    .catch((err) => {
      context.logger.error(
        `An error has ocurred at connect to mongo client ${err.toString()}`
      )
    })
}

main()
