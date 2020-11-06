<template>
    <div :class="['wrap reduce-width padding-layer', {'page-middle': !isAdmin, 'admin-section': isAdmin}]">
        <section :class="{'content-desktop sidebar-filter': (!isMobile || !isUser)}">
            <dynamic-header text="Tips" v-if="!isShowFiltersMobile">
                <template slot="admin.right.button" v-if="isAdmin || isInstructor">
                    <button class="btn btn-red" @click="openUploadPopover">Upload</button>
                </template>
                <template slot="mobile.right.button">
                    <div role="button" class="menu-button" @click="isShowFiltersMobile = true">
                        <img src="/img/icons/filter.svg" alt="" />
                    </div>
                </template>
            </dynamic-header>

            <div v-if="isMobile && isShowFiltersMobile">
                <tips-filters-mobile @close="isShowFiltersMobile = false" @apply="onApplyFilters" />
            </div>

            <div class="left-sidebar content-wrapper">
                <div class="user-sidebar" v-if="!isMobile && !isAdmin">
                    <tips-filter-panel v-model="filters" />
                </div>

                <tips-list :filters="filterParams" ref="tipsList" :key="tipsListRemountKey"/>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import MobileWidthMixin from '../../../mixins/MobileWidthMixin';
    import TipsList from './TipsList';
    import DynamicHeader from './ui/DynamicHeader';
    import TipsFilterPanel from './TipsFilterPanel';
    import TipsFiltersMobile from './TipsFiltersMobile';
    import TipForm from './TipForm';

    export default {
        name: 'TipsView',
        mixins: [MobileWidthMixin],
        components: {TipsFiltersMobile, TipsFilterPanel, DynamicHeader, TipsList,},
        data() {
            return {
                filters: {instructors: [], difficulty_levels: [], class_types: []},
                filterParamsMobile: {instructor_ids: [], difficulty_level_ids: [], class_type_ids: []},
                isShowFiltersMobile: false,
                tipsListRemountKey: 0
            };
        },
        computed: {
            ...mapGetters('account', ['isUser', 'isAdmin', 'isInstructor']),
            filterParams() {
                if (this.isMobile) {
                    return this.filterParamsMobile;
                }

                let params = {
                    //page: 1,
                    //per_page: 20,
                    instructor_ids: this.filters.instructors.map(el => el.id),
                    difficulty_level_ids: this.filters.difficulty_levels.map(el => el.id),
                    class_type_ids: this.filters.class_types.map(el => el.id),
                };

                return params;
            }
        },
        mounted() {
            window.tipsView = this;
        },
        methods: {
            openUploadPopover() {
                this.$modal.show(TipForm, {
                    onSaved: () => {
                        this.remountTipsList();
                    },
                }, {
                    name: 'TipFormModal',
                    width: 508,
                    height: 'auto',
                    classes: ['add-record-modal'],
                    scrollable: true,
                    clickToClose: false
                })
            },
            remountTipsList() {
                this.tipsListRemountKey++;
            },
            onApplyFilters({filterParams}) {
                this.isShowFiltersMobile = false;
                this.$set(this, 'filterParamsMobile', filterParams);
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