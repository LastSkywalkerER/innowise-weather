/* eslint-disable class-methods-use-this */
export default class Router {
  constructor(options) {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    this.current = '';

    this.subscribers = [];

    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options) {
      if (options.mode) {
        this.mode = options.mode;
      }
      if (options.root) {
        this.root = options.root;
      }
    }
  }

  init() {
    window.addEventListener('popstate', () => {
      this.subscribers.forEach((sub) => sub(this.getFragment()));
    });
  }

  redirect(path) {
    this.current = path;

    // if (this.getFragment() !== this.current) {
    //   window.location.pathname = this.root;
    // }
    this.navigate(path);
  }

  delete() {
    window.removeEventListener();
  }

  add(path, Component) {
    this.routes.push({
      path,
      Component,
    });
  }

  // eslint-disable-next-line consistent-return
  switchComponent(routes, redirectPath) {
    this.routes = routes;
    const result = this.checkRoute().map((route) => route.Component);
    if (result.length) {
      return result[0];
    }
    this.redirect(redirectPath);
    return this.checkRoute().map((route) => route.Component)[0];
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

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }

  navigate(path = '') {
    let newPath;
    if (this.mode === 'history') {
      newPath = this.root + this.clearSlashes(path);
      window.history.pushState(null, null, newPath);
    } else {
      newPath = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
      window.location.href = newPath;
    }
    this.subscribers.forEach((sub) => sub(path));
  }

  getCurrentPath() {
    return this.current;
  }

  checkRoute() {
    this.current = this.getFragment();

    return this.routes.filter((route) => this.current === this.clearSlashes(route.path));
  }
}