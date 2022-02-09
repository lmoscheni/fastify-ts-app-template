export default interface HealthCheckResponse {
  status: 'UP' | 'DOWN'
  version: string
  description: string
  appName: string
  author: string
}
