/*eslint no-console: "off"*/

var test = require('tape');
var fspath = require('path');

test('test-pub', function(t) {

  var opts = require('pub-resolve-opts')(fspath.join(__dirname, '..'));

  var generator = require('pub-generator')(opts);

  var actual;

  // intercept output writer to grab files instead of sending them to disk
  var osrc = opts.outputs[0].src;
  osrc.put = function(files, cb) {
    actual = files;
    console.log(files);
    cb && cb();
  };

  var expected =
  [ { path: '/index.html',
  text:
   '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<link rel="stylesheet" href="/css/pub-test.css">\n<title>/</title>\n</head>\n<body>\n\n<div data-render-layout="main-layout"><div data-render-page="default"><div data-render-html="/"><h1 id="hello-world">hello world</h1>\n<p>go to <a href="/page1">page 1</a></p>\n</div>\n\n</div>\n</div>\n\n<script>window.pubRef = {"href":"/","relPath":""};</script>\n\n</body>\n</html>\n' },
{ path: '/page1.html',
  text:
   '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<link rel="stylesheet" href="/css/pub-test.css">\n<title>Page1</title>\n</head>\n<body>\n\n<div data-render-layout="main-layout"><div data-render-page="test-template"><div class="pub-test">\n<div data-render-html="/page1"><h2 id="page-1">page 1</h2>\n<p>go <a href="/">home</a></p>\n</div>\n</div></div>\n</div>\n\n<script>window.pubRef = {"href":"/page1","relPath":""};</script>\n\n</body>\n</html>\n' } ];

  generator.load(function(err) {
    t.error(err);
    generator.outputPages(function(err) {
      t.error(err);
      t.deepEqual(actual, expected);
      generator.unload();
      t.end();
    });
  });
});
