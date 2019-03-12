const React = require('react')
const reactTestingLibrary = require('react-testing-library')
const { IntlProvider } = require('react-intl')
const { MockedProvider } = require('react-apollo/test-utils')
const paths = require('./modules/paths')

const pkg = require(paths.resolveAppPath('package.json'))

let defaultLocale = 'en-US'
if (pkg.vtexTestTools && pkg.vtexTestTools.defaultLocale) {
  defaultLocale = pkg.vtexTestTools.defaultLocale
}

const defaultMessages = require(paths.resolveAppPath('../messages/' + defaultLocale + '.json'))

const customRender = (node, options = {}) => {
  const intlProps = {
    locale: defaultLocale,
    messages: defaultMessages,
  }

  if (options.locale) {
    intlProps.locale = options.locale
    intlProps.messages = require(paths.resolveAppPath('../messages/' + options.locale + '.json'))
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
