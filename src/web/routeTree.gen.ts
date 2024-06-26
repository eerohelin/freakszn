/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const ProfileLazyImport = createFileRoute('/profile')()
const MatchHistoryLazyImport = createFileRoute('/match-history')()
const GameLazyImport = createFileRoute('/game')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ProfileLazyRoute = ProfileLazyImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const MatchHistoryLazyRoute = MatchHistoryLazyImport.update({
  path: '/match-history',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/match-history.lazy').then((d) => d.Route))

const GameLazyRoute = GameLazyImport.update({
  path: '/game',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/game.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/game': {
      id: '/game'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof GameLazyImport
      parentRoute: typeof rootRoute
    }
    '/match-history': {
      id: '/match-history'
      path: '/match-history'
      fullPath: '/match-history'
      preLoaderRoute: typeof MatchHistoryLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  GameLazyRoute,
  MatchHistoryLazyRoute,
  ProfileLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/game",
        "/match-history",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/game": {
      "filePath": "game.lazy.tsx"
    },
    "/match-history": {
      "filePath": "match-history.lazy.tsx"
    },
    "/profile": {
      "filePath": "profile.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
