<template>
  <b-container class="queue-posted-share">
    <h3 class="queue-title">{{ $t('pages.queue.posted_title') }}</h3>
    <p class="queue-text">{{ $t('pages.queue.posted_text') }}</p>
    <div>
      <b-tabs nav-item-class="nav-item">
        <b-tab v-if="!!getGame?.subreddit?.length">
          <template #title>
            <img
              v-b-popover.click.blur.top="'Copied!'"
              src="../assets/images/Reddit.svg"
              class="tab-logo img-fluid"
              @click="copyTabContents(redditPostText)"
            />
          </template>
          <div class="reddit-post">
            <Markdown v-if="supportsReddit && showReddit" :source="redditPostText" linkify="true" />
            <pre v-if="!showReddit">{{ redditPostText }}</pre>
          </div>
        </b-tab>
        <b-tab v-if="!!getGame?.account?.length">
          <template #title>
            <img
              v-b-popover.click.blur.top="'Copied!'"
              src="../assets/images/Twitter.svg"
              class="tab-logo img-fluid"
              @click="copyTabContents(twitterPostText)"
            />
          </template>
          <div v-if="supportsTwitter && showTwitter" class="twitter-post">
            <Markdown :source="twitterPostText" linkify="true" />
            <pre v-if="!showTwitter">{{ twitterPostText }}</pre>
          </div>
        </b-tab>
        <b-tab v-if="!!getGame?.page?.length">
          <template #title>
            <img
              v-b-popover.click.blur.top="'Copied!'"
              src="../assets/images/Instagram.svg"
              class="tab-logo img-fluid"
              @click="copyTabContents(instagramPostText)"
            />
          </template>
          <div class="instagram-post">
            <Markdown
              v-if="supportsInstagram && showInstagram"
              :source="instagramPostText"
              linkify="true"
            />
            <pre v-if="!showInstagram">{{ instagramPostText }}</pre>
          </div>
        </b-tab>
      </b-tabs>
      <p v-if="supportsReddit || supportsTwitter || supportsInstagram" class="queue-text">
        {{ $t('pages.queue.submit_text') }}
      </p>
      <p v-else class="queue-text">
        {{ $t('pages.queue.submit_text_no_autopost') }}
        {{ $t('pages.queue.submit_text_manual_social') }}
      </p>

      <form
        ref="submitTag"
        name="submit-queued-tag"
        action="submit-queued-tag"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="form-name" value="submit-queued-tag" />
        <input type="hidden" name="playerId" :value="getPlayerId" />
        <fieldset v-if="supportsReddit">
          <label for="postToReddit">{{ $t('pages.queue.post_to_reddit') }}</label>
          <input
            v-model="postToReddit"
            name="postToReddit"
            type="checkbox"
            @click="showReddit = !showReddit"
          />
        </fieldset>
        <fieldset v-if="supportsTwitter">
          <label for="postToTwitter">{{ $t('pages.queue.post_to_twitter') }}</label>
          <input
            v-model="postToTwitter"
            name="postToTwitter"
            type="checkbox"
            @click="showTwitter = !showTwitter"
          />
        </fieldset>
        <fieldset v-if="supportsInstagram">
          <label for="postToInstagram">{{ $t('pages.queue.post_to_instagram') }}</label>
          <input
            v-model="postToInstagram"
            name="postToInstagram"
            type="checkbox"
            @click="showInstagram = !showInstagram"
          />
        </fieldset>
        <div class="mt-3 align-center">
          <bike-tag-button
            variant="medium"
            class="mt-2 mb-2 border-0"
            :text="$t('pages.queue.post_new_tag')"
            @click="onSubmit"
          />
        </div>
      </form>
    </div>

    <div class="mt-3 align-center">
      <bike-tag-button
        class="border-0"
        :text="`${$t('pages.queue.joined_button')} #${getCurrentBikeTag?.tagnumber}`"
        @click="goViewQueue"
      />
    </div>
  </b-container>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Markdown from 'vue3-markdown-it'
import { Settings } from '@/common/types'
import BikeTagButton from '@/components/BikeTagButton.vue'

export default defineComponent({
  name: 'QueueSubmit',
  components: {
    Markdown,
    BikeTagButton,
  },
  emits: ['submit'],
  data() {
    return {
      foundImagePreview: '',
      mysteryImagePreview: '',
      postToReddit: false,
      postToTwitter: false,
      showReddit: false,
      showTwitter: false,
      showInstagram: false,
    }
  },
  computed: {
    ...mapGetters([
      'getQueue',
      'getQueuedTag',
      'getCurrentBikeTag',
      'getPlayerId',
      'getGameName',
      'getGame',
    ]),
    supportsReddit() {
      return !!this.getGame?.settings[Settings.SupportsReddit]
    },
    supportsTwitter() {
      return !!this.getGame?.settings[Settings.SupportsTwitter]
    },
    supportsInstagram() {
      return !!this.getGame?.settings[Settings.SupportsInstagram]
    },
    redditPostText() {
      return `
[#${this.getQueuedTag.tagnumber} tag by ${this.getQueuedTag.foundPlayer}](https://${this.getGameName}.biketag.io/#/${this.getQueuedTag.tagnumber})

Credit goes to ${this.getQueuedTag.foundPlayer} for finding BikeTag [#${this.getCurrentBikeTag.tagnumber}](${this.getCurrentBikeTag.discussionUrl}) that ${this.getCurrentBikeTag.mysteryPlayer} posted!

"[${this.getQueuedTag.foundLocation}](https://${this.getGameName}.biketag.io/#/${this.getCurrentBikeTag.tagnumber})"

See all BikeTags and more, for ${this.getGameName}:

[${this.getGameName}.biketag.io](https://${this.getGameName}.biketag.io) | [Leaderboard](https://${this.getGameName}.biketag.io/leaderboard) | [Rules](https://${this.getGameName}.biketag.io/#howto)
        `
    },
    twitterPostText() {
      return `
  Seattle BikeTag!
  
  This is bike tag number ${this.getQueuedTag.tagnumber} by ${this.getQueuedTag.foundPlayer}.
  Find this mystery location and move the tag to your favorite spot. The latest tag, instructions, and a hint are at [seattle.biketag.org](https://seattle.biketag.org)
  
  #SeattleBikeTag #SeaBikes #BikeSeattle`
    },
    instgramPostText() {
      return `
[#${this.getQueuedTag.tagnumber} tag by ${this.getQueuedTag.foundPlayer}](https://${this.getGameName}biketag.io/#/${this.getQueuedTag.tagnumber})

Credit goes to ${this.getQueuedTag.foundPlayer} for finding BikeTag [#${this.getCurrentBikeTag.tagnumber}](${this.getCurrentBikeTag.discussionUrl}) that ${this.getCurrentBikeTag.mysteryPlayer} posted!

"[${this.getQueuedTag.foundLocation}](https://${this.getGameName}biketag.io/#/${this.getCurrentBikeTag.tagnumber})"

See all BikeTags and more, for ${this.getGameName}:

[${this.getGameName}.biketag.io](https://${this.getGameName}.biketag.io) | [Leaderboard](https://${this.getGameName}.biketag.io/leaderboard) | [Rules](https://${this.getGameName}.biketag.io/#howto)
        `
    },
  },
  mounted() {
    this.postToReddit = this.showReddit = this.supportsReddit
    this.postToTwitter = this.showTwitter = this.supportsTwitter
    this.postToInstagram = this.showInstagram = this.supportsInstagram
  },
  methods: {
    copyTabContents(text) {
      navigator.clipboard.writeText(text)
    },
    goViewQueue() {
      this.$store.dispatch('resetFormStep')
    },
    onSubmit() {
      const formAction = this.$refs.submitTag.getAttribute('action')
      const formData = new FormData(this.$refs.submitTag)
      const submittedTag = this.getQueuedTag

      submittedTag.discussionUrl = JSON.stringify({
        postToReddit: this.postToReddit,
      })
      submittedTag.mentionUrl = JSON.stringify({
        postToTwitter: this.postToTwitter,
      })
      submittedTag.shareUrl = JSON.stringify({
        postToInstagram: this.postToInstagram,
      })

      formData.append('discussionUrl', submittedTag.discussionUrl)
      formData.append('mentionUrl', submittedTag.mentionUrl)
      // formData.append('shareUrl', submittedTag.shareUrl)

      this.$emit('submit', {
        formAction,
        formData,
        tag: submittedTag,
        storeAction: 'submitQueuedTag',
      })
    },
  },
})
</script>
<style lang="scss">
.queue-posted-share {
  .nav-tabs {
    margin-bottom: -6px;

    .nav-link {
      border-right: none;
      border-left: none;
    }
  }
}
</style>
<style scoped lang="scss">
.queue-posted-share {
  .tab-logo {
    max-width: 2em;
  }
  .reddit-post {
    background-color: white;
    padding: 1em;
    text-align: left;
    margin-bottom: 1em;
  }
  .twitter-post {
    background-color: black;
    padding: 1em;
    text-align: left;
    margin-bottom: 1em;
    color: white;
    font-weight: 800;
  }

  form {
    label {
      font-size: 1.5rem;
      margin-right: 1em;
    }
    input[type='checkbox'] {
      height: 1rem;
      width: 1rem;
    }
  }
}
</style>
