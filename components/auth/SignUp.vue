<template>
    <div :class="['login', { user: !isAdmin }]">
        <div class="koros__title">
            <img class="login__img" src="/img/login_logo.svg"/>
        </div>
        <div class="login__form">
            <div class="title">
                Sign Up
            </div>
            <div class="form-group">
                <input
                        type="text"
                        placeholder="Email"
                        class="form-input form-input_sign-up email"
                        v-model="email"
                        name="email"
                        @keyup.enter="handleSubmit"
                        autocomplete="off"
                        autocapitalize="off"
                />
            </div>
            <div class="form-group">
                <input
                        type="password"
                        placeholder="New Password"
                        class="form-input password"
                        @keyup.enter="handleSubmit"
                        v-model="newPassword"
                        name="password"
                        autocomplete="off"
                        autocapitalize="off"
                />
            </div>
            <div class="form-group">
                <input
                        type="password"
                        placeholder="Confirm Password"
                        class="form-input password"
                        @keyup.enter="handleSubmit"
                        v-model="confirmPassword"
                        name="confirmPassword"
                        autocomplete="off"
                        autocapitalize="off"
                />
            </div>
            <div class="button-group">
                <button @click="handleSubmit" class="submit" :disabled="status.loggingIn">
                    <span v-if="status.loggingIn">
                        <i class="fa fa-spinner fa-pulse"></i>
                    </span>
                    Sign Up
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        data() {
            return {
                email: this.$route.query.email,
                newPassword: '',
                confirmPassword: ''
            };
        },
        mounted() {
            console.log('Component mounted.');
        },
        computed: mapState({
            status: (state) => state.account.status,
            isAdmin: (state) => state.account.isAdmin
        }),
        created() {
        },
        methods: {
            ...mapActions('account', ['signUp']),
            ...mapActions('animation', ['play']),
            handleSubmit(e) {
                let className = 'submit';
                let clickClassName = 'clicked';
                this.play({className, clickClassName});

                const {email, newPassword, confirmPassword} = this;
                this.signUp({email, newPassword, confirmPassword});
            }
        }
    };
</script>
