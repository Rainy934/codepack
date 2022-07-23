export default class Person {
  constructor (option = {}) {
    const { name, job, age } = option
    this.name = name
    this.job = job
    this.age = age
  }

  getName () {
    return this.name
  }
}