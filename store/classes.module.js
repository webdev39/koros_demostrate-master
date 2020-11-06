import { liveClassesService, recClassesService } from '../services';
import { router, validateFields } from '../helpers';
import moment from 'moment';

const state = {
  loading: false,
  pageNumber: 1,
  weekNumber: 1,
  instructorIds: [],
  classTypeIds: [],
  difficultyLevelIds: [],
  liveClassCourses: null,
  liveClassCoursesTotal: null,
  liveClassCourse: null,
  liveClass: null,
  currentLiveInCourses: false,
  websocketToken: null,
  streamUrl: null,
  streamKey: null,

  categories: [],
  upcomingLiveClasses: [],
  recordedClasses: []
}

const actions = {
  findLiveClassCourses({ state, commit }) {
    return liveClassesService.findLiveClassCourses({
      page: state.pageNumber,
      instructor_id: state.instructorIds,
      class_type_id: state.classTypeIds,
      difficulty_level_id: state.difficultyLevelIds
    })
    .then((result) => {
      commit('setLiveClassCourses', result.live_classes);
      commit('setLiveClassCoursesTotal', result.total)
    })
  },
  fetchLiveClassCourse({ commit, dispatch }, {courseId, secret}) {
    return liveClassesService.fetchLiveClassCourse({courseId, secret})
    .then((course) => {
      commit('setLiveClassCourse', course);
      course.current_week && commit('setWeek', course.current_week);
    })
    .catch(error => {
      if (error.response.status === 403 && error.response.data.message) {
        dispatch(
          'alert/error',
          error.response.data.message,
          {root: true}
        );
        Promise(reject);
      }
    })
  },
  fetchLiveClass({ commit }, { courseId, liveClassId, secret }) {
    return liveClassesService.fetchLiveClass({
      courseId, liveClassId, secret
    })
    .then((curClass) => {
      commit('setLiveClass', curClass);
    })
  },
  secretValidate(context, data) {
    return liveClassesService.secretValidate(data)
    .then((response) => {
      console.log('secret true', response.data.result)
    });
  },
  createLiveClassCourse({ commit, rootGetters }, data) {
    commit('ui/startLoading', null, { root: true });
    return liveClassesService.createLiveClassCourse(data)
      .then((response) => {
        router.push({
          name: rootGetters['account/isInstructor']
            ? 'liveClassCourse'
            : 'adminLiveClassCourse',
          params: {
            courseId: response.data.result.live_class.id
          }
        });
      })
      .catch((error => error.response && validateFields(error.response.data.errors)))
      .finally(() => {
        commit('ui/endLoading', null, { root: true });
      })
  },
  createLiveClass({ commit }, { courseId, data }) {
    commit('ui/startLoading', null, { root: true });
    liveClassesService.createLiveClass({ courseId, data })
    .then(async () => {
      router.go(-1);
      // await dispatch('fetchLiveClass', { courseId, secret })
    })
    .catch((error => error.response &&
      validateFields(error.response.data.errors)
    ))
    .finally(() => {
      commit('ui/endLoading', null, { root: true });
    })
  },
  editLiveClassCourse({ commit, rootGetters }, { courseId, data }) {
    commit('ui/startLoading', null, { root: true });
    liveClassesService.editLiveClassCourse({ courseId, data })
      .then(() => {
        router.push({
          name: rootGetters['account/isInstructor']
            ? 'liveClassCourse'
            : 'adminLiveClassCourse'
        });
      })
      .catch((error => error.response && validateFields(error.response.data.errors)))
      .finally(() => {
        commit('ui/endLoading', null, { root: true });
      })
  },
  editLiveClass({ commit }, { courseId, data, liveClassId }) {
    commit('ui/startLoading', null, { root: true });
    liveClassesService.editLiveClass({ courseId, data, liveClassId })
    .then(async () => {
      router.go(-1);
    })
    .catch((error => error.response &&
      validateFields(error.response.data.errors)
    ))
    .finally(() => {
      commit('ui/endLoading', null, { root: true });
    })
  },
  removeLiveClassCourse({ commit, dispatch }, { courseId }) {
    commit('ui/startRouteLoading', null, { root: true });
    return liveClassesService.removeLiveClassCourse( { courseId })
    .then(async () => {
      dispatch('alert/success', 'Live class was removed', {root: true});
      await dispatch('findLiveClassCourses');
    })
    .finally(() => {
      commit('ui/endRouteLoading', null, { root: true });
    })
  },
  removeLiveClass({ commit }, { courseId, liveClassId}) {
    commit('ui/startRouteLoading', null, { root: true });
    return liveClassesService.removeLiveClass({ courseId, liveClassId })
    .then(async () => {
      await dispatch('fetchLiveClass', { courseId, secret });
    })
    .finally(() => {
      commit('ui/endRouteLoading', null, { root: true });
    })
  },
  deactivateLiveClassCourse({ commit, dispatch }, {
    courseId, deactivated
  }) {
    const msg = deactivated
      ? 'Live class course was deactivated'
      : 'Live class course was activated'
    commit('ui/startRouteLoading', null, { root: true });
    return liveClassesService.deactivateLiveClassCourse({ courseId, deactivated })
    .then(() => {
      commit('setCourseDeactivated', courseId);
      dispatch('alert/success', msg, {root: true});
    })
    .catch(() => {
      dispatch('alert/error', 'Something went wrong', {root: true});
    })
    .finally(() => {
      commit('ui/endRouteLoading', null, { root: true });
    })
  },
  deactivateLiveClass({ commit, dispatch }, {
    courseId, liveClassId, deactivated
  }) {
    const msg = deactivated
      ? 'Live class was deactivated'
      : 'Live class was activated'
    commit('ui/startRouteLoading', null, { root: true });
    return liveClassesService.deactivateLiveClass({
      courseId, liveClassId, deactivated
    })
    .then(() => {
      commit('setDeactivated', liveClassId);
      dispatch('alert/success', msg, {root: true});
    })
    .catch(() => {
      dispatch('alert/error', 'Something went wrong', {root: true});
    })
    .finally(() => {
      commit('ui/endRouteLoading', null, { root: true });
    })
  },
  addToBookmarks({ commit, dispatch }, { type, id, status }) {
    const msg = status
      ? 'Live class was added to bookmarks'
      : 'Live class was removed from bookmarks'
      liveClassesService.addToBookmarks({ type, id, status })
      .then(() => {
        commit('setBookmarked', id);
        dispatch('alert/success', msg, {root: true});
      })
  },
  startLive({ dispatch, commit }, data) {
    return liveClassesService.startLive(data)
    .then(response => {
      commit('setStreamData', response.data.result);
    })
    .catch(error => {
      if (error.response.status === 500 && error.response.data.message) {
        dispatch(
          'alert/error',
          error.response.data.message,
          {root: true}
        );
        Promise(reject);
      }
    })
  },
  stopLive({ dispatch }, data) {
    return liveClassesService.stopLive(data)
    .catch(error => {
      if (error.response.status === 500 && error.response.data.message) {
        dispatch(
          'alert/error',
          error.response.data.message,
          {root: true}
        );
      }
    });
  },
  connectLive({ dispatch, commit }, data) {
    return liveClassesService.connectLive(data)
    .then(response => {
      commit('setStreamData', response.data.result);
    })
    .catch(error => {
      console.log(error.response)
      // if (error.response.status === 500 && error.response.data.message) {
      //   dispatch(
      //     'alert/error',
      //     error.response.data.message,
      //     {root: true}
      //   );
      // }
    })
  },
  sendMessage({ dispatch }, data) {
    return liveClassesService.sendMessage(data)
      .catch(() => {
        dispatch(
          'alert/error',
          'Something went wrong! Message hasn\'t been saved!',
          {root: true}
        );
      })
  },
  generateVideoS3({dispatch, commit}, videoRelativePath) {
        return recClassesService.generateVideoS3({filename: videoRelativePath})
            .then(
                (data) => {
                    return data.result.link;
                }
            ).catch(function (error) {
                dispatch('alert/error', error, {root: true});
                throw error;
            });
    },
    uploadVideo({dispatch, commit}, {url, file}) {
        return new Promise(function (resolve, reject) {
            let oReq = new XMLHttpRequest();
            oReq.open('PUT', url, true);
            oReq.onload = function (oEvent) {
                //dispatch('alert/success', 'Video has been upload', {root: true});
                resolve(`${file.name}`);
            };
            oReq.send(file);
        });
    },
    add({dispatch, commit}, {title, description, level, instructor, category, photo, videoAwsUrl}) {
        return recClassesService.add(
            {title, description, level, instructor, category, photo, videoAwsUrl}
        )
            .then(
                (data) => {
                    dispatch('alert/success', 'Record was added', {root: true});
                    console.log('aws link was generated succesully');

                    return data;
                }
            ).catch(function (error) {
                dispatch('alert/error', error, {root: true});
                throw error;
            });
    },
    updateClass({dispatch, commit}, {classId, title, description, level, instructor, category, photo, video, moves}) {
        return recClassesService.updateClass(
            classId, {title, description, level, instructor, category, photo, video, moves}
        )
            .then(
                (data) => {
                    dispatch('alert/success', 'Record was updated', {root: true});

                    return data;
                }
            ).catch(function (error) {
                dispatch('alert/error', error, {root: true});
                throw error;
            });
    },
    getClassesCategories({commit}) {
        return recClassesService.getClassesCategories()
            .then((data) => {
                commit('setCategories', data.result.categories);
                return true;
            })
    },
    getClass({commit}, id) {
        return recClassesService.getClass(id)
            .then((data) => {
                return data.result.class;
            })
    },
    getUpcomingLiveClasses({commit}) {
        return recClassesService.getUpcomingLiveClasses()
            .then((data) => {
                commit('setUpcomingLiveClasses', data.result.live_classes);
            })
    },
    fetchRecordedClasses({state, commit}, {id, page = 1, filters}) {
        return recClassesService.fetchRecordedClasses(id, page, filters)
            .then((result) => {
                commit('setRecordedClasses', result);
            })
    },
    deactivateOrActivate({dispatch, commit}, id) {
        return recClassesService.deactivateOrActivate(id)
            .then(
                async (success) => {
                    dispatch('alert/success', 'Class was deactivated or activated', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    deleteMove({dispatch, commit}, id) {
        return recClassesService.deleteMove(id)
            .then(
                async (success) => {
                    dispatch('alert/success', 'Move was deleted', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    delete({dispatch, commit}, id) {
        return recClassesService.delete(id)
            .then(
                async (success) => {
                    dispatch('alert/success', 'Class was deleted', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    publish({dispatch, commit}, id) {
        return recClassesService.publish(id)
            .then(
                async (success) => {
                    dispatch('alert/success', 'Class was publish', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    updateMove({dispatch, commit}, {moveId, thumbnail, title, order}) {
        return recClassesService.updateMove(moveId, {thumbnail, title, order})
            .then(
                async (success) => {
                    dispatch('alert/success', 'Move was updated', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    swapOrder({dispatch, commit}, {moveOneId, moveTwoId, orderOne, orderTwo}) {
        return recClassesService.swapOrder({moveOneId, moveTwoId, orderOne, orderTwo})
            .then(
                async (success) => {
                    dispatch('alert/success', 'Order was changed', {root: true});

                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    }
};
const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setUpcomingLiveClasses(state, classes) {
        state.upcomingLiveClasses = classes;
    },
    setRecordedClasses(state, data) {
        state.recordedClasses = {
            items: data.result.recorded_classes,
            lastPage: data.result.meta.last_page,
            perPage: data.result.meta.per_page,
            currentPage: data.result.meta.current_page
        };
    },
    clearRecordedClasses(state) {
        state.recordedClasses = {};
    },
  setLiveClassCourses(state, courses) {
    state.liveClassCourses = courses;
  },
  setLiveClassCoursesTotal(state, total) {
    state.liveClassCoursesTotal = total
  },
  setLiveClassCourse(state, course) {
    state.liveClassCourse = course;
  },
  setWeek(state, week) {
    state.weekNumber = week;
  },
  setLiveClass(state, curClass) {
    state.liveClass = curClass;
  },
  setEmptyLiveClassCourse(state) {
    state.liveClassCourse = null
  },
  setEmptyLiveClass(state) {
    state.liveClass = null
  },
  setStreamData(state, data) {
    state.websocketToken = data.websocket_token;
    state.streamUrl = data.url;
    state.streamKey = data.key;
  },
  checkInstructor(state, id) {
    const index = state.instructorIds.indexOf(id);
    index !== -1
      ? state.instructorIds.splice(index, 1)
      : state.instructorIds.push(id);
  },
  checkClassType(state, id) {
    const index = state.classTypeIds.indexOf(id);
    index !== -1
      ? state.classTypeIds.splice(index, 1)
      : state.classTypeIds.push(id);
  },
  checkDiffLevel(state, id) {
    const index = state.difficultyLevelIds.indexOf(id);
    index !== -1
      ? state.difficultyLevelIds.splice(index, 1)
      : state.difficultyLevelIds.push(id);
  },
  checkClassTypes(state, ids) {
    state.classTypeIds = ids;
  },
  checkDiffLevels(state, ids) {
    state.difficultyLevelIds = ids;
  },
  setPageNumber(state, number) {
    state.pageNumber = number
  },
  resetCheckedInstrs(state) {
    state.instructorIds = [];
  },
  // setCourseBookmarked(state, id) {
  //   const liveClassCourse = state.liveClassCourses.find(l => l.id === id)
  //   liveClassCourse.bookmarked = !liveClassCourse.bookmarked;
  // },
  setBookmarked(state, id) {
    const liveClass = state.liveClassCourse.videos.find(l => l.id === id)
    liveClass.favorite = !liveClass.favorite;
  },
  setCourseDeactivated(state, id) {
    const liveClassCourse = state.liveClassCourses.find(l => l.id === id)
    liveClassCourse.deactivated = !liveClassCourse.deactivated;
  },
  setDeactivated(state, id) {
    const liveClass = state.liveClassCourse.videos.find(v => v.id === id)
    liveClass.deactivated = !liveClass.deactivated;
  },
  setCurrentLiveInCourses(state) {
    state.currentLiveInCourses = state.liveClassCourses.some(course => course.live);
  }
}

const getters = {
    classInstructorName(state) {
        return (instructor) => {
            return !instructor.subprofile
                ? `${instructor.first_name} ${instructor.last_name}`
                : `${instructor.first_name} & ${instructor.subprofile.first_name}`
        }
    },
    isLiveClassPast(state) {
        return (endDateTime) => {
            return moment() > moment.unix(endDateTime);
        }
    },
    isLiveClassFuture(state) {
        return (startDateTime) => {
            return moment() < moment.unix(startDateTime);
        }
    },
    isLiveClassCourseFuture(state) {
        return (startDate) => {
            return moment() < moment(startDate);
        }
    },
    timeToStart(state) {
      return (startDate) => {
        return moment().to(startDate);
      }
    },
    isLiveClassCurrent(state) {
        return (startDateTime, endDateTime) => {
            return moment() > moment.unix(startDateTime) && moment() < moment.unix(endDateTime)
        }
    },
    nextLiveClassStr(state) {
        return (liveClass) => liveClass.next_live && `${moment.unix(liveClass.next_live.start_datetime).format('YYYY/MM/DD')} - ${moment.unix(liveClass.next_live.end_datetime).format('YYYY/MM/DD')}`
    },
    videoTimeStr(state) {
      return (video) => `${moment(video.start_datetime).format('YYYY/MM/DD')} - ${moment(video.end_datetime).format('YYYY/MM/DD')}`
    },
    weekVideos(state) {
      return state.liveClassCourse.videos.filter(
        video => video.week === state.weekNumber);
    }
};

export const classes = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
