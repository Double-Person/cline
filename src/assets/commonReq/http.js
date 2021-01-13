import axios from 'axios'
import Cookie from '@/assets/commonReq/cookie.js'

// const baseURI="http://127.0.0.1:8080/tasks"
// const baseURI="http://www.lsibss.com:8080/tasks"
// const baseURI = "http://yflh.hkzhtech.com/tasks"
const baseURI = "http://192.168.0.116:8080/tasks"


axios.defaults.baseURI = baseURI
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    /**
     * 基于axios的公用http请求
     * 包含重复请求的取消
     */
class Http {
    constructor() {
        const vm = this
        vm.pending = {}
        vm.CancelToken = axios.CancelToken
            // vm.baseURI = process.env.NODE_ENV === 'production' ? 'http://45.40.203.41:8080/tasks' : '/API'
            // vm.baseURI = 'http://192.168.0.112:8080/tasks'
            // vm.baseURI = 'http://192.168.0.120:8080/tasks'
            // vm.baseURI = 'https://www.hemingbi.com/tasks'
            // vm.baseUrl = 'http://127.0.0.1:8080/tasks'
            // vm.baseUrl = 'http://www.lsibss.com:8080/tasks'
        vm.baseURI = baseURI
            // vm.baseURI = '/API'
            // console.log(process.env,process.env.BASE_URL)
        var myCookie = new Cookie();
        // 全局修改axios默认配置
        // axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '' //默认路径,区别生产和线上环境

        // axios.defaults.headers.common['Authorization'] = myCookie.get("Authorization") //token
        axios.defaults.timeout = 10000 //5000
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
            // request 拦截器
        axios.interceptors.request.use(
            config => {
                // 拦截重复的请求
                let requestData = vm.getRequestIdentify(config, true)
                vm.removePending(requestData, true)

                config.cancelToken = new vm.CancelToken((c) => {
                    vm.pending[requestData] = c
                })

                // const token = getCookie('名称')
                // 使用的时候需要定义cookie方法，推荐js-cookie
                // config.data = JSON.stringify(config.data)
                // config.headers = {
                //     'Content-Type': 'application/json'
                // }
                config.headers = {
                    'Content-Type': 'application/json',
                    'Authorization': myCookie.get("Authorization")
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        // response 拦截器
        axios.interceptors.response.use(
            response => {
                // 移除已经完成的请求
                let requestData = vm.getRequestIdentify(response.config)
                vm.removePending(requestData)
                return response
            },
            error => {
                // 可以加入自定义错误处理
                return Promise.reject(error)
            }
        )
    }
    removePending(key, isRequest = false) {
        if (this.pending[key] && isRequest) {
            // console.log("取消重复请求")
            this.pending[key]('取消重复请求')
        }
        delete this.pending[key]
    }
    getRequestIdentify(config, isRequest = false) {
        let url = config.url

        // 两种匹配方式: 1.按照url+method 2.按照url+参数 可按具体业务修改
        return encodeURIComponent(url + JSON.stringify(config.method))

        // return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
    }
    get(url, params = {}) {
        const vm = this
        return new Promise((resolve, reject) => {
            axios.get(`${vm.baseURI}${url}`, {
                params: params
            }).then(response => {
                if (response.data.code == 1002) {
                    var myCookie = new Cookie();
                    //清除Authorization，登录失效
                    myCookie.delete("Authorization");
                }
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    post(url, data = {}) {
        const vm = this
        return new Promise((resolve, reject) => {
            axios.post(`${vm.baseURI}${url}`,
                data
            ).then(response => {
                if (response.data.code == 1002) {
                    var myCookie = new Cookie();
                    //清除Authorization，登录失效
                    myCookie.delete("Authorization");
                }
                // console.log(vm)
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export default Http