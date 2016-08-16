const commands = require('./actions')

module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return query.match(/^\w{2,}$/)
    },
    search: (query) => {
      return new Promise((resolve, reject) => {

        const pattern = new RegExp('^' + query, 'i')

        let matches = commands.filter((command) => {
          return command.title.match(pattern)
        })

        resolve(matches)
      })
    },
  }
}
