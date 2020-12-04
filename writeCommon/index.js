const path = require('path')
const fs = require('fs')
const vm = require('vm')

function MyModule (id = '') {
  this.id = id // 这个id其实就是我们require的路径
  this.path = path.dirname(id) // path是Node.js内置模块，用它来获取传入参数对应的文件夹路径
  this.exports = {} // 导出的东西放这里，初始化为空对象
  this.filename = null // 模块对应的文件名
  this.loaded = false // loaded用来标识当前模块是否已经加载
}

MyModule._cache = Object.create(null) //创建一个空的缓存对象
MyModule._extensions = Object.create(null) // 创建一个空的扩展点名类型函数对象(后面会知道用来做什么)

MyModule._extensions['.js'] = function (imodule, filename) {
  const content = fs.readFileSync(filename, 'utf8')
  imodule._compile(content, filename)
}

MyModule._extensions['.json'] = function (imodule, filename) {
  const content = fs.readFileSync(filename, 'utf8')
   try {
   imodule.exports = JSONParse(content)
  } catch (err) {
    throw err
  }
}

MyModule.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
]

MyModule.wrap = function (script) {
  return MyModule.wrapper[0] + script + MyModule.wrapper[1];
}

MyModule.prototype._compile = function (content, filename) {
  // 获取包装后函数体
  const wrapper = MyModule.wrap(content)

  // vm是 Node.js 的虚拟机模块，runInThisContext方法可以接受一个字符串并将它转化为一个函数
  // 返回值就是转化后的函数，compiledWrapper是一个函数
  const compiledWrapper = vm.runInThisContext(wrapper, {
    filename,
    lineOffset: 0,
    displayErrors: true
  })
  const dirname = path.dirname(filename)
  // 调用函数，这里一定注意传递进的内容。
  compiledWrapper.call(this.exports, this.exports, this.require, this, filename, dirname)
}

// 路径分析并定位到文件
MyModule._resolveFilename = function (request) {
  const filename = path.resolve(request)  // 获取传入参数对应的绝对路径
  const extname = path.extname(request)   // 获取文件后缀名
  // 如果没有文件后缀名，判断是否可以添加.js和.json
  if (!extname) {
    const exts = Object.keys(MyModule._extensions)
    for (let i = 0; i < exts.length; i++) {
      const currentPath = `${filename}${exts[i]}`

      // 如果拼接后的文件存在，返回拼接的路径
      if (fs.existsSync(currentPath)) {
        return currentPath
      }
    }
  }
  return filename
}

MyModule._load = function (request) {    // request是我们传入的路劲参数
  // 2.路径分析并定位到文件
  const filename = MyModule._resolveFilename(request)

  // 3.判断模块是否加载过(缓存判断)
  const cachedModule = MyModule._cache[filename]
  if (cachedModule !== void 0) {
    return cachedModule.exports
  }
  // 4. 去加载 node 原生模块中
  /*const mod = loadNativeModule(filename, request)
   if (mod && mod.canBeRequiredByUsers) return mod.exports*/

  // 5. 如果缓存不存在，我们需自行加载模块，new 一个 MyModule实例
  // 加载完成直接返回module.exports
  const imodule = new MyModule(filename)

  // 6. load加载之前加入缓存，这也是不会造成循环引用问题的原因，但是循环引用，这个缓存里面的exports可能还没有或者不完整
  MyModule._cache[filename] = imodule
  // 7. imodule.load 真正的去加载代码
  imodule.load(filename)
  // 8. 返回模块的module.exports
  return imodule.exports
}

MyModule.prototype.require = function (id) {
  return MyModule._load(id, this, /* isMain */ false)
}

MyModule.prototype.load = function (filename) {
  // 获取文件后缀名(我们忽略掉了findLongestRegisteredExtension函数，有兴趣小伙伴自己实现)
  const extname = path.extname(filename)

  // 根据不同的后缀名去进行不同的处理
  MyModule._extensions[extname](this, filename)

  this.loaded = true
}

module.exports = {
  MyModule
}
