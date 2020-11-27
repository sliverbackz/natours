const SH = require('./superHero');
const superhero = {};
superhero.name = 'Superman';
superhero.strength = 100;
const flyFun = () => {
  console.log(`Fly like a bird.He has ${superhero.strength} levels.`);
  return superhero;
};
superhero.fly = flyFun;
const returnVal = superhero.fly();
console.log(returnVal);

const spiderman = {
  name: 'Peter Parker',
  saySth: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};

spiderman.saySth();

const failThis = spiderman.saySth;
failThis();

const avengersHero = {
  editor: 'Marvel',
};

const ironMan = {};
ironMan.__proto__ = avengersHero;
console.log(`Iron Man is copyrighted by ${ironMan.editor}`);
avengersHero.editor = 'DC Comics';
console.log(`Iron Man is copyrighted by ${ironMan.editor}`);
console.log(new SH('Fck', 100).name);
