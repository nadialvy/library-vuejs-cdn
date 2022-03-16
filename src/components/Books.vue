<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Book</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Book</li>
            </ol>
                       
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        List Book
                    <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm float-right pt-2 pb-2">Add</button>
                    <div class="dataTable-search float-right mr-4">
                        <input class="dataTable-input" placeholder="Search..." type="text" v-model="search">
                    </div>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Book Name</th>
                                <th>Cover</th>
                                <th>Author</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(book, i) in filteredBooks" :key="i">
                                <td> {{ i+1 }} </td>
                                <td> {{ book.book_name }} </td>
                                <td> <img :src="image_url + 'images/' + book.image" alt="Book Cover" width="100"></td>
                                <td> {{ book.author }} </td>
                                <td> {{ book.desc | snippet }} </td>
                                <td>
                                    <button class="btn btn-info" v-on:click="editData(book)" type="button" data-toggle="modal" data-target="#exampleModal"><small><i class="fas fa-pencil-alt fa-fw fa-sm"></i></small></button>
                                    <button class="btn btn-dark mt-1" v-on:click="editData(book)" type="button" data-toggle="modal" data-target="#bookCoverModal"><small><i class="far fa-file-image fa-fw"></i></small></button>
                                    <button class="btn btn-danger mt-1" v-on:click="deleteData(book.book_id)"><small><i class="fas fa-trash-alt fa-fw"></i></small></button>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- main modal  -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> {{ action }} Data </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="">Book Name</label>
                        <input type="text" v-model="book_name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="">Author</label>
                        <input type="text" v-model="author" class="form-control" required>       
                    </div>

                    <div class="mb-3">
                        <label for="">Description</label>
                        <textarea v-model="desc" class="form-control" required style="height: 100px"></textarea>
                    </div>        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button v-on:click="saveData()" type="button" class="btn btn-primary" data-dismiss="modal">{{this.action}}</button>
                </div>
                </div>
            </div>
        </div>

        <!-- cover book modal  -->
        <div class="modal fade" id="bookCoverModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Upload Cover Book </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="">Book Cover</label>
                        <input type="file" @change="uploadCover()" ref="file" class="form-control" required>
                    </div>
                        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button v-on:click="upload(book_id)" type="button" class="btn btn-primary" data-dismiss="modal">Upload</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                book_id: '' ,
                book_name: '' ,
                author:'' ,
                desc: '' ,
                action: '' ,
                books : [],
                search: '',
                book_cover: ''
            }
        },
        methods: {
            getData(){
                //mapping header token first
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                axios.get(api_url + '/Book', token)
                .then(resp => {
                    this.books = resp.data
                    console.log(this.books);
                })

            },
            addData(){
                //reset input form
                this.book_id= '' ,
                this.book_name= '' ,
                this.author= '' ,
                this.desc= '' ,
                this.action= 'Add'
            },
            editData(bookData){
                this.book_id = bookData.book_id,
                this.book_name = bookData.book_name,
                this.author = bookData.author,
                this.desc = bookData.desc
                this.action = 'Update'
                
            }, 
            uploadCover(){
                this.book_cover = this.$refs.file.files[0]; //knp 0? karena filenya cuma 1. (index ke 0)
            },
            upload(id){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization'),
                        'Content-Type': 'multipart/form-data'
                    }
                }

                let form = new FormData();
                form.append('book_cover', this.book_cover)  

                 axios.post(api_url + '/Book/UploadCover/'+ id, form, token)
                    .then(resp => {
                        swal("Good Job", resp.data.message, "success")
                })

                this.getData()
            },
            saveData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                let form = {
                    //be        //state
                    'book_name' : this.book_name,
                    'author' : this.author,
                    'desc' : this.desc,
                    'book_cover' : this.book_cover
                }

                if(this.action === "Add"){                   
                    axios.post(api_url + '/Book', form, token)
                    .then(resp => {
                        console.log(resp.data)
                        swal("Good Job", resp.data.message, "success")
                    })
                }
                else {
                    //put
                    axios.put(api_url + '/Book/' + this.book_id, form, token)
                    .then(resp => {
                        swal("Good Job", resp.data.message, "success")
                    })
                }

                this.getData()
            },
            deleteData(id){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    buttons: [true, 'Yes delete it']
                    }).then((value) => {
                    if (value) {
                       axios.delete(api_url + '/Book/' + id, token)
                        .then(resp => {
                            if(resp.data.status === 1){
                                swal("Good Job", resp.data.message, "success")
                                this.getData()
                            }

                        })
                    }
                })
            },
        },
        computed: {
            filteredBooks: function(){
                // return this.books.filter((book) => {
                //     return book.book_name.toLowerCase().match(this.search.toLowerCase());
                    
                // });

                return this.books.filter((book) => {
                    return book.book_name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || book.author.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || book.desc.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
                }); 
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>