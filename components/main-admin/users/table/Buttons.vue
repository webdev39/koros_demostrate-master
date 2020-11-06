<template>
    <div class="buttons">
        <img v-on="{ click: data['status']!='invited' && userId!=data['id']? deactivateOrActivateFunc : function(){} }"
             :class="{'disabled':data['status']=='invited'}"
             class="deactivate"
             :src="data['deactivate']?'/img/icons/activate.svg':'/img/icons/stop.svg'"/>
        <img @click="editModal" class="edit" src="/img/icons/edit.svg"/>
        <img :class="{'disabled':data['status']=='invited'}"
             v-on="{ click: data['status']!='invited' && userId!=data['id']? deleteFunc : function(){} }"
             class="delete" src="/img/icons/remove.svg"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import EditAdmin from '../invite/Edit/EditAdmin';
    import EditUser from '../invite/Edit/EditUser';
    import EditInstructor from '../invite/Edit/EditInstructor';
    import DeletePopup from './DeletePopup';

    export default {
        props: ['data', 'index', 'column'],
        computed: {
            ...mapState({
                userId: (state) => state.account.user.id
            }),
        },
        methods: {
            ...mapActions('users', ['getAll', 'deactivateOrActivate']),
            deactivateOrActivateFunc() {
                let curObj = this;
                this.deactivateOrActivate(this.data.id).then(function () {
                    curObj.$root.$emit('removeuser');
                });
            },
            editModal() {
                let userId = this.data['id'];
                let roleId = this.data['role_id'];
                let view = '';
                let width = 508;
                let options = {
                    userId: userId
                };
                switch (roleId) {
                    case 1:
                        view = EditAdmin;
                        break;
                    case 2:
                        view = EditUser;
                        break;
                    case 3:
                        view = EditInstructor;
                        width = 900;
                        break;
                }
                this.$modal.show(view, options, {
                    width: width,
                    height: 'auto',
                    classes: 'add-user-modal',
                    scrollable: true,
                    clickToClose: false
                });
            },
            async deleteFunc() {
                this.$modal.show(DeletePopup, {userId: this.data.id}, {
                    width: 350,
                    height: 262,
                    classes: 'add-user-modal',
                    scrollable: true,
                    clickToClose: false
                });
            },
        }
    }
</script>