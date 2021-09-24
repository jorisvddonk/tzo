const glob = require("glob");
const fs = require('fs');

glob.sync("./src/concisetext/*.ts").forEach(fname => {
  let src = fs.readFileSync(fname).toString();
  src = `// @ts-nocheck\n${src}`;
  fs.writeFileSync(fname, src, { encoding: 'utf-8' });
});