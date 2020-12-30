import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

/*************pc *********************/
import indexPc from '@/pagesPc/index'
import loginPc from '@/pagesPc/login'
import taskPc from '@/pagesPc/task'
import messagePc from '@/pagesPc/message'
import feedBackPc from '@/pagesPc/feedBack'
import feedBackResultPc from '@/pagesPc/feedBackResult'
import taskInfoPc from '@/pagesPc/taskInfo'
import addTaskPc from '@/pagesPc/addTask'
import getChargePc from '@/pagesPc/getCharge'
import addChargePc from '@/pagesPc/addCharge'
import schedule from '@/pagesPc/schedule'
import addProcurement from '@/pagesPc/addProcurement'
import procurementInfo from '@/pagesPc/procurementInfo'
import amendTask from "@/pagesPc/amendTask"
import SearchCopy from "@/pagesPc/SearchCopy"
/*************pc *********************/

/*************phone *********************/
import loginPhone from '@/pagesPhone/login'
import indexPhone from '@/pagesPhone/index'
import taskPhone from '@/pagesPhone/task'
import messagePhone from '@/pagesPhone/message'
import taskInfoPhone from '@/pagesPhone/taskInfo'
import addTaskPhone from '@/pagesPhone/addTask'
import resultPhone from '@/pagesPhone/result'
import feedBackPhone from '@/pagesPhone/feedBack'
import feedBackResultPhone from '@/pagesPhone/feedBackResult'
import getChargePhone from '@/pagesPhone/getCharge'
import addChargePhone from '@/pagesPhone/addCharge'
/*************phone *********************/


/***************************cookie********************************/
import Cookie from '@/assets/commonReq/cookie.js'
var myCookie=new Cookie();
/***************************cookie********************************/
Vue.use(Router)

var windowWidth = window.innerWidth;
let router;
if (window.innerWidth > 800) {
    router = new Router({
        // mode: 'history',
        routes: [{
            path: '/',
            name: 'index',
            component: indexPc,
            redirect: '/task',
            children: [{
                path: '/task',
                name: 'task',
                component: taskPc
            }, {
                path: '/message',
                name: 'message',
                component: messagePc
            }, {
                path: '/feedBack',
                name: 'feedBack',
                component: feedBackPc
            }, {
                path: '/feedBackResult',
                name: 'feedBackResult',
                component: feedBackResultPc
            }, {
                path: '/taskInfo',
                name: 'taskInfo',
                component: taskInfoPc
            }, {
                path: '/addTask',
                name: 'addTask',
                component: addTaskPc
            }, 
            {
                path: '/amendTask',
                name: 'amendTask',
                component: amendTask
            },
            {
                path: '/getCharge',
                name: 'getCharge',
                component: getChargePc
            }, {
                path: '/addCharge',
                name: 'addCharge',
                component: addChargePc
            }, {
                path: '/schedule',
                name: 'schedule',
                component: schedule
            },{
                path: '/addProcurement',
                name: 'addProcurement',
                component: addProcurement
            },{
                path: '/procurementInfo',
                name: 'procurementInfo',
                component: procurementInfo
            }]
        }, {
            path: '/login',
            name: 'login',
            component: loginPc
        }, {
            path: '/search-copy',
            name: 'SearchCopy',
            component: SearchCopy
        }]
    })
} else {
    router = new Router({
        // mode: 'history',
        routes: [{
            path: '/',
            name: 'index',
            component: indexPhone,
            redirect: '/task',
            children: [{
                path: '/task',
                name: 'task',
                component: taskPhone
            }]
        }, {
            path: '/login',
            name: 'login',
            component: loginPhone
        }, {
            path: '/message',
            name: 'message',
            component: messagePhone
        }, {
            path: '/taskInfo',
            name: 'taskInfo',
            component: taskInfoPhone
        }, {
            path: '/addTask',
            name: 'addTask',
            component: addTaskPhone
        }, {
            path: '/result',
            name: 'result',
            component: resultPhone
        }, {
            path: '/feedBack',
            name: 'feedBack',
            component: feedBackPhone
        }, {
            path: '/feedBackResult',
            name: 'feedBackResult',
            component: feedBackResultPhone
        }, {
            path: '/getCharge',
            name: 'getCharge', 
            component: getChargePhone
        }, {
            path: '/addCharge',
            name: 'addCharge',
            component: addChargePhone
        }]
    })
}


router.beforeEach((to, from, next) => {
    console.log(myCookie.get("Authorization"))
    if(myCookie.get("Authorization")!=null){
        if(to.matched.length ===0){
            next({
                path: '/task'
            })
        }else{
            next();
        }
        
    }else{
        if(to.name=="login"){
            next();
        }else{
            next({
                path: '/login'
            })
        }
    }
    
})

export default router