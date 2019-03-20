# TypeScript example

## Setup

Do the usual setup as described in the main README and the following steps:

```sh
yarn add typescript @types/graphql @types/jest @types/node @types/react @types/react-intl -D
```

Add a `tsconfig.json` file just like [`tsconfig.json`](./tsconfig.json).

Notice that you need to import `@vtex/test-tools/react` whenever you want to use Jest, since `react.d.ts` exports the types for Jest.

Done 🎉
