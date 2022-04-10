<template>
    <div>
            <div class="card mb-4">
                <div class="card-header p-5">
                        <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm pl-5 pr-5 pt-2 pb-2 mt-1">Add</button>
                        <div class="dataTable-search float-right mr-4">
                            <input class="dataTable-input pl-5 pr-5" placeholder="Search member name..." type="text" v-model="search">
                        </div>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Return Date</th>
                                <th>Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in book_return" :key="index">
                                <td> {{ index+1 }} </td>
                                <td> {{ data.student_name }} </td>
                                <td> {{ data.class_name }} </td>
                                <td> {{ data.date_of_returning }} </td>
                                <td> Rp.{{ data.fine }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</template>

<script>
    module.exports = {
        data(){
            return{
                search: '',
                book_return: [],
            }
        },
        methods: {
            getData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }

                axios.get(api_url + '/BookReturn', token)
                .then(resp => {
                    this.book_return = resp.data
                    // console.log(this.book_return));
                });
            }
        },
        mounted(){
            this.getData()
        }
    }

</script>
