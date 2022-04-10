<template>
    <div>
        
    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
      <nav class="navbar navbar-expand-lg navbar-light sticky-top" data-navbar-on-scroll="data-navbar-on-scroll">
        <div class="container"><a class="navbar-brand" href="index.html"><img src="src/assets/img/Frame 1 (1).png" height="31" alt="logo" /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"> </span></button>
          <div class="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><router-link to="/book" class="nav-link">Book</router-link></li>
              <li class="nav-item"><router-link to="/member" class="nav-link"> Member</router-link></li>
              <li class="nav-item"><router-link to="/book_borrow" class="nav-link">Borrow</router-link></li>
              <li class="nav-item"><router-link to="/book_return" class="nav-link">Return</router-link></li>
              <li class="nav-item"><a class="nav-link" @click="logout()">Logout</a></li>
            </ul>
            <!-- <div class="d-flex ms-lg-4"><a class="btn btn-secondary-outline" href="#!">Sign In</a><a class="btn btn-warning ms-3" href="#!">Sign Up</a></div> -->
          </div>
        </div>
      </nav>
      <section class="pt-7">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-md-start text-center py-6">
              <h1 class="mb-4 fs-9 fw-bold">Reading Just Got Easier</h1>
              <p class="mb-6 lead text-secondary">Read books, share reading collections and socialize at the same time.<br class="d-none d-xl-block" />Anywhere, anytime comfortably with everyone.<br class="d-none d-xl-block" /></p>
              <!-- <p> Halo {{}} </p> -->
              <!-- <div class="text-center text-md-start"><a class="btn btn-warning me-3 btn-lg" href="#!" role="button">Get started</a><a class="btn btn-link text-warning fw-medium" href="#!" role="button" data-bs-toggle="modal" data-bs-target="#popupVideo"><span class="fas fa-play me-2"></span>Watch the video </a></div> -->
            </div>
            <div class="col-md-6 text-end"><img class="pt-7 pt-md-0 img-fluid" src="src/assets/img/hero/6263.jpg" alt="" /></div>
          </div>
        </div>
      </section>

      <section>
            <router-view></router-view>
      </section>

      <!-- ============================================-->
      <!-- <section> begin ============================-->
      <section class="text-center py-0">

        <div class="container">
          <div class="container border-top py-3">
            <div class="row justify-content-between">
              <div class="col-12 col-md-auto mb-1 mb-md-0">
                <p class="mb-0">&copy; 2022 IPusnas </p>
              </div>
              <div class="col-12 col-md-auto">
                <p class="mb-0">
                  Made with<span class="fas fa-heart mx-1 text-danger"> </span>by <a class="text-decoration-none ms-1" href="https://themewagon.com/" target="_blank">ThemeWagon</a></p>
              </div>
            </div>
          </div>
        </div><!-- end of .container-->

      </section>
      <!-- <section> close ============================-->
      <!-- ============================================-->


    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->
    <!-- 

    <div class="modal fade" id="popupVideo" tabindex="-1" aria-labelledby="popupVideo" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <iframe class="rounded" style="width:100%;height:500px;" src="https://www.youtube.com/embed/_lhdhL4UDIo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div> -->

    </div>
</template>


<script>
    module.exports = {
        data(){
            return{
              name: '',
            }
        },
        methods: {
            logout(){
                //delete cookies token
                this.$cookies.remove('Authorization')
                location.reload();
            },
            book(){
                this.componentName = 'book'
            },
            member(){
                this.componentName = 'member'
            }
        }
    }
</script>

<style scoped>
 .navbar{
     background-color: #fff;
 }
</style>