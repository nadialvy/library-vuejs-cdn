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
                                    <button class="btn btn-info" type="button" data-toggle="modal" data-target="#detailModal"><i class="fas fa-clipboard-list"></i></button>
                                    <!-- <button class="btn btn-info" v-on:click="editData(borrowBook)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button> -->
                                    <button class="btn btn-success" type="button" data-toggle="modal" data-target="#dataReturnModal"><i class="fas fa-check-square"></i></button>
                                    <button class="btn btn-danger" v-on:click="deleteData(borrowBook.book_borrow_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- modal  -->
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
                                <label for="student_name">Student Name</label>
                                <select class="form-control" id="student_name" v-model="student_name" required>
                                    <option 
                                        v-for="member in members" :key="member" 
                                        :value="member.student_id"
                                    > 
                                            {{ member.student_name }} 
                                    </option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="">Date Borrowing</label>
                                <input type="date" v-model="myDate" class="form-control" required>       
                            </div>

                            <div class="mb-3">
                                <label for="">Date Returning</label>
                                <input type="date" v-model="date_of_returning" class="form-control" required>       
                            </div>
                        </div>

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Borrow Details </h5>
                            <button @click="addItem" class="btn btn-info">+</button>
                        </div>

                        <div class="modal-body">
                            <div class="row" v-for="(detail, counter) in detail_borrow" :key="counter">
                                <div class="input-group mb-3">
                                        <select class="form-select input-sm" id="book_name" v-model="detail.book_id" required aria-placeholder="Book name">
                                        <option value="" disabled>Choose book name</option>
                                        <option 
                                            v-for="book in books" :key="book" 
                                            :value="book.book_id"
                                        > 
                                                {{ book.book_name }} 
                                        </option>
                                    </select>
                            
                                    <!-- declaration for second field -->
                                    <input type="number" class="form-control input-sm" placeholder="Quantity" v-model="detail.qty" />

                                    <button type="button" @click="deleteItem(counter)" class="btn btn-danger">-</button>
                                    
                                </div>
                            </div>
                        </div>
                    
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button v-on:click="saveData()" type="button" class="btn btn-primary" data-dismiss="modal">{{this.action}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports={
        data(){
            return{
                borrowBooks: [],
                members: [],
                details: [],
                books: [],
                search:'',
                action: '',

                //input data today automatic
                myDate : new Date().toISOString().slice(0,10),

                // update 
                // book_borrow_id: '',

                // v-model 
                student_name: '',
                date_of_borrowing: '',
                date_of_returning: '',
                detail_borrow: [],

            }
        },
        methods: {
            addItem(){
                this.detail_borrow.push({
                    book_id: '',
                    qty: '',
                })
            },
            deleteItem(counter){
                this.detail_borrow.splice(counter, 1)
            }, 
            getData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                axios.get(api_url + '/BookBorrow', token)
                .then(resp => {
                    this.borrowBooks = resp.data
                })

                axios.get(api_url + '/Students', token)
                .then(resp => {
                    this.members = resp.data
                })

                axios.get(api_url + '/Book', token)
                .then(resp => {
                    this.books = resp.data
                })
            },
            addData(){
                // book borrow 
                this.student_id = '',
                this.date_of_borrowing = '',
                this.date_of_returning = '',
                this.action = 'Add'
            },
            // editData(bookBorrow){
            //     this.book_borrow_id = bookBorrow.book_borrow_id,
            //     this.student_name = bookBorrow.student_id,
            //     this.date_of_borrowing = bookBorrow.date_of_borrowing,
            //     this.date_of_returning = bookBorrow.date_of_returning,
            //     this.action = 'Update'
            // },
            saveData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                let form = {
                    'student_id' : this.student_name,
                    'date_of_borrowing' : this.myDate,
                    'date_of_returning' : this.date_of_returning,
                    'detail' : this.detail_borrow
                }

                axios.post(api_url + '/BookBorrow', form, token)
                    .then(resp => {
                        swal("Good Job", 'Success create new data', "success")
                        location.reload()
                        this.getData()
                })

                // // insert book borrow 
                // if(this.action === 'Add'){
                //     axios.post(api_url + '/BookBorrow', form, token)
                //     .then(resp => {
                //         swal("Good Job", 'Success create new data', "success")
                //         this.getData()
                //     })
                // } else {
                //     axios.put(api_url + '/BookBorrow/' + this.book_borrow_id, form, token)
                //     .then(resp => {
                //         swal("Good Job", 'Success create new data', "success")
                //     })
                // }

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
                       axios.delete(api_url + '/BookBorrow/' + id, token)
                        .then(resp => {
                            if(resp.data.status === 1){
                                swal("Good Job", resp.data.message, "success")
                                this.getData()
                            }

                        })
                    }
                })
                
                this.getData()

            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

