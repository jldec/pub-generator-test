/*eslint no-console: "off"*/

var test = require('tape');
var fspath = require('path');

// compute OS-specific EOL (depends on default git auto line ending munging)
function eol(){/*
*/}

var EOL = eol.toString().slice(17,-3);

console.log('EOL:', JSON.stringify(EOL));

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

  var expected = [
    { path: '/index.html',
      text: [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '',
        '<link rel="stylesheet" href="/css/pub-test.css">',
        '<title>/</title>',
        '</head>',
        '<body>',
        '',
        '<div data-render-layout="main-layout"><div data-render-page="default"><div data-render-html="/"><h1 id="hello-world">hello world</h1>',
        '<p>go to <a href="/page1">page 1</a></p>',
        '</div>',
        '',
        '</div>',
        '</div>',
        '',
        '<script>window.pubRef = {"href":"/","relPath":""};</script>',
        '',
        '</body>',
        '</html>',
        ''
      ].join(EOL)
    },
    { path: '/page1.html',
      text: [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '',
        '<link rel="stylesheet" href="/css/pub-test.css">',
        '<title>Page1</title>',
        '</head>',
        '<body>',
        '',
        '<div data-render-layout="main-layout"><div data-render-page="test-template"><div class="pub-test">',
        '<div data-render-html="/page1"><h2 id="page-1">page 1</h2>',
        '<p>go <a href="/">home</a></p>',
        '</div>',
        '</div>',
        '',
        '<div class="pub-test-fragment">',
        '<div data-render-html="/page1#fragment-1"><h3 id="fragment-1">fragment 1</h3>',
        '<p>text 1</p>',
        '</div>',
        '</div>',
        '<div class="pub-test-fragment">',
        '<div data-render-html="/page1#fragment-2"><h3 id="fragment-2">fragment 2</h3>',
        '<p>text 2</p>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '',
        '<script>window.pubRef = {"href":"/page1","relPath":""};</script>',
        '',
        '</body>',
        '</html>',
        ''
      ].join(EOL) } ];

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
