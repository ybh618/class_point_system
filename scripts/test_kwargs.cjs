const nunjucks = require('nunjucks')
const env = new nunjucks.Environment()
env.addGlobal('url_for', function(name) {
  console.log('name', name)
  console.log('args', arguments)
  return '/test'
})
const tpl = `{{ url_for('students', page=page, search=search) }}`
const out = env.renderString(tpl, { page: 1, search: 'abc' })
console.log(out)
