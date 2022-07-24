import Person from './models/Person.js'
import Cat from './models/Cat.js'
import './index.css'

const person = new Person({
  name: 'huanyu.xu',
  job: 'frontend engineer',
  age: 29
})

const cat = new Cat({
  master: person,
  name: 'huanyu.xu\'s cat',
  skill: 'miao, miao, miao!!!'
})

console.log(`i find a cat , and the cat's name is ${cat.getName()}, her master is ${cat.getMasterName()} hahahhahahha`)