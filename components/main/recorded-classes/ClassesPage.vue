<template>
    <div class="page-large">
        <div :class="{'content-desktop': !isMobile}">
            <header class="mobile-header" v-if="isMobile">
                <h1 class="mobile-title">Classes</h1>
                <div class="button-left">
                    <div role="button" class="menu-button" @click="toggleMobileMenu">
                        <img src="/img/icons/hamburger.svg" alt="">
                    </div>
                </div>
                <div class="button-right">
                    <div role="button" class="menu-button">
                        <svg width="20px" height="20px">
                            <use href="#search-icon"></use>
                        </svg>
                    </div>
                </div>
            </header>

            <section class="all-categories">
                <header>
                    <h2 class="section-title">Categories</h2>
                </header>
                <div class="classes-categories" data-is-sliding-event="" v-dragscroll.x="true" @dragscrollstart="slideStart" @dragscrollmove="slideMove($event.detail.deltaX)" @dragscrollend="slideEnd">
                    <category-summary v-for="category in categories" :key="category.id" :category="category"/>
                </div>
            </section>

            <section class="upcoming">
                <header>
                    <h2 class="section-title">Upcoming Live Classes</h2>
                    <router-link class="more-link" to="/">See all <span><i class="fa fa-angle-right" aria-hidden="true" v-if="isMobile"></i></span></router-link>
                </header>

                <ui-slider :items="upcomingLiveClasses" size="sm" @clickSlide="onClickLiveCourse">
                    <template slot="item" slot-scope="{item}">
                        <ui-thumbnail :url="item.image" size="sm" :can-play="false">
                            <template slot="live">LIVE</template>
                            <template slot="soon">Starts in {{ item.coming_days }} Days</template>
                            <template slot="title">{{ /*item.weeks + '-Week ' +*/ item.title }}</template>
                            <template slot="level">Level: <span>{{ item.difficulty_level.name }}</span></template>
                            <template slot="duration">?? MIN</template>
                        </ui-thumbnail>
                        <base-class-rating :instructor="item.instructor" :show-rating="false" style="margin-block-start: 15px" />
                    </template>
                </ui-slider>
            </section>

            <section class="bookmarks">
                <header>
                    <h2 class="section-title">Your Bookmarks List</h2>
                    <router-link class="more-link" to="/">See all <span><i class="fa fa-angle-right" aria-hidden="true" v-if="isMobile"></i></span></router-link>
                </header>
                <!--<div class="upcoming-live-classes" v-dragscroll.x="true">
                    <class-summary v-for="liveClass in upcoming" :key="liveClass.id" :liveClass="liveClass" :isUpcoming="false" />
                </div>-->
                <ui-slider :items="bookmarks" size="sm" @clickSlide="onClickBookmarked">
                    <template slot="item" slot-scope="{item}">
                        <ui-thumbnail :url="item.image || item.thumbnail" size="sm" :can-play="true">
                            <template slot="title">{{ item.title }}</template>
                            <!--<template slot="live">LIVE</template>-->
                            <!--<template slot="soon">Starts in {{ item.coming_days }} Days</template>-->
                            <template slot="level">Level: <span>{{ item.difficulty_level.name }}</span></template>
                            <template slot="duration">?? MIN</template>
                            <template slot="bookmark">
                                <base-bookmark-icon :isBookmarked="false" :big="false" @addToBookmarks.stop="onClickBookmarkBtn($event, item)" style="position: relative" />
                            </template>
                        </ui-thumbnail>
                        <base-class-rating :instructor="item.instructor" :show-rating="false" @click.stop="onClickInstructorProfile($event, item)" style="margin-block-start: 15px" />
                        <!-- @todo Fire a custom event `clickProfile` if need! -->
                    </template>
                </ui-slider>
            </section>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import CategorySummary from './summary/CategorySummary';
    import ClassSummary from './summary/ClassSummary';
    import MobileWidthMixin from '../../../mixins/MobileWidthMixin';
    import UiSlider from '../../common/UiSlider';
    import UiThumbnail from '../../common/UiThumbnail';
    import {api} from '../../../helpers';
    import BaseBookmarkIcon from '../../base/BaseBookmarkIcon';
    import BaseClassRating from '../../base/BaseClassRating';

    export default {
        mixins: [MobileWidthMixin],
        components: {BaseClassRating, BaseBookmarkIcon, UiThumbnail, UiSlider, CategorySummary, ClassSummary},
        data() {
            return {
                bookmarks: [],
            };
        },
        computed: {
            ...mapState('account', {
                categories: state => state.dictionary.result.categories,
            }),
            ...mapState('classes', ['liveClassCourses']),
            upcomingLiveClasses() {
                return this.liveClassCourses || [];
            },
        },
        async mounted() {
            // let params = {instructor_id: null, class_type_id: null, difficulty_level_id: null};
            this.findLiveClassCourses();
            await this.loadBookmarks();
        },
        methods: {
            ...mapMutations('ui', ['toggleMobileMenu', 'switchComponent']),
            ...mapActions('classes', ['findLiveClassCourses']),
            slideStart(e) {
                e.target.dataset.isSlidingEvent = 'true'; // @note Prevent a click event after sliding
            },
            slideMove(e) {
                // ...
            },
            slideEnd(e) {
                setTimeout(() => {
                    e.target.dataset.isSlidingEvent = ''; // @note Prevent a click event after sliding
                }, 300);
            },
            async loadBookmarks() {
                const response = await api.get('favorite/latest');
                const result = response.data.result;

                let items = [];

                result.live_class_videos.forEach(item => {
                    item.type = 'live_class_video';
                    items.push(item);
                });

                result.recorded_classes.forEach(item => {
                    item.type = 'recorded_class';
                    items.push(item);
                });

                result.tips.forEach(item => {
                    item.type = 'tip';
                    items.push(item);
                });

                this.$set(this, 'bookmarks', items);
            },
            onClickLiveCourse(e, item) {
                this.$router.push({name: 'liveClassCourse', params: {courseId: item.id}});
            },
            onClickBookmarked(e, item) {
                console.log('onClickBookmarked:', item, e);
                alert('In progress..');
            },
            onClickBookmarkBtn(e, item) {
                e && e.preventDefault();
                console.log('onClickBookmarkBtn:', item, e);
                alert('In progress..');
            },
            onClickInstructorProfile(e, item) {
                console.log('onClickInstructorProfile:', item, e);
            },
        }
    }
</script>