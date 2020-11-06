<template>
    <div class="invite_view">
        <BaseProfileBlock :firstName="user.first_name" :lastName="user.last_name"
                          :city="user.city?user.city.name:''" :photo="user.photo">
            <div class="topRight" slot="topRight">
                <a @click="openEdit" class="block__edit_link" href="#">
                    <img src="/img/icons/pen.svg"/>
                </a>
                <div slot="topRight" @click="closeModal" class="close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <p class="title" slot="title">User Profile</p>
            <div slot="infoBlocks">
                <div class="block__info">
                    <div class="row">
                        <div class="param">
                            Email
                        </div>
                        <div class="value">
                            {{ user.email }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Birthday
                        </div>
                        <div class="value">
                            {{ formatDateUSA(new Date(user.dob)) }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Gender
                        </div>
                        <div class="value">
                            {{ user.gender?user.gender.name:'' }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Proficiency Level
                        </div>
                        <div class="value" style="color: #ff9f00;">
                            Advanced
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Last Login
                        </div>
                        <div class="value">
                            {{ (user.last_token ? formatDateUSA(new Date(user.last_token.created_at)) : '') }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Login last 30 days
                        </div>
                        <div class="value">
                            {{ user.login_last_30_days }}
                        </div>
                    </div>

                    <div class="row">
                        <div class="param">
                            Join Status
                        </div>
                        <div class="value">
                            {{ user.join_status }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Subscription Status
                        </div>
                        <div class="value">
                            Montly Since 11/12/2019
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Life Time Value (LTV)
                        </div>
                        <div class="value">
                            $152
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Live Classes Taken
                        </div>
                        <div class="value">
                            Integer
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Recorded Classes Taken
                        </div>
                        <div class="value">
                            Integer
                        </div>
                    </div>
                </div>
            </div>
            <div slot="bottomBlock">
                <BaseButton class="deactivate"
                            :text="user['deactivate']==1?'Activate':'Deactivate'"
                            @clicked="deactivateFunc"/>
                <BaseButton class="remove" text="Remove" @clicked="deleteFunc"/>
            </div>
        </BaseProfileBlock>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {formatDateUSA} from '../../../../helpers';
    import DeletePopup from '../table/DeletePopup';

    export default {
        data() {
            return {
                user: ''
            };
        },
        props: {
            userId: {
                default: ''
            },
        },
        created() {
            let curObj = this;
            this.get(this.userId).then(function (user) {
                curObj.user = user;
            });
        },
        methods: {
            ...mapActions('users', ['get', 'deactivateOrActivate']),
            closeModal() {
                this.$emit('close')
            },
            formatDateUSA(date) {
                return formatDateUSA(date);
            },
            deactivateFunc() {
                this.deactivateOrActivate(this.user.id).then(
                    (res) => {
                        this.get(this.userId).then(
                            (user) => {
                                this.user = user;
                            });
                    });
            },
            async deleteFunc() {
                this.$modal.show(DeletePopup, {userId: this.user.id}, {
                    width: 350,
                    height: 262,
                    classes: 'add-user-modal',
                    scrollable: true,
                    clickToClose: false
                });
                this.$emit('close');
            },
            openEdit() {
                this.$root.$emit('openeditmodal', {
                    roleId: 2,
                    userId: this.user.id
                });
                this.$emit('close');
            }
        }
    }
</script>
