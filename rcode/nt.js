const path=require("path");

console.log(path.join(__dirname, 'build'));
console.log(path.resolve(__dirname,"build"));
console.log(path.resolve('/a', '/b'));
console.log(path.resolve('./a', './b'));