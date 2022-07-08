const fs = require('fs');
const vm = require('vm');

//run batch
const { execSync } = require('child_process');
const path = '"E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/web/generate-coverage-svg.bat"';

const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');

const original_coverage_path = 'E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/coverage/coverage.json';
const coverage_path = 'public/coverage/coverage.json';
const svg_path = 'E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_original.js.svg';
const fixed_svg = 'E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_origin.svg';
const bad_svg = 'public/coverage/bad-flowchart.svg';
const function_path = 'E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_original.js';
const test_path = 'E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test_original.js';

const loadJSON = (path) => {
  const fileBuffer = fs.readFileSync(path, 'utf-8');

  const json = JSON.parse(fileBuffer);

  return json;
};

const createPathCoverage = (path) => {
  const coverages = loadJSON(path);
  const coverage_key = Object.keys(coverages);

  var pathCoverageJson = {};
  pathCoverageJson['coverage'] = coverages[coverage_key[1]].s;
  return pathCoverageJson;
};

const createCoverageJson = (original_coverage_path) => {
  const coverages = loadJSON(original_coverage_path);
  const coverage_key = Object.keys(coverages);

  let statementCoverageJson = {};
  statementCoverageJson['coverage'] = coverages[coverage_key[1]].s;

  fs.writeFileSync('public/coverage/coverage.json', JSON.stringify(statementCoverageJson));
};

/*
Membuat visualisasi coverage dalam format SVG
*/

//cari elemen for pada loop, kalo ada tambah 1 block dengan value yang sama dengan for
const createCoverageSVG = (JSONpath, SVGpath) => {
  const svgWindow = createSVGWindow();
  const svgDocument = svgWindow.document;
  registerWindow(svgWindow, svgDocument);

  let canvas = SVG(svgDocument.documentElement);

  const file = fs.readFileSync(SVGpath, 'utf-8');
  canvas.svg(file);

  const coverage = loadJSON(JSONpath);
  const coverageArr = Object.values(coverage.coverage);
  let totalBlock = coverageArr.length;
  const shapes = ['rect', 'polygon', 'path'];
  var blocks = canvas.find('g');
  let forExist = 0;

  let coverage_index = 0;
  let catchExist = false;
  for (let i = 0; i < totalBlock; i++) {
    coverage_index = i - forExist;
    var color = coverageArr[coverage_index] > 0 ? '#0f0' : '#f00';

    let forLoop = blocks[i].find('text').text();

    //MODIFIKASI
    if (forLoop[1] == 'for' || (forLoop[0] != undefined && forLoop[0].match(/throw/) == 'throw') || (forLoop[0] != undefined && forLoop[0].match(/case/) == 'case') || (forLoop[0] != undefined && forLoop[0].match(/default/) == 'default')) {
      forExist++;
      totalBlock++;
    }

    if ((forLoop[0] != undefined && forLoop[0].match(/catch/) == 'catch') || catchExist == true) {
      forExist++;
      totalBlock++;
      if (catchExist == false) {
        catchExist = true;
      } else {
        catchExist = false;
      }
    }

    for (let j = 0; j < shapes.length; j++) {
      var shape = blocks[i].findOne(shapes[j]);

      if (shape) shape.css({ fill: color });
    }
  }

  const firstchild = canvas.findOne('svg').attr('xmlns:svgjs', 'http://svgjs.dev/svgjs');
  fs.writeFileSync('public/coverage/bad-flowchart.svg', canvas.svg());
};

/*
Memperbaiki format SVG yang rusak
*/
const fixCoverageSVG = (svg_path) => {
  const file = fs.readFileSync(svg_path, 'utf-8');
  canvas = SVG('<svg />');
  canvas.svg(file);
  const firstchild = canvas.findOne('svg').findOne('svg').attr('xmlns:svgjs', 'http://svgjs.dev/svgjs');
  fs.writeFileSync('public/coverage/coverage-flowchart.svg', firstchild.svg());
};

// menuliskan / menimpa file main source code dan test case
const saveSourceCode = (unit_function, unit_test) => {
  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_original.js`, unit_function);
  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test_original.js`, unit_test);
};

function generateCoverageAndSVG() {
  const result = execSync(path);

  // convert and show the output.
  console.log(result.toString('utf8'));
}

function getFunctionName(code) {
  let pattern = /function(.*)\(/;
  let functionName = pattern.exec(code);
  return functionName[1];
}

function modifyTemplate() {
  const main_original = fs.readFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_original.js`, 'utf-8');

  const functionName = getFunctionName(main_original);

  let main_template = 'module.exports =' + functionName + ';';

  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_template.js`, main_template);

  let test_template =
    `const` +
    functionName +
    ` = require('./main');
const assert = require('assert');
const AssertionError = require('assert').AssertionError;`;

  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test_template.js`, test_template);
}

function generateMainTestCode() {
  const test_original = fs.readFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test_original.js`, 'utf-8');
  const test_template = fs.readFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test_template.js`, 'utf-8');
  const main_original = fs.readFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_original.js`, 'utf-8');
  const main_template = fs.readFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_template.js`, 'utf-8');
  const functionName = getFunctionName(main_original);

  const test_assert =
    `try {` +
    test_original +
    ` } catch (e) {
        if (e instanceof AssertionError) {
          console.log("Function ` +
    functionName +
    ` assertion error (expected : " + e.expected +", actual : " + e.actual + ")");
        }else if(e instanceof ReferenceError){
          console.log(e.name + " : " +  e.message);
        } else {
         console.log(e);
        }}`;

  // fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-back-end/test.js`, test_template + '\n' + test_assert);
  // fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test.js`, test_template + '\n' + test_assert);
  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/test.js`, test_template + '\n' + test_assert);
  // fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-back-end/main.js`, main_original + '\n' + main_template);
  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main.js`, main_original + '\n' + main_template);
}

function modifyFunctionTest() {
  modifyTemplate();
  generateMainTestCode();
}

function fixSVG(svg_path) {
  const origin_svg = fs.readFileSync(svg_path, 'utf-8');
  var fixed_svg = origin_svg.replace(/<![^}]*dtd">/, '');
  fs.writeFileSync(`E:/ngoding/Tugas Akhir/coverage-2-flowchart-combined/utils/main_origin.svg`, fixed_svg);
}

function validateJSSyntax(function_code, test_code) {
  let error;

  try {
    error = 'function_code';
    const unit_function = new vm.Script(function_code);
    error = 'test_code';
    const unit_test = new vm.Script(test_code);
  } catch (e) {
    console.log(e);
  }
  return error;
}

function createCoverageFlowchart(coverage_path, flowchart_path, coverage_flowchart_path) {
  createCoverageSVG(coverage_path, flowchart_path);
  fixCoverageSVG(coverage_flowchart_path);
}

function visualizeCoverage() {
  modifyFunctionTest();
  generateCoverageAndSVG();
  fixSVG(svg_path);
  createCoverageJson(original_coverage_path);

  createCoverageFlowchart(coverage_path, fixed_svg, bad_svg);
}

module.exports = {
  saveSourceCode,
  visualizeCoverage,
  validateJSSyntax,
};
