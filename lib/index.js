/***********************************************************************
 *                                                                   _
 *       _____  _                           ____  _                 |_|
 *      |  _  |/ \   ____  ____ __ ___     / ___\/ \   __   _  ____  _
 *      | |_| || |  / __ \/ __ \\ '_  \ _ / /    | |___\ \ | |/ __ \| |
 *      |  _  || |__. ___/. ___/| | | ||_|\ \___ |  _  | |_| |. ___/| |
 *      |_/ \_|\___/\____|\____||_| |_|    \____/|_| |_|_____|\____||_| 
 *                                                                      
 *      ================================================================
 *                 More than a coder, More than a designer              
 *      ================================================================
 *
 *
 *      - Document: index.js
 *      - Author: aleen42
 *      - Description: the main entrance for page-footer
 *      - Create Time: Apr 16th, 2016
 *      - Update Time: Apr 16th, 2016
 *
 *
 **********************************************************************/

/**
 * [moment: the moment module]
 * @type {[type]}
 */

const moment = require('moment');

/** include qrcode.js */
const qrcode = require('./qrcode.js');

/**
 * [main module]
 * @type {Object}
 */
const pageFooter = module.exports = {
	/** Map of new style */
	book: {
		assets: './assets',
		css: [
			'footer.css'
		]
	},

    /** Map of hooks */
    hooks: {
    	'page:before': function (page) {
            var s = '';
            s += ('progress:');
            for (var item in page.progress) {
                s += (item + ';');
            }

            s += ('content:');
            for (var item in page.content) {
                s += (item + ';');
            }

    		/**
    		 * [defaultOption: default option]
    		 * @type {Object}
    		 */
    		const defaultOption = {
    			'description': 'modified at',
                'author': 'Aleen',
                'wisdom': 'More than a coder, more than a designer',
    			'format': 'YYYY-MM-DD HH:mm:ss',
    			'copyright': 'Copyright &#169; aleen42',
    			'timeColor': '#666',
    			'copyrightColor': '#666',
                'utcOffset': '8',
                'qrcode': true,
                'baseUri': 'https://aleen42.gitbooks.io/personalwiki/content/'
    		};

    		/** if users have its option, and then combine it with default options */
    		if (this.options.pluginsConfig['page-footer']) {
    			for (var item in defaultOption) {
    				/** special for copyright */
    				if (item === 'copyright') {
    					defaultOption[item] = this.options.pluginsConfig['page-footer'][item] || defaultOption[item];
	    				defaultOption[item] += ' all right reserved, powered by <a href="https://github.com/aleen42" target="_blank">aleen42</a>';
    				} else {
    					defaultOption[item] = this.options.pluginsConfig['page-footer'][item] || defaultOption[item];
    				}
    			}
    		}

    		/**
    		 * [htmlContents: to store html tags]
    		 * @type {String}
    		 */
            const qrImg = defaultOption.qrcode === true ? '\n{{ file.path | currentUri("' + defaultOption.baseUri + '") }}\n' : '';
            const uri = defaultOption.qrcode === true ? '\n{{ file.path | convertUri("' + defaultOption.baseUri + '") }}\n' : '';

            const htmlContents = ' \n\n<footer class="page-footer">' + 
                '<div class="header">' +
                    '<div class="qrcode" alt="' + uri + '">' +
                        qrImg +
                        '<div class="qr-right">' +
                            '<p class="title" style="color: #000 !important;">' + defaultOption.author + '<sup>&#174;</sup></p>' +
                            '<p class="subtitle" style="color: #000 !important;">' + defaultOption.wisdom + '</p>' +
                            '<div class="right-foot">' +
                                '<p class="copyright" style="color: ' + defaultOption.copyrightColor + ' !important;">' + defaultOption.copyright +  '</span>' +
                                '<p class="description" style="color: ' + defaultOption.timeColor + ' !important;">' +
                                    '<span class="time-description" style="color: #666 !important;">' + defaultOption.description + '</span>' +
                                    '\n{{ file.mtime | dateFormat("' + defaultOption.format + '", ' + defaultOption.utcOffset + ') }}\n' +
                                '</p>' + 
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</footer>';

    		/** add contents to the original content */
    		page.content = page.content + htmlContents;

    		return page;
    	}
    },

    /** Map of new blocks */
    blocks: {},

    /** Map of new filters */
    filters: {
    	dateFormat: function(d, format, utc) {
    		return moment(d).utcOffset(parseInt(utc)).format(format);
    	},

        convertUri: function (d, baseUri) {
            return baseUri + this.book.contentLink(d);
        },

        currentUri: function (d, baseUri) {
            if (this.generator == 'website') {
                return pageFooter.createQRcode(baseUri + this.book.contentLink(d), 20, 'H');
            } else {
                return '';
            }
        }
    },

    /**
     * [test: tests function]
     * @param  {[type]} configs [simulated configs]
     * @return {[type]}        [description]
     */
    test: function (configs) {
    	/**
		 * [option: default option]
		 * @type {Object}
		 */
		const defaultOption = {
            'description': 'modified at',
            'author': 'Aleen',
            'wisdom': 'More than a coder, more than a designer',
            'format': 'YYYY-MM-DD HH:mm:ss',
            'copyright': 'Copyright &#169; aleen42',
            'timeColor': '#666',
            'copyrightColor': '#666',
            'utcOffset': '8',
            'qrcode': true,
            'baseUri': 'https://aleen42.gitbooks.io/personalwiki/content/'
        };

		/** if users have its option, and then combine it with default options */
		if (configs['page-footer']) {
			for (var item in defaultOption) {
				/** special for copyright */
				if (item === 'copyright') {
					defaultOption[item] = configs['page-footer'][item] || defaultOption[item];
    				defaultOption[item] += ' all right reserved， powered by Gitbook';
				} else {
					defaultOption[item] = configs['page-footer'][item] || defaultOption[item];
				}
			}
		} else {
    		defaultOption.copyright += ' all right reserved， powered by Gitbook';
		}

		/**
		 * [htmlContents: to store html tags]
		 * @type {String}
		 */
		const htmlContents = ' \n\n<footer class="page-footer">' + 
                '<div class="header">' +
                    '<p class="title">' + defaultOption.author + '<sup>&#174;</sup></p>' +
                    '<p class="subtitle">' + defaultOption.wisdom + '</p>' +
                '</div>' +
                '<span class="copyright" style="color: ' + defaultOption.copyrightColor + ' !important;">' + defaultOption.copyright +  '</span>' +
                '<span class="description" style="color: ' + defaultOption.timeColor + ' !important;">' +
                    defaultOption.description +
                    '\n{{file.mtime | date("' + defaultOption.format + '")}}\n' +
                '</span>' + 
            '</footer>';

		return htmlContents;
    },

    createQRcode: function (text, typeNumber, errorCorrectLevel) {
        const qr = qrcode(typeNumber || 10, errorCorrectLevel || 'H');
        qr.addData(text);
        qr.make();

        return qr.createImgTag();
    }
};
