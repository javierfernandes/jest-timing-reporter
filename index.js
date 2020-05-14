const { propOr, pipe, map, applySpec, prop, pick, filter, propEq, drop, take, dropLast } = require('ramda')
const fs = require('fs')
const path = require('path')

const SUB_FOLDER = '__tsnapshots__'

class TimingReporter {

  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    // console.log('>>> ** jest-timing-reporter **')
    // console.log('GlobalConfig: ', this._globalConfig)
    // console.log('Options: ', this._options)

    const report = process(this._globalConfig)(results)
    report.forEach(saveFile(this._globalConfig))
  }
}

const process = ({ rootDir }) => pipe(
  propOr([], 'testResults'),
  map(applySpec({
    path: pipe(prop('testFilePath'), drop((rootDir + '/').length)),
    stats: prop('perfStats'),
    tests: pipe(
      propOr([], 'testResults'),
      filter(propEq('status', 'passed')),
      map(pick(['fullName', 'duration']))
    )
  }))
)

const saveFile = ({ rootDir }) => fileReport => {
  const slashIndex = fileReport.path.lastIndexOf('/')
  const folder = take(slashIndex, fileReport.path)
  const fileName = dropLast('.js'.length, fileReport.path.slice(slashIndex + 1))

  const destFolder = path.join(rootDir, folder, SUB_FOLDER)

  console.log('slashIndex is', slashIndex)

  console.log('folder', folder)
  console.log('fileName', fileName)
  console.log('destFolder', destFolder)

  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder)
  }

  fs.writeFileSync(path.join(destFolder, `${fileName}.tsnapshot`), JSON.stringify(fileReport, null, 2))
}

module.exports = TimingReporter