<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div>
    <v-container>
        <v-layout align-center justify-center column>
            <v-card
                    title="Simple Table"
                    text="Here is a subtitle for this table"
                    class="scroll-y"
                    height="500px"
                    align-center
                    justify-center2
            >
                <v-data-table
                        :headers="headers"
                        :items="activities" 
                        hide-actions
                >
                    <template
                            slot="headerCell"
                            slot-scope="{ header }"
                    >
        <span class="subheading font-weight-light text-success text--darken-3"
              v-text="header.text"
        ></span>
                    </template>
                    <template
                            slot="items"
                            slot-scope="{ item }"
                    >
                        <td>{{ item.comment }}</td>
                        <td>{{ item.rating }}</td>
                        <td>{{ item.filmtitle}}</td>
                        <td class="justify-center layout px-0">
                            <!-- <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                            >
                                edit
                            </v-icon> -->
                            <v-icon
                                    small
                                    @click="deleteItem(item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                </v-data-table>

            </v-card>

            <!-- <v-btn color="primary" dark class="mt-2" @click="addItem">New Activity</v-btn> -->

        </v-layout>
        <v-dialog
            v-model="dataDialog"
            width="500"
    >
        <v-card>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field @change="setComment" v-model="selectedItem.comment" label="Comment"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field @change="setRating" v-model="selectedItem.rating" label="Rating"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field @change="setImdbID" v-model="selectedItem.imdbid" label="Title"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="hideDataDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="addOrEdit">
                    <v-progress-circular v-show="this.pending === true" indeterminate
                                         color="white"></v-progress-circular>
                    <div v-show="this.pending === false">Save</div>
                </v-btn>
            </v-card-actions>   
        </v-card>
    </v-dialog>
        <v-dialog
                v-model="deleteDialog"
                width="500">

            <v-card>
                <v-card-text>
                    Are you sure that you want delete this comment?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="hideDeleteDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="deleteActivity">
                        <v-progress-circular v-show="this.pending === true" indeterminate
                                             color="white"></v-progress-circular>
                        <div v-show="this.pending === false">Delete</div>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
    </div>
</template>


<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        name: "activity",
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
                addOrEdit: 'activity/addOrEdit',
                deleteActivity: 'activity/deleteActivity'
            }),
            editItem (item) {
                this.setSelectedItem(item);
                this.setEditMode(true);
                this.showDataDialog();
            },
            addItem () {
                this.setSelectedItem ({comment: '',rating: '',imdbID:'', filmtitle:''}) ;
                this.setEditMode(false);
                this.showDataDialog();
            },
            deleteItem (item) {
                this.setSelectedItem(item);
                this.showDeleteDialog()
            },
        },
        mounted: function () {
            this.readActivities();
        },
        data(){
            return {
                title:null,
                headers: [
                    {
                        text: 'Comment',
                        align: 'center',
                        value: 'comment'
                    },
                    {
                        text: 'Rating', 
                        value: 'rating',
                        align: 'center'
                    },
                    {
                        text: 'Title', 
                        value: 'title',
                        align: 'center'
                    }
                ],
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
