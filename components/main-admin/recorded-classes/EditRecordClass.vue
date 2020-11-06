<template>
    <div class="record_edit">
        <p class="record_edit__header">
            Edit
        </p>
        <div class="block">
            <div class="block__edit_link">
                <router-link class="delete" :to="{name: 'categoryClasses', params: {categoryName: categoryName }}">
                    <img src="/img/icons/close_white.svg"/>
                </router-link>
            </div>
            <div class="info" v-if="recordClass!==null">
                <BaseVideoPlayer width="358px" height="262px" className="info__video"
                                 ref="baseVideoPlayer"
                                 :uploadVideoEventName="'recordvideoupload'"
                                 :videoUrl="recordClass.video_aws_converted_url"
                                 :url="recordClass.photo"
                                 :showPlayButtom="true"
                                 :haveUpload="true"
                                 :deleteImgBtn="false">
                </BaseVideoPlayer>
                <div class="info__data">
                    <div class="form-group">
                        <label>Title</label>
                        <div class="input-wrap">
                            <input type="text"
                                   autocomplete="off"
                                   v-model="recordClass.title"
                                   class="form-input"
                                   name="title">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Instructor</label>
                        <base-select
                                :labelFormatter="function(value) {
                                    return value?value.first_name + ' ' + value.last_name:null;
                                }"
                                :list="instructors"
                                v-model="recordClass.instructor"
                                className="form-input instructor_autocomplete"
                                name="instructor"/>
                    </div>
                    <div class="form-group">
                        <label>Level</label>
                        <div class="select-group">
                            <base-dict-select
                                    @input="selectLevel" :options="proficiencyLevelList"
                                    v-model="recordClass.difficulty_level" name="level"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <div class="input-wrap">
                        <textarea v-model="recordClass.description"
                                  class="form-input"
                                  name="description" cols="45">
                                                </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="moves__title">
                <div class="moves__title__text">Moves you'll do</div>
            </div>
            <MovesList :recordClass="recordClass" ref="movesList"/>
            <div class="buttons">
                <button class="save" @click="updateFunc">Save</button>
                <button @click="toPreviewPage" class="preview">Preview</button>
                <button v-if="recordClass" @click="publishFunc" class="publish">
                    {{recordClass.deactivate?'Publish':'Unpublish'}}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import StarRating from 'vue-star-rating';
    import Autocomplete from 'vuejs-auto-complete'
    import {authHeader} from '../../../helpers';
    import BaseVideoPlayer from '../../base/BaseVideoPlayer';
    import MovesList from './blocks/MovesList';
    import {store} from "../../../store";

    export default {
        props: ['classId'],
        components: {BaseVideoPlayer, Autocomplete, StarRating, MovesList},
        data() {
            return {
                recordClass: null,
                duration: 0,
                instructorsUrl: `${process.env.API_URL}/users/get-instructors?page=1&query=`,
                categoryName: '',
                videoRelativePath: '',
                movesArr: []
            };
        },
        mounted() {
            this.getAll({page: 1, params: {role: 3}});
            this.categoryName = this.$route.query.categoryName;
            this.getClassFunc();
            let curObj = this;

            this.$root.$on('recordvideoupload', async (uploadData) => {
                console.log('this.$refs.baseVideoPlayer.video:', this.$refs.baseVideoPlayer.video);
                console.log('recordvideoupload:', uploadData);
                //let videoFileName = await this.uploadVideo({url: uploadData.uploadUrl, file: this.$refs.baseVideoPlayer.video});
                let videoFileName = await this.uploadVideo({url: uploadData.uploadUrl, file: uploadData.uploadFile});
                this.videoRelativePath = uploadData.relativePath;
            });
            this.$root.$on('selected', (data) => {
                this.recordClass.instructor = data;
            });
        },
        destroyed() {
            this.$root.$off('uploadvideo');
        },
        computed: {
            ...mapState('account', {
                proficiencyLevelList: state => state.dictionary.result ? state.dictionary.result.proficiency_level : [],
            }),
            authHeaders() {
                return authHeader();
            },
            ...mapState({
                instructors(state) {
                    return state.users.all.items ? state.users.all.items : [];
                }
            }),
        },
        methods: {
            ...mapActions('users', ['getAll']),
            ...mapActions('classes', [
                'getClass', 'updateClass', 'uploadVideo', 'publish', 'updateMove'
            ]),
            async updateFunc() {
                const {title, description, difficulty_level, instructor, category} = this.recordClass;
                const photo = this.$refs.baseVideoPlayer.photo;
                const video = this.$refs.baseVideoPlayer.video;

                store.commit('ui/startRouteLoading', null, {root: true});
                try {
                    let obj = {
                        classId: this.classId,
                        title,
                        description,
                        level: difficulty_level.id,
                        instructor: this.recordClass.instructor.id,
                        category: this.recordClass.category.id,
                        photo: photo,
                        video: this.videoRelativePath,
                        moves: this.recordClass.moves
                    };
                    let data = await this.updateClass(obj);
                    console.log('success. record update');
                    store.commit('ui/endRouteLoading', null, {root: true});
                } catch (e) {
                    console.log('error', e);
                    store.commit('ui/endRouteLoading', null, {root: true});
                    return;
                }
                this.$emit('close');
                this.$root.$emit('removerecord');
            },
            async getClassFunc() {
                this.recordClass = await this.getClass(this.classId);
            },
            selectInstructor(instructor) {
                this.recordClass.instructor = instructor;
            },
            selectLevel(value) {
                this.recordClass.difficulty_level = value;
            },
            toPreviewPage() {
                this.$router.push({
                    name: 'singleClass',
                    params: {classId: this.classId},
                    query: {categoryName: this.categoryName}
                });
            },
            publishFunc() {
                this.publish(this.classId).then(
                    (resolve) => {
                        this.getClassFunc();
                    }
                );
            }
        }
    }
</script>