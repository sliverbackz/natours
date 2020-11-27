const Human = require('./Human');

class Spiderman extends Human {
  constructor(name, age, speciality) {
    super(name, age);
    this.speciality = speciality;
  }
}
module.exports = Spiderman;
