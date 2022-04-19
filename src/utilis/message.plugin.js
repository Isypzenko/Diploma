// export default {
//     install(Vue,options){
//         Vue.prototype.$message = function(html){
//             M.toast({html})
//         }
//         Vue.prototype.$error = function(html){
//             M.toast({html: `[ошибка]:${html}`})
//         }
//     }
// }

export default {
    install: (app) => {
        app.config.globalProperties.$message = (key) => {
            return M.toast({html: key})
        }

    }
}