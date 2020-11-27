const Human = require('./Human');

class Superman extends Human {
  constructor(name, age, speciality) {
    super(name, age);
    this.speciality = speciality;
  }
}
module.exports = Superman;
