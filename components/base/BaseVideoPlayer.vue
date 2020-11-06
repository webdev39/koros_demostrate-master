<template>
    <div :class="className">
        <div class="block__video" :style="avatarSize">
            <div class="video" v-if="mutatedUrl !== null"
                 v-bind:style="{ backgroundImage: 'url(' + mutatedUrl + ')' }"
            >
                <img class="video_icon" v-if="showPlayButtom !== false"
                     @click="playVideo" src="/img/icons/play_video.svg"
                />
            </div>
            <div class="video" v-else v-bind:style="{ backgroundImage: 'url(' + url + ')' }">
                <img class="video_icon" v-if="showPlayButtom !== false"
                     @click="playVideo" src="/img/icons/play_video.svg"
                />
            </div>
            <div v-if="haveUploadPhoto" @click="triggerPhoto"><i class="fas fa-camera icon"/></div>
            <div class="delete-video" v-if="mutatedUrl && haveUpload && deleteImgBtn" @click="deleteImage">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
        </div>
        <div class="change-video" v-if="haveUpload">
            <label @click="trigger">Upload Video</label>
            <input type="file" accept=".mp4" ref="fileInput" @change="uploadFile" />
            <input type="file" accept=".jpg,.jpeg,.png" ref="photoInput" @change="uploadThumbnail" />
        </div>

        <div class="change-video-wrap" @click="trigger">
            <slot name="changevideo"></slot>
        </div>

        <div class="video-demo-container">
            <input type="file" class="file-to-upload" accept="video/mp4" />

            <video class="main-video" controls ref="mainVideo">
                <source type="video/mp4">
            </video>
            <canvas class="video-canvas" ref="canvasVideo"></canvas>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import {getFileFromURL} from "../../helpers";
    import BaseVideoPlayerModal from "./BaseVideoPlayerModal";
    import {store} from "../../store";

    export default {
        data: function () {
            return {
                /** @var {String} mutatedUrl. Example: 'data:image/png;base64,...' */
                mutatedUrl: this.url,
                /** @var {File|null} video */
                video: null,
                photo: null,
                videoPath: '',
                videoRelativePath: '',
            }
        },
        props: {
            url: {type: String, default: null},
            videoUrl: {type: String, default: null},
            haveUploadPhoto: {type: Boolean, default: true},
            haveUpload: {type: Boolean, default: false},
            showPlayButtom: {type: Boolean, default: false},
            deleteImgBtn: {type: Boolean, default: true},
            width: {type: String, default: '42px'},
            height: {type: String, default: '42px'},
            className: {type: String, default: 'avatar'},
            uploadVideoEventName: {type: String, default: 'uploadvideo'},
            type: {type: String, default: 'recordings'},
        },
        computed: {
            avatarSize() {
                return {
                    width: this.width,
                    height: this.height
                };
            }
        },
        destroyed() {
            this.$off('removeloadedmetadata');
        },
        watch: {
            url: function (val) {
                this.mutatedUrl = val;
            }
        },
        methods: {
            ...mapActions('account', ['deletePhoto']),
            ...mapActions('classes', ['generateVideoS3']),
            ...mapActions({
                errorAlert: 'alert/error'
            }),
            deleteImage(e) {
                if (this.mutatedUrl) {
                    this.mutatedUrl = '';
                    this.photo = '';
                    this.$refs.photoInput.value = '';
                }
            },
            uploadFile(e) {
                let timestamp = + new Date();

                this.video = this.$refs.fileInput.files[0];
                this.videoPath = this.type + '/' + timestamp;
                this.videoRelativePath = this.videoPath + '/' + this.video.name;

                store.commit('ui/startRouteLoading', null, {root: true});
                this.generateVideoS3(this.videoRelativePath).then(videoUploadUrl => {
                    this.uploadVideo(videoUploadUrl);
                }).catch((err) => {
                    console.log('Error in BaseVideoPlayer: generateVideoS3:', err);
                    store.commit('ui/endRouteLoading', null, {root: true});
                });
            },
            uploadThumbnail(e) {
                this.photo = this.$refs.photoInput.files[0];
                this.mutatedUrl = URL.createObjectURL(this.photo);
            },
            trigger() {
                this.$refs.fileInput.click();
            },
            triggerPhoto() {
                this.$refs.photoInput.click();
            },
            playVideo() {
                if(!this.videoUrl) {
                    this.errorAlert('Video has no upload!');
                    return;
                }
                console.log('play video');
                this.$modal.show(BaseVideoPlayerModal, {
                        thumbnail: this.mutatedUrl,
                        videoUrl: this.videoUrl
                    },
                    {
                        width: 1024,
                        height: 'auto',
                        classes: [
                            //  'add-record-modal'
                        ],
                        scrollable: true,
                        clickToClose: false
                    });
            },
            makeAutothumbnailName() {
                let videoname = this.video.name.split('.')[0];

                return videoname + '.png'
            },
            uploadVideo(videoUploadUrl) {
                let canvasNode = this.$refs.canvasVideo,
                    canvasCtx = canvasNode.getContext('2d'),
                    videoNode = this.$refs.mainVideo;

                if (['video/mp4'].indexOf(this.video.type) === -1) {
                    console.log('Error : Only MP4 format allowed');
                    return;
                }

                videoNode.querySelector('source').setAttribute('src', URL.createObjectURL(this.video));
                videoNode.load();

                let func = () => {
                    console.log('DEBUG: Duration:', videoNode.duration);

                    /** @var {Float} duration. Example: 5.803 */
                    let duration = videoNode.duration;
                    console.log('DEBUG: duration:', duration);
                    canvasNode.width = videoNode.videoWidth / 5;
                    canvasNode.height = videoNode.videoHeight / 5;
                    videoNode.currentTime = 1;

                    setTimeout(() => {
                        canvasCtx.drawImage(videoNode, 0, 0, videoNode.videoWidth / 5, videoNode.videoHeight / 5);

                        this.mutatedUrl = canvasNode.toDataURL();

                        getFileFromURL(this.mutatedUrl, this.makeAutothumbnailName()).then((res) => {
                            this.photo = res;

                            console.log('ui/endRouteLoading');
                            store.commit('ui/endRouteLoading', null, {root: true});

                            let uploadParams = {
                                link: videoUploadUrl,
                                uploadUrl: videoUploadUrl,
                                uploadFile: this.video,
                                relativePath: this.videoRelativePath,
                            };
                            this.$root.$emit(this.uploadVideoEventName, uploadParams);
                            this.$emit('removeloadedmetadata', {});
                        });
                    }, 1500);
                };

                this.$on('removeloadedmetadata', async (data) => {
                    videoNode.removeEventListener('loadedmetadata', func);
                });

                videoNode.addEventListener('loadedmetadata', func);
            }
        }
    };
</script>
