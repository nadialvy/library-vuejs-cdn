<template>
    <div>
        <div class="card mb-4">
            <div class="card-header p-5">
                <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm pl-5 pr-5 pt-2 pb-2 mt-1">Add</button>
                <div class="dataTable-search float-right mr-4">
                    <input class="dataTable-input pl-5 pr-5" placeholder="Search..." type="text" v-model="search">
                </div>
            </div>

            <div class="card-body">
                <table id="datatablesSimple" class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Class</th>
                            <th>Major</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(member, index) in members" :key="index">
                            <td> {{ index+1 }} </td>
                            <td> {{ member.student_name }} </td>
                            <td> <img :src="image_url + 'student_images/' + member.image" alt="Student Photo" width="65" height="65"></td>
                            <td> {{ member.class_name }} </td>
                            <td> {{ member.group }} </td>
                            <td>
                                <button class="btn btn-info btn-sm "  v-on:click="editData(member)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                <button class="btn btn-dark btn-sm "  v-on:click="editData(member)" type="button" data-toggle="modal" data-target="#photoModal"><i class="far fa-file-image fa-fw"></i></button>
                                <button class="btn btn-danger btn-sm " v-on:click="deleteData(member.student_id)" ><i class="fas fa-trash-alt fa-fw"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- main modal  -->
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
                    <button type="button" class="btn btn-secondary btn-sm " data-dismiss="modal">Close</button>
                    <button v-on:click="saveData()" type="button" class="btn btn-primary btn-sm " data-dismiss="modal">{{this.action}}</button>
                </div>
                </div>
            </div>
        </div>

         <!-- student photo modal  -->
        <div class="modal fade" id="photoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Upload Photo </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="">Student Photo</label>
                        <input type="file" ref="file"  @change="uploadPhoto()" class="form-control" required>
                    </div>
                        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm " data-dismiss="modal">Close</button>
                    <button v-on:click="upload(member_id)" type="button" class="btn btn-primary btn-sm " data-dismiss="modal">Upload</button>
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
                grade: '',
                search: '',
                student_photo: ''
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
            uploadPhoto(){
                this.student_photo = this.$refs.file.files[0]; //knp 0? karena filenya cuma 1. (index ke 0)
            },
            upload(id){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization'),
                        'Content-Type': 'multipart/form-data'
                    }
                }

                let form = new FormData();
                form.append('student_photo', this.student_photo)  

                 axios.post(api_url + '/Students/UploadCover/'+ id, form, token)
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

                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    buttons: [true, 'Yes delete it']
                    }).then((value) => {
                    if (value) {
                       axios.delete(api_url + '/Students/' +id , token)
                        .then(resp => {
                            if(resp.data.status === 1){
                                swal("Good Job", resp.data.message, "success")
                                this.getData()
                            }
                        })
                    }
                })
            }

        },
        computed: {
            filteredMember(){
                return this.members.filter((member) => {
                    return member.student_name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || member.class_name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || member.group.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
                })
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>
''
