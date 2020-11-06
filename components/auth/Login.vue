<template>
    <div :class="['login', { user: !isAdminDomain }]">
        <div class="koros__title">
            <img
                    class="login__img"
                    src="/img/login_logo.svg"
            />
        </div>
        <div class="login__form">
            <div class="title">
                Log In
            </div>
            <div class="form-group">
                <input
                    type="text"
                    placeholder="Email"
                    class="form-input email"
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
                    placeholder="Password"
                    class="form-input password"
                    @keyup.enter="handleSubmit"
                    v-model="password"
                    name="password"
                    autocomplete="off"
                    autocapitalize="off"
                />
            </div>
            <router-link
                    :to="{ name: 'forgotPassword' }"
                    class="forgot-password"
            >
                Forgot your password?
            </router-link>
            <div class="button-group">
                <button
                    @click="handleSubmit"
                    class="submit"
                    :disabled="status.loggingIn"
                >
                    <span v-if="status.loggingIn"
                    ><i class="fa fa-spinner fa-pulse"></i
                    ></span>
                    Log In
                </button>
                <button
                    @click="handleloginApple"
                    v-if="!isAdminDomain"
                    class="social apple full-screen"
                >
                    <i class="fab fa-apple"></i>
                </button>
                <button
                        v-if="!isAdminDomain"
                        class="social google full-screen"
                >
                    <i class="fab fa-google-plus-g"></i>
                </button>
            </div>
            <hr
                    v-if="!isAdminDomain"
                    class="full-screen"
            />
            <div
                    class="divider"
                    v-if="!isAdminDomain"
            >
                <hr />
                <span>OR</span>
                <hr />
            </div>
            <div class="mobile-social">
                <button
                        v-if="!isAdminDomain"
                        class="social apple"
                        @click="handleloginApple"
                >
                    <i class="fab fa-apple"></i>
                </button>
                <button
                        v-if="!isAdminDomain"
                        class="social google"
                >
                    <i class="fab fa-google-plus-g"></i>
                </button>
            </div>
            <div
                    v-if="!isAdminDomain"
                    class="sign-up"
            >
                Not a member?
                <router-link :to="{ name: 'register' }">Sign Up</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                email: '',
                password: '',
                newWindow: null
            };
        },
        created() {
            let back = document.querySelector('.back');
            if (back) {
                back.className = 'back';
            }
        },
        computed: {
            ...mapState({
                status: (state) => state.account.status,
                isAdminDomain: (state) => state.account.isAdminDomain
            })
        },
        methods: {
            ...mapActions('account', ['login', 'loginApple']),
            ...mapActions('animation', ['play']),
            ...mapMutations('account', ['loginRequest']),
            forgotPasswordFunc(e) {
                this.$router.push({ name: 'forgotPassword' });
            },
            handleSubmit(e) {
                let className = 'submit';
                let clickClassName = 'clicked';
                this.play({ className, clickClassName });

                const { email, password } = this;
                this.login({ email, password });
            },
            handleloginApple() {
                this.loginRequest()
                this.newWindow = this.openWindow('/oauth/apple?device_os=web');
                this.newWindow.addEventListener('message', this.onMessage, false);
            },
            onMessage(e) {
                if (e.origin !== window.origin || e.data === '') {
                    return;
                }
                this.loginApple(e.data);
                this.newWindow.removeEventListener('message', this.onMessage);
                this.newWindow.close();
            },
            openWindow(url, title, options = {}) {
                if (typeof url === 'object') {
                    options = url;
                    url = '';
                }

                options = { url, title, width: 600, height: 720, ...options };

                const dualScreenLeft =
                    window.screenLeft !== undefined
                        ? window.screenLeft
                        : window.screen.left;
                const dualScreenTop =
                    window.screenTop !== undefined ? window.screenTop : window.screen.top;
                const width =
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    window.screen.width;
                const height =
                    window.innerHeight ||
                    document.documentElement.clientHeight ||
                    window.screen.height;

                options.left = width / 2 - options.width / 2 + dualScreenLeft;
                options.top = height / 2 - options.height / 2 + dualScreenTop;

                const optionsStr = Object.keys(options)
                    .reduce((acc, key) => {
                        acc.push(`${key}=${options[key]}`);
                        return acc;
                    }, [])
                    .join(',');

                const newWindow = window.open(url, title, optionsStr);

                if (window.focus) {
                    newWindow.focus();
                }

                return newWindow;
            }
        }
    };
</script>
