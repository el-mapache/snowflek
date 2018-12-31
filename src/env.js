const development = {
  apiHost: 'http://localhost:3000'
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
