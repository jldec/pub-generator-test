# pub-test
[![CI](https://github.com/jldec/pub-generator-test/workflows/CI/badge.svg)](https://github.com/jldec/pub-generator-test/actions)

This [pub-server](https://github.com/jldec/pub-server) test project
tests pub-generator across different platforms without `.gitattributes` or EOL in `.editorconfig`.

To validate that the text files all work even with different line endings.

```
git clone git@github.com:jldec/pub-generator-test.git
cd pub-generator-test/
npm install
npm test
```