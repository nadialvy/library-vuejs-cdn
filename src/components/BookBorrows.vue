<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Tables</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Book Borrow</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Book Borrow
                    <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm float-right pt-2 pb-2">Add</button>
                    <div class="dataTable-search float-right mr-4">
                        <input class="dataTable-input" placeholder="Search borrower name..." type="text" v-model="search">
                    </div>
                </div>

                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Date of Borrowing</th>
                                <th>Date of Returning</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(borrowBook, i) in borrowBooks" :key="i">
                                <td> {{ i+1 }} </td>
                                <td> {{ borrowBook.student_name }} </td>
                                <td> {{ borrowBook.date_of_borrowing }} </td>
                                <td> {{ borrowBook.date_of_returning }} </td>
                                 <td>
                                    <button class="btn btn-info" v-on:click="editData(book)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" v-on:click="deleteData(book.book_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- modal  -->
        </div>
    </div>
</template>

<script>
    module.exports={
        data(){
            return{
                borrowBooks: [],
                search:''
            }
        },
        methods: {
            getData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                axios.get(api_url + '/BookBorrow', token)
                .then(resp => {
                    this.borrowBooks = resp.data
                    console.log(this.borrowBooks)
                })
            },
            addData(){

            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

