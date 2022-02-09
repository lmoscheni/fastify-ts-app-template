type Config = {
  port: number
  environment: string
  databaseUrl: string
  dbName: string
}

export class Configuration {
  static instance: Config

  private constructor() {
    throw new Error("You never musn't use this constructor")
  }

  static init(): void {
    Configuration.instance = {
      port: Number(process.env.PORT) || 5000,
      environment: String(process.env.NODE_ENV) || 'development',
      databaseUrl: String(process.env.DATABASE_URL),
      dbName: String(process.env.DB_NAME)
    }
  }

  static getInstance(): Config {
    return Configuration.instance
  }
}
