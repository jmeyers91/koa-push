"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// Any GET request that doesn't start with /api and doesn't
// include a file extension is assumed to be a client route.
function isPushStateRouteDefault(context) {
    const { request } = context;
    return (request.method === 'GET' &&
        !request.path.startsWith('/api/') &&
        !request.path.includes('.'));
}
exports.isPushStateRouteDefault = isPushStateRouteDefault;
/**
 * Serves an HTML file when an unrecognized GET request is received.
 * This allows the client to load properly when requesting paths other than '/'.
 */
function koaPushState(indexHtmlPath, isPushStateRoute = isPushStateRouteDefault) {
    return async function pushStateMiddleware(context, next) {
        if (isPushStateRoute(context)) {
            // eslint-disable-next-line no-param-reassign
            context.response.status = 200;
            // eslint-disable-next-line no-param-reassign
            context.type = 'html';
            // eslint-disable-next-line no-param-reassign
            context.body = fs_1.createReadStream(indexHtmlPath);
            return;
        }
        await next();
    };
}
exports.default = koaPushState;
//# sourceMappingURL=index.js.map