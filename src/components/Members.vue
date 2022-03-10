<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Members</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Members</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        List Members
                        <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm float-right">Add</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Major</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(member, index) in members" :key="index">
                                <td> {{ member.student_id }} </td>
                                <td> {{ member.student_name }} </td>
                                <td> {{ member.class_name }} </td>
                                <td> {{ member.group }} </td>
                                <td>
                                    <button class="btn btn-info"  v-on:click="editData(member)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" v-on:click="deleteData(member.student_id)" ><i class="fas fa-trash-alt fa-fw"></i></button>
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
                    <h5 class="modal-title" id="exampleModalLabel">{{action}} Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="">Name</label>
                        <input type="text" v-model="name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="">Date of Birth</label>
                        <input type="date" v-model="date_of_birth" class="form-control" required>       
                    </div>

                    <div class="mb-3">
                        <label for="gender">Gender</label>
                        <select class="form-control" id="gender" v-model="gender" required>
                            <option value="L">Male</option>
                            <option value="P">Female</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="">Address</label>
                        <input type="text" v-model="address" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="class">Class</label>
                        <select class="form-control" id="class" v-model="grade" required>
                            <option 
                                v-for="grade in grades" :key="grade" 
                                :value="grade.class_id"
                            > 
                                    {{ grade.class_name }} 
                            </option>
                        </select>
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
</template>

<script>
    module.exports = {
        data(){
            return {
                members: [],
                grades: [],
                action: '',

                //v-model
                member_id: '',
                name: '',
                date_of_birth: '',
                gender: '',
                address: '',
                grade: ''
            }
           
        },
        methods: {
            getData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                axios.get(api_url + '/Students', token)
                .then(resp => {
                    this.members = resp.data
                    
                    console.log(this.members)
                })

                axios.get(api_url + '/Grade', token)
                .then(resp => {
                    this.grades = resp.data
                    console.log(this.grades)
                })
            },
            addData(){
                this.name = '',
                this.date_of_birth = '',
                this.gender = '',
                this.address = '',
                this.grade = '',
                this.action = 'Add'
            },
            editData(memberData){
                this.member_id = memberData.student_id,
                this.name = memberData.student_name,
                this.date_of_birth = memberData.date_of_birth,
                this.gender = memberData.gender,
                this.address = memberData.address,
                this.grade = memberData.class_id,
                this.action = 'Update'
            },
            saveData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                let form = {
                    'student_name' : this.name,
                    'date_of_birth' : this.date_of_birth,
                    'gender' : this.gender,
                    'address' : this.address,
                    'class_id': this.grade,
                }

                if(this.action === 'Add'){
                    axios.post(api_url + '/Students', form, token)
                    .then(resp => {
                        swal("Good Job", resp.data.message, "success")
                        // alert(resp.data.message)
                    })
                }else {
                    axios.put(api_url + '/Students/' + this.member_id, form, token)
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

                if(confirm('Are you sure you want to delete this data?')){
                    axios.delete(api_url + '/Students/' +id , token)
                    .then(resp => {
                        if(resp.data.status === 1){
                            swal("Good Job", resp.data.message, "success")
                            this.getData()
                        }
                    })
                }
            }

        },
        mounted(){
            this.getData()
        }
    }
</script>

