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

                    <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm float-right">Add</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(book, i) in books" :key="i">
                                <td> {{ i+1 }} </td>
                                <td> {{ book.book_name }} </td>
                                <td> {{ book.author }} </td>
                                <td> {{ book.desc }} </td>
                                <td>
                                    <button class="btn btn-info"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="">Book Name</label>
                        <input type="text" v-model="book_name" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="">Author</label>
                        <input type="text" v-model="author" class="form-control">       
                    </div>

                    <div class="mb-3">
                        <label for="">Description</label>
                        <input type="textarea" v-model="desc" class="form-control">
                    </div>
                        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button v-on="saveData()" type="button" class="btn btn-primary">{{this.action}}</button>
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
                books : []
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
                    console.log(resp.data)
                    this.books = resp.data
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
            saveData(){
                //mapping header token first
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                //mapping data
                //data that will be post/put
                let form = {
                    //be        //state
                    'book_name' : this.book_name,
                    'author' : this.author,
                    'desc' : this.desc
                }

                if(this.action === "Add"){
                    //post form into book with token permission
                    axios.post(api_url + '/Book', form, token)
                    .then(resp => {
                        if(resp.data.status === 1){
                            // alert(resp.data.message)

                            this.getData()
                        }else {

                        }
                    })
                } else {

                }
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>