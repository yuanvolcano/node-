/**
 * @description 统一校验方法
 * @author volcano
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErros: true // 输出所有错误（比较慢）
})

/**
 * json schema 校验
 * @param {*} schema json schema 规则
 * @param {*} data 待校验数据
 */
function validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
