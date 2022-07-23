import { getAge } from "../utils/index.js"

export default class Cat {
  constructor (option = {}) {
    const { name, skill, master } = option
    this.name = name
    this.age = getAge()
    this.skill = skill
    this.master = master
  }

  getName () {
    return this.name
  }

  getMasterName () {
    return this.master.getName()
  }

  getAge () {
    return this.age
  }
}