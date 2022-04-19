import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utilis/message.plugin.js'
import 'materialize-css/dist/js/materialize.min'

import Loader from '@/components/app/Loader.vue'
import tooltipDirective from '@/directives/tooltip.directive.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Paginate from 'vuejs-paginate'





firebase.initializeApp({
    apiKey: "AIzaSyCiJiZjQcy4roBePJEzjqIckai7G-QHvgY",
    authDomain: "vue-learn-crm-b8275.firebaseapp.com",
    projectId: "vue-learn-crm-b8275",
    storageBucket: "vue-learn-crm-b8275.appspot.com",
    messagingSenderId: "198820279605",
    appId: "1:198820279605:web:7fd0b24ef05c3db4ec087c",
    measurementId: "G-E0EZLFVRF5"
})

let app

firebase.auth().onAuthStateChanged(() => {
    if(!app){
        
        app = createApp(App).use(store).directive('tooltip', tooltipDirective).use(messagePlugin).component('Paginate', Paginate).component('Loader', Loader).use(router).mount('#app')
    }

    
})



