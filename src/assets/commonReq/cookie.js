class Cookie {
    //获取cookie、
    get(name) {
        // console.log(window.localStorage.getItem("name"))
        return localStorage.getItem(name);
        // var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        // if (arr = document.cookie.match(reg))
        //     return (arr[2]);
        // else
        //     return null;
    }

    //设置cookie,增加到vue实例方便全局调用
    set(c_name, value, expiredays) {
        localStorage.setItem(c_name,value)
        // var exdate = new Date();
        // exdate.setDate(exdate.getDate() + expiredays);
        // document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

    //删除cookie
    delete(name) {
        localStorage.removeItem(name)
        // var exp = new Date();
        // exp.setTime(exp.getTime() - 1);
        // var cval = this.get(name);
        // if (cval != null)
        //     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
export default Cookie