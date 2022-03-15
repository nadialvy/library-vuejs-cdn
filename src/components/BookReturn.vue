<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Book Return</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Book Return</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        List Book Return
                        <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm float-right">Add</button>
                        <div class="dataTable-search float-right mr-4">
                            <input class="dataTable-input" placeholder="Search member name..." type="text" v-model="search">
                        </div>
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
                            <!-- <tr v-for="(member, index) in filteredMember" :key="index">
                                <td> {{ member.student_id }} </td>
                                <td> {{ member.student_name }} </td>
                                <td> {{ member.class_name }} </td>
                                <td> {{ member.group }} </td>
                                <td>
                                    <button class="btn btn-info"  v-on:click="editData(member)" type="button" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" v-on:click="deleteData(member.student_id)" ><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{
                search: '',
            }
        },
        methods: {
            getData(){

            }
        },
        mounted(){
            this.getData()
        }
    }

</script>
