import axios from 'axios'

 
/// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
        console.log('config')
        console.log(config)
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        console.log('response')
        console.log(response)
        return response;
    },
    error => {
        console.log('error ')
        console.log(error )
        return Promise.reject(error.response.data);
        /*if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data) */
    });
export default axios
