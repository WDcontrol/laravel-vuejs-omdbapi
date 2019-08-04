<template>
    <div>
        <br>
        <div class="container justify-content-center">
            <div class="row justify-content-center">
            <div class="card justify-content-center">
                <div class="card-body">
                    <v-layout column>
                        <v-radio-group @change="toggleMode" v-model="mode" row>
                            <v-radio label="Login" value="login"></v-radio>
                            <v-radio label="Sign Up" value="signUp"></v-radio>
                        </v-radio-group>
                        <v-img height="250px" width="250px" style="border-radius: 50%;"
                            src="https://pbs.twimg.com/profile_images/975742647200550914/ZkmFKUq__400x400.jpg">
                            <template v-slot:placeholder>
                                <v-layout
                                        fill-height
                                        align-center
                                        justify-center
                                        ma-0
                                >
                                    <v-progress-circular indeterminate color="black darken-5"></v-progress-circular>
                                </v-layout>
                            </template>
                        </v-img>
                        <v-form 
                                ref="form"
                                lazy-validation
                                id="login_form"
                                method="POST"
                                @submit.prevent="loginOrSignUp"
                        >

                            <v-text-field
                                    required
                                    :value="username"
                                    @input="setUsername"
                                    label="Username"
                                    text-align="right"
                                    name="username"
                                    data-vv-name="username"

                            ></v-text-field>

                            <v-text-field
                                    required
                                    :value="password"
                                    @input="setPassword"
                                    @click:append="togglePassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    label="Password"
                                    data-vv-name="password"
                                    name="password"
                                    text-align="right"
                                    ></v-text-field>

                                <v-btn v-if="password && username != '' " type="submit" form="login_form">
                                
                                <div>{{mode=== 'login'? 'Login' : 'signUp'}}</div>
                            </v-btn>
                        </v-form>

                    </v-layout>
            </div></div>
        </div> 
            </div>
    </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'
    import {mapActions, mapMutations, mapState} from "vuex";
    import router from '../../router';

    export default {
        name: "login",
        data(){
            return{
            }
        },
        methods:{
            ...mapMutations({
                setUsername: 'login/setUsername',
                setPassword: 'login/setPassword',
                togglePassword: 'login/togglePassword',
                loginMode: 'login/loginMode',
                signUpMode: 'login/signUpMode',
                toggleMode: 'login/toggleMode'
            }),
            ...mapActions({
                loginOrSignUp: 'login/loginOrSignUp'
            }),
        },
        computed: {
            ...mapState({
                isLoggedIn: state => state.login.isLoggedIn,
                pending: state => state.login.pending,
                showPassword: state => state.login.showPassword,
                password: state => state.login.password,
                username: state => state.login.username,
                mode: state => state.login.mode

            })
        }
    }
</script>

<style scoped>

</style>
