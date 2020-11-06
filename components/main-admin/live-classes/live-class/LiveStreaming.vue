<template>
  <div class="streaming-page">
    <div
      class="streaming-main"
      v-if="canStartStream">
      <div
        class="stream-status"
        :class="{ error: streamStatus === 4 }"
      >
        {{ streamStatusStr }}
      </div>
      <h2>Run LIVE session</h2>
      <ol>
      <li>Run OBS software</li>
      <li>Open “Settings” by clicking on appropriate button in the right bottom corner</li>
      <li>Choose “Stream” menu item</li>
      <li>In the “Service” drop down menu choose “Custom”</li>
      <li>In the “Server” input put following URL: <span>{{ streamUrl }}</span></li>
      <li>In the “Stream Key” input put following key: <span>{{ streamKey }}</span> </li>
      <li>Close the “Settings” window</li>
      <li>Now you can start LIVE streaming by clicking “Start       Streaming” button in the right bottom corner</li>
      </ol>
      <h2>Stop LIVE session</h2>
      <div>To stop the LIVE session you have to click the “STOP” button on that page.
        In the OBS software streaming will automatically be turned off.</div>
      <button
        v-if="showStopButton"
        class="btn btn-primary"
        @click="stop"
      >
        Stop
      </button>
      <button
        v-else
        class="btn btn-primary"
        @click="$router.go(-1)"
      >
        Close
      </button>
    </div>
    <div
      v-else
      class="streaming-main"
    >
      <video-player
        class="video-player-box"
        :options="playerOptions"
        @ready="playerReadied"
      >
      </video-player>
    </div>
    <div class="messenger-block">
      <div class="streaming-chat">
        <div class="comments-amount">
          Comments ({{ messages.length }})
        </div>
        <div class="messages">
          <div
            class="message"
            v-for="(message, index) in messages"
            :key="index"
          >
            <base-avatar
              :url="message.user.photo"
            />
            <div class="message-content">
              <div class="message-text">
                {{ message.message }}
              </div>
              <div class="time">1 min</div>
            </div>
          </div>
        </div>
      </div>
      <div class="new-message">
        <base-avatar />
        <input
          type="text"
          class="message-field"
          v-model="newMessage"
        />
        <span
          class="send"
          @click="send"
          @keyup="send"
        >
          <svg
            width="23px"
            height="23px"
          >
            <use href="#send-icon"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../../../../store/';
  import { mapState, mapActions } from 'vuex';
  import { STREAM_STATUSES } from '../../../../helpers';
  import 'video.js/dist/video-js.css';
  import {videoPlayer} from 'vue-video-player';
  import videojs from 'video.js'
  window.videojs = videojs

  export default {
    beforeRouteEnter(routeTo, routeFrom, next) {
      store.commit('ui/startRouteLoading', null, { root: true });
      const action = routeTo.params.canStartStream
        ? 'classes/startLive'
        : 'classes/connectLive';
      store.dispatch(action,
        {
          courseId: routeTo.params.courseId,
          liveClassId: routeTo.params.liveClassId
        })
        .then(() => next())
        .catch(() => next(false))
        .finally(() => {
          store.commit('ui/endRouteLoading', null, { root: true });
        })
    },
    components: {
      videoPlayer
    },
    created() {
      if (this.websocketToken) {
        this.$socket.client.io.opts.query = {
          token: this.websocketToken
        }
        this.$socket.client.open();
        this.playerOptions.sources.src = this.streamUrl;
      }
      console.log(this.playerOptions)
    },
    data() {
      return {
        showStopButton: true,
        streamStatus: 1,
        newMessage: null,
        messages: [],
        playerOptions: {
          sources: [{
            withCredentials: false,
            controls: false,
            autoplay: true,
            type: "application/x-mpegURL",
            // src: this.streamUrl
          }],
          // controlBar: {
          //   timeDivider: false,
          //   durationDisplay: false
          // },
          fluid: true,
          liveui: true,
          flash: {hls: {withCredentials: false}},
          html5: {hls: {withCredentials: false}},
          // poster: this.thumbnail,
          name: 'player'
        }
      }
    },
    props: {
      canStartStream: {
        type: Boolean,
        default: false
      },
    },
    sockets: {
      status({ status }) {
        this.streamStatus = status;
      },
      message(data) {
        this.messages.push(data);
      }
    },
    computed: {
      ...mapState({
        streamUrl: state => state.classes.streamUrl,
        streamKey: state => state.classes.streamKey,
        websocketToken: state => state.classes.websocketToken
      }),
      streamStatusStr() {
        return STREAM_STATUSES[this.streamStatus];
      }
    },
    methods: {
      ...mapActions('classes', [
        'stopLive',
        'sendMessage'
      ]),
      stop() {
        this.stopLive({
          courseId: this.$route.params.courseId,
          liveClassId: this.$route.params.liveClassId
        });
        this.$socket.client.close();
        this.showStopButton = false;
      },
      send(e) {
        if (this.newMessage) {
          this.sendMessage({
            courseId: this.$route.params.courseId,
            liveClassId: this.$route.params.liveClassId,
            message: this.newMessage
          });
          this.newMessage = null;
        }
      },
      playerReadied(player) {
        let hls = player.tech({IWillNotUseThisInPlugins: true}).hls;
        player.tech_.hls.xhr.beforeRequest = function (options) {
            return options
        }
      },
    }
  }
</script>
