<template>
    <div class="invite_edit">
        <BaseProfileBlock :editable="true" :firstName="user.first_name" :lastName="user.last_name"
                          :city="user.city?user.city.name:''" :photo="user.photo"
                          ref="profile"
        >
            <div class="topRight" slot="topRight">
                <div slot="topRight" @click="closeModal" class="close">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <p class="title" slot="title">Edit User Profile</p>
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
                                <base-dict-select name="gender" :options="gendersList" v-model="gender"/>
                            </div>
                        </div>
                    </div>
                    <BaseLocationSelect
                            :initialState="state" :initialCity="location"
                            @selectState="stateSelected" @selectCity="citySelected"
                    >
                    </BaseLocationSelect>
                    <div class="input__wrap">
                        <div class="label">Proficiency Level</div>
                        <div class="form-group">
                            <div class="select-group">
                                <base-dict-select name="proficiency_level"
                                                  :options="proficiencyLevelList"
                                                  v-model="proficiencyLevel"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom" slot="bottomBlock">
                <div class="bottom__info">
                    <div class="block__info">
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
                    </div>
                </div>
                <BaseButton class="save" text="Save" @clicked="updateProfileFunc"/>
            </div>
        </BaseProfileBlock>
    </div>
</template>
<script>
    import ProfileInfoMixin from '../../../../../mixins/ProfileInfoMixin';

    export default {
        mixins: [ProfileInfoMixin],
    }
</script>