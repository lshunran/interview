// 问：什么事依赖注入/js如何实现依赖注入/Angular如何实现依赖管理
function Notebook() {}
Notebook.prototype.notebookName = function () {
  return 'this is a notebook'
}

function Pencil() {}
Pencil.prototype.printName = function () {
  return 'this is a pencil'
}

function School() {}
School.prototype.schoolName = function () {
  return '清华'
}

function Student() {}
Student.prototype.write = function (notebook, pencil, school) {
  if (!notebook || !pencil || !school) {
    throw new Error('Dependencies not provided!')
  }
  console.log('writing...')
  console.log(notebook)
  console.log(pencil)
  console.log(school)
  return '我拥有School、Pencil和Notebook'
}

var injector = { // 依赖注入的抽象接口
    dependencies: {}, // 存储被依赖的模块
    register: function (key, value) { // 注册初始化被依赖的模块
      this.dependencies[key] = value
    },
    resolve: function (deps, func, scope) { // 注入到依赖的模块中，注入应该接受一个函数，并返回一个我们需要的函数
      var paramNames = this.getParamNames(func) // 取得参数名
      var params = []
      for (var i = 0; i < paramNames.length; i++) { // 通过参数名在dependencies中取出相应的依赖
        let d = paramNames[i]
        let depen = this.dependencies[d] || deps[i]
        if (depen) {
          params.push(depen)
        } else {
          throw new Error('缺失的依赖：' + d)
        }
      }
      // 注入依赖,执行,并返回一个我们需要的函数
      return func.apply(scope || {}, params) // 将func作用域中的this关键字绑定到bind对象上，bind对象可以为空
    },
    getParamNames: function (func) { // 获取方法的参数名字
      var paramNames = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
      paramNames = paramNames.replace(/ /g, '')
      paramNames = paramNames.split(',')
      return paramNames // Array
    }
  }

//   1.要保存实例化好的被依赖模块
//   2.根据依赖模块的参数名检查，要注入那几个被依赖的模块