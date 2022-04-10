<template>
    <div>
            <div class="card mb-4">
                <div class="card-header p-5">
                    <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm pl-5 pr-5 pt-2 pb-2 mt-1">Add</button>
                    <div class="dataTable-search float-right mr-4">
                        <input class="dataTable-input pl-5 pr-5" placeholder="Search borrower name..." type="text" v-model="search">
                    </div>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Borrow Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
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
                                    <span v-if="borrowBook.status == 'Late' " class="badge badge-danger">Late</span>
                                    <span v-else class="badge badge-success">Not Late</span>
                                </td>
                                 <td>
                                    <button class="btn btn-info btn-sm" v-on:click="detail(borrowBook.book_borrow_id)" type="button" data-toggle="modal" data-target="#detailModal"><i class="fas fa-clipboard-list"></i></button>
                                    <button class="btn btn-success btn-sm" v-on:click="returnData(borrowBook.book_borrow_id)" type="button" data-toggle="modal" data-target="#returnModal"><i class="fas fa-check-square"></i></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteData(borrowBook.book_borrow_id)" :disabled="isDisabled"><i class="fas fa-trash-alt fa-fw"></i></button>
                                    <!-- <button class="btn btn-info" v-on:click="editData(borrowBook)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button> -->
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

                        <div class="alert alert-info" role="alert">
                            The date of borrowing will be automatically generated, and the date of returning will be automatically generated the next 7 days after the date of borrowing.
                        </div>

                    </div>

                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Borrow Details </h5>
                        <button @click="addItem" class="btn btn-info btn-sm">+</button>
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

                                <button type="button" @click="deleteItem(counter)" class="btn btn-danger btn-sm">-</button>
                                
                            </div>
                        </div>
                    </div>
                
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                        <button v-on:click="saveData()" type="button" class="btn btn-primary btn-sm" data-dismiss="modal">{{this.action}}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- detail modal  -->
        <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Detail Borrow Book </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(detail, i) in detail_borrow" :key="i">
                                    <td> {{ detail.book_name }} </td>
                                    <td> {{ detail.author }} </td>
                                    <td> <img :src="image_url + 'images/' + detail.image" alt="Book Cover" width="70"></td>
                                    <td> {{ detail.qty }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

         <!-- modal return -->
        <div class="modal fade" id="returnModal" tabindex="-1" role="dialog" aria-labelledby="detailModal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Return Book </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Late for (days)</th>
                                    <th>Fine</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ret in return_data" :key="ret">
                                    <td> {{ ret.late_for }} </td>
                                    <td> {{ ret.fine }} </td>
                                    <td>
                                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                        <button type="button" v-on:click="returnBook(ret.book_borrow_id)" class="btn btn-primary btn-sm" data-dismiss="modal">Return Book</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
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
                return_data:[],
            }
        },
        methods:{
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
                    console.log(resp.data)
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
                this.getData()
                location.reload()
            },
            returnBook(id){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                let form = {
                    'book_borrow_id' : id
                }

                axios.post(api_url + '/BookReturn', form, token)
                    .then(resp => {
                        swal("Good Job", 'Success return book', "success")
                        this.getData()
                })
                this.getData()
            },
            detail(book_borrow_id){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                axios.get(api_url + '/BookBorrowDetails/'+ book_borrow_id, token)
                .then(resp => {
                    console.log(resp.data)
                    this.detail_borrow = resp.data
                })
            },
            returnData(book_borrow_id){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                axios.get(api_url + '/detailReturn/' + book_borrow_id, token)
                .then(resp => {
                    // console.log(resp.data);
                    this.return_data = resp.data
                    console.log(this.return_data);
                    
                })
            },
            isDisabled(){
                //if current date = tanggal pinjam maka false
                //else true
                return true
            }
        },
        mounted(){
            this.getData(),
            this.isDisabled()
        }
    }
</script>
