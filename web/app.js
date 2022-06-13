const { visualizeCoverage, saveSourceCode, validateJSSyntax } = require('./utils');

const express = require('express');
const app = express();
const port = 2727;

app.use(express.static('public'));

app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});

app.get('/coverage', (req, res) => {
  res.sendFile('./coverage.html', { root: __dirname });
});

app.post('/coverage', (req, res) => {
  // sourceCodeValidation();
  try {
    validateJSSyntax(req.body.mainSrc, req.body.testCase);
    saveSourceCode(req.body.mainSrc, req.body.testCase);
    visualizeCoverage();
    res.redirect('/coverage');
  } catch (e) {
    // res.redirect('/');
    res.send('<script>alert("SYNTAX ERROR : Please input the correct javascript source code . . ."); window.location.href = "/"; </script>');
    // res.send('<script>alert(e + " SYNTAX ERROR : Please input the correct javascript source code . . ."); window.location.href = "/"; </script>');
  }
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Coverage to flowchart app listening on port ${port}`);
});
