// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// export const environment = {
//   production: true,
//   apiUrlPayBill: "https://epay.pwc.com.au/api/paybill",
//   apiUrlPostResult: "https://epay.pwc.com.au/api/postResult",
//   clientUrl: 'https://epay.pwc.com.au',
//   defaultHomeRoute: 'paybill'
// };
//UAT
// export const environment = {
//   production: true,
//   apiUrlPayBill: 'https://epaystage.pwc.com.au/api/paybill',
//   apiUrlPostResult: 'https://epaystage.pwc.com.au/api/postResult',
//   clientUrl: 'https://epaystage.pwc.com.au',
//   defaultHomeRoute: 'paybill'
// };


//Dev local
export const environment = {
  production: true,
  apiUrlPayBill: 'http://localhost:4300/api/paybill',
  apiUrlPostResult: 'http://localhost:4300/api/postResult',
  clientUrl: 'http://localhost:4300',
  defaultHomeRoute: 'paybill'
};
