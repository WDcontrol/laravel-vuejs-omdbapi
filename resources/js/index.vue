<template>
    <div  id="inspire" >
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" integrity="sha256-PF6MatZtiJ8/c9O9HQ8uSUXr++R9KBYu4gbNG5511WE=" crossorigin="anonymous" />
        <Header></Header>
            <router-view>
            </router-view>
        <Footer></Footer>
    </div>
</template>

<script src="./ui/ressources/js/bootstrap.min.js"></script>
<script>

    import Header from "./ui/includes/header";
    import Footer from "./ui/includes/footer";
    
    export default {
        components:{
            Header,
            Footer
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style lang="css" scoped>
    @import "./ui/ressources/css/bootstrap.min.css";
</style>

