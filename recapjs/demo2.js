const superHeroPrototype = {
  sayHello: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const superman = Object.create(superHeroPrototype);
superman.name = 'Superman';
superman.sayHello();

//closures function
const createHero = (heroName) => {
  const name = heroName;
  return {
    fly: (destination) => {
      console.log(`${name} is flying to ${destination}`);
    },
  };
};
createHero('Superman').fly('Moon');

const SH = require('./superHero');
const sh = new SH('Ironman', 100);
console.log(sh.name);
