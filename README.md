# pub-test
[![Azure Build Status](https://dev.azure.com/jldec/pub-test/_apis/build/status/jldec.pub-test?branchName=master)](https://dev.azure.com/jldec/pub-test/_build/latest?definitionId=1&branchName=master)

This [pub-server](https://github.com/jldec/pub-server) test project
tests pub-generator across different platforms without `.gitattributes` or EOL in `.editorconfig`.

To validate that the text files all work even with different line endings.

```
git clone git@github.com:jldec/pub-test.git
cd pub-test/
npm install
npm test
```