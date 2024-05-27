import store from "@/store.js";
import axios from "axios";
import config from "@/config.js";
export default {
    goToUserCabinet: function(router){
        if(store.role === 'admin') {
            console.log('you admin')
            router.push({ name: 'adminPanel' })
            return
        }
        router.push({ name: 'login' })
    },
    logOut: function(router){
        axios.post(config.logOutURL)
        store.token=''
        store.role='guest'
        router.push({name: 'index'})
    }
}