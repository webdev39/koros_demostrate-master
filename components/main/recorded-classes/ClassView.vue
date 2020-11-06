<template>
    <div class="wrap">
        <div class="class-page">
            <div :class="{'content-desktop sidebar-filter__': (!isMobile || !isUser)}">
                <div class="" v-if="item.id">
                    <!--<BaseVideoPlayer width="358px" height="262px" className="info__video"
                         :showPlayButtom="true" :haveUploadPhoto="false" :deleteImgBtn="false"
                         :url="item.photo" :videoUrl="item.video_aws_converted_url" />-->

                    <dynamic-header :text="`Category / ${item.category.name}`" mobile-text="" mobile-left-action="back" />

                    <div class="class-about">
                        <ui-thumbnail :url="item.photo" :video="item.video_aws_converted_url"
                                     size="md"
                                     :mobileStyle="{width: '100%', height: '400px', borderRadius: 'unset'}" />

                        <div class="described padding-layer">
                            <div class="instructor">
                                <base-class-rating :instructor="item.instructor" />
                            </div>

                            <div class="category-name">
                                <h2>{{ item.category.name }}</h2>
                            </div>

                            <div class="title">
                                <h3 style="margin-block-end: 4px;">{{ item.title }}</h3>
                            </div>

                            <div class="meta" style="margin-block-end: 15px;">
                                <div class="level">Level: <span class="yellow">{{ item.difficulty_level.name }}</span></div>
                            </div>

                            <div class="brief">{{item.description}}</div>
                        </div>
                    </div>

                    <div class="padding-layer">
                        <section class="moves-wrap">
                            <!-- @todo Будут разные Titles под *сериями* видео. Они хотят сделать так: Title 1 with 3-4 videos, Title 2 with 3-4 videos и тд -->
                            <h4>Moves you’ll do</h4>
                            <!--<MovesList :recordClass="item" :editable="false" />-->
                            <ui-slider :items="demoMoves" @clickSlide="onClickRecording"></ui-slider>
                        </section>

                        <section class="">
                            <h4>Take Samba in Other Categories</h4>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MobileWidthMixin from '../../../mixins/MobileWidthMixin';
    import {mapActions, mapGetters, mapState} from 'vuex';
    import BaseVideoPlayer from '../../base/BaseVideoPlayer';
    import BaseClassRating from '../../base/BaseClassRating';
    import MovesList from '../../main-admin/recorded-classes/blocks/MovesList';
    import UiSlider from '../../common/UiSlider';
    import UiThumbnail from '../../common/UiThumbnail';
    import DynamicHeader from '../tips/ui/DynamicHeader';

    export default {
        name: 'ClassView',
        components: {DynamicHeader, UiThumbnail, UiSlider, MovesList, BaseClassRating, BaseVideoPlayer},
        mixins: [MobileWidthMixin],
        data() {
            return {
                classId: this.$route.params.classId,
                item: {},
                demoMoves: [
                    {title: 'Some very long title text for testing text flow', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/images/2a09fed4-ca63-4834-af99-d5c591a2a961.jpg'},
                    {title: 'Short title', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/categories/upper-body.png'},
                    {title: 'Short middle long title text', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/photo/9f733af3-4b06-49ba-a084-9c6926e4d987.jpg'},
                    {title: 'Some very long title text for testing text flow', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/images/2a09fed4-ca63-4834-af99-d5c591a2a961.jpg'},
                    {title: 'Short title', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/categories/upper-body.png'},
                    {title: 'Short middle long title text', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/photo/9f733af3-4b06-49ba-a084-9c6926e4d987.jpg'},
                    {title: 'Some very long title text for testing text flow', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/images/2a09fed4-ca63-4834-af99-d5c591a2a961.jpg'},
                    {title: 'Short title', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/categories/upper-body.png'},
                    {title: 'Short middle long title text', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/photo/9f733af3-4b06-49ba-a084-9c6926e4d987.jpg'},
                    {title: 'Some very long title text for testing text flow', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/images/2a09fed4-ca63-4834-af99-d5c591a2a961.jpg'},
                    {title: 'Short title', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/categories/upper-body.png'},
                    {title: 'Short middle long title text', thumbnail: 'https://d3v8owuq0t8cc2.cloudfront.net/photo/9f733af3-4b06-49ba-a084-9c6926e4d987.jpg'},
                ]
            };
        },
        computed: {
            ...mapGetters('account', ['isUser', 'isAdmin', 'isInstructor']),
        },
        mounted() {
            this.loadClass();
        },
        methods: {
            ...mapActions('classes', ['getClass']),
            async loadClass() {
                let item = await this.getClass(this.classId);
                console.log('item:', item);
                console.log('moves:', item.moves);
                this.$set(this, 'item', item);
            },
            onClickRecording(e, item) {
                console.log('onClickRecording:', e, item);
            }
        }
    }
</script>

<style>
    @import "src/static/core/layout.scss";

    .app.is-desktop .class-page .class-about { display: flex; }
    .app.is-desktop .class-page header { margin-block-end: 20px; }
    .app .class-page .class-about .described { margin-top: 15px; }
    .app.is-desktop .class-page .class-about .described { margin-left: 50px; }
    .app.is-desktop .class-page .class-about .described .category-name { display: none; }

    .app.is-mobile .class-page .class-about { margin-top: -85px; }
</style>

<style scoped>
    .brief, .meta { font-family: "Helvetica", sans-serif; font-size: 13px; letter-spacing: 0.09px; line-height: 19px; }
    .brief { color: #c2c2c2; }
    .meta .yellow { color: #ff9f00; font-family: "Helvetica"; font-weight: 700; }
</style>