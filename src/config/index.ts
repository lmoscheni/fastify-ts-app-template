type Config = {
  port: number;
  environment: string;
};

export default (): Config => ({
  port: Number(process.env.PORT) || 5000,
  environment: String(process.env.NODE_ENV) || 'development'
});
