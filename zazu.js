module.exports = {
  name: 'System',
  version: '0.0.1',
  author: 'blainesch',
  description: 'System tasks for zazu.',
  homepage: 'https://github.com/tinytacoteam/zazu-system',
  git: 'git@github.com:tinytacoteam/zazu-system.git',
  blocks: {
    input: [
      {
        id: 1,
        type: 'RootScript',
        respondsTo: (input) => {
          return true
        },
        script: 'node listCommands.js "{query}"',
        connections: [2],
      },
    ],
    output: [
      {
        id: 2,
        type: 'UserScript',
        script: 'node process.js {value}',
      }
    ],
  },
}
