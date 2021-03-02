# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.3.2] - 2020-08-20
### Fixed
- Syntax error in JavaScript test files.

## [3.3.1] - 2020-08-10
### Fixed
- Adding missing dependency `graphql-tag`.

## [3.3.0] - 2020-08-10
### Added
- Support for `const enum`s.

## [3.2.1] - 2020-08-06
### Changed
- Convert project files to TypeScript.

## [3.2.0] - 2020-08-04
### Added
- Export a `hooks` bag of methods to test react hooks.

### Fixed
- `jest` and `@testing-library` typings.
- Typings for `jest-dom` matchers.

### Changed
- Remove unneeded dependencies

## [3.1.0] - 2020-03-30

### Added
- Get the `coverageThreshold` configuration from `package.json` file.

## [3.0.3] - 2020-02-13
### Changed
- Upgrade `@babel/preset-env` and `@babel/core` packages to `v7.8.0`.

## [3.0.2] - 2020-02-12

### Fixed

- Always taking the default locale even when a custom locale was set.

## [3.0.1] - 2020-01-22
### Fixed
- Add missing type for `flushPromises`.
- Install docs.

## [3.0.0] - 2019-12-17
### Changed
- Support react-intl@3.x.
- Make @apollo/react-testing and react-intl peer dependencies.

## [2.1.1] - 2019-12-05
### Fixed
- Use babel plugins to support tests with optional chaining or nullish coalescing.

## [2.1.0] - 2019-12-04
### Added
- Export `@react-testing-library/react-hooks` out of the box. You can import `renderHook` now.

## [2.0.0] - 2019-12-03

### Changed

- Upgraded `react-apollo` to major 3.

## [1.2.1] - 2019-11-07

### Fixed

- Implement cache function similiar to the one that we use on `render-runtime`.

## [1.2.0] - 2019-08-29

### Changed

- Bump react to v16.9.0.
- Bump react-testing-library to v9.1.3.

## [1.1.0] - 2019-07-23

### Added

- `flushPromises` utility function.

## [1.0.0] - 2019-07-12

### Changed

- **[BREAKING]** Use scoped library `@testing-library`. Related issue ["Create @testing-library scope for publishing. #260"](https://github.com/testing-library/dom-testing-library/issues/260).

## [0.3.2] - 2019-05-14

### Fixed

- end-of-line issues.

## [0.3.1] - 2019-05-12

### Fixed

- Locale when tested app has no messages.

## [0.3.0] - 2019-05-12

### Added

- Types for `locale`, `message` and `graphql` options.

## [0.2.0] - 2019-03-25

### Added

- Support to Dynamic Import.

## [0.1.5] - 2019-03-22

### Fixed

- Export types for Jest so that TypeScript compiler can find them.

## [0.1.4] - 2019-03-18

### Fixed

- Dependency issue when running TypeScript tests.

## [0.1.3] - 2019-03-15

### Added

- Use `en.json` as default translation.

## [0.1.2] - 2019-03-12

### Fixed

- Remove `tsconfig.json` from project. Use user `tsconfig.json`.

## [0.1.1] - 2019-03-12

### Fixed

- How tranforms are being required

## [0.1.0] - 2019-03-12
