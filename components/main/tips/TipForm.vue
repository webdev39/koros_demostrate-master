<template>
    <div class="record_edit tip-form-modal">

        <h5 class="record_edit__header modal-header">Edit Tip</h5>

        <a class="modal-close" @click="modalClose" style="cursor: pointer">
            <img src="/img/icons/close_white.svg"/>
        </a>

        <div class="block">
            <div class="info">
                <BaseVideoPlayer ref="video" class-name="info__video"
                                 width="358px" height="262px"
                                 :url="tip.thumbnail"
                                 :video-url="tip.video_url"
                                 __videoUrl="tip.videoAwsUrl"
                                 :have-upload-photo="true"
                                 :have-upload="true"
                                 :upload-video-event-name="'tipVideoUpload'"
                                 type="tips"
                                 :show-play-buttom="true"
                                 :delete-img-btn="false">
                    <template #changevideo>
                        <div style="display: flex; flex-flow: column; align-items: center; margin-top: 10px;">
                            <input type="hidden" name="video_url" required />
                            <input type="hidden" name="thumbnail_blob" required />
                        </div>
                    </template>
                </BaseVideoPlayer>

               <!-- <BaseVideoPlayer ref="video" className="info__video"
                                 width="358px" height="262px"
                                 uploadVideoEventName="recordvideoupload"
                                 :url="tip.thumbnail"
                                 :showPlayButtom="true"
                                 :haveUpload="true"
                                 :deleteImgBtn="false">
                    <template #changevideo>
                        <div style="display: flex; flex-flow: column; align-items: center; margin-top: 10px;">
                            <input type="hidden" name="video_url" required />
                            <input type="hidden" name="thumbnail_blob" required />
                        </div>
                    </template>
                </BaseVideoPlayer> -->


                <div class="info__data">
                    <div class="form-group">
                        <label>Title</label>
                        <div class="input-wrap">
                            <input type="text" autocomplete="off" v-model="tip.title" class="form-input" name="title" required>
                            <!--@note Example invalid feedback: <div class="inputErrorMessage">The title field is required.</div>-->
                        </div>
                    </div>

                    <div class="form-group" v-if="isAdmin">
                        <label>Instructor</label>
                        <base-select name="instructor_id" className="form-input instructor_autocomplete"
                            :list="instructors" v-model="tip.instructor"
                            :labelFormatter="function(value) { return value?value.first_name + ' ' + value.last_name:null; }"/>
                    </div>

                    <div class="form-group">
                        <label>Type</label>
                        <div class="select-group">
                            <base-dict-select @input="selectType" :options="classTypes" v-model="tip.class_type" name="class_type_id"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Level</label>
                        <div class="select-group">
                            <base-dict-select @input="selectLevel" :options="difficultyLevels" v-model="tip.difficulty_level" name="difficulty_level_id"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <div class="input-wrap">
                            <textarea v-model="tip.description" class="form-input" name="description" cols="45"></textarea>
                        </div>
                    </div>

                    <div class="buttons" style="display: flex; justify-content: center;">
                        <button class="save" @click="onSave">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import {api, validateFields, removeValidationsMessages} from '../../../helpers';
    import BaseVideoPlayer from '../../base/BaseVideoPlayer';
    import MovesList from '../../main-admin/recorded-classes/blocks/MovesList';
    import {store} from '../../../store';
    import BaseDictSelect from '../../base/BaseDictSelect';
    //import {preparePostRequest} from '../../../services/main.service'; // @note Not working correct for blob types..

    export default {
        name: 'TipForm',
        components: {BaseDictSelect, BaseVideoPlayer, MovesList}, // StarRating, Autocomplete,
        props: {
            tipId: {type: [Number, String]},
            item: {type: Object, default: () => { return {}; }},
            onSaved: {type: Function},
        },
        data() {
            return {
                tip: this.item,
                videoAwsPath: '',
                videoAwsUrl: '',
            };
        },
        mounted() {
            if (this.isAdmin) {
                // @note Load instructors.
                this.getAll({page: 1, params: {role: 3}}); // @todo Cached
            }

            if (!(this.tip && this.tip.id) && this.tipId) {
                this.loadTip();
            }

            // @todo Refactoring it. Move from $root event bus to component.
            this.$root.$on('tipVideoUpload', async (uploadData) => {
                this.videoFileName = await this.uploadVideo({url: uploadData.uploadUrl, file: uploadData.uploadFile}); // { ..,  file: this.$refs.video.video}
                this.videoAwsPath = uploadData.relativePath;
            });

            // @todo Refactoring it. Move from $root scope to component <selected-users type="instructor" /> or <selected-instructors/>.
            this.$root.$on('selected', (instructor) => {
                this.tip.instructor = instructor;
                this.tip.instructor_id = instructor.id;
            });
        },
        destroyed() {
            this.$root.$off('uploadvideo');
        },
        computed: {
            ...mapGetters({
                isAdmin: 'account/isAdmin',
            }),
            ...mapState('account', {
                instructors: state => state.dictionary.result.instructors,
                classTypes: state => state.dictionary.result.class_types,
                difficultyLevels: state => state.dictionary.result.difficulty_levels,
            }),
            ...mapState({
                instructors(state) {
                    return state.users.all.items ? state.users.all.items : [];
                }
            }),
        },
        methods: {
            ...mapActions('users', ['getAll']),
            ...mapActions('classes', ['uploadVideo']),
            ...mapMutations({
                alertError: 'alert/error',   // @todo Why this isn't a global library `alert` or `notice`?
                alertSuccess: 'alert/success',
            }),
            async loadTip() {
                this.tip = await api.get(`tips/${this.tipId}`);
            },
            selectInstructor(instructor) {
                this.tip.instructor = instructor;
            },
            selectType(value) {
                this.tip.class_type = value;
            },
            selectLevel(value) {
                this.tip.difficulty_level = value;
            },
            modalClose() {
                this.$emit('close');
            },
            async onSave() {
                let tip = this.tip;
                let data = {
                    title: tip.title || null,
                    description: tip.description || null,
                    class_type_id: tip.class_type ? tip.class_type.id : null,
                    difficulty_level_id: tip.difficulty_level ? tip.difficulty_level.id : null,
                    instructor_id: tip.instructor ? tip.instructor.id : null,
                    thumbnail_blob: this.$refs.video.photo, // @note New uploaded image. `this.$refs.video.video` - New uploaded video (s3 link)
                    video_url: this.videoAwsPath,
                };

                if (!tip.id && (!data.video_url || !data.thumbnail_blob)) {
                    removeValidationsMessages();
                    let errors = {};
                    !data.video_url && (errors.video_url = ['The video field is required.']);
                    !data.thumbnail_blob && (errors.thumbnail_blob = ['The thumbnail field is required.']);
                    validateFields(errors);
                    return;
                }

                store.commit('ui/startRouteLoading', null, {root: true});

                try {
                    let promise;
                    let reqConfig = { headers: {'content-type': 'multipart/form-data'} };
                    let preparedFormData = this.prepareTipFormData(data);

                    if (this.tip.id) {
                        //promise = api.put(`tips/${this.tip.id}`, preparedFormData, reqConfig); // @note Laravel can't to correct detect a request parameters.

                        //promise = api.post(`tips/postUpdate/${this.tip.id}`, preparedFormData, reqConfig);
                        //promise = api.post(`tips/postUpdate`, preparedFormData, reqConfig); // @note Example of duplicate functional

                        preparedFormData.append('_method', 'PUT');
                        promise = api.post(`tips/${this.tip.id}`, preparedFormData, reqConfig);
                    } else {
                        promise = api.post(`tips/`, preparedFormData, reqConfig);
                    }

                    await promise.then((response) => {
                        this.alertSuccess('Tip was saved.');

                        this.onSaved && this.onSaved();
                        this.$emit('saved');

                        this.modalClose();
                        this.$root.$emit('removerecord');
                    }).catch(err => {
                        if (err.response && err.response.data && (err.response.status === 422 || err.response.data.errors)) {
                            removeValidationsMessages();
                            validateFields(err.response.data.errors || {});
                        }
                    });

                    store.commit('ui/endRouteLoading', null, {root: true});
                } catch (err) {
                    store.commit('ui/endRouteLoading', null, {root: true});
                    this.alertError(err, {root: true}); // 'Unexpected exception. Sorry :('
                }
            },
            prepareTipFormData(data) {
                let formData = new FormData();

                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('class_type_id', data.class_type_id);
                formData.append('difficulty_level_id', data.difficulty_level_id);
                this.isAdmin && formData.append('instructor_id', data.instructor_id);
                formData.append('video_url', data.video_url);
                data.thumbnail_blob && formData.append('thumbnail_blob', data.thumbnail_blob);

                return formData;
            }
        }
    }
</script>

<style scoped>
    .block { background-color: inherit; }
    .record_edit { padding: 0; margin-top: 50px; }

    .modal-header { text-align: center; }
    .modal-close { position: absolute; top: 18px;right: 18px; }

    .form-group { max-width: 400px; }
    .form-group label { margin-right: 20px; }
    .add-record-modal .form-input { width: 100% !important; max-width: 256px; }

    /*input:invalid, select:invalid { border-color: #a12a40; }*/
</style>

<style>
    /*.tip-form-modal .select-group .select .selected:after { top: calc(50% - 2px); right: 16px; }*/
    .tip-form-modal .select-group .select .selected:after { top: 20px; right: 16px; }
</style>