const env = process.env.VUE_APP_ENV;


let envApiUrl = 'https://rankf.southeastasia.cloudapp.azure.com';

// if (env === 'production') {
//   envApiUrl = `https://${process.env.VUE_APP_DOMAIN_PROD}`;
// } else if (env === 'staging') {
//   envApiUrl = `https://${process.env.VUE_APP_DOMAIN_STAG}`;
// } else {
//   envApiUrl = `http://${process.env.VUE_APP_DOMAIN_DEV}`;
// }


export const apiUrl = 'http://20.24.100.104:8000';

export const appName = process.env.VUE_APP_NAME;
