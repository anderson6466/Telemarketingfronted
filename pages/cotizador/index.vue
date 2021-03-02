<template>
  <div class="ma-4 mr-8 ml-8">
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
    <v-card>
      <v-card-title>
        <v-btn
          color="#ea0c90"
          class="ma-2 white--text"
          @click="sendMailCorreoIntermedio()"
        >
          Enviar cotizaciones
          <v-icon right dark>mdi-send</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-account-search"
          append-outer-icon="mdi-restore"
          label="Buscar"
          single-line
          hide-details
          @click:append-outer="listCotizaciones"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="cotizaciones"
        :single-select="singleSelect"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand
        item-key="nroCotizacion"
        show-select
        :sort-by="['nroCotizacion']"
        :sort-desc="[true]"
        :search="search"
        :items-per-page="5"
        :footer-props="{
          itemsPerPageAllText: 'Todo',
          itemsPerPageText: 'Mostrando',
          pageText: 'registros'
        }"
      >
        <template v-slot:item.nroCotizacion="{ item }">
          <a @click="detalle(item.nroCotizacion)">{{ item.nroCotizacion }}</a>
        </template>
        <template v-slot:item.pdf="{ item }">
          <v-icon
          medium
          class="mr-2"
          @click="imprimir(item)"
          >
            mdi-file-pdf-box-outline
          </v-icon>
        </template>
        <template v-slot:item.recotiza="{ item }">
          <v-icon
          medium
          @click="recotizar(item)"
          v-if="item.estadoSolicitud === '0' || item.estadoSolicitud === '1'"
          >
            mdi-restore
          </v-icon>
        </template>
        <template v-slot:item.solicitud="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
              medium
              color="#ea0c90"
              @click="solicitudDigital(item)"
              v-if="item.estadoSolicitud === '4'"
              v-on="on"
              >
                mdi-file-document
              </v-icon>
            </template>
            <span>Transmitido</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
              medium
              color="#ea0c90"
              @click="solicitudDigital(item)"
              v-if="item.estadoSolicitud === '10'"
              v-on="on"
              >
                mdi-cash-usd
              </v-icon>
            </template>
            <span>Con vía de cobro</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
              medium
              color="#ea0c90"
              @click="solicitudDigital(item)"
              v-if="item.estadoSolicitud === '3'"
              v-on="on"
              >
                mdi-account-box
              </v-icon>
            </template>
            <span>Entregado a GDC</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
              medium
              color="#ea0c90"
              @click="solicitudDigital(item)"
              v-if="item.estadoSolicitud === '2'"
              v-on="on"
              >
                mdi-page-next-outline
              </v-icon>
            </template>
            <span>Completado</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
              medium
              color="#0855c4"
              @click="solicitudDigital(item)"
              v-if="item.estadoSolicitud === '1'"
              v-on="on"
              >
                mdi-page-next-outline
              </v-icon>
            </template>
            <span>En Proceso</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
              medium
              @click="solicitudDigital(item)"
              v-if="item.estadoSolicitud === '0'"
              v-on="on"
              >
                mdi-page-next-outline
              </v-icon>
            </template>
            <span>Pendiente</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          NO SE ENCONTRARON COTIZACIONES
        </template>

        <template v-slot:no-results>
          NO SE ENCONTRARON COTIZACIONES
        </template>
        <template v-slot:footer.pageText="props">
          Mostrando {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
        <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
          <v-icon
            medium
            @click="expand(true)"
            v-if="item.nroCotizacionOriginal !== null && item.nroCotizacionOriginal != '' && !isExpanded"
            v-on="on"
            >
              mdi-comment-plus-outline
          </v-icon>
          <v-icon
            medium
            @click="expand(false)"
            v-if="item.nroCotizacionOriginal !== null && item.nroCotizacionOriginal != '' && isExpanded"
            v-on="on"
            >
              mdi-comment-outline
          </v-icon>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td></td>
          <td></td>
          <td colspan="9">
            Cotización <strong>regularizada</strong> <strong>{{ item.nroCotizacionOriginal }}</strong>
            por <strong><i>Cambio de Propuesta</i></strong>. <a href="#" @click="imprimirSolicitudRegularizada(item)">Ver solicitud</a>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="visorExportar" max-width="480" hide-overlay>
      <v-card>
        <v-card-title>
          <v-icon @click="visorExportar = false">mdi-close-outline</v-icon>
          <span class="headline">&nbsp;&nbsp;Exportar documentos</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-btn
            class="ma-2 white--text"
            color="#0855c4"
            @click="imprimirCotizacion()"
            >
            Cotización
            <v-icon right dark>mdi-content-save-move</v-icon>
          </v-btn>
          <v-btn
            class="ma-2 white--text"
            color="#0855c4"
            @click="imprimirSolicitud()"
            >
            Solicitud
            <v-icon right dark>mdi-content-save-move</v-icon>
          </v-btn>
          <v-btn
            v-show="showAcp"
            class="ma-2 white--text"
            color="#0855c4"
            @click="imprimirAcp()"
            >
            ACP
            <v-icon right dark>mdi-content-save-move</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-fab-transition>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            color="#0855c4"
            fab
            dark
            medium
            fixed
            bottom
            right
            v-on="on"
            style="margin-bottom: 80px"
            @click="abrirCotizadorVida()"
          >
            <v-icon>mdi-calculator</v-icon>
          </v-btn>
        </template>
        <span>Cotizador Vida</span>
      </v-tooltip>
    </v-fab-transition>
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
            right
            v-on="on"
            style="margin-bottom: 20px"
            @click="abrirCotizadorVidaFree()"
          >
            <v-icon>mdi-calculator</v-icon>
          </v-btn>
        </template>
        <span>Cotizador Vida Free</span>
      </v-tooltip>
    </v-fab-transition>
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
            @click="irADNDigital()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>Regresar a ADN Digital</span>
      </v-tooltip>
    </v-fab-transition>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  middleware: ['check-auth', 'auth'],
  data: () => ({
    visorExportar: false,
    urlTmpPDFCotizador: null,
    urlTmpPDFSolicitud: null,
    urlTmpPDFAcp: null,
    reload: false,
    error: '',
    showError: false,
    showAcp: false,
    search: '',
    documentoIdentidad: '',
    nombreAsegurado: '',
    correoAsegurado: '',
    edadActuarial: '',
    fechaNacimiento: '',
    sexo: '',
    expanded: [],
    singleExpand: false,
    headers: [
      {
        text: 'Cotizacion',
        align: 'left',
        value: 'nroCotizacion'
      },
      { text: 'Exportar', sortable: false, align: 'center', value: 'pdf' },
      { text: 'Producto', value: 'productoNombre' },
      { text: 'Plan', sortable: false, value: 'planNombre' },
      { text: 'Frecuencia', sortable: false, value: 'periodoPago' },
      { text: 'Prima', sortable: false, value: 'primaPagoTotal' },
      { text: 'Fecha', sortable: false, value: 'fechaCotizacion' },
      { text: 'Recotizar', sortable: false, value: 'recotiza' },
      { text: 'Solicitud', sortable: false, value: 'solicitud' }
    ],
    cotizaciones: [
    ],
    singleSelect: false,
    selected: [],
    obj: {}
  }),
  computed: {
  },
  created () {
    console.log('Created')
    /* eslint-disable */
    window.addEventListener('focus', function (event) {
      location.reload()
    }, false)
    /* eslint-enable */
  },
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
      this.obj = {
        idUsuarioCrm: localStorage.getItem('idContactoCRM'),
        nombreUsuario: this.$store.getters.getUser.nombreUsuario,
        rol: 'AGENTE',
        tipoDocumentoCliente: '1',
        numeroDocumentoCliente: localStorage.getItem('documentoIdentidad'),
        nombreCliente: this.nombreAsegurado,
        edadActuarial: this.edadActuarial,
        fechaNacimiento: this.fechaNacimiento,
        sexo: this.sexo,
        numeroCotizacion: '',
        fechaCotizacion: new Date().toLocaleString('es-ES').split(' ')[0],
        idOportunidadCrm: localStorage.getItem('idOportunidadCRM'),
        idCotizacionCrm: ''
      }
      this.listCotizaciones()
    },
    async listCotizaciones () {
      //const numeroDocumento = this.documentoIdentidad
      const req = {
        numeroDocumento: this.documentoIdentidad,
        agenteCorreo: this.$store.getters.getUser.correoUsuario
      }
      await this.$store.dispatch('listQuotations', req)
        .then((response) => {
          if (response.code === '01') {
            const respuesta = this.$store.state.quotations
            if (respuesta.codigoRespuesta === '01') {
              this.showError = false
              const lista = respuesta.lista
              const extraer = lista.filter(a => a.nroCotizacionOriginal !== '')
              for (let i = 0; i < extraer.length; i++) {
                const row = lista.filter(b => b.nroCotizacion === extraer[i].nroCotizacionOriginal)[0]
                const index = lista.indexOf(row)
                lista.splice(index, 1)
              }
              this.cotizaciones = lista
            } else {
              this.showError = true
              this.error = respuesta.mensajeRespuesta
            }
          } else {
            this.showError = true
            this.error = response.message
          }
        })
    },
    async abrirCotizadorVida () {
      const oportunidad = localStorage.getItem('idOportunidadCRM')
      if (oportunidad !== null && oportunidad !== '') {
        await this.$store.dispatch('callQuote1', oportunidad)
          .then(() => {
            if (this.$store.state.quote1 !== null) {
              this.showError = false
              window.open(this.$store.state.quote1)
            } else {
              this.showError = true
              this.error = 'Problemas de comunicación con CRM. Inténtelo mas tarde'
            }
          })
          .catch((e) => {
            this.showError = true
            this.error = 'Ocurrió un error en el sistema. Inténtelo mas tarde'
            console.log(e)
          })
      } else {
        this.showError = true
        this.error = 'No se encontro ID Oportunidad para este cliente'
      }
    },
    async abrirCotizadorVidaFree (val) {
      if (parseInt(this.edadActuarial) >= 18) {
        // this.obj.numeroCotizacion = ''
        if (!val) {
          this.obj.idCotizacionCrm = '0'
        } else {
          this.obj.idCotizacionCrm = '1'
          this.obj.numeroCotizacion = val.nroCotizacion
        }
        await this.$store.dispatch('callQuote2', this.obj)
          .then(() => {
            if (this.$store.state.quote2 !== null) {
              this.showError = false
              window.open(this.$store.state.quote2)
            } else {
              this.showError = true
              this.error = 'Problemas de comunicación con Cotizador Vida Free. Inténtelo mas tarde'
            }
          })
          .catch((e) => {
            this.showError = true
            this.error = 'No se pudo conectar con Cotizador Vida Free'
            console.log(e)
          })
      } else {
        this.showError = true
        this.error = 'Cliente es menor de 18 años, no se puede efectuar cotización'
      }
    },
    async loadRecotizacion (idCotizacionCrm) {
      if (idCotizacionCrm !== null) {
        await this.$store.dispatch('callRecotization', idCotizacionCrm)
          .then((response) => {
            if (response.code === '01') {
              this.showError = false
              window.open(this.$store.state.quote1)
            } else {
              this.showError = true
              this.error = response.message
            }
          })
      } else {
        this.showError = true
        this.error = process.env.error_cotizador_valida_id_crm
      }
    },
    async sendMailCorreoIntermedio () {
      const files = []
      this.selected.forEach(function (file) {
        files.push({ numeroCotizacion: file.nroCotizacion, urlPDFCotizacion: file.urlReporte })
      })
      const req = {
        destinatario: this.correoAsegurado,
        asegurado: this.nombreAsegurado,
        agenteNombre: this.$store.getters.getUser.nombreUsuario,
        agenteCorreo: this.$store.getters.getUser.correoUsuario,
        adjuntos: files // {numeroCotizacion: numeroCotizacion, urlPDFCotizacion: adjunto}
      }
      await this.$store.dispatch('sendMailPDFQuotation', req)
        .then((response) => {
          if (response.code === '01') {
            alert('Correo enviado correctamente!')
          } else {
            this.showError = true
            this.error = response.message
          }
        })
    },
    imprimirCotizacion () {
      window.open(this.urlTmpPDFCotizador)
    },
    imprimirSolicitud () {
      window.open(this.urlTmpPDFSolicitud)
    },
    imprimirAcp () {
      window.open(this.urlTmpPDFAcp)
    },
    imprimirSolicitudRegularizada (item) {
      const urlPDFSolicitud = process.env.baseURL + '/siv-admin/api/v1/solicitudes/pdf/' + item.nroCotizacionOriginal + '/' + localStorage.getItem('numeroCotizacion')
      window.open(urlPDFSolicitud)
    },
    imprimir (item) {
      console.log(item)
      let urlCotizador = ''
      if (item.productoNombre === 'Vida Free') {
        urlCotizador = item.urlReporte
      } else {
        urlCotizador = process.env.baseURL + '/siv-admin/api/v1/cotizaciones/pdf/' + item.nroCotizacion + '/' + this.$store.getters.getUser.correoUsuario + '/' + localStorage.getItem('nombreAsegurado')
      }
      try {
        if (item.estadoSolicitud === '2') {
          this.visorExportar = true
          this.showAcp = false
          this.urlTmpPDFCotizador = urlCotizador
          this.urlTmpPDFSolicitud = process.env.baseURL + '/siv-admin/api/v1/solicitudes/pdf/' + item.nroCotizacion
        } else if (item.estadoSolicitud === '10' || item.estadoSolicitud === '3' || item.estadoSolicitud === '4') {
          this.visorExportar = true
          this.showAcp = true
          this.urlTmpPDFCotizador = urlCotizador
          this.urlTmpPDFSolicitud = process.env.baseURL + '/siv-admin/api/v1/solicitudes/pdf/' + item.nroCotizacion
          this.urlTmpPDFAcp = process.env.baseURL + '/siv-admin/api/v1/solicitudes/pdf/acp/' + item.nroCotizacion
        } else {
          this.showAcp = false
          window.open(urlCotizador)
        }
      } catch (e) {
        console.log(e)
        this.showError = true
        this.error = 'Ocurrió un error inesperado. Comuniquese con el Administrador.'
      }
    },
    recotizar (item) {
      if (item.productoNombre === 'Vida Free') {
        this.abrirCotizadorVidaFree(item)
      } else {
        this.loadRecotizacion(item.crmCotizadorId)
      }
    },
    solicitudDigital (item) {
      localStorage.setItem('numeroCotizacion', item.nroCotizacion)
      localStorage.setItem('tipoCotizador', item.productoNombre)
      const tipoProductoValor = item.productoNombre === 'Vida Free' ? 'VidaFree' : 'Vida'
      const params = {
        tipoDoc: localStorage.getItem('tipoDocumento'),
        numeroDocumento: localStorage.getItem('documentoIdentidad'),
        numeroCotizacion: localStorage.getItem('numeroCotizacion'),
        usuarioLogin: this.$store.getters.getUser.idUsuario,
        agenteNombres: this.$store.getters.getUser.nombreUsuario,
        agenteCorreo: this.$store.getters.getUser.correoUsuario,
        agenteNumVendedor: this.$store.getters.getUser.codigoVendedorCRM,
        agenteIdCRM: this.$store.getters.getUser.idUsuarioCRM,
        tipoProducto: tipoProductoValor
      }
      this.$store.dispatch('callInfoQuote', params)
        .then((response) => {
          if (response.code === '01') {
            window.open(process.env.baseURL + '/siv-web/solicitud/index.html?v=1571954240', '_blank')
            localStorage.setItem('PRIMAFRECUENCIA', item.primaPagoTotal)
            localStorage.setItem('ESTADOCRM', item.estadoSolicitud)
          } else {
            this.showError = true
            this.error = response.message
          }
        })
    },
    irADNDigital () {
      this.$router.push('/adn')
    },
    detalle (a) {
      localStorage.setItem('redis_key_quote', a)
      this.$router.push('/cotizador/detalle')
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
