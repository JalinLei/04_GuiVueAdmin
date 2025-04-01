/**********************************
 * @Desc: 用于生成 Element Plus 表单校验规则工具
 * @Author:  Jalin
 **********************************/

import _ from 'lodash'
import { reactive, toRefs } from 'vue'

// 默认的创建规则选项
const DefaultCreateOption = {
    label: '', // 字段名称
    required: false, // 是否必填
    trigger: 'blur', // 触发方式
    len: null, // 长度限制
    rows: null, // 行数限制
    baserule: null, // 基础验证规则
    thresholdrule: null, // 阈值规则
    limits: null, // 额外限制规则
    validator: [] // 自定义验证器
}

const patterns = {
    /*
     * 常规正则
     */
    // 非空字符串(null character)
    NON_NUL: /^(?!\s*$)/g,
    // 实数
    NUMBER_REAL: /^([+-]?\d+)(\.\d+)?$/,
    // 非负实数
    NUMBER_REAL_NON_NEGATIVE: /^([+]?\d+)(\.\d+)?$/,
    // 整数
    NUMBER_INT: /^[+-]{0,1}(\d+)$/,
    // 非负整数
    NUMBER_INT_NON_NEGATIVE: /^[+]{0,1}(\d+)$/,
    // 正整数
    NUMBER_INT_POSITIVE: /^[1-9](\d)*$/,
    // 电话号码
    TELEPHONE: /^\+?\d*-?\d*$/,
    // URL
    URL: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
    // URL（较全）
    URL_ALL: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\\\w]*))?)/i,
    // 邮箱
    EMAIL: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // IP地址
    IP: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    // 端口
    PORT: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
    // IP地址 + 端口验证  eg：90.90.90.90:80
    IP_AND_PORT: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
    // 端口段  eg: 0-65535
    PORT_SEGMENT: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])-([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
    // IP段  eg：eg:192.168.1.1-192.168.1.10
    IP_SEGMENT: /^(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))-(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))$/,
    // 网段  eg：192.168.1.1/24 | 192.168.1.1-24
    NETWORK_SEGMENT: /^(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))[\/-]((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))$/,
    // MAC地址  eg：8C:C1:21:A2:44:A3
    MAC: /^((([A-Fa-f0-9]{2}:){5})|(([A-Fa-f0-9]{2}-){5}))[A-Fa-f0-9]{2}$/,
    // 域名  eg：www.byronsargeant.co.uk
    DOMAIN: /^(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?!-)\.)+[a-zA-Z]{2,63}\.?$)+$/,
    // 域名 + 端口验证 eg:www.byronsargeant.co.uk:8080
    DOMAIN_AND_PORT: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+[:]([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
    // 服务器地址（域名）
    DOMAIN_WIDE: /[A-Za-z0-9]+(\.[A-Za-z0-9_]+)+/,
    // 密码（密码由字母、数字、特殊字符组成且长度为6~20）
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}\[\]:";'<>?,.\/])(?!.* ).{6,20}$/,
    // 英文字符串
    CHAR_EN: /^[A-Za-z]+$/,
    // 包含中文字
    CHAR_CN: /[\u4E00-\u9FFF]/g,
    // windows下文件命名
    CHAR_FILENAME: /^[^\/\\\:\*\?\"\<\>\|]+$/,
    // 身份证号码
    ID_NUMBER: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

    /*
     * 特定正则
     */
    // 特定字符+端口  eg：u:80  U:8080
    SPECIFIC_STR_PORT: /^[u|U]?[:]?([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
    // 特定字符+端口段 eg：u:80-90
    SPECIFIC_STR_PORT_SEGMENT: /^[u|U]?[:]?([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])-([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
    // 大于0小于等于1  eg: 0.1 | 0.99 | 1
    SPECIFIC_NUMBER1: /^(1|1\.[0]*|0?\.(?!0+$)[\d]+)$/,
    // 英文 数字 _ - . 可组合  eg：abc | 123 | abc_123-de.a
    SPECIFIC_CHAR1: /^[A-Za-z0-9-\_\.]+$/,
    // 英文 数字
    SPECIFIC_CHAR2: /^[A-Za-z0-9]+$/,
    // 英文 数字 - .
    SPECIFIC_CHAR3: /^[A-Za-z0-9-\.]+$/,
    // 原始链接  eg：http://www.baidu.com
    SPECIFIC_ORIGIN_URL: /^[a-zA-z]+:\/\/[^/s]/,
    // 开头不能未空并不能存在下划线
    SPECIFIC_NOT_UNDERLINE: /^\S(?!.*_.*$)/,
    // 用户ID以字母开头、数字或下划线组成，长度5-20位
    SPECIFIC_USER_ID: /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/
}

// 判断输入是否为空
const isInputEmpty = (value) => {
    return value === '' || value === null || value === undefined || (_.isArray(value) && !value.length)
}

// 创建验证规则
export function useValidationRules(options) {
    const state = reactive({
        rules: [], // 存储生成的规则
        isValid: true // 验证状态
    })

    /**
     * @desc: 验证长度生成element 验证规则
     * @param {*} options
     * @return {Array}
     */
    const validatorLength = (options) => {
        const { label, len, trigger } = options
        const ruleArr = []
        const minMes = label + '最小长度为' + len.min + '个字符'
        const maxMes = label + '最大长度为' + len.max + '个字符'
        const lenFun = (type) => {
            return (rule, value, callback) => {
                let tempValue = value
                let valueArr = []
                if (typeof value !== 'string') {
                    tempValue = ''
                }
                if (_.hasIn(len, 'split')) {
                    valueArr = tempValue.split(len.split)
                } else {
                    valueArr.push(tempValue)
                }
                if (type == 'min') {
                    valueArr.every((current) => {
                        return current.length >= len.min
                    })
                        ? callback()
                        : callback(new Error(minMes))
                } else {
                    valueArr.every((current) => {
                        return current.length <= len.max
                    })
                        ? callback()
                        : callback(new Error(maxMes))
                }
            }
        }
        if (_.hasIn(len, 'min')) {
            ruleArr.push({
                validator: lenFun('min'),
                trigger: trigger
            })
        }
        if (_.hasIn(len, 'max')) {
            ruleArr.push({
                validator: lenFun('max'),
                trigger: trigger
            })
        }
        return ruleArr
    }

    /**
     * @desc: 验证行数生成Element验证规则
     * @param {*} options
     * @return {Array}
     */
    const validatorRows = (options) => {
        const { label, rows, trigger } = options
        const ruleArr = []
        const minMes = label + '最小数量为' + rows.min + '个'
        const maxMes = label + '最大数量为' + rows.max + '个'
        const rowsFun = (type) => {
            return (rule, value, callback) => {
                let tempValue = value
                let valueArr = []
                if (typeof value !== 'string') {
                    tempValue = ''
                }
                valueArr = tempValue.split(rows.split || '\n')
                if (type == 'min') {
                    valueArr.length >= rows.min ? callback() : callback(new Error(minMes))
                } else {
                    valueArr.length <= rows.max ? callback() : callback(new Error(maxMes))
                }
            }
        }
        if (_.hasIn(rows, 'min')) {
            ruleArr.push({
                validator: rowsFun('min'),
                trigger: trigger
            })
        }
        if (_.hasIn(rows, 'max')) {
            ruleArr.push({
                validator: rowsFun('max'),
                trigger: trigger
            })
        }
        return ruleArr
    }

    /**
     * @desc: 内置限制规则
     * @param {*} options
     * @return {Array}
     */
    const validatorRuleLimit = (options) => {
        const { label, required, trigger, limits } = options
        let ruleArr = []
        let limitList = []
        if (_.isArray(limits)) {
            limitList = limits
        } else {
            limitList = [limits]
        }
        _.forEach(limitList, (item) => {
            const limitOptions = _.merge({}, DefaultCreateOption, { label, required, trigger }, item)
            ruleArr = ruleArr.concat(createRules(limitOptions))
        })
        return ruleArr
    }

    /**
     * @desc: 主要正则表达式验证方法生成
     * @param {*} options
     * @return  {Array}  element验证数组
     */
    const validatorBaserule = (options) => {
        const { label, required, baserule, trigger } = options
        const ruleArr = []
        ruleArr.push({
            validator: (rule, value, callback) => {
                if (isInputEmpty(value)) {
                    required ? callback(new Error(label + '为空')) : callback()
                } else if (patternsTest(baserule.pattern, value, { split: baserule.split })) {
                    callback()
                } else {
                    callback(new Error(label + '格式错误'))
                }
            },
            trigger: trigger
        })
        return ruleArr
    }

    /**
     * @desc: 正则test验证方法
     * @param {RegExp||Array<RegExp>} pattern 正则表达式
     * @param {String}value  验证数据
     * @param {Object}options [split] 是否需要切割
     * @return {Boolean} 返回验证结果
     */
    const patternsTest = (pattern, value, options = {}) => {
        const ruleOption = _.merge({}, options)
        const getPatterResult = (splitValue) => {
            if (typeof splitValue !== 'string') {
                splitValue = String(splitValue)
            }
            const patternIsArray = Array.isArray(pattern)
            if (patternIsArray) {
                const patternArr = pattern.flat(Infinity)
                return patternArr.some((item) => {
                    return Boolean(splitValue.match(item))
                })
            } else {
                return Boolean(splitValue.match(pattern))
            }
        }
        const getSplitArrResult = () => {
            const valueArr = value.split(ruleOption.split)
            return valueArr.every((current) => {
                return isInputEmpty(current) || getPatterResult(current)
            })
        }
        if (ruleOption.split) {
            return getSplitArrResult()
        } else {
            return getPatterResult(value)
        }
    }

    /**
     * @desc:阈值 区间限制验证方法
     * @param{*} options 验证配置
     * @return{Array} Element验证数组
     */
    const validatorThresholdrule = (options) => {
        const { label, required, thresholdrule, trigger } = options
        const defaultrule = {
            val: '',
            // 能否相等(默认可以相等)
            equal: true
        }
        const ruleArr = []
        ruleArr.push({
            validator: (rule, value, callback) => {
                if (isInputEmpty(value)) {
                    required ? callback(new Error(label + '为空')) : callback()
                } else {
                    if (patternsTest(patterns.NUMBER_REAL, value, { split: thresholdrule.split })) {
                        let tempValue = value
                        let valueArr = []
                        if (typeof value !== 'string') {
                            tempValue = String(value)
                        }
                        if (_.hasIn(thresholdrule, 'split')) {
                            valueArr = tempValue.split(thresholdrule.split)
                        } else {
                            valueArr.push(tempValue)
                        }
                        valueArr = _.map(valueArr, (item) => Number(item))
                        if (thresholdrule.min) {
                            const rule = _.merge({}, defaultrule, thresholdrule.min)
                            const res = valueArr.some((current) => {
                                return current < rule.val || (!rule.equal && current == rule.val)
                            })
                            if (res) {
                                callback(new Error(label + (rule.equal ? '大于等于' : '大于') + rule.val))
                            }
                        }
                        if (thresholdrule.max) {
                            const rule = _.merge({}, defaultrule, thresholdrule.max)
                            const res = valueArr.some((current) => {
                                return current > rule.val || (!rule.equal && current == rule.val)
                            })
                            if (res) {
                                callback(new Error(label + (rule.equal ? '小于等于' : '小于') + rule.val))
                            }
                        }
                        callback()
                    } else {
                        callback(new Error(label + '应为数字'))
                    }
                }
            },
            trigger: trigger
        })
        return ruleArr
    }

    /**
     * 多个类型内容校验，如一个输入框支持多种类型内容输入，例如输入ip + 备注 + ...，多类型需要符号分割，可自定义传入char字段。
     * 支持多行，例如： 192.168.1.1||这是一个IP的备注
     *               192.168.1.2|| 这是一个IP的备注
     * 注意：多行类型必须一致，如上面的例子 每一行只能是IP + 备注，且和categorys字段的顺序需要一致
     * @param options{Object} 验证配置
     * @returns {Function} Element验证函数
     */

    const validatorComplexRule = (options) => {
        const validateMultipleCategory = (vals, categorys, label) => {
            for (let r = 0; r < vals.length; r++) {
                const sRule = categorys[r]
                label = sRule.label || label
                if (!vals[r] || !sRule) {
                    break
                }
                if (sRule.len) {
                    const minMes = label + '最小长度为' + sRule.len.min + '个字符'
                    const maxMes = label + '最大长度为' + sRule.len.max + '个字符'
                    if (sRule.len.max && vals[r].length > sRule.len.max) {
                        return {
                            validate: false,
                            error: maxMes
                        }
                    }
                    if (sRule.len.min && vals[r].length < sRule.len.min) {
                        return {
                            validate: false,
                            error: minMes
                        }
                    }
                }
                if (sRule.pattern === '' || sRule.pattern === undefined || sRule.pattern === null) {
                    continue
                }
                if (Array.isArray(sRule.pattern)) {
                    for (let i = 0; i < sRule.pattern.length; i++) {
                        if (!sRule.pattern[i].test(vals[r])) {
                            return {
                                validate: false,
                                error: vals[r] + '格式错误'
                            }
                        }
                    }
                } else if (!sRule.pattern.test(vals[r])) {
                    return {
                        validate: false,
                        error: vals[r] + '格式错误'
                    }
                }
            }
            return {
                validate: true
            }
        }
        const { label, complexrule, trigger } = options
        return {
            validator: (rule, value, callback) => {
                let rows = []
                if (complexrule.split) {
                    // 支持多行校验
                    rows = value.split(complexrule.split).filter((item) => item)
                } else {
                    rows = [value]
                }
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i]
                    const {
                        validate,
                        error
                    } = validateMultipleCategory(row.split(complexrule.char), complexrule.categorys, label)
                    if (!validate) {
                        return callback(new Error(error))
                    }
                }
                callback()
            },
            trigger: trigger
        }
    }


    /**
     * 创建Element验证规则数组
     * @param options 创建规则选项（验证配置）
     * @returns {Array} Element验证rules数组
     */
    const createRules = (options = {}) => {
        const createOption = _.merge({}, DefaultCreateOption, options)
        const {
            required,
            label,
            trigger,
            len,
            rows,
            baserule,
            thresholdrule,
            limits,
            validator,
            complexrule
        } = createOption

        // 待生成出来的验证规则数组
        let rulesArr = []

        rulesArr.push({
            required: required,
            message: label + '为空',
            trigger: trigger
        })

        // 限制不能输入全空白字符
        rulesArr.push({
            validator: (rule, value, callback) => {
                if (isInputEmpty(value)) {
                    required ? callback(new Error(label + '为空')) : callback()
                } else if (!patternsTest(patterns.NON_NUL, value, {})) {
                    return callback(new Error(`${label}无效空白字符`))
                } else {
                    callback()
                }
            },
            trigger: trigger
        })
        // 验证输入长度
        if (len) {
            rulesArr = rulesArr.concat(validatorLength(createOption))
        }

        // 验证输入行数（个数）
        if (rows) {
            rulesArr = rulesArr.concat(validatorRows(createOption))
        }

        // 验证输入正则
        if (baserule) {
            rulesArr = rulesArr.concat(validatorBaserule(createOption))
        }

        // 区间验证
        if (thresholdrule) {
            rulesArr = rulesArr.concat(validatorThresholdrule(createOption))
        }

        // 混合验证
        if (complexrule) {
            rulesArr.push(validatorComplexRule(createOption))
        }

        // 内置限制规则
        if (limits) {
            rulesArr = rulesArr.concat(validatorRuleLimit(createOption))
        }

        // 自定义添加验证
        if (validator && _.isArray(validator)) {
            validator.forEach((item) => {
                rulesArr.push({
                    validator: item,
                    trigger: trigger
                })
            })
        }
        state.rules = rulesArr
        state.isValid = true // 判断是否有效，可以根据实际需要调整

        return rulesArr
    }

    return {
        createRules,
        patterns
    }
}
