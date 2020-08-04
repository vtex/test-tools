const React = require('react')
const reactTestingLibrary = require('@testing-library/react')
const hooks = require('@testing-library/react-hooks')
const { MockedProvider } = require('@apollo/react-testing')
const { IntlProvider } = require('react-intl')
const { InMemoryCache } = require('apollo-cache-inmemory')

const paths = require('./modules/paths')

const pkg = require(paths.resolveAppPath('package.json'))

const getLocale = (optionsLocale) => {
  const pkgLocale = pkg.vtexTestTools.defaultLocale
  const languages = [optionsLocale, pkgLocale, 'en', 'en-US']

  const locales = languages.filter((lang) => Boolean(lang))
  const localeExists = (locale) =>
    paths.pathExists(`../messages/${locale}.json`)

  return locales.find(localeExists)
}

// Creating apollo-client cache like render-runtime
const generateCacheKey = (value) => {
  const { cacheId, __typename } = value || {}

  if (value && cacheId && __typename) {
    return `${__typename}:${cacheId}`
  }

  return null
}

const customRender = (node, options = {}) => {
  const locale = getLocale(options.locale)
  const messages = locale
    ? require(paths.resolveAppPath(`../messages/${locale}.json`))
    : {}

  const intlProps = {
    locale: locale || 'en',
    messages,
  }

  const apolloProps = options.graphql
    ? { addTypename: false, ...options.graphql }
    : { mocks: [], addTypename: false }

  const cache = new InMemoryCache({
    addTypename: apolloProps.addTypename,
    dataIdFromObject: generateCacheKey,
  })

  apolloProps.cache = cache

  const rendered = reactTestingLibrary.render(
    React.createElement(
      IntlProvider,
      intlProps,
      React.createElement(MockedProvider, apolloProps, node)
    ),
    options
  )

  return {
    ...rendered,
    rerender: (newUi) =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

const flushPromises = () => new Promise((resolve) => setImmediate(resolve))

// re-export everything
module.exports = {
  ...reactTestingLibrary,
  render: customRender,
  flushPromises,
  renderHook: hooks.renderHook,
  hooks,
}
