<template>
    <div class="video_modal">
        <div @click="closeModal" class="close">
            <i class="fas fa-times"></i>
        </div>
        <video-player class="video-player-box"
                      :options="playerOptions"
                      @ready="playerReadied">
        </video-player>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import {videoPlayer} from 'vue-video-player'

    // videojs
    import videojs from 'video.js'
    window.videojs = videojs

    require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

    export default {
        data: function () {
            return {
                playerOptions: {
                    width: '1024px',
                    sources: [{
                        withCredentials: false,
                        type: "application/x-mpegURL",
                        src: this.videoUrl
                    }],
                    controlBar: {
                        timeDivider: false,
                        durationDisplay: false
                    },
                    flash: {hls: {withCredentials: false}},
                    html5: {hls: {withCredentials: false}},
                    poster: this.thumbnail,
                    name: 'player'
                }
            }
        },
        components: {
            videoPlayer
         //   videojs
        },
        props: {
            thumbnail: {
                type: String,
                default: ''
            },
            videoUrl: {
                type: String,
                default: ''
            },
        },
        computed: {},
        mounted() {
        },
        watch: {},
        methods: {
            playerReadied(player) {
                var hls = player.tech({IWillNotUseThisInPlugins: true}).hls;
                player.tech_.hls.xhr.beforeRequest = function (options) {
                    return options
                }
            },
            closeModal() {
                this.$emit('close');
            },
        }
    };
</script>
