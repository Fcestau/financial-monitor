const MESSIRVEINVERTIR_TOKEN = 'messirve-invertir-app-token';
const EMPTY_TOKEN = '';

export default new (class {
  save(token: string) {
    window.localStorage.setItem(MESSIRVEINVERTIR_TOKEN, token);
    return this.get();
  }

  clean() {
    window.localStorage.setItem(MESSIRVEINVERTIR_TOKEN, EMPTY_TOKEN);
    return this.get();
  }

  get() {
    return window.localStorage.getItem(MESSIRVEINVERTIR_TOKEN);
  }
})();
