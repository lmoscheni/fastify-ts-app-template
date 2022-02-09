import { Collection, Db, MongoClient } from 'mongodb'

import { Configuration } from '@config/index'
import { defaultLogger } from '@utils/Logger'

export default class MongoDbConnection {
  static client: MongoClient

  static async connect(): Promise<MongoClient> {
    defaultLogger.info(`MongoDbConnection connecting with MondoDB`)
    const config = Configuration.getInstance()
    MongoDbConnection.client = new MongoClient(config.databaseUrl)
    return MongoDbConnection.client.connect().then((client) => {
      defaultLogger.info(`MongoDbConnection connected`)
      return client
    })
  }

  static disconnect(): void {
    defaultLogger.info(`MongoDbConnection disconnecting with MondoDB`)
    MongoDbConnection.disconnect()
  }

  static db(name: string): Db {
    defaultLogger.info(`MongoDbConnection getting DB ${name}`)
    return MongoDbConnection.client?.db(name)
  }

  static collection(dbName: string, collectionName: string): Collection {
    defaultLogger.info(
      `MongoDbConnection getting Collection[${collectionName}] from DB[${dbName}]`
    )
    return MongoDbConnection.client.db(dbName).collection(collectionName)
  }
}
