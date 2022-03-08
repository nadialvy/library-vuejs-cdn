var api_url = "http://localhost:8000/api";

// konfigurasi route 
var router = [
    {
        path:"/", 
        name: "App", 
        component: httpVueLoader("./src/components/App.vue") 
    },
    {
        path:"/login",
        name: "Login",
        component: httpVueLoader("./src/components/Login.vue")
    },
    {
        path:"/member",
        name: "Member",
        component: httpVueLoader("./src/components/Member.vue")
    },
    {
        path:"/book",
        name: "Book",
        component: httpVueLoader("./src/components/Book.vue")
    }
];

// var routers = new VueRouter({ routes : router, base: "/" }) //instance vue router
var routers = new VueRouter({
    routes: router,
    mode: 'history',
    base: '/'
});

var app = new Vue({
    el: "#app", 
    components:{
        'app' : httpVueLoader("./src/components/Apps.vue"),
        'login' : httpVueLoader("./src/components/Login.vue"),
        'member' : httpVueLoader("./src/components/Member.vue"),
        'book' : httpVueLoader("./src/components/Book.vue")
    },
    data: { 
        user : {
            id_user: "",
            role: "",
            name: "",
            username: "",
        },
        componentName: "" 
    },
    router: routers,
    methods: {
        checkToken: function(){
            //d y have token in cookies or not?
            if(this.$cookies.isKey('Authorization')){
                // if u have any

                //mapping header token first
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                //check Token validation
                axios.get(api_url + '/LoginCheck', token)
                .then(resp => {
                    console.log(resp);
                    if(resp.data.status === 1){
                        this.componentName = 'app'
                    } else {
                        this.componentName = 'login'
                    }
                })
            } else {
                //if u dont have
                this.componentName = 'login';
            }
        
        }

    },  
    mounted(){
        this.checkToken();
    }
});

