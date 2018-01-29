/**
 * home子路由
 */

const router = require('koa-router')();

router.get('/', async ctx => {
    let html = `
        <ul>
            <li><a href="/page/helloworld">/page/helloworld</a></li>
            <li><a href="/page/404">/page/404</a></li>
            <li><a href="/page/get">/page/get</a></li>
            <li><a href="/page/post">/page/post</a></li>
        </ul>
    `;
    ctx.body = html;
});

module.exports = router;

