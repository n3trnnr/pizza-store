const jsonSever = require('json-server')
const server = jsonSever.create()
const router = jsonSever.router('./db.json')
const middleware = jsonSever.defaults({
    static: '../dist'
})

// const port = process.env.PORT || 3000;
const port = 3001;

server.use(middleware)
server.use(
    jsonSever.rewriter({
        '/api/*': '/$1'
    })
);

server.use(router)
server.listen(port, () => {
    console.log(`server is runnig on ${port}`)
})