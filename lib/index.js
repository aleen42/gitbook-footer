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
 *      - Update Time: Jul 25th, 2018
 *
 *
 **********************************************************************/

/**
 * [request: the request module]
 * @type {[type]}
 */
const syncReq = require('sync-request');

/**
 * [request: the request module]
 * @type {[type]}
 */
const nodeCache = require('node-cache');
const localCache = new nodeCache({});

/** include qrcode.js */
const qrcode = require('./qrcode.js');

/** set Date protocol */
Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
};

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
			if (this.output.name != 'website') {
				return page;
			}

			/**
			 * [defaultOption: default option]
			 * @type {Object}
			 */
			const defaultOption = {
				'description': 'modified at',
				'signature': 'Aleen',
				'wisdom': 'More than a coder, more than a designer',
				'format': 'yyyy-MM-dd hh:mm:ss',
				'copyright': 'Copyright &#169; aleen42',
				'timeColor': '#666',
				'copyrightColor': '#666',
				'utcOffset': '8',
				'isShowQRCode': true,
				'baseUri': 'https://aleen42.gitbooks.io/personalwiki/content/',
				'isShowIssues': true,
				'repo': 'aleen42/PersonalWiki',
				'issueNum': '8',
				'token': '',
				'style': 'normal',
				'super': '&#174;'
			};

			/**
			 * [configOption: config option]
			 * @type {Object}
			 */
			const configOption = this.config.get('pluginsConfig')['page-footer'];

			/** if users have its option, and then combine it with default options */
			if (configOption) {
			// @deprecated
			// if (this.options.pluginsConfig['page-footer']) {
				for (var item in defaultOption) {
					/** special for copyright */
					// @deprecated
					// defaultOption[item] = this.options.pluginsConfig['page-footer'][item] || defaultOption[item];
					if (item in configOption) {
						defaultOption[item] = configOption[item];
					}

					if (item === 'copyright') {
						defaultOption[item] += ' all right reserved, powered by <a href="https://github.com/aleen42" target="_blank">aleen42</a>';
					}
				}
			}

			/**
			 * [htmlContents: to store html tags]
			 * @type {String}
			 */
			const qrImg = defaultOption.isShowQRCode === true ? '\n{{ file.path | currentUri("' + defaultOption.baseUri + '") }}\n' : '';
			const uri = defaultOption.isShowQRCode === true ? '\n{{ file.path | convertUri("' + defaultOption.baseUri + '") }}\n' : '';
			const issues = defaultOption.isShowIssues === true ? '\n{{ "' + defaultOption.repo + '" | listRepo("' + (process.env['GITHUB_TOKEN'] || defaultOption.token) + '", "' + defaultOption.format + '", ' + defaultOption.utcOffset + ', ' + defaultOption.issueNum + ') }}\n' : '';

			defaultOption.style = (defaultOption.style == 'normal' || defaultOption.style == 'symmetrical') ? defaultOption.style : 'normal';

			const htmlContents = ' \n\n<div class="footer">' +
				'<div class="footer__container--' + defaultOption.style + '" alt="' + uri + '">' +
					qrImg +
					'<div class="footer__description--' + defaultOption.style + '">' +
						'<p class="paragraph footer__author--' + defaultOption.style + '">' + defaultOption.signature + '<sup class="super">' + defaultOption.super + '</sup></p>' +
						'<p class="paragraph footer__quote--' + defaultOption.style + '">' + defaultOption.wisdom + '</p>' +
						'<div class="footer__main--' + defaultOption.style + '">' +
							'<p class="paragraph footer__main__paragraph--' + defaultOption.style + ' copyright" style="color: ' + defaultOption.copyrightColor + ' !important;">' + defaultOption.copyright +  '</span>' +
							'<p class="paragraph footer__main__paragraph--' + defaultOption.style + ' footer__modifyTime--' + defaultOption.style + '" style="color: ' + defaultOption.timeColor + ' !important;">' +
								'<span style="color: #666 !important;">' + defaultOption.description + '</span>' +
								'\n{{ file.mtime | dateFormat("' + defaultOption.format + '", ' + defaultOption.utcOffset + ') }}\n' +
							'</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="box__issues">' +
					issues +
				'</div>' +
			'</div>';

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
			var reservedDate = new Date(d);
			/** convert to UTC firstly */
			reservedDate = new Date(
				reservedDate.getUTCFullYear(),
				reservedDate.getUTCMonth(),
				reservedDate.getUTCDate(),
				reservedDate.getUTCHours(),
				reservedDate.getUTCMinutes(),
				reservedDate.getUTCSeconds()
			);
			reservedDate.setTime(reservedDate.getTime() + (!utc ? 8 : parseInt(utc)) * 60 * 60 * 1000);
			return reservedDate.format(format);
		},

		convertUri: function (d, baseUri) {
			return baseUri + this.output.toURL(d);
		},

		currentUri: function (d, baseUri) {
			if (this.output.name == 'website') {
				return pageFooter.createQRcode(baseUri + this.output.toURL(d), 15, 'Q');
			} else {
				return '';
			}
		},

		listRepo: function (d, token, format, utc, issueNum) {
			var content = '';

			/**clear cache at the first time */
			if (localCache.get('cleared') != 'true') {
				localCache.del('issues');
				localCache.set('cleared', 'true');
				console.log('clear successfully');
			}

			var value = localCache.get('issues');

			if (typeof(value) == 'undefined') {
			    var ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36';
			    var headers = token ? {
                    'user-agent': ua,
                    'Authorization': 'token ' + token
                } : {
                    'user-agent': ua
                };

                var res = syncReq('GET', 'https://api.github.com/repos/' + d + '/issues?per_page=' + issueNum, {
					'headers': headers
				});

				if (res.statusCode != '200') {
					console.log('failed to get issues with token: ' + token);
				} else {
					localCache.set('issues', res.getBody().toString());
				}

				value = localCache.get('issues');
			}

			/** parse json */
			value = JSON.parse(value);

			content += '<span class="issue-line"><p class="issue-header"><strong>' + value.length + '</strong> issues reported</p></span>';

			for (var i = 0; i < value.length; i++) {
				var labels = '';

				for (var j = 0; j < value[i].labels.length; j++) {
					var bgColor = value[i].labels[j].color;
					var r = parseInt(bgColor.slice(0, 2), 16);
					var g = parseInt(bgColor.slice(2, 4), 16);
					var b = parseInt(bgColor.slice(4, 6), 16);

					/** calculate the font color according to the background color */
					var fontColor = r < 80 || g < 80 || b < 80 ? 'ffffff' : '000000';

					labels += '<span class="issue-label" style="background-color: #' + bgColor + '; color: #' + fontColor + ';">' + value[i].labels[j].name + '</span>';
				}

				var reservedDate = new Date(value[i].updated_at);
				reservedDate.setTime(reservedDate.getTime() + (parseInt(utc) === NaN ? 20 : parseInt(utc)) * 60 * 60 * 1000);

				content += '<p class="issues">#' + value[i].number + ' <a href="' + value[i].html_url + '" target="_blank">' + value[i].title + '</a><span style="margin-left: 10px; color: #ddd;">' + reservedDate.format(format) + '</span>' + labels + '</p>\n';

				if (i != value.length - 1) {
					content += '<p class="issue-edge"></p>'
				}
			}

			return content;
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
			'signature': 'Aleen',
			'wisdom': 'More than a coder, more than a designer',
			'format': 'yyyy-MM-dd hh:mm:ss',
			'copyright': 'Copyright &#169; aleen42',
			'timeColor': '#666',
			'copyrightColor': '#666',
			'utcOffset': '8',
			'isShowQRCode': true,
			'baseUri': 'https://aleen42.gitbooks.io/personalwiki/content/',
			'isShowIssues': true,
			'repo': 'aleen42/PersonalWiki',
			'token': '',
			'style': 'normal'
		};

		/** if users have its option, and then combine it with default options */
		if (configs['page-footer']) {
			// @deprecated
			// if (this.options.pluginsConfig['page-footer']) {
			for (var item in defaultOption) {
				/** special for copyright */
				// @deprecated
				// defaultOption[item] = this.options.pluginsConfig['page-footer'][item] || defaultOption[item];
				if (item in configs) {
					defaultOption[item] = configs[item];
				}

				if (item === 'copyright') {
					defaultOption[item] += ' all right reserved, powered by <a href="https://github.com/aleen42" target="_blank">aleen42</a>';
				}
			}
		} else {
			defaultOption.copyright += ' all right reserved， powered by Gitbook';
		}

		/**
		 * [htmlContents: to store html tags]
		 * @type {String}
		 */
		const qrImg = defaultOption.isShowQRCode === true ? '\n{{ file.path | currentUri("' + defaultOption.baseUri + '") }}\n' : '';
		const uri = defaultOption.isShowQRCode === true ? '\n{{ file.path | convertUri("' + defaultOption.baseUri + '") }}\n' : '';
		const issues = defaultOption.isShowIssues === true ? '\n{{ "' + defaultOption.repo + '" | listRepo("' + defaultOption.token + '") }}\n' : '';

		defaultOption.style = (defaultOption.style == 'normal' || defaultOption.style == 'symmetrical') ? defaultOption.style : 'normal';

		const htmlContents = ' \n\n<footer class="footer">' +
			'<div class="footer__container--' + defaultOption.style + '" alt="' + uri + '">' +
				qrImg +
				'<div class="footer__description--' + defaultOption.style + '">' +
					'<p class="paragraph footer__author--' + defaultOption.style + '" style="color: #000 !important;">' + defaultOption.signature + '<sup class="super">&#174;</sup></p>' +
					'<p class="paragraph footer__quote--' + defaultOption.style + '" style="color: #000 !important;">' + defaultOption.wisdom + '</p>' +
					'<div class="footer__main--' + defaultOption.style + '">' +
						'<p class="paragraph footer__main__paragraph--' + defaultOption.style + ' copyright" style="color: ' + defaultOption.copyrightColor + ' !important;">' + defaultOption.copyright +  '</span>' +
						'<p class="paragraph footer__main__paragraph--' + defaultOption.style + ' footer__modifyTime--' + defaultOption.style + '" style="color: ' + defaultOption.timeColor + ' !important;">' +
							'<span style="color: #666 !important;">' + defaultOption.description + '</span>' +
							'\n{{ file.mtime | dateFormat("' + defaultOption.format + '", ' + defaultOption.utcOffset + ') }}\n' +
						'</p>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div>' +
				issues +
			'</div>' +
		'</footer>';

		return htmlContents;
	},

	createQRcode: function (text, typeNumber, errorCorrectLevel) {
		const qr = qrcode(typeNumber || 10, errorCorrectLevel || 'H');
		qr.addData(text);
		qr.make();

		return qr.createSvgTag();
	}
};
