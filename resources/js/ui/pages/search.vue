<template>
<div>
    <div class="container">
        <div class="row">
            <h1>Search results for : " {{search}} "</h1>
                <div v-for="item in searchResult.Search" :key="item.Search" class="e-card card col-md-10">
                    <router-link  :to="'/film?i=' + item.imdbID + '&t=' + item.Title ">
                        <div class="card-body">
                            <h5 class="card-title">{{item.Title}}</h5>                    
                            <p class="card-text">{{item.Year}} ({{item.Type}})</p>    
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchResult: null,
            search: this.$route.query.s
        }
    },
    mounted(){
            this.doSearch();
        },
    methods: {
        doSearch : function(){
            this.search = this.$route.query.s
            axios
            .get('http://www.omdbapi.com/?apikey=2b9f7c4&s=' + this.search + "&page=1")
            .then(
                response => (
                    this.searchResult = response.data
                    )
                )
        }
    },
    watch: {
        '$route.query.s'() {
            this.doSearch();
            console.log("test")
        }
    }
}
</script>

<style scoped>
    .e-card :hover{
        color:darkgray;
        cursor: pointer;
    }


</style>