interface TempCodeResponse extends Record<string, any> {
  oauth_token?: string;
  oauth_token_secret?: string;
  oauth_callback_confirmed?: string;
}

interface AccessTokenResponse extends Record<string, any> {
  oauth_token?: string;
  oauth_token_secret?: string;
  userID?: string;
  username?: string;
}

interface ZoteroOauthKV {
  oauthToken: string;
  oauthTokenSecret: string;
  senderId: string;
}
