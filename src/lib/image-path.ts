const BASE_PATH = "/sakura-at-twenty";

export function resolveImagePath(path: string): string {
  if (
    /^(https?:\/\/|data:|blob:)/i.test(path) ||
    !path.startsWith("/")
  ) {
    return path;
  }

  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    return path;
  }

  return `${BASE_PATH}${path}`;
}
