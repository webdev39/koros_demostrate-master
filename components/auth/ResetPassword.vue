<template>
    <div class="reset-password">
        <div class="koros__title">
            <img class="login__img" src="/img/login_logo.svg">
        </div>
        <div class="reset-password__form">
            <div class="title">
                Restore password
            </div>
            <div class="form">
                <div class="form-group">
                    <input type="password" placeholder="New Password" class="form-input password"
                        v-model="password" name="password"
                        autocomplete="off" autocapitalize="off"/>
                    <input type="password" placeholder="Confirm Password" class="form-input password"
                        v-model="password2" name="password2"
                        autocomplete="off" autocapitalize="off"/>
                </div>
            </div>
            <button
              @click="restore"
              class="submit"
              :disabled="status.loading"
              >
              <span v-if="status.loading"
              ><i class="fa fa-spinner fa-pulse"></i
              ></span>
                Restore
            </button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions  } from 'vuex'
    import { validateFields, removeValidationsMessages } from '../../helpers'

    export default {
        data() {
            return {
                password: '',
                password2: ''
            };
        },
        computed: {
          ...mapState({ 
            status: (state) => state.account.status
          })
        },
        methods: {
            ...mapActions('account', ['resetPassword']),
            ...mapActions('animation', ['play']),
            restore(e) {
                let className = 'submit';
                let clickClassName = 'clicked';
                this.play({className, clickClassName});

                if (this.password !== this.password2) {
                    removeValidationsMessages();
                    validateFields({
                        password: ['Passwords should be the same']
                    });
                    return;
                }

                const password = this.password;
                const email = localStorage.getItem('email');
                const token = this.$route.query.token;
                this.resetPassword({password, email, token})
            }
        }
    }
</script>