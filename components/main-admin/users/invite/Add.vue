<template>
    <div class="user-add">
        <div @click="closeModal" class="close">
            <i class="fas fa-times"></i>
        </div>
        <div class="title">Add User</div>
        <div class="user-add__info">
            <div class="fields">
                <div v-if="isInstructor()" class="input__wrap">
                    <div class="label">Type of User</div>
                    <div class="form-group">
                        <div class="select-group">
                            <base-dict-select @input="selectRole" :options="roleList" v-model="role" name="role"/>
                        </div>
                    </div>
                </div>
                <div v-if="isInstructor()" class="input__wrap">
                    <div class="form-group form-group_radio">
                        <input type="radio" id="single" value="single" v-model="accountType">
                        <label for="single">Single</label>
                        <input type="radio" id="couple" value="couple" v-model="accountType">
                        <label for="couple">Couple</label>
                    </div>
                </div>
            </div>
            <div class="photo__wrap">
                <div class="label">Profile Photo</div>
                <BaseAvatar width="104px" height="104px" :haveUpload="true" ref="avatar"/>
                <BaseAvatar v-if="accountType==='couple'" class="avatar_dublicate" width="104px" height="104px"
                            :haveUpload="true" ref="avatarSubprofile"/>
            </div>
            <div class="fields">
                <div class="name_wrap" v-if="accountType!=='couple'">
                    <div class="input__wrap">
                        <div class="label">First name</div>
                        <div class="form-group">
                            <input v-model="firstName" type="text" autocomplete="off"
                                   class="form-input input__first_name" name="first_name">
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Last name</div>
                        <div class="form-group">
                            <input v-model="lastName" type="text" autocomplete="off"
                                   class="form-input" name="last_name">
                        </div>
                    </div>
                </div>
                <div v-else class="name_wrap dublicate">
                    <div class="dublicate__block left">
                        <div class="input__wrap">
                            <div class="label">First name</div>
                            <div class="form-group">
                                <input v-model="firstName" type="text" autocomplete="off"
                                       class="form-input input__first_name" name="first_name">
                            </div>
                        </div>
                        <div class="input__wrap">
                            <div class="label">Last name</div>
                            <div class="form-group">
                                <input v-model="lastName" type="text" autocomplete="off"
                                       class="form-input" name="last_name">
                            </div>
                        </div>
                    </div>
                    <div class="dublicate__block right">
                        <div class="input__wrap">
                            <div class="form-group">
                                <input v-model="firstNameSubprofile" type="text" autocomplete="off"
                                       class="form-input input__first_name" name="subprofile_first_name">
                            </div>
                        </div>
                        <div class="input__wrap">
                            <div class="form-group">
                                <input v-model="lastNameSubprofile" type="text" autocomplete="off"
                                       class="form-input" name="subprofile_last_name">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isInstructor()" class="input__wrap">
                    <div class="label">Type of User</div>
                    <div class="form-group">
                        <div class="select-group">
                            <base-dict-select @input="selectRole" :options="roleList" v-model="role" name="role"/>
                        </div>
                    </div>
                </div>
                <div class="input__wrap">
                    <div class="label">Email</div>
                    <div class="form-group">
                        <input v-model="email" type="text" autocomplete="off"
                               class="form-input" name="email">
                    </div>
                </div>
                <div v-if="isInstructor()" class="input__wrap bio">
                    <div class="label">Bio</div>
                    <div class="form-group">
                        <textarea v-model="bio" class="form-input" name="bio" cols="45"/>
                    </div>
                </div>
            </div>
        </div>
        <button @click="addUser" class="add" v-bind:class="{ dublicate: accountType=='couple' }">
            Invite
        </button>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        data() {
            return {
                firstName: '',
                lastName: '',

                firstNameSubprofile: '',
                lastNameSubprofile: '',

                role: {id: 1, name: 'Admin'},
                roleListArr: {
                    1: 'Admin',
                    3: 'Instructor'
                },
                roleList: [
                    {id: 1, name: 'Admin'},
                    {id: 3, name: 'Instructor'}
                ],

                email: '',
                bio: '',
                accountType: 'single',
            };
        },
        methods: {
            ...mapActions('users', ['add']),
            async addUser() {
                const {firstName, lastName, role, email, firstNameSubprofile, lastNameSubprofile} = this;

                const photo = this.$refs.avatar.photo;
                let photoSubprofile = '';
                if (this.$refs.avatarSubprofile) {
                    photoSubprofile = this.$refs.avatarSubprofile.photo;
                }
                try {
                    var data = await this.add({
                        firstName, lastName, role: role.id, email, photo,
                        firstNameSubprofile, lastNameSubprofile, photoSubprofile
                    });
                    console.log('success. profile add');
                } catch (e) {
                    console.log('error', e);
                    return;
                }
                this.$emit('close');
                this.$root.$emit('removeuser');
            },
            selectRole(value) {
                if (value.id == 1) {
                    this.accountType = 'single';
                }
                this.role = value;
            },
            closeModal() {
                this.$emit('close');
            },
            isInstructor() {
                return this.role.id == 3;
            }
        }
    }
</script>
