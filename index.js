import express from "express";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

morgan.token("body", function(req, res) {
    return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(
    ":method :url :status :body"
));
// app.use(logger); 

let products = [
    {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
    },
    {
        id: 2,
        title: "iPhone X",
        description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
    },
    {
        id: 3,
        title: "Samsung Universe 9",
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 1249,
    },
];

//no need for this function because we are using morgan as our request logger
// function logger(req, res, next) {
//     console.log(`Method: ${req.method}`);
//     console.log(`Path: ${req.path}`);
//     console.log(`Body: ${JSON.stringify(req.body)}`);
//     console.log('--------------------------');
//     next();
// };

function unknownEndPoint(req, res) {
    res.status(404).send({error: "Page Not Found"});
};

function generateId() {
    const maxId = products.length > 0 ? Math.max(...products.map(n => n.id)) : 0;
    return maxId + 1
};


app.get("/", (req, res) => {
    res.send("<h1>Practicing ExpressJS with Nodemon installed</h1><h2>Project from scratch</h2>");
});

app.get("/products/info", (req, res) => {
    const productCount = products.length;
    res.send(`<p>${productCount} total products</p>`);
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);

    res.json(product);
});

app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    products = products.filter(product => product.id !== id);
    
    res.status(204).end();
});

app.post("/products", (req, res) => {
    
    const body = req.body;

    if (!body.title || !body.description) {
        return res.status(400).json({ error: "content missing" });
    };

    const product = {
        title: body.title,
        description: body.description,
        price: body.price || null,
        id: generateId()
    };
    
    products = products.concat(product);

    res.status(201).json(product);
});

app.use(unknownEndPoint);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});



/*
foot notes:

HTTP methods: GET, POST, DELETE, PUT, and PATCH
RESTful API

    URL                 verb            functionality
    products            GET             fetching all the resources in a collection of data
    products/:id        GET             it fetch a single resource in a collection of data        
    products            POST            creates a new resource based on the request data
    products/:id        DELETE          removes the identified resource in a collection of data
    products/:id        PUT             it replaces the entire identified resource
    products/:id        PATCH           it replaces a part of the identified resource

install dev dependencies for restarting due to changes
npm install nodemon (not recommended: mapapasama sa buong package)
npm install --save-dev nodemon
npm i -D nodemon (shortcut)

install morgan as regular dependencies (this is a request logger)
npm i morgan

install cors for security from session hijacking
npm i cors
*/