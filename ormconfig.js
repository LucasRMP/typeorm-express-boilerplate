const ORMConfig = {
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['dust/models/**/*.js'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscribers',
  },
};

module.exports = ORMConfig;
