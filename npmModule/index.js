const chalk = require('chalk');
console.log(chalk.blue.inverse('Hello world!')); 
var validator = require('validator');

let x=validator.isEmail('foo@bar.com............'); 
console.log(x?chalk.blue.inverse(x):chalk.red.inverse(x))