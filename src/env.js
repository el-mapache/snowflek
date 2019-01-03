const development = {
  apiHost: 'http://localhost:3000',
  authCookieKey: 'authToken',
};

const getConfigsForEnv = () => {
  switch(process.env.NODE_ENV.toLowerCase()) {
    case 'development':
      return development;
    default:
      return development;
  }
}

export default getConfigsForEnv();
