<template>
  <div class="container">
    <div class="footer-buttons mb-3">
      <bike-tag-button class="m-1" :text="$t('menu.about')" @click="goAboutPage" />
      <bike-tag-button class="m-1" :text="$t('menu.players')" @click="goUsersPage" />
      <bike-tag-button class="m-1" :text="$t('menu.top10')" @click="goLeaderboardPage" />
    </div>
    <footer class="container mt-2 pb-5">
      <div class="row">
        <div class="col-md-2">
          <div class="worldwide">
            <bike-tag-button variant="circle" @click="goWorldwide">
              <img src="../assets/images/npworld.png" alt="BikeTag World Wide" />
            </bike-tag-button>
            <!-- <div>{{ $t('components.footer.biketag') }}</div> -->
            <!-- <i class="fa fa-globe" aria-hidden="true"></i> -->
            <!-- <div>{{ $t('components.footer.worldwide') }}</div> -->
          </div>
        </div>
        <div class="col-md-2">
          <a href="https://github.com/KenEucker/biketag-vue">
            <img src="../assets/images/github-logo.png" alt="GitHub" />
            <img src="../assets/images/github-mark.png" alt="GitHub Mark" />
          </a>
          <span><sup>0</sup>{{ $t('components.footer.sourced') }}</span>
          <img class="flow" src="../assets/images/bidirectional-flow.svg" />
          <span>{{ $t('components.footer.deployed') }}<sup>1</sup></span>
          <a href="https://www.netlify.com/">
            <img src="../assets/images/netlify-logo-dark.svg" alt="Netlify" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import BikeTagButton from '@/components/BikeTagButton.vue'

export default defineComponent({
  name: 'BikeTagFooter',
  components: {
    BikeTagButton,
  },
  methods: {
    goAboutPage: function () {
      this.$router.push('/about')
    },
    goSupportPage: function () {
      this.$router.push('/support')
    },
    goLeaderboardPage: function () {
      this.$router.push('/leaderboard')
    },
    goUsersPage: function () {
      this.$router.push('/players')
    },
  },
})
</script>
<style scoped lang="scss">
.footer-buttons {
  display: inline-flex;

  @media (max-width: 400px){
    flex-flow: column;
    & .scribble-button {
      min-height: 0;
    }
  }

  .btn {
    max-height: 3em;
  }
}

footer {
  display: flex;
  flex-flow: wrap;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 20vw;

  .row {
    > div {
      font-family: monospace;
      padding-left: 1px;
      margin-left: 5px;
      color: white;
      position: relative;
    }

    span {
      font-family: monospace;
      padding-left: 1px;
      margin-left: 5px;
      color: white;
    }

    .worldwide {
      div {
        color: black;
        margin: 0;
      }

      a {
        text-decoration: none;

        i {
          font-size: 5em;

          &:hover {
            filter: blur(2px);
          }
        }
      }
    }

    .flow {
      max-height: 131px;
      position: absolute;
      top: 0%;
      right: 15%;
      z-index: -1;
      padding-top: 1px;
    }
  }

  .row > * {
    margin: auto;
  }
}
</style>
