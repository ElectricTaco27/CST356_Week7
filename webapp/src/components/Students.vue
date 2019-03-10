<template>
    <div>
        <h1 class ="testClass">Student Table</h1>
        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Email Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student.id">
                    <td> {{ student.id }} </td>
                    <td> {{ student.email }} </td>
                </tr>
            </tbody>
        </table>
    </div> 
</template>

<script>
    import Vue from 'vue'

    export default { 
        name: 'Students',
        props: ['auth'],
        data () {
            return {
                students: []
            }
        },

        methods: {

            getAuthHeader: function() {
                return {
                    headers: {
                        Authorization: 'Bearer ' + this.auth.accessToken
                    }
                }
            },

            getStudents: function() {
                let studentsApi = process.env.STUDENT_API;
                //let studentsApi = 'https://localhost:5001/api/students'
                
                Vue.axios.get(url, this.GetAuthHeader()).then(
                    (response) => {
                        console.log(response);
                        this.products = response.data;
                    },
                    (error) => {
                        console.log(error);                    
                    }
                );
            }
        },
        
        mounted() {
            this.getStudents();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    /* <link href="sharedcssfile.css" rel="stylesheet" type="text/css"> */
    table {
        font-family: arial;
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even){
        background-color: #dddddd;
    }
</style>
