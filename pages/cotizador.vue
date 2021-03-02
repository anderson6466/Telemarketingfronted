<template>
  <div>
    <v-card
      color="#0855c4"
    >
      <v-card-text>
        <h2 class="omnes-semibold mt-5 ml-12" style="color: white;">Hist&oacute;rico de Cotizaciones</h2>
        <p class="display-1 text--primary">
        </p>
        <div class=" row omnes-semibold mt-5 ml-7">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              v-model="nombreAsegurado"
              label="Nombre del asegurado"
              class="pl-2 pr-2 text-cotiza"
              dense
              readonly
              id="input-adn-21"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="edadActuarial"
              label="Edad actuarial"
              class="pl-2 pr-2 text-cotiza"
              dense
              readonly
              style="color: white"
              id="input-adn-22"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="fechaNacimiento"
              label="Fecha nacimiento"
              class="pl-2 pr-2 text-cotiza"
              dense
              readonly
              style="color: white"
              id="input-adn-23"
            ></v-text-field>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  middleware: ['check-auth', 'auth'],
  data: () => ({
    documentoIdentidad: '',
    nombreAsegurado: '',
    correoAsegurado: '',
    edadActuarial: '',
    fechaNacimiento: '',
    sexo: ''
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.documentoIdentidad = localStorage.getItem('documentoIdentidad')
      this.nombreAsegurado = localStorage.getItem('nombreAsegurado')
      this.fechaNacimiento = localStorage.getItem('fechaNacimiento')
      this.edadActuarial = localStorage.getItem('edadActuarial')
      this.correoAsegurado = localStorage.getItem('correoAsegurado')
      this.sexo = localStorage.getItem('sexo')
    }
  }
}
</script>
