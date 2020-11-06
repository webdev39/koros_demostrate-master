<template>
    <div class="thumbnail" :style="thumbnailStyles">
        <div class="play-icon" @click="onPlay" v-if="hasPlayIcon"></div>

        <div class="tl">
            <div class="label live" v-if="$slots.live"><slot name="live"></slot></div>
        </div>

        <div class="tr">
            <div class="label soon" v-if="$slots.soon"><slot name="soon"></slot></div>
            <div class="bookmark" v-if="$slots.bookmark"><slot name="bookmark"></slot></div>
        </div>

        <div class="bl">
            <div class="title"><slot name="title"></slot></div>
            <div class="level"><slot name="level"></slot></div>
        </div>

        <div class="br">
            <div class="duration"><slot name="duration"></slot></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import MobileWidthMixin from '../../mixins/MobileWidthMixin';

    export default {
        name: 'UiThumbnail',
        mixins: [MobileWidthMixin],
        props: {
            url: {type: String, required: true},
            video: {type: String},
            size: {type: String, default: 'xs'}, // xs, sm, md, ..
            canPlay: {type: Boolean},
            mobileStyle: {type: Object, default: () => {return {}; }, required: false},
        },
        computed: {
            //...mapGetters('account', ['isUser', 'isAdmin', 'isInstructor']),
            hasPlayIcon() { return this.video || this.canPlay || this.$listeners.play },
            thumbnailStyles() {
                let styles = {};
                styles.backgroundImage = 'url(' + this.url + ')';
                styles.borderRadius = '10px';
                styles.flex = '0 0 auto'; // @note Fix a decrease width for flex/desktop
                //styles.marginBottom = '15px';

                switch (this.size) {
                    case 'xs': styles.width = '208px'; styles.height = '172px'; break;
                    case 'sm': styles.width = '325px'; styles.height = '238px'; break;
                    case 'md': styles.width = '358px'; styles.height = '262px'; break;
                    //case 'ls': styles.width = '358px'; styles.height = '262px'; break;
                }

                if (this.isMobile) {
                    styles = Object.assign({}, styles, this.mobileStyle);
                    styles = Object.assign({}, styles, this.mobileStyle);
                }

                return styles;
            }
        },
        methods:{
            onPlay(e) {
                this.$emit('play');
            }
        }
    }
</script>

<style scoped>
    .thumbnail {
        position: relative;
        background-size: cover;
        background-position: center center;
        box-shadow: inset 0 0 0 1000px rgba(27, 0, 39, 0.6);
    }

    .play-icon {
        position: absolute;
        cursor: pointer;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("http://admin.instructor.skydance.lcl:9008/img/player.png") center no-repeat;
    }

    .bl { position: absolute; left: 18px; bottom: 15px; }
    .br { position: absolute; right: 18px; bottom: 15px; }
    .tl { position: absolute; left: 18px; top: 15px; }
    .tr { position: absolute; right: 18px; top: 15px; }

    .title { font-family: "Avenir Medium"; font-size: 18px; font-weight: 500; margin-bottom: 5px; }
    .level { font-family: "Helvetica"; font-size: 13px; font-weight: 400; }
    .level span { font-weight: 700; }
    .duration { font-family: "Avenir Medium"; font-size: 15px; font-weight: 500; text-transform: uppercase; }
    .label { border-radius: 10px; padding: 3px 10px;}
    .soon { font-family: "Helvetica"; font-size: 13px; font-weight: 700; background-color: rgba(185, 150, 255, 0.5); }
    .live { font-family: "Avenir Heavy"; font-size: 11px; font-weight: 800; ;background-color: #f64f63;}
</style>