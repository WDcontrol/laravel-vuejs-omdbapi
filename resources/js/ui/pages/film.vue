<template>
    <div class="container">
            <div v-if="filmResult.Title != undefined" class="row">
                <div class="col-md-4">
                    <img class="img-fluid" :src="filmResult.Poster" alt="">
                </div>
                <div class="col-md-8">
                    <h3>{{filmResult.Title}} <small>({{filmResult.Year}})</small></h3>
                    <p>{{filmResult.Plot}}</p>
                    <div class="card" v-if="logged">
                        <div class="card-header">Leave a Comment</div>
                        <div class="card-body">
                            <div class="form-group">
                                <textarea maxlength="200" v-model="selectedItem.comment" class="form-control" rows="3"></textarea>
                            </div>
                            <div class="rating" style="width: 20rem">
                                <input v-model="selectedItem.rating" id="rating-5" type="radio" name="rating" value="5"/><label for="rating-5"><i class="fas fa-star"></i></label>
                                <input v-model="selectedItem.rating" id="rating-4" type="radio" name="rating" value="4"/><label for="rating-4"><i class="fas fa-star"></i></label>
                                <input v-model="selectedItem.rating" id="rating-3" type="radio" name="rating" value="3"/><label for="rating-3"><i class="fas fa-star"></i></label>
                                <input v-model="selectedItem.rating" id="rating-2" type="radio" name="rating" value="2"/><label for="rating-2"><i class="fas fa-star"></i></label>
                                <input v-model="selectedItem.rating" id="rating-1" type="radio" name="rating" value="1"/><label for="rating-1"><i class="fas fa-star"></i></label>
                            </div>
                            <button @click="addItem" class=" btn btn-primary">Submit</button>
                            
                        </div>
                    </div>
                    <div v-else class="card">
                        <div class="card-header">Leave a Comment</div>
                        <router-link to="/login">
                        <div class="card-body">
                            You have to be logged in to add a comment
                        </div>
                        </router-link>
                    </div>
                    <br>
                    <div v-for="item in activities" :key="item" class="media mb-4">
                        <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                        <div class="media-body">
                            <h5 class="mt-0">user {{item.user_id}}</h5>
                            <textarea maxlength="200" class="form-control comment" rows="3"  v-model="item.comment" disabled></textarea>
                            <div class="rating" style="width: 20rem">
                                <span :class="{checked: item.rating>=5}" class="fa fa-star"></span>
                                <span :class="{checked: item.rating>=4}" class="fa fa-star"></span>
                                <span :class="{checked: item.rating>=3}" class="fa fa-star"></span>
                                <span :class="{checked: item.rating>=2}" class="fa fa-star"></span>
                                <span :class="{checked: item.rating>=1}" class="fa fa-star"></span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

            <div v-else class="row justify-content-center">
                <h1 class=" justify-content-center" >Film not found</h1>      
            </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        data(){
            return{
                filmResult: null,
                filmId: this.$route.query.i,
                filmTitle: this.$route.query.t,
                rating: null,
                comment: null,
                logged:this.$store.getters['login/isLoggedIn']
            }
        }
        ,
        mounted(){
                this.getFilmInfo();
                this.selectedItem.imdbID = this.filmId; //post
                this.selectedItem.imdbid = this.filmId; //read
                this.selectedItem.filmtitle = this.filmTitle; //read
                this.readActivitiesImdb();
            },
        methods: {
            ...mapMutations({
                setComment: 'activity/setComment',
                setRating: 'activity/setRating',
                setImdbID: 'activity/setImdbID',
                setSelectedItem: 'activity/setSelectedItem',
                setEditMode: 'activity/setEditMode',
                setPending: 'activity/setPending',
                hideDeleteDialog: 'activity/hideDeleteDialog',
                showDeleteDialog: 'activity/showDeleteDialog',
                hideDataDialog: 'activity/hideDataDialog',
                showDataDialog: 'activity/showDataDialog'

            }),
            ...mapActions({
                readActivities: 'activity/readActivities',
                readActivitiesImdb: 'activity/readActivitiesImdb',
                addOrEdit: 'activity/addOrEdit',
                deleteActivity: 'activity/deleteActivity'
            }),
            addItem() {
                this.addOrEdit()
            },
            getFilmInfo : function(){
                axios
                .get('http://www.omdbapi.com/?apikey=2b9f7c4&i=' + this.filmId)
                .then(
                    response => (
                        this.filmResult = response.data
                        )
                    )
            }
        },
        watch: {
            '$route.query.i'() {
                this.getFilmInfo();
            },
            '$route.query.t'() {
                this.getFilmInfo();
            }
        },
        computed: {
            ...mapState({
                activities: state => state.activity.activities,
                pending: state => state.activity.pending,
                selectedItem: state => state.activity.selectedItem,
                isEditMode: state => state.activity.isEditMode,
                dataDialog: state => state.activity.dataDialog,
                deleteDialog: state => state.activity.deleteDialog
            })
        }
    }
</script>
<style scoped>
.comment{
    resize:none;
    overflow: hidden;
    width:100%;
    background-color:transparent !important;
    border:none !important;
}
.rating {
	direction: rtl;
	unicode-bidi: bidi-override;
	color: #ddd; /* Personal choice */
}
.rating input {
	display: none;
}
.rating label:hover,
.rating label:hover ~ label,
.rating input:checked + label,
.rating input:checked + label ~ label {
	color: #ffc107; /* Personal color choice. Lifted from Bootstrap 4 */
}
.checked {
  color: #ffc107;
}
</style>
