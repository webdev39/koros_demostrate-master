<template>
    <div class="user-type" ref="userType">
        {{rolesMap[data.role_id]}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rolesMap: {
                    1: 'Admin',
                    2: 'Regular user',
                    3: 'Instructor'
                }
            };
        },
        props: ['data', 'index', 'column'],
        watch: {
            data: function (val) {
                this.setColor(val.role_id);
            }
        },
        mounted() {
            this.setColor(this.data.role_id);
        },
        methods: {
            setColor(data) {
                switch (data) {
                    case 1:
                        this.$refs.userType.className = 'user-type admin';
                        break;
                    case 2:
                        this.$refs.userType.className = 'user-type user';
                        break;
                    case 3:
                        this.$refs.userType.className = 'user-type instructor';
                        break;
                }
            }
        }
    }
</script>