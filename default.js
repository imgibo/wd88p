import http from "http";

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

const app = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
});

const PORT = 3001;

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);