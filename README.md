# VTEX Test Tools

![Npm badge](https://img.shields.io/npm/v/@vtex/test-tools.svg?style=flat-square) ![CI](https://github.com/vtex/test-tools/workflows/CI/badge.svg?branch=master)

> Add tests to your VTEX IO app in an instant 🚀

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [React Component](#react-module)
  - [React Hooks](#react-hooks)
  - [Messages I18n](#messages)
  - [GraphQL](#graphql)

## Install

```sh
yarn add -D @vtex/test-tools @apollo/react-testing react-intl@3
```

## Usage

Add a new script to your `react/package.json`:

```json
{
  "name": "my-io-app",
  "scripts": {
    "test": "vtex-test-tools test"
  }
}
```

Add these lines to your `.vtexignore`:

```
react/**/__tests__/**
react/**/__mocks__/**
react/**/__snapshots__/**
react/**/*.test.js
react/**/*.test.ts
react/**/*.test.tsx
```

Run in your terminal:

```sh
yarn test
```

If you're using TypeScript there are a few [more steps](./examples/typescript/).

Done! 🎉

Under the hood, we use [Jest](https://jestjs.io/), so you can pass Jest flags as parameters: [read the docs](https://jestjs.io/docs/en/cli.html).

## API

### `react` module

The module `react` makes it easy to test VTEX IO React apps.

#### Example

```jsx
import React from 'react'
import { render } from '@vtex/test-tools/react'
import HelloWorld from './HelloWorld'

test('should render the Hello!', () => {
  const { getByText } = render(<HelloWorld />)

  const element = getByText(/Hello!/)

  expect(element).toBeDefined()
})
```

This module uses `@testing-library/react` (RTL) under the hood, so most of its API is the same ([read their docs here](https://testing-library.com/docs/intro)).

We added a few more features to the regular `render` function from RTL, such as a `graphql` and `locale` option. You can see more about them
down below.

### React Hooks

You can also test your custom hooks.

#### Example

```js
import { hooks } from '@vtex/test-tools/react'
import useCustomHook from './useCustomHook'

const { renderHook, act } = hooks

it('counter should be one', async () => {
  const { result } = renderHook(() => useCustomHook())

  // This waits for the useEffect hook to be triggered and mutate hook state
  await act(() => Promise.resolve())

  expect(result.current).toBe(1)
})
```

<!-- https://react-hooks-testing-library.com/ -->

The module uses `@react-testing-library/react-hooks` under the hood, to understand the reactHook function you can read [its doc](https://react-hooks-testing-library.com/reference/api)

### Messages

We will automatically wrap your component with an `IntlProvider` with your app's `messages/en-US.json` messages.

You can change the default locale being used adding a config to your `package.json`. Example:

```json
{
  "name": "my-awesome-io-app",
  "vtexTestTools": {
    "defaultLocale": "pt-BR"
  }
}
```

If you want to change the locale just in a test, you may pass the `locale` option. Example:

```jsx
import React from 'react'
import { render } from '@vtex/test-tools/react'
import HelloWorld from './HelloWorld'

test('should render the example translated to portuguese', () => {
  const { getByText } = render(<HelloWorld />, { locale: 'pt' })

  const element = getByText(/Olá!/)

  expect(element).toBeDefined()
})
```

### GraphQL

We automatically wrap your component with an Apollo's [`MockedProvider`](https://www.apollographql.com/docs/react/development-testing/testing/).

You can pass your mocked queries to it using the `graphql` option. Example:

```js
import React from 'react'
import { render, flushPromises } from '@vtex/test-tools/react'
import GraphqlComponent from './GraphqlComponent'
import GET_BOOKS from './getBooks.graphql'

test('should render mock graphql responses', async () => {
  jest.useFakeTimers()

  const bookMock = {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        books: [
          {
            id: 10,
            title: 'Hello',
          },
        ],
      },
    },
  }

  const { getByText } = render(<GraphqlComponent />, {
    graphql: { mocks: [bookMock] },
  })

  expect(getByText(/Loading/)).toBeDefined()

  await flushPromises()
  jest.runAllTimers()

  expect(getByText(/Hello/)).toBeDefined()
})
```

## Examples

These are some common use cases that might be helpful to see how it's done:

### [Debugging tests in VS Code](./examples/vscode/)

### [Testing a React component](https://github.com/klzns/test-repo/blob/master/react/JsComponent.test.js)

### [Testing a React Hook](./examples/hooks/)

### [TypeScript](./examples/typescript/)

### [Testing a component using CSS Modules](https://github.com/klzns/test-repo/blob/master/react/CssComponent.test.js)

### [Testing a component using GraphQL](https://github.com/klzns/test-repo/blob/master/react/GraphqlComponent.test.js)

### [Testing a component using React Hooks](https://github.com/klzns/test-repo/blob/master/react/HooksComponent.test.js)

### [Testing a component translating in another locale](https://github.com/klzns/test-repo/blob/master/react/LocaleComponent.test.js)

## License

MIT © [VTEX](https://www.vtex.com)
