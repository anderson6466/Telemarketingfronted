<template>
  <div style="margin: 0; height: 100%;">
    <v-card
      class="mx-auto"
    >
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="white"
        elevation="6"
      >
        <v-sparkline
          :fill="fill"
          :labels="labels"
          :value="values"
          color="#42b3f4"
          line-width="2"
          padding="8"
          :smooth="radius || false"
          style="font-family: 'omnesregular'!important;font-size: 6px!important;"
          :gradient="gradient"
        ></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">Registro de eventos</div>
        <div class="subheading font-weight-light grey--text">Carga de trabajo por distribución horaria</div>
        <v-divider class="my-2"></v-divider>
        <v-icon
          class="mr-2"
          small
        >
          mdi-clock
        </v-icon>
        <span class="caption grey--text font-weight-light">Último registro hace 2 minutos</span>
      </v-card-text>
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
      fill: true,
      radius: 2,
      gradient: ['#42b3f4'],
      labels: [
        '8am',
        '9am',
        '10am',
        '11am',
        '12pm',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm',
        '6pm',
        '7pm',
        '8pm'
      ],
      values: []
    }
  },
  mounted () {
    this.graficar()
  },
  methods: {
    async graficar () {
      const valoresX = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      const date = new Date()
      const today = moment(date).format('YYYYMMDD')
      for (let i = 0; i < valoresX.length; i++) {
        const request = { key: today + valoresX[i] }
        await this.$store.dispatch('getLogger', request)
          .then((response) => {
            if (response.code === '01') {
              const array = response.results
              console.log(array.length)
              this.values.push(array.length)
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(1) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(2) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(3) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(4) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(5) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(6) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(7) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(8) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(9) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(10) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(11) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(12) {
  font-size: 6px;
}
#keep > div > main > div > div > div > div.v-sheet--offset.mx-auto.v-sheet.theme--light.elevation-6.white > svg > g > text:nth-child(13) {
  font-size: 6px;
}
</style>
