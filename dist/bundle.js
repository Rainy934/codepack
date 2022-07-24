(
      function(modules) {
        function require (filename) {
          var module = {
            exports: {}
          }
          var fn = modules[filename]
          fn(require, module, module.exports)
          return module.exports
        }
        require('D:\work\codepack\src\index.js')
      }
    )({'D:\work\codepack\src\index.js': function (require, module, exports) {
        "use strict";

var _Person = _interopRequireDefault(require("./models/Person.js"));

var _Cat = _interopRequireDefault(require("./models/Cat.js"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var person = new _Person["default"]({
  name: 'huanyu.xu',
  job: 'frontend engineer',
  age: 29
});
var cat = new _Cat["default"]({
  master: person,
  name: 'huanyu.xu\'s cat',
  skill: 'miao, miao, miao!!!'
});
console.log("i find a cat , and the cat's name is ".concat(cat.getName(), ", her master is ").concat(cat.getMasterName(), " hahahhahahha"));
      },'./models/Person.js': function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Person = /*#__PURE__*/function () {
  function Person() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Person);

    var name = option.name,
        job = option.job,
        age = option.age;
    this.name = name;
    this.job = job;
    this.age = age;
  }

  _createClass(Person, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Person;
}();

exports["default"] = Person;
      },'./models/Cat.js': function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../utils/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Cat = /*#__PURE__*/function () {
  function Cat() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cat);

    var name = option.name,
        skill = option.skill,
        master = option.master;
    this.name = name;
    this.age = (0, _index.getAge)();
    this.skill = skill;
    this.master = master;
  }

  _createClass(Cat, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getMasterName",
    value: function getMasterName() {
      return this.master.getName();
    }
  }, {
    key: "getAge",
    value: function getAge() {
      return this.age;
    }
  }]);

  return Cat;
}();

exports["default"] = Cat;
      },'./index.css': function (require, module, exports) {
        
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(`.text {
  color: red;
  font-size: 30px;
}`))
    document.head.appendChild(style)
  
      },'../utils/index.js': function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAge = void 0;

var getAge = function getAge() {
  return Math.floor(Math.random() * 100);
};

exports.getAge = getAge;
      }})