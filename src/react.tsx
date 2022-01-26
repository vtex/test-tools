import React from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render, act, cleanup } from '@testing-library/react'
import * as hooks from '@testing-library/react-hooks'
import type { MockedProviderProps } from '@apollo/react-testing'
import { MockedProvider } from '@apollo/react-testing'
import { IntlProvider } from 'react-intl'
import type { IdGetterObj } from 'apollo-cache-inmemory'
import { InMemoryCache } from 'apollo-cache-inmemory'

import * as paths from './modules/paths'
import { readJSON } from './utils/json'

const { renderHook } = hooks

const pkg = readJSON(paths.resolveAppPath('package.json'))

const getLocale = (optionsLocale?: string) => {
  const locales = [
    optionsLocale,
    pkg.vtexTestTools?.defaultLocale,
    'en',
    'en-US',
  ].filter(Boolean)

  const localeExists = (locale: string | undefined) =>
    locale && paths.pathExists(`../messages/${locale}.json`)

  return locales.find(localeExists)
}

// Creating apollo-client cache like render-runtime
const generateCacheKey = (value: IdGetterObj & { cacheId?: string }) => {
  const { cacheId, __typename: typename } = value || {}

  if (value && cacheId && typename) {
    return `${typename}:${value.cacheId}`
  }

  return null
}

type TestToolsRenderOptions = BaseTestToolsRenderOptions &
  Partial<GraphQLTestToolsRenderOptions>

interface Messages {
  [id: string]: string
}

interface BaseTestToolsRenderOptions extends RenderOptions {
  /** A locale string, eg: `pt-BR`, `es`. Default: `en` */
  locale?: string
  /** A JSON translation to be used. Default: `messages/en.json` or another locale if specified in the `locale` option. */
  messages?: Messages
}

interface GraphQLTestToolsRenderOptions {
  /** Props to be passed to MockedProvider */
  graphql: MockedProviderProps
}

const customRender = (
  node: React.ReactElement,
  options: TestToolsRenderOptions = {}
) => {
  const locale = getLocale(options.locale)
  const messages = locale
    ? readJSON(paths.resolveAppPath(`../messages/${locale}.json`))
    : {}

  const intlProps = {
    locale: locale ?? 'en',
    messages,
  }

  const apolloProps = options.graphql
    ? { addTypename: false, ...options.graphql }
    : { addTypename: false, mocks: [] }

  const cache = new InMemoryCache({
    addTypename: apolloProps.addTypename,
    dataIdFromObject: generateCacheKey,
  })

  apolloProps.cache = cache

  const rendered = render(
    <IntlProvider {...intlProps}>
      <MockedProvider {...apolloProps}>{node}</MockedProvider>
    </IntlProvider>,
    options
  )

  return {
    ...rendered,
    rerender: (newUi: React.ReactElement) =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

export const flushPromises = () =>
  new Promise((resolve) => setImmediate(resolve))

// we really want to override the defaults, so the exports with the same name is no big deal
// eslint-disable-next-line import/export
export * from '@testing-library/react'

// re-export everything
// eslint-disable-next-line import/export
export { customRender as render, act, cleanup, hooks, renderHook }
