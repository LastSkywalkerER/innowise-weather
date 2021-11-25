/* eslint-disable class-methods-use-this */
export default class Router {
  // routes = [];
  // mode = null;
  // root = '/';

  constructor(options) {
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) {
      this.mode = options.mode;
    }
    if (options.root) {
      this.root = options.root;
    }
  }

  add(path, cb) {
    this.routes.push({
      path,
      cb,
    });
  }

  remove(path) {
    this.routes.filter((route) => route.path !== path);
  }

  flush() {
    this.routes = [];
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  getFragment() {
    let fragment = '';

    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  }
}