# [2.0.0-alpha.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.7.5...v2.0.0-alpha.1) (2020-09-10)


### Bug Fixes

* **deps:** update dependency axios to ^0.20.0 ([8c87786](https://github.com/jubilee-works/timetree-sdk-js/commit/8c87786ad5d6e2fdeed36d738753fa4e8eea68a4))


### Features

* support jwt authentication ([488eb4d](https://github.com/jubilee-works/timetree-sdk-js/commit/488eb4dd2dfcc3ec7998e88880517a606a3fdb33))


### BREAKING CHANGES

* rename TimeTreeClient to OAuthClient and Authenticator to OAuthAuthenticator

## [1.7.5](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.7.4...v1.7.5) (2020-06-01)


### Bug Fixes

* **update event:** fix wrong url of /events/:eventId ([349c2aa](https://github.com/jubilee-works/timetree-sdk-js/commit/349c2aa5f77b63a18c91bc3eb2db5afc71b87b97))

## [1.7.4](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.7.3...v1.7.4) (2020-05-28)


### Bug Fixes

* **api:** fix update event missing params ([5fdedcc](https://github.com/jubilee-works/timetree-sdk-js/commit/5fdedccd6c1d331df684b5410bf675aa17e6b936))

## [1.7.3](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.7.2...v1.7.3) (2020-04-14)


### Bug Fixes

* **yarn.lock:** run: yarn upgrade cz-conventional-changelog ([c00df06](https://github.com/jubilee-works/timetree-sdk-js/commit/c00df06ffcebabdf6cfd2f1a91477b5bb45c6316))
* **yarn.lock:** run: yarn upgrade semantic-release for security vulnerabilities ([f377da7](https://github.com/jubilee-works/timetree-sdk-js/commit/f377da7516f6d01b3abce2ac05ad59bcceb8502d))

## [1.7.2](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.7.1...v1.7.2) (2020-03-03)


### Bug Fixes

* **api:** fix retry condition ([b6f4145](https://github.com/jubilee-works/timetree-sdk-js/commit/b6f41457c26259d519c73af52938ff7413f91483))

## [1.7.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.7.0...v1.7.1) (2020-03-02)


### Bug Fixes

* **rollup:** fix rollup configuration for client build ([4daabac](https://github.com/jubilee-works/timetree-sdk-js/commit/4daabac43dd1287bbe1cbd2e4574ddd0804d8a3c))

# [1.7.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.8...v1.7.0) (2020-03-02)


### Features

* add retry option to TimeTree Client ([ce0b716](https://github.com/jubilee-works/timetree-sdk-js/commit/ce0b7164c8044e7229d564de83a66b39a7a29cf2))
* **http client:** use axios instead of ky ([20f3280](https://github.com/jubilee-works/timetree-sdk-js/commit/20f3280768b070289c40e052cfd22b2543a4cd41))

## [1.6.8](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.7...v1.6.8) (2020-02-26)


### Bug Fixes

* fix typo accessToken ([f632d72](https://github.com/jubilee-works/timetree-sdk-js/commit/f632d72d279154f978c13354b8a52f83033fdcb0))

## [1.6.7](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.6...v1.6.7) (2020-02-13)


### Bug Fixes

* fix TypeError occured when error.response.data is undefined ([c67ab12](https://github.com/jubilee-works/timetree-sdk-js/commit/c67ab124101e4968eee963ee8355ac6a9b933a00))

## [1.6.6](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.5...v1.6.6) (2020-02-12)


### Bug Fixes

* **error:** fix error object to include "response: Response" ([c6d0331](https://github.com/jubilee-works/timetree-sdk-js/commit/c6d03317ff68a425b7cae630dbc665c6b8175ea7))

## [1.6.5](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.4...v1.6.5) (2020-02-07)


### Bug Fixes

* **rollup:** fix broken build system ([f8750d1](https://github.com/jubilee-works/timetree-sdk-js/commit/f8750d18c58b7a404de595709fea3369ef7c130a))

## [1.6.4](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.3...v1.6.4) (2020-02-07)


### Bug Fixes

* **rollup:** fix order of rollup/plugins ([c99e00f](https://github.com/jubilee-works/timetree-sdk-js/commit/c99e00f0dd9dfa17aaeb5e0c764f45808cd824af))

## [1.6.3](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.2...v1.6.3) (2020-02-06)


### Bug Fixes

* **rollup:** fix broken build system ([dead6f6](https://github.com/jubilee-works/timetree-sdk-js/commit/dead6f615cc0a89c7aefd027449f36643c7eedb0))

## [1.6.2](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.1...v1.6.2) (2020-02-05)


### Bug Fixes

* **type:** fix type errors ([173b53a](https://github.com/jubilee-works/timetree-sdk-js/commit/173b53a3e3401f100665baef54d8b75509b95249))

## [1.6.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.6.0...v1.6.1) (2020-02-05)


### Bug Fixes

* add retry callback option ([6135c74](https://github.com/jubilee-works/timetree-sdk-js/commit/6135c7449d9fdc94fc135a51f79e47c7a7c82853))

# [1.6.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.5.1...v1.6.0) (2020-02-04)


### Features

* using ky-universal, add retry option to TimeTreeClient ([fd1bf45](https://github.com/jubilee-works/timetree-sdk-js/commit/fd1bf45fb39096f9ddc3fcfbaf826f5c5a85bede))

## [1.5.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.5.0...v1.5.1) (2020-01-31)


### Bug Fixes

* **ci:** fix build configuration to use browser ([b407946](https://github.com/jubilee-works/timetree-sdk-js/commit/b4079469b3c2c0c1ecbec485b470955618d86001))

# [1.5.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.4.0...v1.5.0) (2020-01-30)


### Features

* **response data:** deserialize data formated as JSONAPI ([c2bbb2d](https://github.com/jubilee-works/timetree-sdk-js/commit/c2bbb2d0d4f3ac9814a863e5edf680f2233e573d))

# [1.4.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.3.1...v1.4.0) (2020-01-28)


### Features

* **authenticator:** create OAuth API for using OAuth application ([78ef6e4](https://github.com/jubilee-works/timetree-sdk-js/commit/78ef6e4c9965b71b808f3683d04ab8955ad0198d))

## [1.3.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.3.0...v1.3.1) (2020-01-28)


### Bug Fixes

* **response:** extract response.data for returning only content ([9793baa](https://github.com/jubilee-works/timetree-sdk-js/commit/9793baabf7e4372c28bd734600a3269114fbba2a))

# [1.3.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.2.2...v1.3.0) (2020-01-27)


### Features

* **type:** camelize and decamelized keys per request ([d0a8760](https://github.com/jubilee-works/timetree-sdk-js/commit/d0a87607e54b9d4f74785d4f5cd4ab618cfff440))

## [1.2.2](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.2.1...v1.2.2) (2020-01-27)


### Bug Fixes

* **types/events.ts:** fix nested type of event.relationships.label.data ([d8de866](https://github.com/jubilee-works/timetree-sdk-js/commit/d8de8663942306d1094f36bd52cfe292562c0945))

## [1.2.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.2.0...v1.2.1) (2020-01-27)


### Bug Fixes

* use relative path instead of absolute path ([82ce547](https://github.com/jubilee-works/timetree-sdk-js/commit/82ce547531c6bade294e2fb0d3a3b746d192d1b8))

# [1.2.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.1.0...v1.2.0) (2020-01-24)


### Features

* implement all api method ([975ac0a](https://github.com/jubilee-works/timetree-sdk-js/commit/975ac0a25effbd9fab0e757d1aa8b434830bb33d))

# [1.1.0](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.0.3...v1.1.0) (2020-01-24)


### Features

* **timetreeclient:** add method to timetreeclient for get calendar, labels, members, event ([761b7bb](https://github.com/jubilee-works/timetree-sdk-js/commit/761b7bb3b2c4c38989754d7774e77832dcb6e2c5))

## [1.0.3](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.0.2...v1.0.3) (2020-01-24)


### Bug Fixes

* fix tsconfig ([40a1cfb](https://github.com/jubilee-works/timetree-sdk-js/commit/40a1cfb9fe741a0730c779f0876559484f8f6ddf))

## [1.0.2](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.0.1...v1.0.2) (2020-01-24)


### Bug Fixes

* fix configuration of build ([f1521c0](https://github.com/jubilee-works/timetree-sdk-js/commit/f1521c068dafcca2fcaf60f073e0ab4075b8523d))

## [1.0.1](https://github.com/jubilee-works/timetree-sdk-js/compare/v1.0.0...v1.0.1) (2020-01-24)


### Bug Fixes

* **package.json:** fix configuration ([d0bf9db](https://github.com/jubilee-works/timetree-sdk-js/commit/d0bf9dba09f45f7f0219087ae8998a8d6330fe3d))

# 1.0.0 (2020-01-24)


### Bug Fixes

* fix removed packages ([41b9689](https://github.com/jubilee-works/timetree-sdk-js/commit/41b9689f5dbd23337612dc46c89882ffd397f054))


### Features

* generate web-api ([4e8ac7b](https://github.com/jubilee-works/timetree-sdk-js/commit/4e8ac7b8be715f1cceba0f0fea2c89e00921dc04))
