<template>
    <div class="users__name avatar" @click="showView">
        <div class="users__wrap">
            <BaseAvatar class="users__img" :url='data.photo' width="42px" height="42px" ref="avatar"/>
        </div>
        {{data.first_name}} {{data.last_name}}
    </div>
</template>

<script>
    import AdminView from '../invite/AdminView';
    import UserView from '../invite/UserView';
    import InstructorView from '../invite/InstructorView';

    export default {
        props: ['data', 'index', 'column'],
        methods: {
            showView() {
                let userId = this.data['id'];
                let roleId = this.data['role_id'];
                let view = '';
                let width = 508;
                switch (roleId) {
                    case 1:
                        view = AdminView;
                        break;
                    case 2:
                        view = UserView;
                        break;
                    case 3:
                        view = InstructorView;
                        width = 900;
                        break;
                }

                this.$modal.show(view, {
                    userId: userId
                }, {
                    width: width,
                    height: 'auto',
                    classes: 'add-user-modal',
                    scrollable: true,
                    clickToClose: false
                });
            }
        }
    }
</script>