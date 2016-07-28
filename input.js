module.exports = (pluginContext) => {
  let commands = require('./actions')
  return {
    respondsTo: (query) => {
      return query.match(/^\w{2,}$/)
    },
    search: (query, env = {}) => {
      return new Promise((resolve, reject) => {

        const pattern = new RegExp(query, 'i')

        let matches = commands.filter((command) => {
          return command.title.match(pattern)
        })

        resolve(matches)
      })
    },
  }
}
