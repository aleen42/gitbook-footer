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
 *      - Description: the main entrance for gitbook-footer
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

/**
 * [main module]
 * @type {Object}
 */
module.exports = {
	/** Map of new style */
	book: {
		assets: './assets',
		css: [
			'footer.css'
		]
	},

    /** Map of hooks */
    hooks: {
    	'page::before': function (page) {
    		/**
    		 * [defaultOption: default option]
    		 * @type {Object}
    		 */
    		const defaultOption = {
    			'description': 'modified at',
    			'format': 'YYYY-MM-DD HH:mm:ss',
    			'copyright': 'Copyright © aleen42',
    			'timeColor': '#666',
    			'copyrightColor': '#666'
    		};

    		/** if users have its option, and then combine it with default options */
    		if (this.options.pluginConfig['gitbook-footer']) {
    			for (var item in defaultOption) {
    				/** special for copyright */
    				if (item === 'copyright') {
    					defaultOption[item] = this.options.pluginConfig['gitbook-footer'][item] || defaultOption[item];
	    				defaultOption[item] += ' all right reserved， powered by Gitbook';
    				} else {
    					defaultOption[item] = this.options.pluginConfig['gitbook-footer'][item] || defaultOption[item];
    				}
    			}
    		}

    		/**
    		 * [htmlContents: to store html tags]
    		 * @type {String}
    		 */
    		const htmlContents = '<footer class="page-footer>\
					<span class="copyright" style="color: ' + defaultOption.copyrightColor + ' !important;">' + defaultOption.copyright +  '</span>\
					<span class="description style="color: ' + defaultOption.timeColor + ' !important;">' + defaultOption.description + ': ' + '{{file.mtime || date("' + defaultOption.format + '")}}</span>\
    			</footer>';

    		/** add contents to the original content */
    		page.content = page.content + htmlContents;

    		return page;
    	}
    },

    /** Map of new blocks */
    blocks: {},

    /** Map of new filters */
    filters: {
    	date: function(d, format) {
    		return moment(d).format(format);
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
			'format': 'YYYY-MM-DD HH:mm:ss',
			'copyright': 'Copyright © aleen42',
			'timeColor': '#666',
			'copyrightColor': '#666'
		};

		/** if users have its option, and then combine it with default options */
		if (configs['gitbook-footer']) {
			for (var item in defaultOption) {
				/** special for copyright */
				if (item === 'copyright') {
					defaultOption[item] = configs['gitbook-footer'][item] || defaultOption[item];
    				defaultOption[item] += ' all right reserved， powered by Gitbook';
				} else {
					defaultOption[item] = configs['gitbook-footer'][item] || defaultOption[item];
				}
			}
		} else {
    		defaultOption.copyright += ' all right reserved， powered by Gitbook';
		}

		/**
		 * [htmlContents: to store html tags]
		 * @type {String}
		 */
		const htmlContents = '<footer class="page-footer>\
				<span class="copyright" style="color: ' + defaultOption.copyrightColor + ' !important;">' + defaultOption.copyright +  '</span>\
				<span class="description style="color: ' + defaultOption.timeColor + ' !important;">' + defaultOption.description + ': ' + '2016-04-16 08:05:53</span>\
			</footer>';

		return htmlContents;
    }
};
