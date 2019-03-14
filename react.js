const React = require('react')
const reactTestingLibrary = require('react-testing-library')
const { IntlProvider } = require('react-intl')
const { MockedProvider } = require('react-apollo/test-utils')
const { path, insertAll, reject, isNil, find } = require('ramda')
const paths = require('./modules/paths')

const pkg = require(paths.resolveAppPath('package.json'))

const getLocale = (optionsLocale) => {
  const defaultLocales = ['en', 'en-US']
  const pkgLocale = path(['vtexTestTools', 'defaultLocale'], pkg)

  const locales = reject(isNil, insertAll(optionsLocale, pkgLocale, defaultLocales, []))
  const localeExists = locale => paths.pathExists(`../messages/${locale}.json`)

  return find(localeExists, locales)
}

const customRender = (node, options = {}) => {
  const locale = getLocale(path(['locale'], options))
  const messages = locale 
    ? require(paths.resolveAppPath(`../messages/${locale}.json`)) 
    : {}

  const intlProps = {
    locale: locale,
    messages: messages,
  }

  const apolloProps = options.graphql
    ? Object.assign({}, { addTypename: false }, options.graphql)
    : { mocks: [], addTypename: false }

  const rendered = reactTestingLibrary.render(
    React.createElement(
      IntlProvider,
      intlProps,
      React.createElement(
        MockedProvider,
        apolloProps,
        node
      ),
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

// re-export everything
module.exports = Object.assign({},
 reactTestingLibrary,
 { render: customRender }
)
