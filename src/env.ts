const env = process.env.VUE_APP_ENV;

let envApiUrl = 'http://localhost:8000';

// if (env === 'production') {
//   envApiUrl = `https://${process.env.VUE_APP_DOMAIN_PROD}`;
// } else if (env === 'staging') {
//   envApiUrl = `https://${process.env.VUE_APP_DOMAIN_STAG}`;
// } else {
//   envApiUrl = `http://${process.env.VUE_APP_DOMAIN_DEV}`;
// }

export const apiUrl = 'http://localhost:8000';
export const appName = process.env.VUE_APP_NAME;
