/** Resolve a file in /public against the configured base, so the site also works from a sub-path. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
