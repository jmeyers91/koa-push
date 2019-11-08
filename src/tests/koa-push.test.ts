import { Context } from 'koa';
import { isPushStateRouteDefault } from '../index';

describe('koa-push', () => {
  test('Should serve files with extensions as-is', () => {
    const context = {
      request: {
        method: 'GET',
        path: 'foo/bar/fizz.js'
      }
    } as Context;
    expect(isPushStateRouteDefault(context)).toBeFalsy();
  });

  test('Should ignore requests that begin with /api/', () => {
    const context = {
      request: {
        method: 'GET',
        path: '/api/bar/fizz.js'
      }
    } as Context;

    expect(isPushStateRouteDefault(context)).toBeFalsy();
  });

  test('Should let the client handle non-api GET requests with no file extensions', () => {
    const context = {
      request: {
        method: 'GET',
        path: '/users/5'
      }
    } as Context;

    expect(isPushStateRouteDefault(context)).toBeTruthy();
  });

  test('Should ignore all requests other than GET', () => {
    expect(
      isPushStateRouteDefault({
        request: {
          method: 'POST',
          path: '/users/5'
        }
      } as Context)
    ).toBeFalsy();

    expect(
      isPushStateRouteDefault({
        request: {
          method: 'DELETE',
          path: '/users/5'
        }
      } as Context)
    ).toBeFalsy();

    expect(
      isPushStateRouteDefault({
        request: {
          method: 'PUT',
          path: '/users/5'
        }
      } as Context)
    ).toBeFalsy();

    expect(
      isPushStateRouteDefault({
        request: {
          method: 'OPTIONS',
          path: '/users/5'
        }
      } as Context)
    ).toBeFalsy();

    expect(
      isPushStateRouteDefault({
        request: {
          method: 'PATCH',
          path: '/users/5'
        }
      } as Context)
    ).toBeFalsy();
  });
});
