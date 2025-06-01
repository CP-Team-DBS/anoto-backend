import Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT || 3000,
    host: '0.0.0.0',
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);

  return server;
};

init();
