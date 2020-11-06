<template>
    <div class="invite_edit">
        <InstructorProfileBlock
                :editable="true" :photo="user.photo"
                :hasSubprofile="user.subprofile"
                :photoSubprofile="user.subprofile?user.subprofile.photo:''"
                ref="profile"
        >
            <div class="topRight" slot="topRight">
                <div slot="topRight" @click="closeModal" class="close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <p class="title" slot="title">Edit Instructor Profile</p>
            <div class="block__info" slot="leftInfoBlocks">
                <div class="fields">
                    <div class="input__wrap input__wrap_first_name">
                        <div class="label">First name</div>
                        <div class="form-group">
                            <input type="text" autocomplete="off" v-model="user.first_name"
                                   class="form-input" name="first_name">
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Last name</div>
                        <div class="form-group">
                            <input type="text" autocomplete="off" v-model="user.last_name"
                                   class="form-input" name="last_name">
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Birthday</div>
                        <div class="form-group">
                            <input type="text" placeholder="Birthday"
                                   class="form-input" name="dob"
                                   v-model="dobUSA" id="birthday"
                                   autocomplete="off" autocapitalize="off"/>
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Gender</div>
                        <div class="form-group">
                            <div class="select-group">
                                <base-dict-select name="gender" :options="gendersList" v-model="gender"/>
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
            <div v-if="user && user.subprofile" class="block__info" slot="rightInfoBlocks">
                <div class="fields">
                    <div class="input__wrap">
                        <div class="label">First name</div>
                        <div class="form-group">
                            <input type="text" autocomplete="off"
                                   v-model="user.subprofile.first_name"
                                   class="form-input input__first_name" name="subprofile_first_name">
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Last name</div>
                        <div class="form-group">
                            <input type="text" autocomplete="off"
                                   v-model="user.subprofile.last_name"
                                   class="form-input" name="subprofile_last_name">
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Birthday</div>
                        <div class="form-group">
                            <input type="text" placeholder="Birthday"
                                   class="form-input" name="subprofile_dob"
                                   v-model="dobUSASubprofile" id="birthdaysubprofile"
                                   autocomplete="off" autocapitalize="off"/>
                        </div>
                    </div>
                    <div class="input__wrap">
                        <div class="label">Gender</div>
                        <div class="form-group">
                            <div class="select-group">
                                <base-dict-select name="gender" :options="gendersList" v-model="genderSubprofile"/>
                            </div>
                        </div>
                    </div>
                    <BaseLocationSelect
                            :initialState="stateSubprofile"
                            :initialCity="locationSubprofile"
                            @selectState="stateSelectedSubprofile"
                            @selectCity="citySelectedSubprofile"
                    >
                    </BaseLocationSelect>
                </div>
            </div>
            <div class="block__info common" slot="infoBlocks">
                <div class="fields">
                    <div class="input__wrap">
                        <div class="label">Email</div>
                        <div class="form-group">
                            <input type="text"
                                   autocomplete="off"
                                   v-model="user.email"
                                   class="form-input" v-bind:class="{ single: !user.subprofile }"
                                   disabled
                                   name="email">
                        </div>
                    </div>
                    <div class="input__wrap bio">
                        <div class="label">Bio</div>
                        <div class="form-group">
                            <textarea v-model="user.bio"
                                      class="form-input" v-bind:class="{ single: !user.subprofile }"
                                      name="bio" cols="45"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom" slot="bottomBlock">
                <BaseButton class="save" text="Save" @clicked="updateProfileFunc"/>
            </div>
        </InstructorProfileBlock>
    </div>
</template>
<script>
    import ProfileInfoMixin from '../../../../../mixins/ProfileInfoMixin';

    export default {
        mixins: [ProfileInfoMixin]
    }
</script>
