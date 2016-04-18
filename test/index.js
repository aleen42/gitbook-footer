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
 *      - Description: the main entrance for tests
 *      - Create Time: Apr 16th, 2016
 *      - Update Time: Apr 16th, 2016
 *
 *
 **********************************************************************/

const gitbookFooter = require('./../lib');

/**
 * [should: test framework module]
 * @type {Object}
 */
const should = require('chai').should();

describe('tests', function () {
    it('test case 1', function () {
        gitbookFooter.test({
			'page-footer': {
				'timeColor': '#a10000',
				'copyrightColor': '#a10000'
			}
        }).should.to.contain(' \n\n<footer class="page-footer"><div class="header"><p class="title">Aleen<sup>&#174;</sup></p><p class="subtitle">More than a coder, more than a designer</p></div><span class="copyright" style="color: #a10000 !important;">Copyright &#169; aleen42 all right reserved， powered by Gitbook</span><span class="description" style="color: #a10000 !important;">modified at\n');
    });

    it('test case 2', function () {
        gitbookFooter.test({}).should.to.contain(' \n\n<footer class="page-footer"><div class="header"><p class="title">Aleen<sup>&#174;</sup></p><p class="subtitle">More than a coder, more than a designer</p></div><span class="copyright" style="color: #666 !important;">Copyright &#169; aleen42 all right reserved， powered by Gitbook</span><span class="description" style="color: #666 !important;">modified at\n');
    });

    it('test case 3', function () {
        gitbookFooter.test({
			'page-footer': {
				'description': 'Updated at',
				'format': 'YYYY-MM-DD HH:mm:ss',
				'copyright': 'Copyright &#169; tester',
				'timeColor': '#a10000'
			}
        }).should.to.contain(' \n\n<footer class="page-footer"><div class="header"><p class="title">Aleen<sup>&#174;</sup></p><p class="subtitle">More than a coder, more than a designer</p></div><span class="copyright" style="color: #666 !important;">Copyright &#169; tester all right reserved， powered by Gitbook</span><span class="description" style="color: #a10000 !important;">Updated at\n');
    });
});
