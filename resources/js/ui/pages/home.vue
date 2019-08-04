<template>
<div class="container h-100">
    <div class="row justify-content-center h-100">
        <div class="">
            <div class="jumbotron">
                <form class="form-inline my-2 my-lg-0">
                    <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Enter a film name ..." aria-label="Search">
                    <router-link  :to="'/search?s=' + search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</div>
</template>


<script>
    export default {
        name:"home",
        data(){
            return{
                search:null,
            }
        }
    }
    
</script>
<style>
    .jumbotron{
        background-color:transparent !important
    }
    .searchBar{
        display:none;
    }
</style>
