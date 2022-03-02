<template>
  <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <p> {{ message }} </p>
                                        <br>
                                        <form>
                                            <div class="form-floating mb-3">
                                                <input v-model="email" class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <!-- v-model sama kayak name di php nativ  -->
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input v-model="password" class="form-control" id="inputPassword" type="password" placeholder="Password" />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <!-- <a class="small" href="password.html">Forgot Password?</a> -->
                                                <a class="btn btn-primary" v-on:click="login()">Login</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="card-footer text-center py-3">
                                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
</template>

<script>
module.exports = {
  data () {
    return {
        email: "",
        password: "",
        message: ""
    }
  },
  methods: {
    login(){
        this.message = "Please wait..."
        //mapping data post
        let login_data = {
            //sesuai backend    //sesuai state
            "email" :           this.email,
            "password" :        this.password
        }

        axios.post(api_url + '/Login', login_data)
        .then(resp => {
            // console.log(resp.data)
            this.message = resp.data.message
            
            if(resp.data.status === 1){
                
                // //save token into cookies
                if(this.$cookies.isKey('Authorization')){
                //     //jika ada maka dihapus
                    this.$cookies.remove('Authorization')
                }

                // //jika sudah dihapus maka simpan lagi data terbaru dari resp
                this.$cookies.set('Authorization', resp.data.token)
                this.componentName = "app"
                location.reload();
            } else {
                this.componentName = "login"
            }
        })
    }
  }
}
</script>

<style>
</style>
