const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`express server: http://localhost:${portNumber}`);
  console.log(`content from /${sourceDir}/`);
});
