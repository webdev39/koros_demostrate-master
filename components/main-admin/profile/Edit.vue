<template>
    <div class="profile">
        <p class="profile__header">
            Edit Profile
        </p>
        <div class="block block_edit">
            <BaseAvatar width="103px" height="103px" :url="user.photo" :haveUpload="true" ref="avatar"/>
            <div class="block__info">
                <div class="title">Basic Information</div>
                <div class="block__fields">
                    <div class="block__left">
                        <div class="row_edit first">
                            <div class="param">
                                First name
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input type="text" placeholder="First name"
                                           v-model="user.first_name" @keydown="validateText"
                                           class="form-input" name="first_name"
                                           autocomplete="off" autocapitalize="off"/>
                                </div>
                            </div>
                        </div>
                        <div class="row_edit">
                            <div class="param">
                                Birthday
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input type="text" placeholder="Birthday"
                                           class="form-input" name="dob"
                                           v-model="dobUSA" id="birthday"
                                           autocomplete="off" autocapitalize="off"/>
                                </div>
                            </div>
                        </div>
                        <div class="row_edit">
                            <div class="param">
                                Gender
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <div class="select-group">
                                        <base-dict-select name="gender" :options="gendersList" v-model="gender" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block__right">
                        <div class="row_edit first">
                            <div class="param">
                                Last name
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input type="text" placeholder="Last name"
                                           v-model="user.last_name" @keydown="validateText"
                                           class="form-input" name="last_name"
                                           autocomplete="off" autocapitalize="off"/>
                                </div>
                            </div>
                        </div>
                        <BaseLocationSelect
                                :initialState="state" :initialCity="location"
                                @selectState="stateSelected" @selectCity="citySelected"
                        >
                        </BaseLocationSelect>
                    </div>
                </div>
            </div>
            <div class="block__info">
                <div class="title">Change your password</div>
                <div class="block__fields">
                    <div class="block__left">
                        <div class="row_edit first">
                            <div class="param">
                                Current password
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input type="password" placeholder="Current password"
                                           class="form-input" name="old_password"
                                           v-model="currentPassword"
                                           autocomplete="off" autocapitalize="off"/>
                                </div>
                            </div>
                        </div>
                        <div class="row_edit">
                            <div class="param">
                                New password
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input type="password" placeholder="New password"
                                           class="form-input" name="new_password"
                                           v-model="newPassword"
                                           autocomplete="off" autocapitalize="off"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block__right block__right_confirm">
                        <div class="row_edit">
                            <div class="param">
                                Confirm password
                            </div>
                            <div class="value">
                                <div class="form-group">
                                    <input type="password" placeholder="Confirm password"
                                           class="form-input" name="confirm_password"
                                           v-model="confirmPassword"
                                           autocomplete="off" autocapitalize="off"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="save" class="save">
                Save
            </button>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {formatDateISO, validateTextInput} from '../../../helpers';
    import ProfileInfoMixin from '../../../mixins/ProfileInfoMixin';

    export default {
        data() {
            return {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                url: ''
            };
        },
        mixins: [ProfileInfoMixin],
        methods: {
            ...mapActions('account', ['getProfile', 'updateProfile', 'changePassword', 'uploadPhoto']),
            ...mapActions('animation', ['play']),
            ...mapActions({
                clearAlert: 'alert/clear'
            }),
            getUser() {
                return this.getProfile();
            },
            validateText(e) {
                validateTextInput(e);
            },
            needUpdatePassword() {
              return this.currentPassword !== '' || this.newPassword !== '' || this.confirmPassword !== '';
            },
            save(e) {
                let dobISO = formatDateISO(new Date(this.dobUSA));
                let className = 'save';
                let clickClassName = 'clickedSave';
                this.play({className, clickClassName});
                const {currentPassword, newPassword, confirmPassword} = this;
                const photo = this.$refs.avatar.photo;
                let body = {
                    firstName: this.user.first_name,
                    lastName: this.user.last_name,
                    location: this.location.id,
                    birthday: dobISO,
                    photo: photo,
                    gender: this.gender?this.gender.id:null
                };
                let curObj = this;
                this.updateProfile(body).then(async function () {
                    if (curObj.needUpdatePassword()) {
                        curObj.clearAlert();
                        await curObj.changePassword({currentPassword, newPassword, confirmPassword});
                    }
                    curObj.$router.push({name: 'profile'});
                }).catch(function (err) {
                    console.log('err', err);
                });
            }
        }
    }
</script>
