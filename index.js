const server = require('./server');

server.listen(process.env.PORT, ()=>{
    console.log(`listening on http://localhost:${process.env.PORT}`);
})