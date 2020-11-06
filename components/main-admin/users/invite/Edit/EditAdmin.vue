<template>
    <div class="invite_edit">
        <BaseProfileBlock :editable="true" :firstName="user.first_name" :lastName="user.last_name"
                          :city="user.city?user.city.name:''" :photo="user.photo" ref="profile">
            <div class="topRight" slot="topRight">
                <div slot="topRight" @click="closeModal" class="close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <p class="title" slot="title">Edit Admin Profile</p>
            <div class="block__info" slot="infoBlocks">
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
                        <div class="label">Email</div>
                        <div class="form-group">
                            <input type="text" autocomplete="off" v-model="user.email"
                                   class="form-input" name="email" disabled>
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
                                <base-dict-select name=gender :options="gendersList" v-model="gender"/>
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
            <BaseButton slot="bottomBlock" class="save" text="Save" @clicked="updateProfileFunc"/>
        </BaseProfileBlock>
    </div>
</template>
<script>
    import ProfileInfoMixin from '../../../../../mixins/ProfileInfoMixin';

    export default {
        mixins: [ProfileInfoMixin]
    }
</script>
