const Superman = require('./Superman');
const Human = require('./Human.js');
const Spiderman = require('./Spiderman');

const superman = new Superman('Hanry David', 26, 'Can Fly');
const normalman = new Human('Jessi', 23);
const sp = new Spiderman('Peter Parker', 19, 'Can climb');

console.log(superman);
console.log(normalman);
console.log(sp.name);
