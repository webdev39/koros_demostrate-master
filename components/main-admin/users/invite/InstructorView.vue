<template>
    <div class="invite_view">
        <InstructorProfileBlock
                :firstName="user.first_name"
                :lastName="user.last_name"
                :photo="user.photo"
                :city="user.city?user.city.name:''"
                :firstNameSubprofile="user.subprofile?user.subprofile.first_name:''"
                :lastNameSubprofile="user.subprofile?user.subprofile.last_name:''"
                :photoSubprofile="user.subprofile?user.subprofile.photo:''"
                :citySubprofile="user.city?user.city.name:''"
                :hasSubprofile="user.subprofile"
        >
            <div class="topRight" slot="topRight">
                <a @click="openEdit" class="block__edit_link" href="#">
                    <img src="/img/icons/pen.svg"/>
                </a>
                <div slot="topRight" @click="closeModal" class="close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <p class="title" slot="title">Instructor Profile</p>
            <div slot="leftInfoBlocks">
                <div class="block__info">
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
                </div>
            </div>
            <div slot="rightInfoBlocks">
                <div class="block__info">
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
                </div>
            </div>
            <div slot="infoBlocks" class="block__info common">
                <div class="row">
                    <div class="param">
                        Email
                    </div>
                    <div class="value">
                        {{ user.email }}
                    </div>
                </div>
                <div class="row row_bio">
                    <div class="param">
                        Bio
                    </div>
                    <div class="value">
                        {{ user.bio }}
                    </div>
                </div>
            </div>
            <div slot="bottomBlock">
                <BaseButton class="deactivate" :text="user['deactivate']==1?'Activate':'Deactivate'"
                            @clicked="deactivateFunc"/>
                <BaseButton class="remove" text="Remove" @clicked="deleteFunc"/>
            </div>
        </InstructorProfileBlock>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {formatDateUSA} from '../../../../helpers';
    import Vue from 'vue';
    import DeletePopup from "../table/DeletePopup";

    Vue.component('InstructorProfileBlock', require('../blocks/InstructorProfileBlock.vue').default);

    export default {
        data() {
            return {
                user: ''
            };
        },
        props: {
            userId: {
                default: ''
            }
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
                    roleId: 3,
                    userId: this.user.id
                });
                this.$emit('close');
            }
        }
    }
</script>
