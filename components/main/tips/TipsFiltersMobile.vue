<template>
    <div class="content-mobile">
        <!-- @todo Create the base layout-component: <filters-mobile> -->

        <dynamic-header text="Filter">
            <template slot="mobile.left.button">
                <div role="button" class="menu-button" @click="$emit('close')">
                    <svg width="14px" height="15px"><use href="#close-icon"></use></svg>
                </div>
            </template>

            <template slot="mobile.right.button">
                <div role="button" class="menu-button" @click="resetFilters">Reset</div>
            </template>
        </dynamic-header>

        <div class="content-filter">
            <!-- @todo Create the component <filter-instructors-profile> -->
            <div class="filter-section">
                <h3 class="section-title">Instructor</h3>
                <div class="section-content">
                    <div v-for="i in instructors" :key="i.id" class="user-class" :class="{checked : isInstructorChecked(i)}" @click="selectInstructor(i)">
                        <div class="user-avatar">
                            <base-avatar v-if="!i.subprofile" :url="i.photo" width="38px" height="38px"/>
                            <base-double-avatar v-else :photo="i.photo" :photoSub="i.subprofile.photo" width="38px" height="38px" blockWidth="59px"/>
                        </div>
                        <div class="user-name">
                            {{ classInstructorName(i) }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- @todo Create the base component <filter-select> -->
            <div class="filter-section">
                <h3 class="section-title">Type of Class</h3>
                <div class="section-content">
                    <vue-multi-select v-model="checkedClassTypes" :options="multiSelectOptions" :selectOptions="classTypes" :btnLabel="multiSelectLabel"/>
                </div>
            </div>

            <div class="filter-section">
                <h3 class="section-title">Difficulty Level</h3>
                <div class="section-content">
                    <vue-multi-select v-model="checkedDiffLevels" :options="multiSelectOptions" :selectOptions="difficultyLevels" :btnLabel="multiSelectLabel"/>
                </div>
            </div>

            <div class="btn-section">
                <button class="btn btn-primary" @click="applyFilters">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>
    import vueMultiSelect from 'vue-multi-select';
    import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';
    import DynamicHeader from "./ui/DynamicHeader";

    export default {
        name: 'TipsFiltersMobile',
        components: {DynamicHeader, vueMultiSelect},
        data() {
            return {
                multiSelectOptions: {
                    multi: true,
                    cssSelected: (option) => option.selected ? {color: '#d3acbe', 'font-family': 'Helvetica'} : ''
                },
                multiSelectLabel: () => '',
                checkedClassTypes: [],
                checkedDiffLevels: []
            }
        },
        computed: {
            filterParams() {
                return {
                    instructor_ids: this.instructorIds,
                    class_type_ids: this.classTypeIds,
                    difficulty_level_ids: this.difficultyLevelIds,
                };
            },
            ...mapState('account', {
                instructors: state => state.dictionary.result.instructors,
                classTypes: state => state.dictionary.result.class_types,
                difficultyLevels: state => state.dictionary.result.difficulty_levels
            }),
            ...mapState('classes', {
                instructorIds: state => state.instructorIds,
                classTypeIds: state => state.classTypeIds,
                difficultyLevelIds: state => state.difficultyLevelIds,
            }),
            ...mapGetters({
                classInstructorName: 'classes/classInstructorName'
            }),
        },
        methods: {
            ...mapMutations('ui', ['switchComponent']),
            ...mapMutations('classes', [
                'checkInstructor',
                'checkClassTypes', // @todo Зачем этот функционал реализован в хранилище, а не локально?
                'checkDiffLevels',
                'resetCheckedInstrs',
            ]),
            ...mapActions('classes', ['findLiveClassCourses']),
            selectInstructor(i) {
                this.checkInstructor(i.id);
            },
            isInstructorChecked(i) {
                return this.instructorIds.indexOf(i.id) !== -1;
            },
            applyFilters() {
                // @todo Отрефакторить. Использовать v-model на отдельных компонентах <filter-select/>, <filter-profiles/>
                this.checkClassTypes(this.checkedClassTypes.map(type => type.id));
                this.checkDiffLevels(this.checkedDiffLevels.map(level => level.id));

                this.$emit('input', this.filterParams);
                this.$emit('apply', {filterParams: this.filterParams});
            },
            resetFilters() {
                this.checkedClassTypes = [];
                this.checkedDiffLevels = [];
                this.resetCheckedInstrs();
            },
        },
    }
</script>

<style scoped>
    .filter-section .section-content .user-class { display: flex; }
    .filter-section .section-content .user-class:not(:last-child) { margin-bottom: 10px; }
</style>