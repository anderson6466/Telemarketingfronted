<template>
  <div style="margin: 0; height: 100%;">
    <v-card>
      <v-card-title>
        Registro de eventos
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :sort-by="['time']"
        :sort-desc="[true]"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="time"
        show-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">{{ item.message }} {{ item.request }}</td>
        </template>
        <template v-slot:item.device="{ item }">
          <v-icon v-if="item.device === 'Desktop'">mdi mdi-laptop</v-icon>
          <v-icon v-if="item.device === 'Tablet'">mdi mdi-tablet</v-icon>
          <v-icon v-if="item.device === 'Mobile'">mdi mdi-cellphone</v-icon>
        </template>
        <template v-slot:item.os="{ item }">
          <v-icon v-if="item.os === 'Windows'">fab fa-windows</v-icon>
          <v-icon v-if="item.os === 'MacOS'">mdi mdi-apple</v-icon>
          <v-icon v-if="item.os === 'Android'">mdi mdi-android</v-icon>
          <v-icon v-if="item.os === 'iOS'">mdi mdi-apple-ios</v-icon>
        </template>
        <template v-slot:item.type="{ item }">
          <v-icon color="#0855c4" v-if="item.type === 'IN'">mdi mdi-arrow-right-bold</v-icon>
          <v-icon color="#0855c4" v-if="item.type === 'OUT'">mdi mdi-arrow-left-bold</v-icon>
          <v-icon color="#D54223" v-if="item.type === 'ERROR'">mdi mdi-bug</v-icon>
        </template>
        <template v-slot:item.method="{ item }">
          <v-chip color="#0855c4" v-if="item.method !== undefined" dark style="text-transform: uppercase;">{{ item.method }}</v-chip>
        </template>
        <template v-slot:item.statusHttp="{ item }">
          <v-chip color="green" v-if="item.statusHttp === 200" dark>{{ item.statusHttp }}</v-chip>
          <v-chip color="red" v-if="item.statusHttp !== undefined && item.statusHttp !== 200" dark>{{ item.statusHttp }}</v-chip>
        </template>
        <template v-slot:item.statusApp="{ item }">
          <v-chip color="green" v-if="item.statusApp === '01'" dark>{{ item.statusApp }}</v-chip>
          <v-chip color="red" v-else-if="item.statusApp === '99'" dark>{{ item.statusApp }}</v-chip>
          <v-chip color="yellow" v-else-if="item.statusApp !== undefined" dark>{{ item.statusApp }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import moment from 'moment'

export default {
  layout: 'keep',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Time', value: 'time' },
        { text: 'Type', value: 'type', sortable: false },
        { text: 'Path', value: 'path' },
        { text: 'Method', value: 'method', sortable: false },
        { text: 'HTTP', value: 'statusHttp', sortable: false },
        { text: 'App', value: 'statusApp', sortable: false },
        { text: 'IP', value: 'ip', sortable: false },
        { text: 'Device', value: 'device', sortable: false },
        { text: 'OS', value: 'os', sortable: false }
      ],
      desserts: [],
      expanded: [],
      singleExpand: true
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      const date = new Date()
      const today = moment(date).format('YYYYMMDD')
      const request = { key: today }
      this.$store.dispatch('getLogger', request)
        .then((response) => {
          if (response.code === '01') {
            const array = response.results
            const results = []
            for (let i = 0; i < array.length; i++) {
              results.push(JSON.parse(array[i]))
            }
            console.log(results)
            this.desserts = results
          }
          // console.log(response)
        })
    }
  }
}
</script>
