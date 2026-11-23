const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function href(path = '') {
  return base + path.replace(/^\//, '');
}
