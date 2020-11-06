<template>
    <header class="mobile-header" v-if="isMobile && !isAdmin">
        <h1 :class="{'admin-section-title': isAdmin, 'mobile-title': true}">{{ titleText }}</h1>

        <div class="button-left">
            <slot name="mobile.left.button">
                <div role="button" class="menu-button" @click="toggleMobileMenu" v-if="mobileLeftAction === 'menu'">
                    <img src="/img/icons/hamburger.svg" alt="">
                </div>
                <div role="button" class="menu-button" @click="$router.go(-1)" v-if="mobileLeftAction === 'back'"> <!--title="Back"-->
                    <i class="fas fa-chevron-left"></i>
                    <!--<svg width="16px" height="16px"><use href="#arrow-left-icon"></use></svg>-->
                </div>
            </slot>
        </div>

        <div class="button-right">
            <slot name="mobile.right.button">
                <div role="button" class="menu-button" @click="switchComponent(mobileRightSwitch)" v-if="mobileRightSwitch">
                    <img src="/img/icons/filter.svg" alt="">
                </div>
            </slot>
        </div>
    </header>

    <header class="admin-header" v-else>
        <h1 :class="{'admin-section-title': isAdmin, 'section-title': isInstructor || (isUser && !isMobile)}">{{ text }}</h1>
        <slot name="admin.right.button">
            <!-- @example: <button class="btn btn-red" @click="$router.push({ name: 'exampleRouteName' })">Button Name</button> -->
        </slot>
    </header>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from 'vuex';
    import MobileWidthMixin from '../../../../mixins/MobileWidthMixin';

    export default {
        name: 'DynamicHeader',
        mixins: [MobileWidthMixin],
        props: {
            text: { type: String },
            mobileText: { type: String },
            mobileLeftAction: { type: String, default: 'menu' }, // menu | back
            mobileRightSwitch: { type: Object }, // {page: 'tips', component: 'TipsFilterMobile'}
        },
        computed: {
            ...mapGetters({
                isUser: 'account/isUser',
                isAdmin: 'account/isAdmin',
                isInstructor: 'account/isInstructor',
            }),
            /*...mapState('ui', {
                mobileComponent: state => state.mobileRouting.liveClasses,
            }),*/
            titleText() {
                return (this.isMobile && this.mobileText !== undefined) ? this.mobileText : this.text;
            }
        },
        methods: {
            ...mapMutations('ui', ['toggleMobileMenu', 'switchComponent']),
        }
    }
</script>

<style scoped lang="scss">
    .mobile-header { z-index: 99; }
    .mobile-header .mobile-title { min-height: 24px; }
    .mobile-header .button-left, .mobile-header .button-right { top: 33px; }
    .padding-layer {
        .mobile-header .button-left { left: 0; }
        .mobile-header .button-right { right: 0; }
    }
</style>