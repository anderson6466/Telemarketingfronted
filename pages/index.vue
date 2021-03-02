<template>
  <v-container padding>
    <v-alert
      dense
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
      v-if="showError"
    >
      {{error}}
    </v-alert>
    <div class="row justify-center text-center q-pl-md">
      <login-form @onLogin="loginApi" class="full-width"/>
    </div>
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="overlay"
      :z-index="zIndex"
    >
      <!-- <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="value"
        color="primary"
      >
        {{ value }}
      </v-progress-circular> -->
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  data: () => ({
    showError: false,
    absolute: false, // Overlay
    opacity: 0.46,
    overlay: false,
    zIndex: 5,
    interval: {}, // Progress
    value: 0, // Progress
    isLogin: false
  }),
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.clear()
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
  methods: {
    clear () {
      this.$store.dispatch('logout')
    },
    loginApi (user) {
      if (!this.isLogin) {
        this.$store.dispatch('authenticateUser', user)
          .then((response) => {
            if (response.token !== '') {
              this.$router.push('/inicio')
            } else {
              this.error = response.message
              this.showError = true
            }
          })
      }
    }
  }
}
</script>

<style>
</style>
