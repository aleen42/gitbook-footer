## page-footer

![gitbook](https://badges.aleen42.com/src/gitbook_1.svg) ![gitbook](https://badges.aleen42.com/src/gitbook_2.svg)

[![npm](https://img.shields.io/npm/v/gitbook-plugin-page-footer.svg)](https://www.npmjs.com/package/gitbook-plugin-page-footer) [![Build Status](https://travis-ci.org/aleen42/gitbook-footer.svg?branch=master)](https://travis-ci.org/aleen42/gitbook-footer) [![devDependency Status](https://david-dm.org/aleen42/gitbook-footer/dev-status.svg)](https://david-dm.org/aleen42/gitbook-footer#info=devDependencies) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-page-footer.svg)](https://www.npmjs.com/package/gitbook-plugin-page-footer)

A GitBook plugin to show issues and some other information of the repository behind each page.

### Normal Style

![page-footer](./page-footer.png)

### Symmetrical Style

![page-footer](./page-footer-symmetrical.png)

### Issues Part

In this part, you can specify a repository and show your latest 8 opened issues or pull requests in a book:

*Notice that: because there is a rate-limiting for calling GitHub API, so it's suggested to generate a token following the [site](https://github.com/blog/1509-personal-api-tokens). In addition, you can only update this part after rebuilding your books!*

![page-footer](./issues.png)

### Installation

Add the following plugins to your `book.json` and run `gitbook install`

```json
{
    "plugins": ["page-footer"]
}
```

### Usage

Just find the plugin on gitbook and install it on your gitbook project.

The default configuration is:

```json
{
    "plugins": [
        "page-footer"
    ],
    "pluginsConfig": {
        "page-footer": {
            "description": "modified at",
            "signature": "Aleen",
            "wisdom": "More than a coder, more than a designer",
            "format": "yyyy-MM-dd hh:mm:ss",
            "copyright": "Copyright &#169; aleen42",
            "timeColor": "#666",
            "copyrightColor": "#666",
            "utcOffset": "8",
            "isShowQRCode": true,
            "isShowIssues": true,
            "baseUri": "https://wiki.aleen42.com/",
            "repo": "aleen42/PersonalWiki",
            "issueNum": "8",
            "token": "",
            "style": "normal"
        }
    }
}
```

### Release History

* ==================== **1.0.0 Initial release** ====================
    * 1.0.1 fix bugs
    * 1.0.2 fix bugs
    * 1.0.3 fix bugs
    * 1.0.4 fix bugs
    * 1.0.5 fix bugs
    * 1.0.6 update readme
    * 1.0.7 update package.json
    * 1.0.8 update readme
    * 1.0.9 update readme
    * 1.1.0 version restrict
    * 1.1.1 configuration
    * 1.1.2 configuration
    * 1.1.3 fix bugs
    * 1.1.4 fix bugs
    * 1.1.5 fix bugs
    * 1.1.6 fix bugs
    * 1.1.7 fix bugs
    * 1.1.8 fix bugs
    * 1.1.9 debug mode
    * 1.2.0 debug mode
    * 1.2.1 debug mode
    * 1.2.2 debug mode
    * 1.2.3 debug mode
    * 1.2.4 debug mode
    * ================ **1.3.3 released version** ================
    * 1.3.4 add title
    * ================ **1.4.3 released version** ================
    * ================ **1.4.6 released version** ================
    * 1.4.8 update readme
    * 1.4.9 update readme
* ==================== **2.0.0 Featuring configuration** ====================
    * 2.0.1 update readme
    * 2.0.2 update dependency version
    * 2.0.3 update readme
    * 2.0.4 update readme
    * 2.0.5 update readme
    * 2.0.6 update readme
    * 2.0.7 update readme
    * 2.0.8 update readme
    * 2.0.9 update readme
    * 2.1.0 update readme
    * 2.1.1 update style
    * 2.1.2 unused version
    * 2.1.3 featuring Timezone
    * 2.1.4 fix bugs
    * 2.1.5 fix bugs
    * 2.1.6 fix bugs
    * 2.1.7 update readme
    * 2.8.9 unused version
* ==================== **3.0.0 Featuring Qrcode** ====================
    * 3.0.1 update style
    * 3.0.6 fix bugs
    * 3.0.7 justify style for mobile
    * 3.0.8 justify style for mobile
    * 3.0.9 support optional styles
    * 3.1.0 featuring style of symmetrical
    * 3.1.1 fix bugs
    * 3.1.2 fix bugs
    * 3.1.3 fix bugs
    * 3.1.4 fix bugs
* ==================== **4.0.0 Featuring Optional Styles** ====================
    * 4.0.1 modify description of options
    * 4.0.2 change qrcode's quality and size
    * 4.0.3 change stylesheet
    * 4.0.4 change stylesheet
    * 4.0.5 change stylesheet
    * 4.0.6 change stylesheet
    * 4.0.7 hotfix
    * 4.0.8 hotfix
    * 4.0.9 update readme
    * 4.1.9 update readme
    * 4.2.9 fix bugs of Gitbook engine 3.0.3
    * 4.3.0 update readme
* ==================== **5.0.0 Featuring Issues Style** ====================
    * 5.0.1 update readme
    * 5.0.2 update default config
    * 5.0.4 fix bugs of issues [#4](https://github.com/aleen42/gitbook-footer/issues/4)
    * 5.0.5 update readme
    * 5.0.6 fix bugs
    * 5.0.7 fix bugs of issues [#5](https://github.com/aleen42/gitbook-footer/issues/5)
    * 5.0.8 update readme
    * 5.0.9 fix bugs
    * 5.1.0 fix bugs
    * 5.1.1 update styles
    * 5.1.2 update styles
    * 5.1.3 update styles
    * 5.1.4 update readme
    * 5.1.5 update readme
    * 5.1.6 optional issue number
    * 5.1.7 restrict reading book
    * 5.1.9 update default value
    * 5.2.0 fix bugs
    * 5.2.1 fix bugs
    * 5.2.2 merge pull requests of [#6](https://github.com/aleen42/gitbook-footer/issues/6)
    * 5.2.3 update test cases
    * 5.2.4 update readme
    * 5.2.5 update readme
    * 5.2.6 update code
    * 5.2.7 update readme
    * 5.3.0 calculate a proper color for the text in labels
    * 5.3.1 update readme
    * 5.3.2 fix timezone problem of UTC
    * 5.3.3 support GITHUB_TOKEN under travis-ci building
    * 5.3.4 fix the number of issues
    * 5.3.5 fix the problem of [#9](https://github.com/aleen42/gitbook-footer/issues/9)
    * 5.3.6 fix style and extend super option
    * 5.3.8 enhancement of styles
    * 5.3.9 fix style of normal type
    * 5.4.0 remove style of QRCode within normal type
    * 5.4.1 compatible style for gitbook themes
    * 5.4.3 deprecated token access way for GitHub
    * 5.4.7 use gitbook-color to support light or dark theme
    * 5.4.8 refactor
    * 5.4.9 fix the dependency problem [#13](https://github.com/aleen42/gitbook-footer/issues/13)
    * 5.5.0 eliminate different sizes of labels when changing color mode

### :fuelpump: How to contribute

Have an idea? Found a bug? See [how to contribute](https://wiki.aleen42.com/contribution.html).

### :scroll: License

[MIT](https://wiki.aleen42.com/MIT.html) © aleen42
