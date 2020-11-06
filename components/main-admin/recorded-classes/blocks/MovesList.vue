<template>
    <div v-if="recordClass" class="moves">
        <div
                class="move" v-for="(move, index) in recordClass.moves"
                :id="index" v-drag-and-drop v-on:drag="handleDrag" v-on:drop="handleDrop"
        >
            <div v-if="editable" class="moves__video__wrap">
                <BaseVideoPlayer width="102px" height="85px"
                                 className="moves__photo" :haveUpload="false"
                                 :url="move.thumbnail" :haveUploadPhoto="false"
                                 :showPlayButtom="true"
                />
                <img v-if="editable" @click="removeVideo(index, move)"
                     src="/img/icons/stop_colored.svg" class="delete_video_icon"
                >
            </div>
            <div v-else class="moves__video__wrap">
                <BaseVideoPlayer width="102px" height="85px"
                                 className="moves__photo" :haveUpload="false"
                                 :url="move.video_url" :haveUploadPhoto="false"
                                 :showPlayButtom="false"
                />
                <img v-if="editable" @click="removeVideo(index, move)"
                     src="/img/icons/stop_colored.svg" class="delete_video_icon"
                >
            </div>
            <div v-if="editable" class="move__title">
                <div class="move__title__label">
                    Video Title
                </div>
                <input :value="move.title" type="text" class="move__title__input"/>
            </div>
            <div v-else class="move__title view">
                <div class="move__title__label">
                    {{move.title}}
                </div>
            </div>
        </div>
        <div v-if="editable" class="move">
            <div class="moves__video__wrap" id="addNewMove" ref="addNewMoveWrap">
                <BaseVideoPlayer width="102px" height="85px" className="moves__photo"
                                 ref="newMove"
                                 :haveUpload="true"
                                 :url="newMoveThumbnail"
                                 :haveUploadPhoto="false"
                >
                    <div slot="changevideo">+</div>
                </BaseVideoPlayer>
            </div>

            <div class="move__title">
                <div class="move__title__label">Video Title</div>
                <input v-model="newMoveTitle" type="text" class="move__title__input" />
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex";
    import {store} from "../../../../store";

    export default {
        props: {
            recordClass: {type: Object},
            editable: {type: Boolean, default: true},
        },
        data() {
            return {
                newMoveTitle: '',
                newMoveThumbnail: null,
                currentlyDragging: null,
            };
        },
        mounted() {
            this.$root.$on('uploadvideo', async (uploadData) => {
                try {
                    store.commit('ui/startRouteLoading', null, {root: true});
                    //let videoName = await this.uploadVideo({url: uploadData.link, file: this.$refs.newMove.video});
                    let videoName = await this.uploadVideo({url: uploadData.link, file: uploadData.uploadFile});
                    this.addNewMoveFunc(uploadData.relativePath);
                    store.commit('ui/endRouteLoading', null, {root: true});
                } catch (err) {
                    console.log('err ', err);
                    store.commit('ui/endRouteLoading', null, {root: true});
                }
            });
        },
        destroyed() {
            this.$root.$off('uploadvideo');
        },
        components: {},
        computed: {},
        methods: {
            ...mapActions('classes', ['deleteMove', 'uploadVideo', 'swapOrder']),
            addNewMoveFunc(videoRelativePath) {
                let obj = {
                    thumbnail: this.$refs.newMove.mutatedUrl,
                    title: this.newMoveTitle ? this.newMoveTitle : 'Default Move',
                    video: videoRelativePath
                };
                console.log('obj:', obj);
                this.addNewUploadVideo(obj);
                this.clearNewMoveFrame();
            },
            addNewUploadVideo(obj) {
                this.recordClass.moves.push(obj);
            },
            clearNewMoveFrame() {
                this.$refs.newMove.$refs.fileInput.value = '';
                this.$refs.newMove.mutatedUrl = '';
                this.newMoveTitle = '';
            },
            handleDrop(e) {
                let currentlyDraggingOrder = this.currentlyDragging.id;
                let moveOrder = e.target.closest('.move').id;
                if (e.target.closest('.move').id) {
                    let moveOneId = this.recordClass.moves[currentlyDraggingOrder].id;
                    let moveTwoId = this.recordClass.moves[moveOrder].id;
                    this.swapOrder({
                        moveOneId: moveOneId,
                        moveTwoId: moveTwoId,
                        orderOne: currentlyDraggingOrder,
                        orderTwo: moveOrder,
                    }).then(
                        (resolve) => {
                            let placeholder = this.recordClass.moves[currentlyDraggingOrder];
                            this.$set(
                                this.recordClass.moves,
                                currentlyDraggingOrder,
                                this.recordClass.moves[moveOrder]
                            );
                            this.$set(
                                this.recordClass.moves,
                                moveOrder,
                                placeholder
                            );
                        }
                    );
                }
                this.currentlyDragging = null;
            },
            handleDrag(e) {
                if (!this.currentlyDragging) {
                    this.currentlyDragging = e.srcElement.closest('.move');
                }
            },
            async removeVideo(index, move) {
                if (move.id) {
                    try {
                     //   await this.deleteMove(move.id);
                    } catch (err) {
                        console.log('err ', err);
                    }
                }
                this.recordClass.moves.splice(index, 1);
            },
        }
    }
</script>