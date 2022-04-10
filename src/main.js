Vue.filter('snippet', function(value){
    return value.slice(0,50) + '...';
  });

var api_url = "http://localhost:8000/api";
var image_url = "http://localhost:8000/"; //load image


// konfigurasi route 
var router = [
    {
        path:"/", 
        name: "Home", 
        component: httpVueLoader("./src/components/Home.vue") 
    },
    {
        path:"/login",
        name: "Login",
        component: httpVueLoader("./src/components/Login.vue")
    },
    {
        path:"/member",
        name: "Member",
        component: httpVueLoader("./src/components/Members.vue")
    },
    {
        path:"/book",
        name: "Book",
        component: httpVueLoader("./src/components/Books.vue")
    },
    {
        path:"/book_borrow",
        name: "Book Borrows",
        component: httpVueLoader("./src/components/BookBorrows.vue")
    },
    {
        path:"/book_return",
        name: "Book Returns",
        component: httpVueLoader("./src/components/BookReturn.vue")
    }
];

// var routers = new VueRouter({ routes : router, base: "/" }) //instance vue router
var routers = new VueRouter({
    routes: router,
    // mode: 'history',
    base: '/'
});

var app = new Vue({
    el: "#app", 
    components:{
        'app' : httpVueLoader("./src/components/Apps.vue"),
        'login' : httpVueLoader("./src/components/Login.vue")
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

