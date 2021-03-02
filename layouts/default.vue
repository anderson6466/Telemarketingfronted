<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      v-if="this.$route.path !== '/'"
    >
      <img class="mr-3 ml-8" :src="require('../assets/logo.svg')"/>
      <v-spacer />
      <v-icon style="color: #0855c4; font-size: 200%;">mdi-account-circle</v-icon>
      <div class="d-inline pt-3 pl-3 pr-5">
        <h3 class="omnes-medium" style="font-size: 99%;">{{ nombreUsuario }}</h3>
        <p class="text-info">AGENTE VIDA</p>
      </div>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      v-if="this.$route.path === '/'"
    >
      <img class="mr-3 ml-8" :src="require('../assets/logo.svg')"/>
      <v-spacer />
    </v-app-bar>
    <v-content class="fondo-adn">
      <nuxt />
    </v-content>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ nombreUsuario }}
          </v-list-item-title>
          <v-list-item-subtitle>
            AGENTE
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list two-line subheader>
        <!-- <v-subheader inset>Consultas</v-subheader>  
        <v-list-item
          link
        >
           <v-list-item-avatar>
            <v-icon
              class="blue white--text"
            >mdi-cloud</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>An&aacute;lisis de cliente</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
        >-->

          <v-list-item  link >

          <v-list-item-avatar>
            <v-icon
              class="blue white--text"
            >mdi-trophy</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Cotizaciòn del canal</v-list-item-title>
          </v-list-item-content> 
        </v-list-item>
         <v-list-item  link >

          <v-list-item-avatar>
            <v-icon
              class="blue white--text"
            > mdi-clipboard-text-outline</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Cotizaciòn del producto</v-list-item-title>
          </v-list-item-content> 
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
          block
          color="#ea0c90"
          @click="onLogout"
          class="pa-2"
          style="width: 100%; color: white;">
            Cerrar sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} — <strong>Interseguro</strong></span>
    </v-footer>
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="load"
      :z-index="zIndex"
    >
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      usuario: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      absolute: false, // Overlay
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
      value: 0 // Progress
    }
  },
  computed: {
    load () {
      return this.$store.getters.getLoading
    },
    nombreUsuario () {
      let nombres = ''
      if (this.$store.getters.getUser !== undefined && this.$store.getters.getUser !== null) {
        const temp = this.$store.getters.getUser.nombreUsuario.replace(/%20/g, ' ')
        const array = temp.split(' ')
        for (let i = 0; i < array.length; i++) {
          if (i === 0 || i === 2) {
            nombres += array[i] + ' '
          }
        }
      }
      return nombres
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
