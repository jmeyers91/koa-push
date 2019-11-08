import { createReadStream } from 'fs';
import { Context } from 'koa';

export type KoaPushStateMiddleware = (
  context: Context,
  next: () => Promise<void>
) => Promise<void>;

export type IsPushStateFn = (context: Context) => boolean;

// Any GET request that doesn't start with /api and doesn't
// include a file extension is assumed to be a client route.
export function isPushStateRouteDefault(context: Context): boolean {
  const { request } = context;
  return (
    request.method === 'GET' &&
    !request.path.startsWith('/api/') &&
    !request.path.includes('.')
  );
}

/**
 * Serves an HTML file when an unrecognized GET request is received.
 * This allows the client to load properly when requesting paths other than '/'.
 */
export default function koaPushState(
  indexHtmlPath: string,
  isPushStateRoute: IsPushStateFn = isPushStateRouteDefault
): KoaPushStateMiddleware {
  return async function pushStateMiddleware(context, next) {
    if (isPushStateRoute(context)) {
      // eslint-disable-next-line no-param-reassign
      context.response.status = 200;
      // eslint-disable-next-line no-param-reassign
      context.type = 'html';
      // eslint-disable-next-line no-param-reassign
      context.body = createReadStream(indexHtmlPath);
      return;
    }
    await next();
  };
}
