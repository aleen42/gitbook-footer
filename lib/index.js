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
 *      - Update Time: Jul 26th, 2021
 *
 *
 **********************************************************************/

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const tplStr = fs.readFileSync(path.resolve(__dirname, './template.hbs'), 'utf8');

/**
 * [request: the request module]
 * @type {[type]}
 */
const syncReq = require('sync-request');

/**
 * [request: the request module]
 * @type {[type]}
 */
const NodeCache = require('node-cache');
const localCache = new NodeCache({});

/** include qrcode.js */
const qrcode = require('./qrcode.js');

/** set Date protocol */
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (format) {
    const date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds(),
    };

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
    }

    Object.entries(date).forEach(([k, v]) => {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? v : `00${v}`.substr(`${v}`.length));
        }
    });
    return format;
};

/**
 * [defaultOption: default option]
 * @type {Object}
 */
const defaultOption = {
    description: 'modified at',
    signature: 'Aleen',
    wisdom: 'More than a coder, more than a designer',
    format: 'yyyy-MM-dd hh:mm:ss',
    copyright: 'Copyright &#169; aleen42',
    timeColor: '#666',
    copyrightColor: '#666',
    utcOffset: '8',
    isShowQRCode: true,
    baseUri: 'https://aleen42.gitbooks.io/personalwiki/content/',
    isShowIssues: true,
    repo: 'aleen42/PersonalWiki',
    issueNum: '8',
    style: 'normal',
    super: '&#174;',
};

// noinspection JSUnusedGlobalSymbols
/**
 * [main module]
 * @type {Object}
 */
module.exports = {
    generate,
    /** Map of new style */
    book: {
        assets: './assets',
        css: ['footer.css'],
    },

    /** Map of hooks */
    hooks: {
        'page:before': function (page) {
            /** add contents to the original content */
            if (this.output.name === 'website') {
                page.content = page.content + generate(this.config.get('pluginsConfig')['page-footer']);
            }

            return page;
        },
    },

    /** Map of new filters */
    filters: {
        dateFormat: function (d, format, utc) {
            let reservedDate = new Date(d);
            /** convert to UTC firstly */
            reservedDate = new Date(
                reservedDate.getUTCFullYear(),
                reservedDate.getUTCMonth(),
                reservedDate.getUTCDate(),
                reservedDate.getUTCHours(),
                reservedDate.getUTCMinutes(),
                reservedDate.getUTCSeconds(),
            );
            reservedDate.setTime(reservedDate.getTime() + (!utc ? 8 : parseInt(utc)) * 60 * 60 * 1000);
            return reservedDate.format(format);
        },

        currentURI: function (d, baseUri) {
            // noinspection JSUnresolvedFunction
            return this.output.name === 'website' ? createQRCode(baseUri + this.output.toURL(d), 15, 'Q') : '';
        },
    },
};

function hex2rgb(hex) {
    return Array(3).fill('').map((_, i) => parseInt(hex.slice(2 * i, 2 * (i + 1)), 16));
}

function rgb2hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s;
    let l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
    }
    h = h * 360;
    s = s * 100;
    l = l * 100;
    return [h, s, l];
}

function createQRCode(text, typeNumber, errorCorrectLevel) {
    const qr = qrcode(typeNumber || 10, errorCorrectLevel || 'H');
    qr.addData(text);
    qr.make();

    return qr.createSvgTag();
}

function generate(configs) {
    const options = {
        ...defaultOption,
        ...configs,
        copyright: `${configs.copyright || defaultOption.copyright} all right reserved, powered by <a href="https://github.com/aleen42" target="_blank">aleen42</a>`,
    };

    return Handlebars.compile(tplStr)({
        ...options,
        style: /normal|symmetrical/.test(options.style) ? options.style : 'normal',
        issues : options.isShowIssues && listIssues(options),
    });
}

function listIssues({ token: configToken, repo, format, utcOffset, issueNum }) {
    const token = configToken || process.env.ACCESS_TOKEN;

    /** clear cache at the first time */
    if (localCache.get('cleared') !== 'true') {
        localCache.del('issues');
        localCache.set('cleared', 'true');
    }

    const result = localCache.get('issues') || (() => {
        const UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36';
        const res = syncReq('GET', `https://api.github.com/repos/${repo}/issues?per_page=${issueNum}`, {
            headers: {
                'user-agent': UA,
                ...token && { Authorization: `token ${token}` },
            },
        });

        if (res.statusCode === 200) {
            // noinspection JSUnresolvedFunction
            localCache.set('issues', res.getBody().toString());
            return localCache.get('issues');
        }
    })();

    if (!result) return '';

    /** parse json */
    const issues = JSON.parse(result);
    return `<span class="issue-line"><p class="issue-header"><strong>${issues.length}</strong> issues reported</p></span>`
        + issues.map(({ labels, updated_at: updated, html_url: url, title, number }) => {
            const date = new Date(updated);
            date.setTime(date.getTime() + (isNaN(parseInt(utcOffset)) ? 20 : parseInt(utcOffset)) * 60 * 60 * 1000);

            return `<p class="issues">#${number} <a href="${url}" target="_blank">${title}</a><span style="margin-left: 10px; color: #ddd;">${date.format(format)}</span>${(labels.map(label => {
                const rgb = hex2rgb(label.color);
                const r = rgb[0], g = rgb[1], b = rgb[2];
                const hsl = rgb2hsl(r, g, b);
                const h = hsl[0], s = hsl[1], l = hsl[2];

                return `<span class="issue-label" style="${
                    Object.entries({ r, g, b, h, s, l }).map(([k, v]) => `--label-${k}: ${v}`).join(';')
                }">${label.name}</span>`;
            }).join(''))}</p>`;
        }).join('<p class="issue-edge"></p>');
}
