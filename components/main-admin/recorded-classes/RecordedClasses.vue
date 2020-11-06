<template>
    <div class="recorded_classes_list">
        <div class="top">
            <p class="header">
                Categories / {{categoryName}}
            </p>
            <BaseButton className="upload" text="Upload" @clicked="uploadRecordedModal"/>
        </div>
        <div class="main">
            <div v-for="recordClass in recordedClasses.items" class="block">
                <div class="image" @click="recordView(recordClass.id)">
                    <BaseAvatar width="191px" height="163px"
                                className="recorded_class_thumbnail"
                                :url="recordClass.photo" ref="photo"
                    />
                </div>
                <div class="right">
                    <div class="right__top">
                        <div class="text">
                            <div class="title" @click="recordView(recordClass.id)">
                                {{recordClass.title}}
                            </div>
                            <div class="description">
                                {{recordClass.description}}
                            </div>
                        </div>
                        <ThreeButtons
                                :data="recordClass"
                        />
                    </div>
                    <div class="info">
                        <div class="instructor">
                            <div class="photo">
                                <BaseAvatar width="42px" height="42px"
                                            :url="recordClass.instructor?recordClass.instructor.photo:''" ref="photo"
                                />
                            </div>
                            <div class="instructor__right">
                                <div class="name">
                                    {{recordClass.instructor.first_name}} {{recordClass.instructor.last_name}}
                                </div>
                                <div class="reviews">
                                    <star-rating
                                            :increment="0.5"
                                            :rating="1.5"
                                            :max-rating="5"
                                            inactive-color="#000"
                                            active-color="#F5A623"
                                            :star-size="13"
                                    >
                                    </star-rating>
                                    <div class="reviews_text">(25 Reviews)</div>
                                </div>
                            </div>
                        </div>
                        <div class="video">
                            <div v-if="recordClass.published" class="line">Status: Published</div>
                            <div class="line">Views: {{recordClass.views}}</div>
                            <div class="line">Type: {{recordClass.class_type.name}}</div>
                            <div class="line">Level: <span
                                    class="line__text">{{recordClass.difficulty_level.name}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <paginate
                    :pageCount="recordedClasses.lastPage?recordedClasses.lastPage:1"
                    :clickHandler="fetchRecordedClassesFunc"
                    :prevText="'<'"
                    :nextText="'>'"
                    :containerClass="'recorded_class_pagination'">
            </paginate>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import ThreeButtons from './blocks/ThreeButtons';
    import StarRating from 'vue-star-rating';
    import Add from './blocks/Add';
    import {store} from '../../../store';

    //ALL UNPUBLISHED IN TOP
    export default {
        props: ['categoryName'],
        data() {
            return {
                currentPage: 1,
                categoryId: 0
            };
        },
        mounted() {
            store.commit('ui/startRouteLoading', null, { root: true });
            this.getClassesCategories().then(() => {
                this.fetchRecordedClassesFunc(1);
            });
            this.$root.$on('removerecord', () => {
                this.fetchRecordedClassesFunc(this.currentPage);
            });
        },
        destroyed() {
            this.$root.$off('removerecord');
            store.commit('classes/clearRecordedClasses');
        },
        components: {
            ThreeButtons,
            StarRating
        },
        computed: {
            ...mapState({
                categories: (state) => state.classes.categories,
                recordedClasses: (state) => state.classes.recordedClasses
            }),
        },
        methods: {
            ...mapActions('classes', [
                'fetchRecordedClasses'
            ]),
            ...mapActions('classes', [
                'getClassesCategories',
            ]),
            fetchRecordedClassesFunc(pageNum) {
                let curObj = this;
                let obj = [];
                obj = curObj.categories.filter(function (category) {
                    return category.name === curObj.categoryName
                });
                curObj.categoryId = obj[0].id;
                curObj.fetchRecordedClasses({id: obj[0].id, page: pageNum}).then(function () {
                    curObj.currentPage = pageNum;
                    store.commit('ui/endRouteLoading', null, { root: true });
                }).catch(function () {
                    store.commit('ui/endRouteLoading', null, { root: true });
                });
            },
            uploadRecordedModal() {
                let curObj = this;
                this.$modal.show(Add, {category: curObj.categoryId}, {
                    width: 508,
                    height: 'auto',
                    classes: [
                        'add-record-modal'
                    ],
                    scrollable: true,
                    clickToClose: false
                })
            },
            recordView(classId) {
                this.$router.push({
                    name: 'singleClass', params: {
                        classId: classId
                    },
                    query: {
                        categoryName: this.categoryName
                    }
                });
            }
        }
    }
</script>