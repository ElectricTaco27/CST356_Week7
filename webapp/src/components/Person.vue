<template>
    <div>
        <h1 class ="testClass">People Table</h1>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Middle Initial</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in persons" :key="person.id">
                    <td> {{ person.firstName }} </td>
                    <td> {{ person.middleInitial }} </td>
                    <td> {{ person.lastName }} </td>
                </tr>
            </tbody>
            <!-- <tr>
                <td>Asuna</td>
                <td>F</td>
                <td>Yuuki</td>
            </tr>
            <tr>
                <td>Kirito</td>
                <td>B</td>
                <td>Kazugaya</td>
            </tr>
            <tr>
                <td>Aiz</td>
                <td>D</td>
                <td>Wallenstein</td>
            </tr>
            <tr>
                <td>Shino</td>
                <td>S</td>
                <td>Asuda</td>
            </tr>
            <tr>
                <td>Reki</td>
                <td>A</td>
                <td>Kawahara</td>
            </tr> -->
        </table>
    </div> 
</template>

<script>
    import Vue from 'vue';

    export default 
    {
        name: 'Persons',
        props: ['auth'],
        data () 
        {
            return {
                persons: []
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

            getPersons: function() {
                let personsApi = process.env.PERSON_API;

                Vue.axios.get(url, this.GetAuthHeader()).then(
                    (response) => {
                        console.log(response);
                        this.persons = response.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        },

        mounted() {
            this.getPersons();
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
    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
