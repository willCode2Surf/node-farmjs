//
// Test cases for farm.js app requests
// Corresponds the apps defined under the git repository under 'workdir'
//

/**
 * Node.js apps spawned and port-allocated automatically upon request
 */
exports.apps = [
    { from: 'http://public.anodejs.org/1/2/3/4?q=5', spawn: '$/master/apps/public/.shimmed.v2.index.js', path: "/1/2/3/4?q=5", public: true },
/*
    //
    // spawn
    //

    { from: 'http://anodejs.cloudapp.net/apps?$app=test', spawn: '$/master/apps/test/.shimmed.v2.index.js', path: '/apps', app: 'test' },
    { from: 'http://test.anodejs.org/1/2/3/4?q=5', spawn: '$/master/apps/test/.shimmed.v2.index.js', path: '/1/2/3/4?q=5', app: 'test' },
    { from: 'http://foo.goo.anodejs.org/p/a/t/h', error: 404 },
    { from: 'http://pull.sys.anodejs.org', spawn: '$/master/sys/pull/.shimmed.v2.index.js', path: '/', app: 'pull.sys' },
    { from: 'http://direct.anodejs.org/12345', spawn: '$/master/apps/direct/.shimmed.v2.index.js', path: '/12345', app: 'direct' },
    { from: 'http://direct2.anodejs.org/1234599', spawn: '$/master/apps/direct2/.shimmed.v2.index.js', path: '/1234599', app: 'direct2' },
    { from: 'http://direct2.anodejs.org/1234599/1234', spawn: '$/master/apps/direct2/.shimmed.v2.index.js', path: '/1234599/1234', app: 'direct2' },
    { from: 'http://direct-alias.anodejs.org/1234588', spawn: '$/master/apps/direct/.shimmed.v2.index.js', path: '/1234588', app: 'direct' },
    { from: 'http://tooooooooooooo.anodejs.org/a/b/c?$app=test&a=1', spawn: '$/master/apps/test/.shimmed.v2.index.js', path: '/a/b/c?a=1', app: 'test' },
    { from: 'http://foogoo.branch9.anodejs.org', spawn: '$/branch9/apps/foogoo/.shimmed.v2.index.js', path: '/', app: 'foogoo' },
    { from: 'http://public.anodejs.org/1/2/3/4?q=5', spawn: '$/master/apps/public/.shimmed.v2.index.js', path: "/1/2/3/4?q=5", public: true },
    
    //
    // proxy
    //

    { from: 'http://anodejs.cloudapp.net/hooligan/foo/goo?a=6', headers: { 'x-anodejs-rewrite': 'master/apps/hooligan/index.svc' }, path: '/foo/goo?a=6', app: 'hooligan' },

/*
    { from: 'http://internal.anodejs.org/1/2/3/4?q=5', error: 401, allowPrivate: false, app: 'internal' },
    { from: 'http://internal.anodejs.org/1/2/3/4?q=5', error: 200, allowPrivate: true, app: 'internal' },
    { from: 'http://test.anodejs.org/a/b?$llog=instance9', spawn: '$/master/apps/test/.shimmed.v2.index.js.logs/0.txt', path: '/a/b', app: 'test' },
    { from: 'http://rp.sys.branch9.anodejs.org/forbidden', error: 403, app: 'rp.sys.branch9' },
*/

];

/**
 * Rewrite header - apps proxied to some other server with a rewrite header (x-anodejs-rewrite) specifying the
 * actual location of the app to target
 */
exports.rewrite = [
    { from: 'http://hello.world.anodejs.org/', rewrite: '$/master/apps/world/hello/index.aspx', path: '/' },
    { from: 'http://anodejs.org/hello.world', rewrite: '$/master/apps/world/hello/index.aspx', path: '/' },
    { from: 'http://test.anodejs.org/a/b?$llog=BADINST', error: 404 },
    { from: 'http://test.anodejs.org/a/b?$llog', error: 400 },
    { from: 'http://hello.world.anodejs.org/a/b/c?$llog', spawn: '$/master/apps/world/hello/index.aspx', path:'/a/b/c' },
];

/**
 * $log/$dash
 */
exports.dash = [
    { from: 'http://test.anodejs.org/1/2/3/4?q=5&$log', redirect: 'http://logs.sys.anodejs.org/index.html?app=test' },
    { from: 'http://test.anodejs.org/1/2/3/4?q=5&$dash', redirect: 'http://logs.sys.anodejs.org/index.html?app=test' },
];

/**
 * $inst
 */
exports.inst = [
    { from: 'http://test.anodejs.org/1/2/3/4?q=5&$inst=BADINST', spawn: '$/master/apps/test/.shimmed.v2.index.js', error: 404 },
    { from: 'http://test.anodejs.org/1/2/3/4?q=5&$inst=instance1', spawn: '$/master/apps/test/.shimmed.v2.index.js', path: '/1/2/3/4?q=5' },
    { from: 'http://test.anodejs.org/1/2/3/4?q=5&$inst=instance2', error: 404 },
];

/**
 * $postback
 */
exports.postback = [
    { from: 'http://hello.world.anodejs.org/longrunningshit?$postback=http://localhost:6000?bla=1&param1=1234', postback: "http://localhost:6000", to: "http://hello.world.anodejs.org/longrunningshit?param1=1234" },
];

/**
 * $bcast
 */
exports.broadcast = [
    { from: 'http://hello.world.anodejs.org/a/b/c?$bcast', redirect: 'http://www.anodejs.org/bcast.sys?sync=http://hello.world.anodejs.org/a/b/c' },
];

/**
 * Hints and special rules
 */
exports.special = [
    { from: 'http://bla.bla.bla.anodejs.org/favicon.ico', error: 200 },
    { from: 'http://anything.anodejs.org/robots.txt', error: 404 },
    { from: 'http://rp.sys.anodejs.org', error: 400 },
];

var all = [];

for (var k in exports) {
    exports[k].forEach(function(c) {
        all.push(c);
    });
}

exports.all = all;
