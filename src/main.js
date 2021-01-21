// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '../theme/index.css'
//富文本区域
import VueQuillEditor from 'vue-quill-editor'



import 'quill/dist/quill.core.css'

import 'quill/dist/quill.snow.css'

import 'quill/dist/quill.bubble.css'

import PreviewPicture from "./components/PreviewPicture.vue"

Vue.use(PreviewPicture)



Vue.use(VueQuillEditor, /* { default global options } */ )
    //富文本区域


// 封装区域
import Http from './assets/commonReq/http.js'
import Cookie from './assets/commonReq/cookie.js'

//
Vue.prototype.$http = new Http();

Vue.prototype.$cookie = new Cookie();
Vue.config.productionTip = false

// const URL = 'http://yflh.hkzhtech.com/tasks/';
const URL = 'http://192.168.0.116:8080/tasks/';
// const URL = 'http://www.lsibss.com:8080/tasks/';

// 之前文件上传地址
Vue.prototype.$httppath = URL + "api/purchase/saveImage"; // 
// 新加文件上传地址
Vue.prototype.$httpNewPath = URL + "api/utils/uploadFile"; // /api/utilsuploadFile



Vue.use(ElementUI)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})