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
    return this.iHttpHandler.get('/v1/auth/logout', {
      headers: { Authorization: `Bearer ${tokenValue}` },
    });
  }
})();
