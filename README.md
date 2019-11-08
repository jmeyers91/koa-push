# Koa Push

[![Build Status](https://travis-ci.com/jmeyers91/koa-push.svg?branch=master)](https://travis-ci.com/jmeyers91/koa-push)

Koa middleware for handling client-side pushstate routes. By default, a push state request is any `GET` request that has no file extension and doesn't begin with `/API/`.

## Install

```
npm install koa-push
```

## Usage

```ts
import koaPushState from 'koa-push';

app.use(koaPushState('/path/to/index.html'));
```

Alternatively, you can pass your own check to determine if the request should be handled by the push state middleware:

```ts
import koaPushState, { isPushStateRouteDefault } from 'koa-push';

app.use(
  koaPushState(
    '/path/to/index.html',
    context =>
      isPushStateRouteDefault(context) ||
      context.request.path.startsWith('/routes/')
  )
);
```
