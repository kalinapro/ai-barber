/** Resolves files from `public` against Vite's configured hosting base. */
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
