<template>
  <div style="margin: 0; height: 100%;">
    <v-row class="mr-2 ml-2">
      <v-col cols="12" sm="12" md="12">
        <v-alert
        dense
        text
        prominent
        type="info"
        icon="mdi-exclamation"
        v-if="showMessage"
        dismissible
      >
        <div class="info-screen">
          - Se recomienda incluir en las búsquedas el código de agente y/o la fecha del evento.<br>
          - La fecha del evento es mas efectiva si agrega la hora. Ejm 2020042012
        </div>
      </v-alert>
      </v-col>
    </v-row>
    <v-row class="mr-2 ml-2">
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Agente"
          v-model="bagente"
          placeholder="Ejm. cdulanto"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <!-- <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Documento identidad"
          v-model="bdocumento"
          placeholder="Ejm. 99999999"
          outlined
        ></v-text-field>
      </v-col> -->
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Propuesta"
          v-model="bpropuesta"
          placeholder="Ejm. 500099999"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Fecha Evento"
          v-model="bevento"
          placeholder="AAAAMMDD"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-btn
        color="#ea0c90"
        @click="loader = 'loading2';searchEvents()"
        class="white--text btn-amount"
        large
        :loading="loading"
        :disabled="loading">
          <v-icon left>mdi mdi-search-web</v-icon> Buscar
          <template v-slot:loader>
            <span>Cargando...</span>
          </template>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
        class="mr-5 ml-5"
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
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'

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
      singleExpand: true,
      showMessage: true,
      loader: null,
      loading: false,
      bagente: '',
      bdocumento: '',
      bpropuesta: '',
      bevento: ''
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  methods: {
    searchEvents () {
      let makeKey = ''
      if (this.bevento !== '') {
        makeKey = this.bevento
      } else if (this.bagente !== '') {
        makeKey = this.bagente + ':'
        if (this.bdocumento !== '') {
          makeKey += this.bdocumento + ':'
          if (this.bpropuesta !== '') {
            makeKey += this.bpropuesta
          }
        }
      } else if (this.bdocumento !== '') {
        makeKey += this.bdocumento + ':'
        if (this.bpropuesta !== '') {
          makeKey += this.bpropuesta
        }
      } else {
        makeKey += this.bpropuesta
      }
      if (makeKey !== '') {
        console.log(makeKey)
        const request = { key: makeKey }
        this.$store.dispatch('getLogger', request)
          .then((response) => {
            if (response.code === '01') {
              const array = response.results
              let results = []
              for (let i = 0; i < array.length; i++) {
                results.push(JSON.parse(array[i]))
              }
              if (this.bagente !== '') {
                results = results.filter(v => v.userd === this.bagente)
              }
              if (this.bdocumento !== '') {
                results = results.filter(v => v.document === this.bdocumento)
              }
              if (this.bpropuesta !== '') {
                results = results.filter(v => v.quote === this.bpropuesta)
              }
              this.desserts = results
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.v-input--selection-controls {
  margin-top: 0px!important;
  padding-top: 0px!important;
}
.theme--light.v-text-field--outlined fieldset {
  border-color: #caddff!important;
}
.info-screen {
  font-family: 'omnesregular'!important;
  font-size: 13px!important;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
