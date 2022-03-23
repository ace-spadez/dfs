const env = process.env.VUE_APP_ENV;

let envApiUrl = 'http://20.188.120.20:1337';

// if (env === 'production') {
//   envApiUrl = `https://${process.env.VUE_APP_DOMAIN_PROD}`;
// } else if (env === 'staging') {
//   envApiUrl = `https://${process.env.VUE_APP_DOMAIN_STAG}`;
// } else {
//   envApiUrl = `http://${process.env.VUE_APP_DOMAIN_DEV}`;
// }

export const apiUrl = 'http://20.188.120.20:1337';
export const appName = process.env.VUE_APP_NAME;
