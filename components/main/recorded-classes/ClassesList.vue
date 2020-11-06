<template>
    <div class="classes-list">
        <component :is="routeComponent" :to="{name: 'class', params: {classId: classe.id}}" v-for="classe in classes" :key="classe.id" @click="onClickLine($event)">
                <grid-line-wide :item="classe" @bookmark="onClickBookmark"> <!-- @play="onPlay" @bookmark="onBookmark" -->
                    <!-- @todo Add a bookmark button: http://bit.ly/2SIhWSm -->
                </grid-line-wide>
        </component>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import GridLineWide from '../tips/ui/GridLineWide';
    import MobileWidthMixin from '../../../mixins/MobileWidthMixin';

    export default {
        name: 'ClassesList',
        components: {GridLineWide},
        mixins: [MobileWidthMixin],
        props: {
            filters: {type: Object},
        },
        data() {
            return {
                categoryId: this.$route.params.categoryId,
                classId: this.$route.params.classId,
            };
        },
        computed: {
            ...mapState({
                classesResult: (state) => state.classes.recordedClasses
            }),
            classes() {
                return this.classesResult.items;
            },
            routeComponent() {
                return this.isMobile ? 'router-link' : 'router-link';
            }
        },
        watch: {
            filters: {
                handler: function (/*val, oldVal*/) {
                    this.loadClasses();
                },
                deep: true
            },
        },
        mounted() {
            this.loadClasses();
        },
        methods: {
            ...mapActions('classes', [
                'fetchRecordedClasses'
            ]),
            async loadClasses() {
                let params = {id: this.categoryId, page: 1, filters: this.filters};
                await this.fetchRecordedClasses(params);
            },
            onClickBookmark({e, item}) {
                //e.stopPropagation();
                //e.preventDefault();
                console.log('onClickBookmark:', e, item);
                alert('In progress..');
            },
            onClickLine(e) {
                console.log('onClickLine');
            },
        }
    }
</script>

<style scoped>
    .classes-list { width: 100%; }
    .classes-list > * { display: block; }
</style>