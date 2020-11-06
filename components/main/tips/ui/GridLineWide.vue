<template>
    <div class="grid-item">

        <div class="thumb">
            <img :src="item.thumbnail || item.photo" />
            <label class="label-is-watched" v-if="item.is_watched" :key="'is-watched'">WATCHED</label>
            <label class="label-is-new" v-else-if="item.is_new" :key="'is-new'">NEW</label>
            <div class="play-icon" @click="playVideo" v-if="hasPlay"></div>

            <label :class="{'label-btn-bookmark': true, 'is-bookmarked': item.is_favorite}"
                   :title="item.is_favorite ? 'Delete from favorite' : 'Add to favorite'"
                   v-if="hasBookmark"
                   @click.stop.prevent="toggleBookmark($event)">
                <i class="fas fa-bookmark"></i>
            </label>
        </div>

        <div class="described">
            <h3 class="title">{{item.title}}</h3>
            <div class="brief">{{item.description}}</div>
        </div>

        <div class="instructor">
            <base-class-rating :instructor="item.instructor" :current="false" />
        </div>

        <div class="actions">
            <slot name="manage.actions" v-if="isAdmin || isInstructor" />
            <slot name="user.actions" v-if="isUser">
                <base-bookmark-icon v-if="$listeners.bookmark" :isBookmarked="item.is_favorite" :big="false" @addToBookmarks.stop.prevent="toggleBookmark($event)" style="position: relative" />
            </slot>
        </div>

        <div class="meta">
            <slot name="meta">
                <template v-if="isUser">
                    <div>Date: {{ formattedDate(item.activated_at) }}</div>
                </template>
                <template v-else>
                    <div>Date: {{ formattedDate(item.created_at) }}</div>
                </template>
                <div>Views: {{ item.views }}</div>
                <div>Level: <span class="yellow">{{ item.difficulty_level.name }}</span></div>
            </slot>
        </div>
    </div>
</template>

<script>
    import BaseClassRating from '../../../base/BaseClassRating';
    import MobileWidthMixin from '../../../../mixins/MobileWidthMixin';
    import {mapGetters} from 'vuex';
    import moment from 'moment';
    import BaseVideoPlayerModal from '../../../base/BaseVideoPlayerModal';
    import BaseBookmarkIcon from '../../../base/BaseBookmarkIcon';

    export default {
        name: 'GridLineWide',
        mixins: [MobileWidthMixin],
        components: {BaseBookmarkIcon, BaseClassRating},
        props: {
            item: {type: Object, required: true},
            hasBookmark: {type: Boolean, required: false},
            hasBookmarkRight: {type: Boolean, required: false},
            hasPlay: {type: Boolean, required: false},
        },
        computed: {
            ...mapGetters({
                isUser: 'account/isUser',
                isAdmin: 'account/isAdmin',
                isInstructor: 'account/isInstructor',
            }),
        },
        methods: {
            formattedDate(datetime) {
                return moment(datetime).format('YYYY/MM/DD'); // YYYY-MM-DD HH:mm:ss
            },
            playVideo() {
                this.$modal.show(BaseVideoPlayerModal, {
                    thumbnail: this.item.thumbnail,
                    videoUrl: this.item.video_url,
                },{
                    width: 1024,
                    height: 'auto',
                    classes: [
                        //  'add-record-modal'
                    ],
                    scrollable: true,
                    clickToClose: false
                });

                this.$emit('play', {item: this.item});
            },
            toggleBookmark(e) {
                this.item.is_favorite = !this.item.is_favorite;
                this.$emit('bookmark', {e: e, item: this.item});
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'src/static/core/layout';

    .grid-item {
        display: grid;
        grid-template-rows: minmax(10px, auto) minmax(10px, auto);
        grid-template-columns: 200px 1fr minmax(120px, auto);

        margin-bottom: 25px;
        padding: 20px;
        background-color: #1f1532; /* @todo Used a variable: $tolopea */
        color: #fff; /* @todo Used a variable: $white */
        border-radius: 7px;
    }

    .is-desktop {}

    .thumb      { grid-row-start: 1; grid-row-end: 3; grid-column-start: 1; grid-column-end: 2; }
    .described  { grid-row-start: 1; grid-row-end: 2; grid-column-start: 2; grid-column-end: 3; }
    .instructor { grid-row-start: 2; grid-row-end: 3; grid-column-start: 2; grid-column-end: 3; }
    .actions    { grid-row-start: 1; grid-row-end: 2; grid-column-start: 3; grid-column-end: 4; }
    .meta       { grid-row-start: 2; grid-row-end: 3; grid-column-start: 3; grid-column-end: 4; }

    .is-mobile {
        .grid-item  {
            grid-template-rows: minmax(10px, auto) minmax(10px, auto) minmax(10px, auto) minmax(0px, auto);
            grid-template-columns: 200px 1fr;
        }
        .thumb      { grid-row-start: 1; grid-row-end: 4; grid-column-start: 1; grid-column-end: 2; }
        .instructor { grid-row-start: 1; grid-row-end: 4; grid-column-start: 1; grid-column-end: 2; margin-top: 154px; display: flex; align-items: flex-start; }
        .actions    { display: none; }
        .meta       { grid-row-start: 2; grid-row-end: 3; grid-column-start: 2; grid-column-end: 3; justify-content: flex-start; }
    }

    .thumb { width: 176px; height: 145px; border-radius: 5px; background-color: #ffffff; background-size: cover; background-position: center center; }
    .thumb > img { width: 176px; height: 145px; border-radius: 5px; }
    .brief, .meta { font-family: "Helvetica", sans-serif; font-size: 13px; letter-spacing: 0.09px; line-height: 19px; color: #c2c2c2; }
    .title { font-family: "Avenir Heavy"; font-size: 18px; font-weight: 800; margin: 0; /*color: #fff;*/ }
    .brief { margin: 4px 0; padding: 4px 0; }
    .instructor { display: flex; }
    .meta { display: flex; flex-flow: column nowrap; justify-content: flex-end; align-items: flex-start; font-family: Helvetica; font-size: 13px; letter-spacing: 0.09px; line-height: 20px; color: #bfbebf; }
    .actions { display: flex; justify-content: flex-end; align-items: flex-start; }
    .actions .management-action:first-child { margin-left: 0; }

    .meta .yellow { color: #ff9f00; font-family: "Helvetica"; font-weight: 700; }

    .thumb { position: relative; }
    .thumb .play-icon {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("http://admin.instructor.skydance.lcl:9008/img/player.png") center no-repeat;
        cursor: pointer;
    }

    .label-is-watched, .label-is-new {
        position: absolute;
        top: 3px;
        left: 3px;
        background-color: #85798A;
        border-radius: 10px;
        padding: 2px 6px;
        font-size: 0.76em;
    }

    .label-btn-bookmark {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border-radius: 0 0 0 7px;
        background-color: #85798A;
        cursor: pointer;
    }
    .label-btn-bookmark > * { margin: 8px 11px;font-size: 12px; }
    .label-btn-bookmark.is-bookmarked { background-color: #c42f6f; }

</style>