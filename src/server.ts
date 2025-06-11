import 'reflect-metadata';
import Hapi from '@hapi/hapi';
import { AppDataSource } from './config/database';
import routes from './routes';
import hapiswagger, { RegisterOptions } from 'hapi-swagger';
import inert, { OptionalRegistrationOptions } from '@hapi/inert';
import vision, { ServerViewsConfiguration } from '@hapi/vision';

const swaggerOptions: RegisterOptions = {
  info: {
    title: 'Anoto API Documentation',
  },
};

const init = async () => {
  await AppDataSource.initialize();

  const server = Hapi.server({
    port: process.env.APP_PORT || 3000,
    host: '0.0.0.0',
  });

  const plugins = [
    {
      plugin: inert,
    } as Hapi.ServerRegisterPluginObject<OptionalRegistrationOptions>,
    {
      plugin: vision,
    } as Hapi.ServerRegisterPluginObject<ServerViewsConfiguration>,
    {
      plugin: hapiswagger,
      options: swaggerOptions,
    } as Hapi.ServerRegisterPluginObject<RegisterOptions>,
  ];

  server.route(routes);

  await server.register(plugins);
  await server.start();

  console.log('Server running on %s', server.info.uri);
  return server;
};

init();
