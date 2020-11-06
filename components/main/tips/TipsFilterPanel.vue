<template>
    <div class="filter-panel">
        <checkboxes-group title="Instructor" :items="instructors" v-model="filterInstructorsSync" id="checkboxes_group_instructors" />
        <checkboxes-group title="Type of Class" :items="classTypes" v-model="filterClassTypesSync" id="checkboxes_group_class_types" />
        <checkboxes-group title="Difficulty Level" :items="difficultyLevels" v-model="filterDifficultyLevelsSync" id="checkboxes_group_difficulty_levels" />
    </div>
</template>

<script>
    import CheckboxesGroup from "./ui/CheckboxesGroup";
    import {mapState} from "vuex";

    export default {
        name: 'TipsFilterPanel',
        components: {CheckboxesGroup},
        props: {
            value: {type: Object, default: () => this.defaultFilters, required: true},
            idsOnly: {type: Boolean, default: false}, // @todo
        },
        data() {
            return {
                defaultFilters: {instructors: [], difficulty_levels: [], class_types: []},
                filters: {instructors: [], difficulty_levels: [], class_types: []},
            };
        },
        computed: {
            ...mapState('account', {
                instructors: state => state.dictionary.result.instructors,
                classTypes: state => state.dictionary.result.class_types,
                difficultyLevels: state => state.dictionary.result.difficulty_levels,
            }),
            filterInstructorsSync: {
                get() { return this.value.instructors; },
                set(val) {
                    this.filters.instructors = val;
                    this.onChange();
                },
            },
            filterClassTypesSync: {
                get() { return this.value.class_types; },
                set(val) {
                    this.filters.class_types = val;
                    this.onChange();
                },
            },
            filterDifficultyLevelsSync: {
                get() { return this.value.difficulty_levels; },
                set(val) {
                    this.filters.difficulty_levels = val;
                    this.onChange();
                },
            },
        },
        methods: {
            onChange() {
                this.$emit('input', this.filters);
                this.$emit('change', this.filters);
            }
        }
    }
</script>

<style scoped>
    @media only screen and (max-width: 1135px) {
        .filter-panel { width: 100%; display: flex; }
        /*.sidebar-filter .user-sidebar .sidebar-section { flex-basis: calc(100% / 3); }*/
    }
</style>