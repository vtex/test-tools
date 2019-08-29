# VTEX Test Tools

![Npm badge](https://img.shields.io/npm/v/@vtex/test-tools.svg?style=flat-square)

> Add tests to your VTEX IO app in an instant 🚀

## Install

```sh
$ yarn add @vtex/test-tools apollo-client apollo-cache-inmemory -D
```

## Usage

Add a new script to your `react/package.json`:

```json
  "test": "vtex-test-tools test"
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
$ yarn test
```

If you're using TypeScript there are a few [more steps](./examples/typescript/).

Done! 🎉

Under the hood, we use [Jest](https://jestjs.io/), so you can pass Jest flags as parameters: [read the docs](https://jestjs.io/docs/en/cli.html).

## API

### `react` module

The module `react` makes it easy to test VTEX IO React apps.

#### Example

```js
import React from 'react'
import { render } from '@vtex/test-tools/react'
import HelloWorld from './HelloWorld'

test('should render the Hello!', () => {
  const { getByText } = render(<HelloWorld />)

  const element = getByText(/Hello!/)

  expect(element).toBeDefined()
})
```

This module uses `react-testing-library` under the hood, so most of its API it's the same: [read the docs](https://testing-library.com/docs/intro).

There are few new features added to it:

#### Messages

We will automatically wrap your component with an `IntlProvider` with your app's `messages/en-US.json` messages.

You can change the default locale being used adding a config to your `package.json`. Example:

```
  "vtexTestTools": {
    "defaultLocale": "pt-BR"
  }
```

If you want to change the locale just in a test, you may pass the `locale` option. Example:

```js
import React from 'react'
import { render } from '@vtex/test-tools/react'
import HelloWorld from './HelloWorld'

test('should render the example translated to portuguese', () => {
  const { getByText } = render(
    <HelloWorld />,
    { locale: 'pt' }
  )

  const element = getByText(/Olá!/)

  expect(element).toBeDefined()
})

```

#### GraphQL

We automatically wrap your component with an Apollo's [`MockProvider`](https://www.apollographql.com/docs/react/recipes/testing.html).

You can pass props to it using the `graphql` option. Example:

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
          }
        ]
      }
    }
  }

  const { getByText } = render(<GraphqlComponent />, {
    graphql: { mocks: [bookMock] }
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

### [TypeScript](./examples/typescript/)

### [Testing a component using CSS Modules](https://github.com/klzns/test-repo/blob/master/react/CssComponent.test.js)

### [Testing a component using GraphQL](https://github.com/klzns/test-repo/blob/master/react/GraphqlComponent.test.js)

### [Testing a component using React Hooks](https://github.com/klzns/test-repo/blob/master/react/HooksComponent.test.js)

### [Testing a component translating in another locale](https://github.com/klzns/test-repo/blob/master/react/LocaleComponent.test.js)

## License

MIT © [VTEX](https://www.vtex.com)
