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
 *      - Update Time: Jun 24th, 2016
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
        }).should.to.contain(' \n\n<footer class="footer"><div class="footer__container--normal" alt="\n{{ file.path | convertUri("https://aleen42.gitbooks.io/personalwiki/content/") }}\n">\n{{ file.path | currentUri("https://aleen42.gitbooks.io/personalwiki/content/") }}\n<div class="footer__description--normal"><p class="paragraph footer__author--normal" style="color: #000 !important;">Aleen<sup class="super">&#174;</sup></p><p class="paragraph footer__quote--normal" style="color: #000 !important;">More than a coder, more than a designer</p><div class="footer__main--normal"><p class="paragraph footer__main__paragraph--normal copyright" style="color: #666 !important;">Copyright &#169; aleen42 all right reserved, powered by <a href="https://github.com/aleen42" target="_blank">aleen42</a></span><p class="paragraph footer__main__paragraph--normal footer__modifyTime--normal" style="color: #666 !important;"><span style="color: #666 !important;">modified at</span>\n{{ file.mtime | dateFormat("yyyy-MM-dd hh:mm:ss", 8) }}\n</p></div></div></div><div>\n{{ "aleen42/PersonalWiki" | listRepo("") }}\n</div></footer>');
    });

    it('test case 2', function () {
        gitbookFooter.test({}).should.to.contain(' \n\n<footer class="footer"><div class="footer__container--normal" alt="\n{{ file.path | convertUri("https://aleen42.gitbooks.io/personalwiki/content/") }}\n">\n{{ file.path | currentUri("https://aleen42.gitbooks.io/personalwiki/content/") }}\n<div class="footer__description--normal"><p class="paragraph footer__author--normal" style="color: #000 !important;">Aleen<sup class="super">&#174;</sup></p><p class="paragraph footer__quote--normal" style="color: #000 !important;">More than a coder, more than a designer</p><div class="footer__main--normal"><p class="paragraph footer__main__paragraph--normal copyright" style="color: #666 !important;">Copyright &#169; aleen42 all right reserved， powered by Gitbook</span><p class="paragraph footer__main__paragraph--normal footer__modifyTime--normal" style="color: #666 !important;"><span style="color: #666 !important;">modified at</span>\n{{ file.mtime | dateFormat("yyyy-MM-dd hh:mm:ss", 8) }}\n</p></div></div></div><div>\n{{ "aleen42/PersonalWiki" | listRepo("") }}\n</div></footer>');
    });

    it('test case 3', function () {
        gitbookFooter.test({
			'page-footer': {
				'description': 'Updated at',
				'format': 'yyyy-MM-dd hh:mm:ss',
				'copyright': 'Copyright &#169; tester',
				'timeColor': '#a10000'
			}
        }).should.to.contain(' \n\n<footer class="footer"><div class="footer__container--normal" alt="\n{{ file.path | convertUri("https://aleen42.gitbooks.io/personalwiki/content/") }}\n">\n{{ file.path | currentUri("https://aleen42.gitbooks.io/personalwiki/content/") }}\n<div class="footer__description--normal"><p class="paragraph footer__author--normal" style="color: #000 !important;">Aleen<sup class="super">&#174;</sup></p><p class="paragraph footer__quote--normal" style="color: #000 !important;">More than a coder, more than a designer</p><div class="footer__main--normal"><p class="paragraph footer__main__paragraph--normal copyright" style="color: #666 !important;">Copyright &#169; aleen42 all right reserved, powered by <a href="https://github.com/aleen42" target="_blank">aleen42</a></span><p class="paragraph footer__main__paragraph--normal footer__modifyTime--normal" style="color: #666 !important;"><span style="color: #666 !important;">modified at</span>\n{{ file.mtime | dateFormat("yyyy-MM-dd hh:mm:ss", 8) }}\n</p></div></div></div><div>\n{{ "aleen42/PersonalWiki" | listRepo("") }}\n</div></footer>');
    });
});
