<template>
    <div class="profile">
        <p class="profile__header">
            Profile
        </p>
        <BaseProfileBlock
                className="block_profile"
                :firstName="account.first_name" :lastName="account.last_name"
                :city="account.city?account.city.name:''" :photo="account.photo">
            <router-link
                    class="block__edit_link" :to="{ name: 'editProfile'}"
                    slot="topRight"
            >
                <img src="/img/icons/pen.svg"/>
            </router-link>
            <div slot="infoBlocks">
                <div class="block__info">
                    <div class="title">
                        Basic Information
                    </div>
                    <div class="row">
                        <div class="param">
                            Email
                        </div>
                        <div class="value">
                            {{ account.email }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Birthday
                        </div>
                        <div class="value">
                            {{ account.dob }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="param">
                            Gender
                        </div>
                        <div class="value">
                            {{ account.gender?account.gender.name:'' }}
                        </div>
                    </div>
                </div>
                <div class="block__info">
                    <div class="title">
                        Password
                    </div>
                    <div class="row">
                        <div class="value">
                            ● ● ● ● ● ● ● ●
                        </div>
                    </div>
                </div>
            </div>
        </BaseProfileBlock>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {formatDateUSA} from '../../../helpers';

    export default {
        computed: {
            ...mapState({
                account: state => state.account.user
            })
        },
        mounted() {
            this.account.dob = formatDateUSA(new Date(this.account.dob));
        },
    }
</script>
