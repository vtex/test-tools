// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
require('react-testing-library/cleanup-after-each')
// this adds jest-dom's custom assertions
require('jest-dom/extend-expect')
