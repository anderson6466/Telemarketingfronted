<template>
    <div>
        <v-row class="ml-2">
            <v-col cols="12" md="4" sm="12">
                <v-card
                >
                    <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline">Cotización <strong>{{ numeroCotizacion }}</strong></v-list-item-title>
                        <v-list-item-subtitle>Creado el {{ fechaCotizacion }}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                    <v-list-item-icon>
                        <v-icon v-if="aseguradoIgualContratante != '1'">mdi-checkbox-blank-outline</v-icon>
                        <v-icon v-else>mdi-checkbox-marked</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>Asegurado igual contratante</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-progress-linear
                    :value="skill"
                    height="35"
                    dark
                    class="mt-5"
                    >
                    <template v-slot="{ value }">
                        <strong>{{ Math.ceil(value) }}% ({{ status }} de 6)</strong>
                    </template>
                    </v-progress-linear>

                    <v-list class="transparent">
                    <v-list-item
                    >
                        <v-list-item-title>Firma asegurado</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ fechaFirmaAsegurado }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                    >
                        <v-list-item-title>Firma contratante</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ fechaFirmaContratante }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                    class="mb-8"
                    >
                        <v-list-item-title>Solicitud</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ fechaSolicitud }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    </v-list>
                    <br>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
                <v-card
                >
                    <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline"><strong>Datos de pago</strong></v-list-item-title>
                        <v-list-item-subtitle>Acciones</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                    <v-list-item-icon>
                        <v-icon v-if="!linkEnviado">mdi-checkbox-blank-outline</v-icon>
                        <v-icon v-else>mdi-checkbox-marked</v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>Link de pago enviado?</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list class="transparent">
                    <v-list-item
                    >
                        <v-list-item-title>Transacción pago</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ fechaPago }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                    >
                        <v-list-item-title>SITC</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ fechaSitc }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                    >
                        <v-list-item-title>SAMP</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ fechaSamp }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                    >
                        <v-list-item-title>Primera Prima</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-checkbox-marked-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                            <v-avatar v-if="pasarela === 'Niubiz'" color="#34a5dd" size="32">
                                <span class="white--text headline">n</span>
                            </v-avatar>
                            <v-avatar v-if="pasarela === 'Culqi'" color="red" size="32">
                                <span class="indigo--text headline">c</span>
                            </v-avatar>
                            {{ pagoPrimeraPrima }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                    >
                        <v-list-item-title>Pago recurrente</v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>mdi-checkbox-marked-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ pagoRecurrente }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
                <v-card
                >
                    <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline"><strong>Reprocesos</strong></v-list-item-title>
                        <v-list-item-subtitle>Opciones de ayuda</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                    >
                        <v-list-item-title><v-btn @click="obtenerCodigoSMS">Clave SMS</v-btn></v-list-item-title>

                        <v-list-item-icon>
                        <v-icon>fas fa-lock</v-icon>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ codigoSmsMascara }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list class="transparent">
                        <v-list-item
                        >
                            <v-list-item-title>
                                <v-btn @click="generarPDFSolicitud">Reprocesar PDF Solicitud</v-btn><br>
                                <span style="font-size: 12px;">* Generar nuevamente</span>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        >
                            <v-list-item-title>
                                <v-btn @click="linkPagoHelp">Validar link de pago&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</v-btn><br>
                                <span style="font-size: 12px;">* Env&iacute;a link a agente</span>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        >
                            <v-list-item-title>
                                <v-btn v-show="fechaSamp != null && fechaSamp != ''" @click="generarPDFAcp">Reprocesar PDF ACP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</v-btn><br>
                                <span v-show="fechaSamp != null && fechaSamp != ''" style="font-size: 12px;">* Generar nuevamente</span>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-fab-transition>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                <v-btn
                    color="#ea0c90"
                    fab
                    dark
                    medium
                    fixed
                    bottom
                    left
                    v-on="on"
                    style="margin-bottom: 20px"
                    @click="irHistorico()"
                >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                </template>
                <span>Volver a Histórico</span>
            </v-tooltip>
        </v-fab-transition>
    </div>
</template>
<script>
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  data () {
    return {
      numeroCotizacion: '',
      fechaCotizacion: null,
      estado: 0,
      producto: '',
      plan: '',
      frecuencia: '',
      primaComercial: 0.0,
      primaIgv: 0.0,
      aseguradoIgualContratante: '',
      fechaFirmaAsegurado: '',
      fechaFirmaContratante: '',
      fechaSolicitud: '',
      linkEnviado: false,
      linkUsado: false,
      tienePagoRealizado: false,
      fechaPago: '',
      tieneRegistroSitc: false,
      fechaSitc: '',
      tieneRegistroSamp: false,
      fechaSamp: '',
      pagoPrimeraPrima: '',
      pagoRecurrente: '',
      labels: ['0', '1', '2', '3', '4', '5', '6'],
      status: 0,
      skill: 0,
      codigoSmsMascara: '******',
      codigoSms: '',
      pasarela: ''
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    enviarLink () {
      const cotizacion = localStorage.getItem('redis_key_quote')
      this.numeroCotizacion = cotizacion
      const request = {
        numeroCotizacion: cotizacion
      }
      this.$store.dispatch('pagoWebLinkHelp', request)
        .then((response) => {
          if (response.code === '01') {
            console.log('Correo enviado a agente...')
          } else {
            this.showError = true
            this.error = response.message
          }
        })
    },
    initialize () {
      const cotizacion = localStorage.getItem('redis_key_quote')
      this.numeroCotizacion = cotizacion
      const request = {
        numeroCotizacion: cotizacion
      }
      this.$store.dispatch('callDetailQuote', request)
        .then((response) => {
          if (response.code === '01') {
            const obj = response.data
            this.showError = false
            this.numeroCotizacion = obj.numeroPropuesta
            this.fechaCotizacion = obj.fechaCotizacion
            this.aseguradoIgualContratante = obj.aseguradoIgualContratante
            this.estado = obj.estadoSolicitud
            this.status = obj.estadoSolicitud
            this.skill = (this.status * 100) / 6
            this.producto = obj.producto
            this.plan = obj.plan
            this.primaComercial = obj.primaComercial
            this.primaIgv = obj.primaIgv
            this.fechaSolicitud = obj.fechaSolicitud
            this.fechaFirmaAsegurado = obj.fechaFirmaAsegurado
            this.fechaFirmaContratante = obj.fechaFirmaContratante
            this.linkEnviado = obj.linkEnviado
            this.linkUsado = obj.linkUsado
            this.fechaPago = obj.fechaPago
            this.fechaSitc = obj.fechaSitc
            this.fechaSamp = obj.fechaSamp
            this.pagoPrimeraPrima = obj.describePagoPrimero
            this.pagoRecurrente = obj.describePagoRecurrente
            this.codigoSms = obj.codigoSms
            this.pasarela = obj.pasarela
          } else {
            this.showError = true
            this.error = response.message
          }
        })
    },
    irHistorico () {
      this.$router.push('/cotizador')
    },
    generarPDFSolicitud () {
      const url = process.env.baseURL + '/siv-admin/api/v1/solicitudes/pdf/crear/' + this.numeroCotizacion + '/' + this.producto
      window.open(url)
    },
    generarPDFAcp () {
      const url = process.env.baseURL + '/siv-admin/api/v1/solicitudes/pdf/acp/crear/' + this.numeroCotizacion
      window.open(url)
    },
    linkPagoHelp () {
      this.enviarLink()
    },
    obtenerCodigoSMS () {
      this.codigoSmsMascara = this.codigoSms
    }
  }
}
</script>
<style>
  .theme--light.v-data-table thead tr th {
    color: #3067c8;
    background-color: #e1eaf8;
    font-family: Omnes Regular,sans-serif;
  }
  .theme--light.v-icon {
    color: #00adee;
  }
  input[id^=input-adn-2] {
    color: white!important;
    cursor: default;
  }
  .v-text-field__slot label[for^=input-adn-2] {
    color: white!important;
  }
</style>
