/**
 * Production environment settings
 * @description :: This section overrides all other config values ONLY in production environment
 */

module.exports = {
  port: 80,
  appUrl: 'http://www.bookburrow.org',
  log: {
    level: 'info'
  },
  connections: {
    postgresql: {
      adapter: 'sails-postgresql',
      url: process.env.DATABASE_URL,
      ssl: true
    }
  },
  models: {
    connection: 'postgresql'
  }
};
