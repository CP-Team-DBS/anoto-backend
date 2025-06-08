import 'reflect-metadata';
import Hapi from '@hapi/hapi';
import { AppDataSource } from './config/database';
import routes from './routes';

const init = async () => {
  await AppDataSource.initialize();

  const server = Hapi.server({
    port: process.env.APP_PORT || 3000,
    host: '0.0.0.0',
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
  return server;
};

init();
