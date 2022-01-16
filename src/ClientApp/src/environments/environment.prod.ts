// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  api_url: 'https://single.sign.on.api.xxx98qn.xyz',

  profile_app_url: 'https://single.sign.on.client.xxx98qn.xyz',

  authority: 'https://single.sign.on.api.xxx98qn.xyz',
  client_id: 'single.sign.on.dashboard',
  redirect_uri: 'http://single.sign.on.dashboard.xxx98qn.xyz/auth-callback',
  post_logout_redirect_uri: 'http://single.sign.on.dashboard.xxx98qn.xyz',
  scope: 'sso.api openid profile',
  silent_redirect_uri: 'http://single.sign.on.dashboard.xxx98qn.xyz/silent-renew.html',
  response_type: 'code',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
