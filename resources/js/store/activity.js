import {fetchReadActivitiesImdb ,fetchCreateActivity, fetchDeleteActivity, fetchReadActivities, fetchUpdateActivity} from "../data/api";

const state = {
    activities: [],
    pending: false,
    selectedItem: {rating: null, comment: null, imdbID: null, filmtitle: null},
    isEditMode: false,
    dataDialog: false,
    deleteDialog: false
};

// getters
const getters = {};

// actions
const actions = {
    readActivitiesImdb({commit,dispatch}){
        commit('fetchingActivities');
        fetchReadActivitiesImdb().then(
            jsonResponse => {
                commit('setActivities',jsonResponse.data.data)
            }
        )
    },
    readActivities({commit}) {
        commit('fetchingActivities');
        fetchReadActivities().then(jsonResponse => {
            commit('setActivities', jsonResponse.data.data)
        });
    },
    addOrEdit({state, commit, dispatch}) {
        if(state.isEditMode === true) {
            dispatch('edit');
        } else {
            dispatch('add');
        }
    },
    deleteActivity({commit,dispatch}) {
        commit('setPending',true);
        fetchDeleteActivity().then(()=> {
            commit('setPending',false);
            commit('hideDeleteDialog');
            dispatch('readActivities');
        })
    },
    add({commit,dispatch}) {
        commit('setPending',true);
        fetchCreateActivity().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readActivitiesImdb');
        })
    },
    edit({commit,dispatch}) {
        commit('setPending',true);
        fetchUpdateActivity().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readActivities');
        })
    }
};

// mutations
const mutations = {
    ['fetchingActivities'](state) {
        state.pending = true;
    },
    ['setActivities'](state, activities) {
        state.pending = false;
        state.activities = activities;
    },
    ['setSelectedItem'](state, selectedItem) {
        state.selectedItem = selectedItem;
    },
    ['setRating'](state, rating) {
        state.selectedItem.rating = rating;
    },
    ['setComment'](state, comment) {
        state.selectedItem.comment = comment;
    },
    ['setImdbID'](state, imdbID) {
        state.selectedItem.imdbID = imdbID;
    },
    ['setFilmtitle'](state, filmtitle) {
        state.selectedItem.filmtitle = filmtitle;
    },
    ['setEditMode'](state, editMode) {
        state.isEditMode = editMode;
    },
    ['setPending'](state, pending) {
        state.pending = pending;
    },
    ['hideDeleteDialog'](state) {
        state.deleteDialog = false
    },
    ['showDeleteDialog'](state) {
        state.deleteDialog = true
    },
    ['hideDataDialog'](state) {
        state.dataDialog = false
    },
    ['showDataDialog'](state) {
        state.dataDialog = true
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
