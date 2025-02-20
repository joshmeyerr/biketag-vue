<template>
  <div
    class="expandable-image"
    :class="{
      expanded: expanded,
    }"
    @click="expandClick"
  >
    <i v-if="expanded" class="close-button">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="#666666"
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </i>
    <b-spinner v-show="loading" />
    <img
      v-show="!loading"
      :src="expanded ? fullSource : source"
      class="img-fluid"
      v-bind="$attrs"
      @load="loaded"
    />
  </div>
</template>
<script type="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ExpandableImage',
  props: {
    source: {
      type: String,
      default: null,
    },
    fullSource: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      expanded: false,
      closeButtonRef: null,
      loading: true,
    }
  },

  watch: {
    expanded(status) {
      this.$nextTick(() => {
        if (status) {
          this.cloned = this.$el.cloneNode(true)
          this.closeButtonRef = this.cloned.querySelector('.close-button')
          this.closeButtonRef.addEventListener('click', this.closeImage)
          document.addEventListener('keydown', this.doCloseImage)
          document.addEventListener('backbutton', this.doCloseImage)
          document.body.appendChild(this.cloned)
          document.body.style.overflow = 'hidden'
          // this.cloned.addEventListener('touchmove', this.freezeVp, false)
          setTimeout(() => {
            this.cloned.style.opacity = 1
          }, 0)
        } else {
          this.cloned.style.opacity = 0
          // this.cloned.removeEventListener('touchmove', this.freezeVp, false)
          setTimeout(() => {
            this.closeButtonRef.removeEventListener('click', this.closeImage)
            this.cloned.remove()
            this.cloned = null
            this.closeButtonRef = null
            document.body.style.overflow = 'auto'
          }, 250)
        }
      })
    },
  },

  methods: {
    expandClick() {
      this.expanded = true
    },
    doCloseImage(event) {
      if (event.key.toLowerCase() == 'escape') {
        this.closeImage(event)
      }
    },
    closeImage(event) {
      this.expanded = false
      document.removeEventListener('keydown', this.doCloseImage)
      document.removeEventListener('backbutton', this.doCloseImage)
      event.stopPropagation()
    },
    freezeVp(e) {
      e.preventDefault()
    },
    loaded() {
      this.loading = false
    },
  },
  // template: '#expandable-image',
})
</script>
<style scoped lang="scss">
.close-button {
  position: fixed;
  top: 10px;
  right: 10px;
  display: none;
  cursor: pointer;
}

.expandable-image {
  position: relative;
  transition: 0.25s opacity;
  cursor: zoom-in;

  img {
    width: 100%;
  }
}

body {
  .expandable-image.expanded {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    align-items: center;
    opacity: 0;
    padding-bottom: 0 !important;
    cursor: default;

    img {
      width: 100%;
      max-width: 1200px;
      max-height: 100%;
      object-fit: contain;
      margin: 0 auto;
    }
  }

  .close-button {
    display: block;
  }
}

svg {
  filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 50%));
}

svg path {
  fill: #fff;
}

.expand-button {
  position: absolute;
  z-index: 999;
  right: 10px;
  top: 10px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  opacity: 0;
  transition: 0.2s opacity;
}

.expandable-image:hover .expand-button {
  opacity: 1;
}

.expand-button svg {
  width: 20px;
  height: 20px;
}

.expand-button path {
  fill: #fff;
}
</style>
