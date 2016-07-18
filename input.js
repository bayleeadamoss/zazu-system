let commands = require('./actions')

let main = (input) => {
  const pattern = new RegExp(input, 'i') // /lo/i
  let matches = commands.filter((command) => {
    return command.title.match(pattern)
  })
  console.log(
    JSON.stringify(matches)
  )
}

main(process.argv.slice(-1)[0])
