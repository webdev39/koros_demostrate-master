<template>
    <div class="record_view">
        <p class="record_view__header">
            Preview
        </p>
        <div class="block">
            <div class="block__edit_link">
                <router-link class="edit"
                             :to="{ name: 'editClass', params: {
                                 classId: classId
                             },
                             query: {
                                 categoryName: categoryName
                             }
                }"
                >
                    <img src="/img/icons/pen.svg"/>
                </router-link>
                <router-link
                        class="delete" :to="{ name: 'categoryClasses', params: {
                            categoryName: categoryName
                        }}"
                >
                    <img src="/img/icons/close_white.svg"/>
                </router-link>
            </div>
            <div class="info">
                <BaseVideoPlayer width="358px" height="262px" :haveUploadPhoto="false"
                                 :videoUrl="recordClass.video_aws_converted_url"
                                 :url="recordClass.photo" :showPlayButtom="true"
                                 className="info__video" :deleteImgBtn="false">
                </BaseVideoPlayer>
                <div class="info__data">
                    <div class="instructor">
                        <div class="photo">
                            <BaseAvatar width="30px" height="30px"
                                        :url="recordClass.instructor?recordClass.instructor.photo:''" ref="photo"
                            />
                        </div>
                        <div class="instructor__right">
                            <div class="name">
                                {{recordClass.instructor?recordClass.instructor.first_name:''}}
                                {{recordClass.instructor?recordClass.instructor.last_name:''}}
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
                    <div class="title">
                        {{recordClass.title}}
                    </div>
                    <div class="subtitle">
                        <div class="duration">
                            <img src="/img/icons/activate.svg"/>&nbsp;<label>{{duration}}M&nbsp;&nbsp;&nbsp;-</label>
                        </div>&nbsp;&nbsp;&nbsp;
                        <div class="level">
                            <label>Level:</label>&nbsp;
                            <div class="text">
                                {{recordClass.difficulty_level?recordClass.difficulty_level.name:''}}
                            </div>
                        </div>
                    </div>
                    <div class="description">{{recordClass.description}}</div>
                </div>
            </div>
            <div class="moves__title">
                <div class="moves__title__text">Moves you'll do</div>
            </div>
            <MovesList :recordClass="recordClass" :editable="false"/>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import StarRating from 'vue-star-rating';
    import MovesList from './blocks/MovesList';

    export default {
        props: ['classId'],
        data() {
            return {
                recordClass: {},
                duration: 0,
                categoryName: ''
            };
        },
        mounted() {
            this.categoryName = this.$route.query.categoryName;
            this.getClassFunc();
        },
        components: {
            StarRating,
            MovesList
        },
        computed: {
            ...mapState({}),
        },
        methods: {
            ...mapActions('classes', [
                'getClass'
            ]),
            async getClassFunc() {
                this.recordClass = await this.getClass(this.classId);
                console.log('this.class ', this.class);
            }
        }
    }
</script>