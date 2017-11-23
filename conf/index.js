const Conf = require('@livingdocs/conf')
const env = process.env.ENVIRONMENT

if (typeof env !== 'string') exit()
else module.exports = Conf.loadEnvironment(__dirname, env)

function exit () {
  console.error(`
----------------------------------------------------------
Environment variable ENVIRONMENT must be set. eg:
    ENVIRONMENT=local npm start
for local development.
----------------------------------------------------------
  `)
  process.exit(1)
}
