<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="#0855C4"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <a href="#" class="is_logo margin">
        <img class="ml-5" :src="require('../assets/is_logo.svg')"/>
      </a>
      <span v-if="!$device.isMobile" class="is_title">Logger</span>
      <span v-if="$device.isMobile" class="is_title_mobile">Logger</span>
      <div class="is_clear"></div>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />
          <v-list-item
            v-else
            :key="i"
            link
            :to="item.path"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'mdi-home', text: 'Inicio', path: '/admin/auditoria/portal' },
      { icon: 'mdi-chart-line', text: 'Estadísticas', path: '/admin/auditoria/estadistica' },
      { divider: true },
      // { heading: 'Labels' },
      { icon: 'mdi-filter', text: 'Filtrar', path: '/admin/auditoria/busqueda' },
      { divider: true },
      // { icon: 'mdi-archive', text: 'Archive' },
      // { icon: 'mdi-delete', text: 'Trash' },
      // { divider: true },
      // { icon: 'mdi-robot', text: 'Chat', path: '' },
      { icon: 'mdi-help', text: 'Ayuda', path: '/admin/auditoria/ayuda' }
    ]
  })
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
