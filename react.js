const React = require('react')
const reactTestingLibrary = require('@testing-library/react')
const { IntlProvider } = require('react-intl')
const { MockedProvider } = require('react-apollo/test-utils')
const { path, insertAll, reject, isNil, find } = require('ramda')
const { InMemoryCache } = require('apollo-cache-inmemory')

const paths = require('./modules/paths')

const pkg = require(paths.resolveAppPath('package.json'))

const getLocale = optionsLocale => {
  const defaultLocales = ['en', 'en-US']
  const pkgLocale = path(['vtexTestTools', 'defaultLocale'], pkg)

  const locales = reject(
    isNil,
    insertAll(optionsLocale, pkgLocale, defaultLocales, [])
  )
  const localeExists = locale => paths.pathExists(`../messages/${locale}.json`)

  return find(localeExists, locales)
}

// Creating apollo-client cache like render-runtime
const generateCacheKey = value => {
  const { cacheId, __typename } = value || {}
  if (value && cacheId && __typename) {
    return `${__typename}:${cacheId}`
  }

  return null
}

const customRender = (node, options = {}) => {
  const locale = getLocale(path(['locale'], options))
  const messages = locale
    ? require(paths.resolveAppPath(`../messages/${locale}.json`))
    : {}

  const intlProps = {
    locale: locale || 'en',
    messages: messages,
  }

  const apolloProps = options.graphql
    ? Object.assign({}, { addTypename: false }, options.graphql)
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
    rerender: newUi =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

const flushPromises = () => new Promise(resolve => setImmediate(resolve))

// re-export everything
module.exports = Object.assign({}, reactTestingLibrary, {
  render: customRender,
  flushPromises,
})
