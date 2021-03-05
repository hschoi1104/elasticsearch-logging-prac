class TokenResponse {
  constructor(user, accessToken) {
    this.id = user.id;
    this.name = user.name;
    this.auth = user.isManager;
    this.accessToken = accessToken;
  }
}
module.exports = { TokenResponse };
