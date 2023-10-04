let connect = require("connect");
let url = require('url');

let app = connect();

function calculate (method, x ,y ) {
    switch (method) {
        case "add": 
            return x + y;
        case "subtract":
            return x - y;
        case "divide" :
            return x / y;
        case "multiply" :
            return x * y;
        default: return "Error: not correct input!!!"
    }
}


let calculator = (req, res, next) => {

    let adr = url.parse(req.url, true);

    let method = adr.query.method;
    let x = parseInt(adr.query.x);
    let y = parseInt(adr.query.y);
    
        res.writeHead(200,{ 'Content-Type': 'text/html; charset=UTF-8' });
        res.write(`<h1>${x} ${method} ${y} = ${calculate(method, x, y)}</h1>`);
        res.end();
    };


app.use("/",calculator);

app.listen(3000);
console.log('Server running at http://localhost:3000/');




