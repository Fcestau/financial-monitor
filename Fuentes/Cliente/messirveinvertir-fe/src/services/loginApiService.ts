import httpHandler from './httpHandler';

export default new (class {
  iHttpHandler: any;
  constructor() {
    this.iHttpHandler = httpHandler;
  }

  login(loginData: any) {
    return this.iHttpHandler.post('/v1/auth/login', loginData);
  }

  logout(tokenValue: string) {
    return this.iHttpHandler.post('/v1/auth/logout', null, {
      headers: { Authorization: `Bearer ${tokenValue}` },
    });
  }
})();
