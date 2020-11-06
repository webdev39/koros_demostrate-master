<template>
    <div class="wrap reduce-width padding-layer">
        <div class="category-page"><!-- wrap > base|main role="main" -->
            <dynamic-header :text="title" v-if="!isShowFiltersMobile">
                <template slot="mobile.right.button">
                    <div role="button" class="menu-button" @click="isShowFiltersMobile = true">
                        <img src="/img/icons/filter.svg" alt="" />
                    </div>
                </template>
            </dynamic-header>

            <div v-if="isMobile && isShowFiltersMobile">
                <tips-filters-mobile @close="isShowFiltersMobile = false" @apply="onApplyMobileFilters" /> <!-- @todo Implement: v-model="filterParams" -->
            </div>

            <div :class="{'content-desktop sidebar-filter': (!isMobile || !isUser)}">
                <div class="left-sidebar content-wrapper">
                    <div class="user-sidebar" v-if="isAdmin || !isMobile" __v-if="isInstructor || (isUser && !isMobile)">
                        <tips-filter-panel v-model="filters" /> <!-- @todo :ids-only="true" -->
                    </div>

                    <classes-list :filters="filterParams" ref="classesList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import MobileWidthMixin from '../../../mixins/MobileWidthMixin';
    import DynamicHeader from '../tips/ui/DynamicHeader';
    import TipsFilterPanel from '../tips/TipsFilterPanel';
    import ClassesList from './ClassesList';
    import TipsFiltersMobile from '../tips/TipsFiltersMobile';

    export default {
        name: 'CategoryView',
        components: {TipsFiltersMobile, ClassesList, TipsFilterPanel, DynamicHeader},
        mixins: [MobileWidthMixin],
        data() {
            return {
                isShowFiltersMobile: false,
                categoryId: this.$route.params.categoryId,
                filters: {instructors: [], difficulty_levels: [], class_types: []},
                filterParamsMobile: {},
            };
        },
        computed: {
            ...mapGetters({
                isUser: 'account/isUser',
                isAdmin: 'account/isAdmin',
                isInstructor: 'account/isInstructor',
            }),
            ...mapState('account', {
                categories: state => state.dictionary.result.categories,
            }),
            title() {
                return this.isMobile ? this.category.name : `Categories / ${this.category.name}`;
            },
            category() {
                return this.categories.find(el => el.id = 6) || {};
            },
            filterParams() {
                if (this.isMobile) {
                    return this.filterParamsMobile;
                }

                let params = {
                    //page: 1, per_page: 20,
                    instructor_ids: this.filters.instructors.map(el => el.id),
                    difficulty_level_ids: this.filters.difficulty_levels.map(el => el.id),
                    class_type_ids: this.filters.class_types.map(el => el.id),
                };

                return params;
            }
        },
        mounted() {
            window.vueComp = this;
        },
        methods: {
            onApplyMobileFilters({filterParams}) {
                this.$set(this, 'filterParamsMobile', filterParams);
                this.isShowFiltersMobile = false;
            },
        }
    }
</script>

<style>
    /* @todo Move to global. Required: re-markup layout classes */
    @import "src/static/core/layout.scss";
</style>

<style scoped>

</style>