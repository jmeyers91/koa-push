import { Context } from 'koa';
export declare type KoaPushStateMiddleware = (context: Context, next: () => Promise<void>) => Promise<void>;
export declare type IsPushStateFn = (context: Context) => boolean;
export declare function isPushStateRouteDefault(context: Context): boolean;
/**
 * Serves an HTML file when an unrecognized GET request is received.
 * This allows the client to load properly when requesting paths other than '/'.
 */
export default function koaPushState(indexHtmlPath: string, isPushStateRoute?: IsPushStateFn): KoaPushStateMiddleware;
//# sourceMappingURL=index.d.ts.map