<template>
    <div class="categories">
        <div class="upcoming_liveclasses__wrap">
            <p class="categories__header">
                Categories
            </p>
            <div class="categories__block" v-dragscroll.x="true">
                <div class="block__element_wrap" v-for="category in categories">
                    <div class="block__element">
                        <router-link
                                :to="{
                            name: 'categoryClasses',
                            params: { categoryName: category.name }
                        }">
                            <img class="image" :src="categoryImgSrc(category.image)">
                        </router-link>
                        <router-link
                                class="text"
                                :to="{
                            name: 'categoryClasses',
                            params: { categoryName: category.name }
                        }">
                            {{category.name}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--        <div class="upcoming_liveclasses__wrap">-->
        <!--            <p class="upcoming_liveclasses__header">-->
        <!--                Upcoming Live Classes-->
        <!--                <router-link class="see_all" :to="{ name: 'liveClassCourses' }">See all</router-link>-->
        <!--            </p>-->
        <!--            <div class="upcoming_liveclasses__block">-->
        <!--                <div class="upcoming_liveclasses__element" v-for="upcomingLiveClass in upcomingLiveClasses">-->
        <!--                    <div class="image"-->
        <!--                         v-bind:style="{ backgroundImage: 'url(' + upcomingLiveClass.image + ')' }"-->
        <!--                    >-->
        <!--                        <div class="top">-->
        <!--                            <div v-if="upcomingLiveClass.live" class="live">LIVE</div>-->
        <!--                            <div v-if="upcomingLiveClass.coming_days > 0 && upcomingLiveClass.coming_days < 4"-->
        <!--                                 class="coming_days">Starts in {{upcomingLiveClass.coming_days}} Days-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <img src="/img/icons/play_button.svg" class="play_button"/>-->
        <!--                        <div class="bottom">-->
        <!--                            <div class="left">-->
        <!--                                <div class="weeks">-->
        <!--                                    {{upcomingLiveClass.weeks}}-{{upcomingLiveClass.weeks>1?'weeks':'week'}}-->
        <!--                                    {{upcomingLiveClass.title}}-->
        <!--                                </div>-->
        <!--                                <div class="level">-->
        <!--                                    <label>Level: </label> <span-->
        <!--                                        class="text">{{ upcomingLiveClass.difficulty_level.name}}</span>-->
        <!--                                </div>-->
        <!--                            </div>-->
        <!--                            <div class="right">-->
        <!--                                25 MIN-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div v-if="!upcomingLiveClass.instructor.subprofile" class="instructor">-->
        <!--                        <div class="photo">-->
        <!--                            <BaseAvatar width="30px" height="30px"-->
        <!--                                        :url="upcomingLiveClass.instructor.photo" ref="photo"-->
        <!--                            />-->
        <!--                        </div>-->
        <!--                        <div class="name">-->
        <!--                            {{upcomingLiveClass.instructor.first_name}} {{upcomingLiveClass.instructor.last_name}}-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div v-else class="instructor">-->
        <!--                        <div class="photo absolute">-->
        <!--                            <BaseAvatar width="30px" height="30px"-->
        <!--                                        :url="upcomingLiveClass.instructor.subprofile.photo" ref="photo"-->
        <!--                            />-->
        <!--                        </div>-->
        <!--                        <div class="photo">-->
        <!--                            <BaseAvatar width="30px" height="30px"-->
        <!--                                        :url="upcomingLiveClass.instructor.photo" ref="photo"-->
        <!--                            />-->
        <!--                        </div>-->
        <!--                        <div class="name absolute">-->
        <!--                            {{upcomingLiveClass.instructor.first_name}} &-->
        <!--                            {{upcomingLiveClass.instructor.subprofile.first_name}}-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        data() {
            return {
                level: ''
            }
        },
        computed: {
            ...mapState({
                categories: (state) => state.classes.categories,
                upcomingLiveClasses: (state) => state.classes.upcomingLiveClasses
            }),
            ...mapState('account', {
                proficiencyLevelList: state => state.dictionary.result ? state.dictionary.result.proficiency_level : [],
            })
        },
        async mounted() {
            await this.getClassesCategories();
            await this.getUpcomingLiveClasses();
        },
        created() {
        },
        methods: {
            ...mapActions('classes', [
                'getClassesCategories', 'getUpcomingLiveClasses'
            ]),
            categoryImgSrc(imageSrc) {
                return `${imageSrc}`;
            }
        }
    }
</script>
