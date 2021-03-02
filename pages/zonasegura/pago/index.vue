<template>
  <div style="margin: 0;">
    <v-subheader v-if="!$device.isMobile" class="header-screen pl-8"><v-icon>mdi-trophy</v-icon>&nbsp;{{producto}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-icon>mdi-account</v-icon>&nbsp;{{cliente}}</v-subheader>
    <v-subheader v-if="$device.isMobile" class="header-screen-mobile pl-8"><v-icon>mdi-trophy</v-icon>&nbsp;{{producto}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-icon>mdi-account</v-icon>&nbsp;{{cliente}}</v-subheader>
    <div style="width: 100%;">
      <v-row>
        <v-col>
          <v-alert
            dense
            text
            prominent
            type="info"
            icon="mdi-cloud-alert"
            v-if="showErrorApp"
            max-width="550"
            class="mx-auto"
            dismissible
          >
            {{errorMessageApp}}
          </v-alert>
          <v-card
            class="mx-auto"
            max-width="550"
            tile
            elevation=2
            v-show="error"
          >
            <v-card-text style="text-align: center;">
              <!-- <v-row dense>
                <v-col cols="12" class="error-icon">
                  <v-icon style="color: #D54223!important">mdi-close-circle</v-icon>
                </v-col>
              </v-row> -->
              <v-row dense>
                <v-col cols="12" class="error-message">
                  Error: {{errorMessage}}
                  <hr style="margin-top: 5px; margin-bottom: 5px;">
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;" >
                      Propuesta:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenPropuesta}}
                    </v-col>
                  </v-row>
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;">
                      Titular:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenCliente}}
                    </v-col>
                  </v-row>
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;">
                      Fecha de transacción:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenFecha}}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="error-text">
                  <a href="#" v-show="errorFinalize">Finalizar</a>
                  <!-- <a href="#" v-show="errorTry" @click="retry">Intentar nuevamente</a> -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            class="mx-auto mb-2"
            max-width="550"
            tile
            elevation=2
            v-show="alert1"
          >
            <v-card-text style="text-align: center;">
              <!-- <v-row dense>
                <v-col cols="12" class="finalice-icon">
                  <v-icon style="color: #0CACED!important">mdi-check-circle-outline</v-icon>
                </v-col>
              </v-row> -->
              <v-row dense style="background-color: #eff3ff">
                <v-col cols="12" class="finalice-message">
                  ¡Pago y afiliaci&oacute;n realizados con &eacute;xito!
                  <hr style="margin-top: 5px; margin-bottom: 5px;">
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;" >
                      Propuesta:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenPropuesta}}
                    </v-col>
                  </v-row>
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;">
                      Titular:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenCliente}}
                    </v-col>
                  </v-row>
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;">
                      Fecha de transacción:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenFecha}}
                    </v-col>
                  </v-row>
                  <v-row class="finalice-data">
                    <v-col cols="6" style="text-align: left;">
                      Descripción de pago:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenDescripcion}}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row dense style="background-color: #e3eaf9">
                <v-col cols="12" class="finalice-data">
                  <v-row>
                    <v-col cols="6" style="text-align: left;">
                      Tarjeta:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenTarjetaPago}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" style="text-align: left;">
                      Medio de pago:
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      {{resumenMedioPago}}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" style="text-align: left;">
                      <strong>Total:</strong>
                    </v-col>
                    <v-col cols="6" style="text-align: left;">
                      <strong>{{resumenTotalPago}}</strong>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" style="text-align: left; color: #ea0c90!important; font-weight: bold;">
                  <v-icon>mdi-printer</v-icon>&nbsp;&nbsp;Se recomienda imprimir o guardar esta pantalla.
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            class="mx-auto mb-2"
            max-width="550"
            tile
            elevation=2
            v-show="alert2"
          >
            <v-card-text style="text-align: center;">
              <v-row dense>
                <v-col cols="12" class="finalice-icon">
                  <v-icon style="color: #0CACED!important">mdi-check-circle-outline</v-icon>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" class="finalice-message">
                  ¡Pago realizado con &eacute;xito!
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="finalice-message pr-4" style="text-align: none;">
                  Ahora, debes afiliar una cuenta o tarjeta para los siguientes pagos
                </v-col>
                <v-col cols="4" class="finalice-message">
                  <v-btn
                  color="#ea0c90"
                  @click="prepararPagoRecurrente"
                  raiced
                  class="white--text btn-amount"
                  block
                  medium>
                    AFILIAR
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            class="mx-auto mb-2"
            max-width="550"
            tile
            elevation=5
            v-show="validador"
          >
            <v-card-subtitle class="subtitle pt-8">Ingresa tu documento de identidad para continuar<br> con el <strong>pago</strong></v-card-subtitle>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="12" sm="12">
                  <v-text-field
                  prepend-inner-icon="mdi-keyboard"
                  v-model="txtDocument"
                  outlined
                  required
                  :rules="documentRules"
                  v-mask="maskDocument"
                  v-on:keyup="validate">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card
            class="mx-auto"
            max-width="550"
            tile
            elevation=5
            v-show="pagoRecurrente"
            style="margin-bottom: 100px;"
          >
            <v-card-title class="mt-8 mb-2"><div class="mt-8 title">Pago de cuotas recurrentes</div></v-card-title>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab
                key="tarjeta"
              >
                Con tarjeta de crédito o débito
              </v-tab>
              <v-tab
                key="cuenta"
              >
                Con cuenta bancaria
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item
                key="tarjeta"
              >
                <v-card
                class="mx-auto mb-2 pr-4 pl-4 pb-8">
                  <v-row>
                    <v-col cols="12" class="target-title">
                      Ingresa los datos de tu tarjeta de crédito o débito desde donde se realizarán los <strong>pagos recurrentes</strong> de tu seguro.
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md-12 sm-12>
                      <PagoNiubiz
                      v-if="rrenderer"
                      :configuration=niubizConfig
                      :elementStyle=styles
                      :dataClient=pagador
                      identifierID="500065432"
                      labelCheckOption=" Autorizo se realicen cobros de mis cuotas recurrentes a estas tarjetas"
                      buttonText="ACEPTAR"
                      :vuetifyStyle=vuetify
                      />
                    </v-col>
                  </v-row>
                  <v-row dense style="margin-top: -8px;">
                    <v-col cols="12" class="target-message-button pb-6">
                      Dando clic en ACEPTAR autorizo el cargo recurrente de las primas.
                    </v-col>
                  </v-row>
                  <!-- <v-row dense style="margin-top: -8px;">
                    <v-col cols="12">
                      <v-btn
                      color="#ea0c90"
                      raiced
                      class="white--text btn-amount"
                      block
                      large
                      @click="pagarPrimaRecurrente(2)">ACEPTAR</v-btn>
                    </v-col>
                  </v-row> -->
                  <v-row dense>
                    <v-col cols="12" class="mb-8 conditions">
                      Al continuar acepto <a href="#" @click="dialog=true" class="link-conditions"> las condiciones del convenio de pagos</a>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item
                key="cuenta"
              >
                <v-card
                class="mx-auto mb-2 pr-4 pl-4 pb-8">
                  <v-row>
                    <v-col cols="12" class="target-title">
                      Ingresa los datos de tu cuenta desde donde se realizarán los <strong>pagos recurrentes</strong> de tu seguro.
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" md="12" sm="12">
                      <v-select
                        v-model="cmbBanco"
                        label="Entidad bancaria"
                        item-text="descripcion"
                        item-value="codigo"
                        :items="bancos"
                        outlined
                        v-on:change="changeBank"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense style="margin-top: -16px;">
                    <v-col cols="12" md="6" sm="12">
                      <v-select
                        v-model="cmbTipoCuenta"
                        item-text="descripcion"
                        item-value="codigo"
                        label="Tipo cuenta"
                        :items="tipoCuentas"
                        outlined
                        v-on:change="changeCuenta"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-select
                        v-model="cmbMoneda"
                        item-text="descripcion"
                        item-value="codigo"
                        label="Moneda"
                        :items="monedas"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense style="margin-top: -16px;">
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field
                      v-model="txtTarget3"
                      placeholder="9999 9999 9999 9999"
                      outlined
                      :rules="targetRules3"
                      v-mask="maskTarget3">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense style="margin-top: -16px;">
                    <v-col cols="12" class="target-message-button pb-6">
                      Dando clic en ACEPTAR autorizo el cargo recurrente de las primas.
                    </v-col>
                  </v-row>
                  <v-row dense style="margin-top: -16px;">
                    <v-col cols="12">
                      <v-btn
                      color="#ea0c90"
                      raiced
                      class="white--text btn-amount"
                      block
                      large
                      @click="pagarPrimaRecurrente(1)">ACEPTAR</v-btn>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" class="mb-8 conditions">
                      Al continuar acepto<a href="#" class="link-conditions"> las condiciones del convenio de pagos</a>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            <v-card-actions class="footer"><v-icon color="#0855c4" size="small">mdi-lock</v-icon>Proceso online 100% seguro</v-card-actions>
          </v-card>
          <v-card
          class="mx-auto"
          max-width="550"
          tile
          elevation=5
          v-show="primeraPrima"
          >
            <v-card-title class="mt-8 mb-2"><div class="mt-8 title">Pago de prima</div></v-card-title>
            <v-card-subtitle class="subtitle">Ingresa los datos de tu tarjeta de crédito o débito</v-card-subtitle>
            <v-card-text>
              <PagoNiubiz
              v-if="renderer"
              :configuration=niubizConfig
              :elementStyle=styles
              :dataClient=pagador
              identifierID="500065432"
              :showCheckOption=checkRecurrente
              labelCheckOption="Autorizo se realicen cobros de mis cuotas recurrentes a estas tarjetas"
              :buttonText=botonTexto
              :vuetifyStyle=vuetify
              />
              <v-row dense class="mb-4">
                <v-col cols="12" class="mb-8 conditions">
                  Al continuar <a href="#" @click="dialog=true" class="link-conditions">acepto las condiciones del convenio de pagos</a>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="footer"><v-icon color="#0855c4" size="small">mdi-lock</v-icon>Pago online 100% seguro</v-card-actions>
          </v-card>
        </v-col>
        <v-col
        cols="12"
        md="5"
        lg="5"
        sm="12"
        xs="12"
        align-self="center">
          <v-row>
            <v-col v-if="!$device.isMobile">
              <h2 class="text-secure pb-3 pl-1" style="font-size: 26px;">Es momento de estar seguros y protegidos.</h2>
              <div class="text-secure pb-2"><hr style="border-bottom: 0px;border-left: 0px;border-right: 0px;border-top: 0.5px solid rgb(193, 209, 244); width: 50%; padding-bottom: 20px;"><tr><td width="25%" valign="top" style="text-align: center;"><img src="../../../assets/candado_venta.svg" alt="compra segura" style="width: 100%;"></td><td width="75%" valign="top" style="text-align: left; padding-left: 5px;"><p class="text-secondary" style="font-size: 12px; margin-bottom: 0px; line-height: 1.3; max-width: 160px;"><span style="font-weight: bold;"> Tu compra es 100% segura. </span> <br>Contamos con el respaldo del Grupo Intercorp.</p></td></tr></div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">AUTORIZACI&Oacute;N DE CARGO DE PRIMAS</span>
        </v-card-title>
        <v-card-text>
          <div style="height:150px; overflow-y: scroll; overflow-x: hidden;">
            <p style="text-align: justify;">
            A trav&eacute;s de la presente solicitud autorizo pagar de manera recurrente, a mes adelantado,
            con cargo al medio de pago y la moneda elegida el valor de la prima de mi seguro de vida,
            conforme a lo se&ntilde;alado en las Condiciones Particulares. La afiliaci&oacute;n tendr&aacute;
            efecto luego de que el Banco o la procesadora de la tarjeta de cr&eacute;dito d&eacute; conformidad
            a la misma. El cobro de la(s) prima(s) podr&aacute; realizarse a partir del d&iacute;a 10 de cada mes,
            por lo que me comprometo a tener los fondos necesarios para que el cargo se realice en forma satisfactoria.
            De no tener &eacute;xito inicialmente, se reintentar&aacute;
            el (los) cargo(s) de la(s) prima(s) impaga(s) durante el transcurso del mes.
            </p>
            <p style="text-align: justify;">
            En caso estuviere atrasado en una o m&aacute;s primas y/o existiera alg&uacute;n pr&eacute;stamo,
            el cargo ser&aacute; por el total de las primas impagas, incluyendo aquellos gastos y/o intereses
            generados por dicho retraso y/o por los intereses del pr&eacute;stamo, respectivamente.
            </p>
            <p style="text-align: justify;">
            Los cargos en la tarjeta de cr&eacute;dito ser&aacute;n aplicados seg&uacute;n la priorizaci&oacute;n
            definida por cada banco y se realizar&aacute;n en la moneda que defina el cliente en la solicitud.
            De elegir la opci&oacute;n de cargo en nuevos soles, ya sea en tarjeta de cr&eacute;dito o en cuenta bancaria,
            l monto de la prima expresada en moneda extranjera se convertir&aacute; con el tipo de cambio vigente al momento de efectuar la transacci&oacute;n.
            </p>
            <p style="text-align: justify;">
            En caso de reemplazo de la tarjeta por p&eacute;rdida, robo, renovaci&oacute;n o vencimiento, el Banco actualizar&aacute; el nuevo n&uacute;mero de tarjeta de cr&eacute;dito para poder continuar con el cargo autom&aacute;tico. Sin perjuicio de ello, es obligaci&oacute;n del Cliente informar a Interseguro el cambio del n&uacute;mero de tarjeta.
            </p>
            <p style="text-align: justify;">
            La presente autorizaci&oacute;n de cargo se entender&aacute; dada, para todos los efectos legales, el mismo d&iacute;a en que se realice el cargo autom&aacute;tico en la cuenta bancaria o en la tarjeta de cr&eacute;dito y se entender&aacute; que se encuentra vigente en iguales t&eacute;rminos, en tanto se puedan ejecutar los cargos de las primas correspondientes.
            </p>
            <p style="text-align: justify;">
            El cambio de la presente autorizaci&oacute;n de cargo de primas deber&aacute; realizarse previa coordinaci&oacute;n con Interseguro.
            </p>
            <p style="text-align: justify;">
            Seg&uacute;n lo establecido en las Condiciones Generales de su p&oacute;liza, para el caso de las solicitudes de t&eacute;rmino de contrato, la compa&ntilde;&iacute;a seguir&aacute; realizando los cargos y/o cobranzas hasta que haya aceptado la solicitud de t&eacute;rmino de contrato del cliente.
            </p>
            <p style="text-align: justify;">
              La presente instrucci&oacute;n expirar&aacute; en forma autom&aacute;tica en caso de caducidad del contrato con su Banco o con Interseguro.
            </p>
            <p style="text-align: justify;">
            Interseguro carecer&aacute; de toda responsabilidad si el cargo de las primas no puede realizarse por insuficiencia de saldos o cualquier otro motivo no imputable a la compa&ntilde;&iacute;a. Es responsabilidad del contratante verificar que los cargos de prima se realicen.
            La presente autorizaci&oacute;n deja sin efecto la v&iacute;a de pago antes utilizada.
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import 'assets/stylesheet/payform.min.css'
import moment from 'moment'
import { mask } from 'vue-the-mask'
import { PagoNiubiz } from 'vue-niubiz-component'

export default {
  directives: {
    mask
  },
  components: {
    PagoNiubiz
  },
  layout: 'external',
  beforeUpdate () {
    if (this.$route.query.producto !== undefined) {
      if (!this.useToken) {
        this.useToken = true
        const temp = this.$store.getters.getPayData.cliente
        const array = temp.split(' ')
        let nombres = ''
        for (let i = 0; i < array.length; i++) {
          if (i === 0 || i === 2) {
            nombres += array[i] + ' '
          }
        }
        this.cliente = nombres
        this.producto = this.$store.getters.getPayData.plan
        this.agente = this.$store.getters.getPayData.correoAgente
        this.botonTexto = 'PAGAR ' + this.$store.getters.getPayData.monto
        this.documento = this.$store.getters.getPayData.documento
        this.frecuencia = this.$store.getters.getPayData.frecuencia
        this.numeroPropuesta = this.$store.getters.getPayData.numeroPropuesta
        this.correoCliente = this.$store.getters.getPayData.correoCliente
        this.montoPago = this.$store.getters.getPayData.montoValue
        this.moneda = this.$store.getters.getPayData.moneda
        this.formulario = this.$store.getters.getPayData.afiliacion
        const size = this.documento.length
        let textMask = ''
        for (let i = 0; i < size; i++) {
          textMask += '#'
        }
        this.maskDocument = textMask
        console.log('Mask: ' + this.maskDocument)
        const obj = {
          cliente: this.cliente,
          producto: this.producto,
          agente: this.agente,
          montoText: this.botonTexto,
          numeroDocumento: this.documento,
          frecuencia: this.frecuencia,
          propuesta: this.numeroPropuesta,
          moneda: this.moneda,
          montoValue: this.montoPago,
          correoCliente: this.correoCliente
        }
        localStorage.setItem('data_client', JSON.stringify(obj))
        if (this.formulario * 1 === 0) {
          this.initialize()
        } else {
          this.validador = false
          this.primeraPrima = false
          this.prepararPagoRecurrente()
          // this.error = 1
          // this.errorMessageApp = 'Puede actualizar su via de cobro de pagos recurrentes. Por su seguridad no se muestra información ya registrada.'
          // this.cargarDatosCuentaBancaria()
          // this.sesionRecurrente()
        }
      }
    }
    if (this.$route.query.transactionToken !== undefined && !this.usePago) {
      this.validador = false
      this.usePago = true
      console.log('Store...')
      console.log(localStorage.getItem('data_client'))
      this.primeraPrima = false
      const data = JSON.parse(localStorage.getItem('data_client'))
      this.producto = data.producto
      this.documento = data.numeroDocumento
      this.numeroPropuesta = data.propuesta
      this.agente = data.agente
      this.cliente = data.cliente
      this.frecuencia = data.frecuencia
      this.botonTexto = data.montoText
      this.montoPago = data.montoValue
      this.moneda = data.moneda
      this.correoCliente = data.correoCliente
      this.$store.commit('setLoading', true)
      this.tokenizar()
    }
  },
  watchQuery (newQuery, oldQuery) {
    if (newQuery.cliente !== undefined && newQuery.cliente !== null) {
      console.log('Hay cliente')
    }
    if (newQuery.producto !== undefined && newQuery.producto !== null) {
      if (!this.useToken) {
        this.useToken = true
        const temp = this.$store.getters.getPayData.cliente
        const array = temp.split(' ')
        let nombres = ''
        for (let i = 0; i < array.length; i++) {
          if (i === 0 || i === 2) {
            nombres += array[i] + ' '
          }
        }
        this.cliente = nombres
        this.producto = this.$store.getters.getPayData.plan
        this.agente = this.$store.getters.getPayData.correoAgente
        this.botonTexto = 'PAGAR ' + this.$store.getters.getPayData.monto
        this.documento = this.$store.getters.getPayData.documento
        this.frecuencia = this.$store.getters.getPayData.frecuencia
        this.numeroPropuesta = this.$store.getters.getPayData.numeroPropuesta
        this.correoCliente = this.$store.getters.getPayData.correoCliente
        this.montoPago = this.$store.getters.getPayData.montoValue
        this.moneda = this.$store.getters.getPayData.moneda
        this.formulario = this.$store.getters.getPayData.afiliacion
        const obj = {
          cliente: this.cliente,
          producto: this.producto,
          agente: this.agente,
          montoText: this.botonTexto,
          numeroDocumento: this.documento,
          frecuencia: this.frecuencia,
          propuesta: this.numeroPropuesta,
          moneda: this.moneda,
          montoValue: this.montoPago,
          correoCliente: this.correoCliente
        }
        localStorage.setItem('data_client', JSON.stringify(obj))
        if (this.formulario * 1 === 0) {
          this.initialize()
        } else {
          // this.error = 1
          // this.errorMessageApp = 'Puede actualizar su via de cobro de pagos recurrentes. Por su seguridad no se muestra información ya registrada.'
          this.cargarDatosCuentaBancaria()
          this.sesionRecurrente()
        }
      }
    }
  },
  data () {
    return {
      formulario: 0,
      usePago: false,
      useToken: false,
      checkRecurrente: true,
      niubizConfig: {
        sessionkey: '',
        channel: 'paycard',
        merchantid: '522591303',
        purchasenumber: '0780000001',
        currency: 'PEN',
        amount: '132.40',
        callbackurl: process.env.niubiz_redirect,
        language: 'es',
        font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap',
        recurrentmaxamount: '1000.00'
      },
      styles: {
        base: {
          color: '#495057',
          fontWeight: 700,
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          placeholder: {
            color: '#c4c4c4'
          },
          autofill: {
            color: '#e39f48'
          }
        },
        invalid: {
          color: '#dc3545',
          '::placeholder': { color: '#FFCCA5' }
        }
      },
      primeraPrima: false,
      renderer: false,
      rrenderer: false,
      vuetify: true,
      pagador: {
        name: 'Noel',
        lastName: 'Chavez ',
        email: 'accept@cybersource.com',
        alias: 'leo',
        userBlockId: 'miUserBlockId'
      },
      checkPrimeraPrima: true,
      botonTexto: '',
      producto: '',
      agente: '',
      documento: '',
      frecuencia: '',
      numeroPropuesta: '',
      sessionID: '',
      montoPago: '',
      moneda: '',
      correoCliente: '',
      montoMaximo: '',
      cliente: '',
      tab: null,
      cardToken: '',
      cardBrand: '',
      cardNumber: '',
      paymentId: '',
      paymentStatus: '',
      subscriptionId: '',
      error: false,
      errorMessageApp: '',
      validador: true,
      txtDocument: '',
      documentRules: [
        v => !!v || 'Documento es requerido'
      ],
      maskDocument: '########',
      showErrorApp: false,
      idViaCobro: '',
      errorMessage: '',
      alert1: false,
      alert2: false,
      dialog: false,
      cmbBanco: null,
      bancos: [],
      cmbTipoCuenta: null,
      tipoCuentas: [],
      cmbMoneda: null,
      monedas: [],
      pagoRecurrente: false,
      txtTarget3: '',
      targetRules3: [
        v => !!v || 'Cuenta es requerida',
        v => (v !== undefined && v.length === this.sizeTarget3) || this.maskTarget3Text
      ],
      maskTarget3: '####-####-####-####',
      errorTry: false,
      errorFinalize: false,
      resumenPropuesta: '',
      resumenCliente: '',
      resumenFecha: '',
      resumenDescripcion: 'Pago de primera prima.',
      resumenMedioPago: '',
      resumenTarjetaPago: '',
      resumenTotalPago: ''
    }
  },
  created () {
    this.$nuxt.$on('card-message-error', (a) => {
      // alert('Upsssssss')
      this.showErrorApp = true
      let textMessage = ''
      if (a !== null) {
        try {
          const t = JSON.parse(a)
          textMessage = t.errorMessage
        } catch (e) {
          console.log(a)
          textMessage = 'Falta completar campos obligatorios.'
        }
      } else {
        textMessage = 'Falta completar campos obligatorios.'
      }
      this.errorMessageApp = textMessage
    })
    this.$nuxt.$on('show-loader', () => {
      this.$store.commit('setLoading', true)
    })
    this.$nuxt.$on('hide-loader', () => {
      this.$store.commit('setLoading', false)
    })
    this.$nuxt.$on('check-change-recurrent', (a) => {
      console.log('Checked::')
      console.log(a)
      localStorage.setItem('data_check_recurrent', a.checked ? 1 : 0)
    })
  },
  mounted () {
    this.decryptUrl()
  },
  methods: {
    initialize () {
      const dataClient = JSON.parse(localStorage.getItem('data_client'))
      this.resumenPropuesta = dataClient.propuesta
      this.resumenCliente = dataClient.cliente
      this.resumenFecha = moment().format('DD/MM/YYYY HH:mm:ss')
      const nombresArray = dataClient.cliente.split(' ')
      this.pagador.name = nombresArray[0]
      this.pagador.lastName = nombresArray[1]
      this.pagador.email = dataClient.correoCliente
      this.pagador.alias = 'asegurado'
      this.pagador.userBlockId = dataClient.propuesta

      this.niubizConfig.currency = this.moneda
      if (this.moneda === 'PEN') {
        this.niubizConfig.merchantid = process.env.merchantid_pen
      } else {
        this.niubizConfig.merchantid = process.env.merchantid_usd
      }

      let montoPagoNiubiz = this.montoPago
      if (process.env.niubiz_test_active) {
        montoPagoNiubiz = process.env.niubiz_test_amount
      }

      this.niubizConfig.amount = montoPagoNiubiz
      this.niubizConfig.recurrentmaxamount = '1000.00'
      const request = {
        currency: this.moneda,
        amount: montoPagoNiubiz,
        clientIP: localStorage.getItem('client_ip'),
        recurrenceMaxAmount: 1000.00,
        saleNumber: dataClient.propuesta,
        identityNumber: dataClient.numeroDocumento,
        email: dataClient.correoCliente
      }
      this.$store.dispatch('niubizSessionAction', request)
        .then((response) => {
          this.showErrorApp = false
          this.errorMessageApp = ''
          if (response.code === '01') {
            console.log('Sesion creada')
            console.log(response.data)
            this.niubizConfig.sessionkey = response.data.sesionID
            this.renderer = true
          } else {
            this.pagarAlternativo()
          }
        })
      console.log(this.niubizConfig.sessionkey)
    },
    sesionRecurrente () {
      const dataClient = JSON.parse(localStorage.getItem('data_client'))
      this.resumenPropuesta = dataClient.propuesta
      this.resumenCliente = dataClient.cliente
      this.resumenFecha = moment().format('DD/MM/YYYY HH:mm:ss')
      const nombresArray = dataClient.cliente.split(' ')
      this.pagador.name = nombresArray[0]
      this.pagador.lastName = nombresArray[1]
      this.pagador.email = dataClient.correoCliente
      this.pagador.alias = 'asegurado'
      this.pagador.userBlockId = dataClient.propuesta

      this.niubizConfig.currency = this.monedas
      if (this.moneda === 'PEN') {
        this.niubizConfig.merchantid = process.env.merchantid_r_pen
      } else {
        this.niubizConfig.merchantid = process.env.merchantid_r_usd
      }

      let montoPagoNiubiz = this.montoPago
      if (process.env.niubiz_test_active) {
        montoPagoNiubiz = process.env.niubiz_test_amount
      }
      this.niubizConfig.amount = montoPagoNiubiz
      this.niubizConfig.recurrentmaxamount = '1000.00'
      const request = {
        currency: this.moneda,
        amount: montoPagoNiubiz,
        clientIP: localStorage.getItem('client_ip'),
        recurrenceMaxAmount: 1000.00,
        saleNumber: dataClient.propuesta,
        identityNumber: dataClient.numeroDocumento,
        email: dataClient.correoCliente
      }
      this.$store.dispatch('niubizSessionAction', request)
        .then((response) => {
          this.showErrorApp = false
          this.errorMessageApp = ''
          if (response.code === '01') {
            console.log('Sesion creada')
            console.log(response.data)
            this.niubizConfig.sessionkey = response.data.sesionID
            this.rrenderer = true
          }
        })
      console.log(this.niubizConfig.sessionkey)
    },
    decryptUrl () {
      if (this.$route.query.cliente !== undefined) {
        localStorage.setItem('_token_', this.$route.query.cliente)
        const request = {
          token: this.$route.query.cliente.replace(/ /g, '+')
        }
        this.$store.dispatch('pagoWebLinkDecrypt', request)
          .then((response) => {
            if (response.code === '01') {
              localStorage.setItem('data_form_page', 1)
              this.$router.push('/zonasegura/pago?producto=seguroVida')
            } else {
              this.error = true
              this.validador = false
              if (response.code === '98') {
                this.errorMessage = process.env.error_pago_web_token_usado
              } else if (response.code === '97') {
                this.errorMessage = process.env.error_pago_web_token_caducado
              } else {
                this.errorMessage = process.env.error_pago_web_decrypt
              }
            }
          })
      }
    },
    tokenizar () {
      this.validador = false
      const request = {
        tokenId: this.$route.query.transactionToken,
        currency: this.moneda,
        customer: {
          email: this.correoCliente,
          documentType: 'DNI',
          documentNumber: this.documento,
          country: 'PE',
          name: this.cliente,
          lastName: '',
          motherLastName: '',
          phone: '',
          address: '-----',
          addressCity: '--',
          metadata: {
            documentNumber: this.documento,
            prueba: 'Niubiz'
          }
        },
        antifraud: {
          clientIp: localStorage.getItem('client_ip')
        }
      }
      this.resumenPropuesta = this.numeroPropuesta
      this.resumenCliente = this.cliente
      this.resumenFecha = moment().format('DD/MM/YYYY HH:mm:ss')
      this.$store.dispatch('pasarellaTokenizeAction', request)
        .then((response) => {
          if (response.code === '01') {
            this.cardToken = response.data.card.creationToken
            this.cardBrand = response.data.card.brand
            if (this.cardBrand === 'visa') {
              this.idViaCobro = 8
            } else if (this.cardBrand === 'mastercard') {
              this.idViaCobro = 10
            } else if (this.cardBrand === 'amex') {
              this.idViaCobro = 9
            } else if (this.cardBrand === 'dinersclub') {
              this.idViaCobro = 11
            }
            this.cardNumber = response.data.card.number
            if (localStorage.getItem('data_form_page') * 1 === 1) {
              localStorage.setItem('CARD_BRAND', this.cardBrand.toUpperCase())
              localStorage.setItem('CARD_NUMBER', this.cardNumber)
              const montoPagoText = this.moneda === 'PEN' ? 'S/.' + this.montoPago : '$' + this.montoPago
              localStorage.setItem('AMOUNT_PAY', montoPagoText)
              let montoPagoNiubiz = this.montoPago
              console.log('TEST====>>>' + process.env.niubiz_test_active)
              if (process.env.niubiz_test_active) {
                montoPagoNiubiz = process.env.niubiz_test_amount
              }
              const request1 = {
                token: this.$route.query.transactionToken,
                currency: this.moneda,
                customer: {
                  email: this.correoCliente,
                  documentType: 'DNI',
                  documentNumber: this.documento,
                  country: 'PE',
                  name: this.cliente,
                  lastName: this.cliente,
                  motherLastName: '',
                  phone: '',
                  address: '-----',
                  addressCity: '--',
                  metadata: {
                    documentNumber: this.documento
                  }
                },
                subscription: {
                  objectId: '',
                  currency: this.moneda,
                  amount: montoPagoNiubiz,
                  metadata: {
                    numeroPoliza: this.numeroPropuesta
                  }
                },
                antifraud: {
                  clientIp: localStorage.getItem('client_ip')
                }
              }
              this.$store.dispatch('pasarellaPayAction', request1)
                .then((response) => {
                  if (response.code === '01') {
                    this.paymentId = response.data.paymentId
                    this.paymentStatus = response.data.paymentStatus
                    this.subscriptionId = response.data.subscriptionId
                    /* if (this.checkPrimeraPrima) {
                      this.alert1 = true
                    } else {
                      this.alert2 = true
                    } */
                    this.pagarPrimeraPrima()
                    this.renderer = false
                  } else {
                    console.log('Ocurrió un error')
                    this.$store.commit('setLoading', false)
                    this.error = true
                    const messagesError = process.env.error_message_pago
                    const messageError = JSON.parse(response.data.mensajeRespuesta)
                    // this.errorMessage = 'No se realizó cobro, intentar nuevamente.
                    const filterError = messagesError.filter(m => m.codigo === messageError.providerCode)
                    let filterErrorMessage = ''
                    if (filterError !== null && filterError.length > 0) {
                      filterErrorMessage = filterError[0].mensaje
                    } else {
                      filterErrorMessage = messageError.message
                    }
                    // this.errorMessage = messageError.message
                    this.errorMessage = filterErrorMessage
                    this.errorTry = true
                  }
                })
            } else {
              this.pagarPrimaRecurrente(2)
              this.rrenderer = false
            }
            this.$store.commit('setLoading', false)
          } else {
            console.log('Ocurrió un error')
            this.$store.commit('setLoading', false)
            this.error = true
            const messagesError = process.env.error_message_pago
            const messageError = JSON.parse(response.data.mensajeRespuesta)
            // this.errorMessage = 'No se realizó cobro, intentar nuevamente.
            const filterError = messagesError.filter(m => m.codigo === messageError.providerCode)
            let filterErrorMessage = ''
            if (filterError !== null && filterError.length > 0) {
              filterErrorMessage = filterError[0].mensaje
            } else {
              filterErrorMessage = messageError.message
            }
            // this.errorMessage = messageError.message
            this.errorMessage = filterErrorMessage
            this.errorTry = true
          }
        })
    },
    pagarPrimeraPrima () {
      this.renderer = false
      let request = {}
      this.checkPrimeraPrima = localStorage.getItem('data_check_recurrent') * 1 === 1
      if (this.checkPrimeraPrima) {
        request = {
          numeroPropuesta: this.numeroPropuesta,
          numeroTarjeta: this.cardToken,
          fechaVencimiento: '',
          tipoViaCobro: 2,
          viaCobro: this.idViaCobro,
          tipoCuenta: 0,
          estado: 1,
          codPeriodoPago: this.frecuencia,
          codRamo: '1',
          codSubRamo: '01',
          numDiaCobro: 2,
          usuario: 'adn',
          numeroTarjetaPp: this.cardToken,
          fechaVencimientoPp: '',
          tipoViaCobroPp: 2,
          viaCobroPp: this.idViaCobro,
          tipoCuentaPp: 0,
          ip: localStorage.getItem('client_ip'),
          pasarela: 'Niubiz',
          pasarelaPp: 'Niubiz',
          subscriptionId: this.subscriptionId,
          tarjetaCobroRecurrente: this.cardNumber
        }
      } else {
        request = {
          numeroPropuesta: this.numeroPropuesta,
          numeroTarjeta: '',
          fechaVencimiento: '',
          tipoViaCobro: 3,
          viaCobro: 13,
          tipoCuenta: 0,
          estado: 1,
          codPeriodoPago: this.frecuencia,
          codRamo: '1',
          codSubRamo: '01',
          numDiaCobro: 2,
          usuario: 'adn',
          numeroTarjetaPp: this.cardToken,
          fechaVencimientoPp: '',
          tipoViaCobroPp: 2,
          viaCobroPp: this.idViaCobro,
          tipoCuentaPp: 0,
          ip: localStorage.getItem('client_ip'),
          pasarelaPp: 'Niubiz',
          subscriptionId: this.subscriptionId
        }
      }
      this.showErrorApp = false
      this.$store.dispatch('afiliaWebAction', request)
        .then((response) => {
          this.primeraPrima = false
          if (response.code === '01' || response.code === '98') {
            this.resumenMedioPago = localStorage.getItem('CARD_BRAND')
            this.resumenTotalPago = localStorage.getItem('AMOUNT_PAY')
            this.resumenTarjetaPago = localStorage.getItem('CARD_NUMBER')
            if (this.checkPrimeraPrima) {
              this.alert1 = true
            } else {
              this.alert2 = true
            }
          } else {
            // this.showErrorApp = true
            // this.errorMessageApp = response.message
            this.$store.commit('setLoading', false)
            this.error = true
            this.errorMessage = 'Su pago ha sido registrado, pero ocurrieron errores internos. Contacte a su agente.'
            this.errorTry = false
          }
        })
    },
    pagarPrimaRecurrente (tipo) {
      this.showErrorApp = false
      this.errorMessageApp = ''
      let cuentaTarjeta = ''
      if (tipo === 1) {
        cuentaTarjeta = this.txtTarget3
        this.idViaCobro = this.cmbBanco
      } else {
        cuentaTarjeta = this.cardToken
      }
      const request = {
        numeroPropuesta: this.numeroPropuesta,
        numeroTarjeta: cuentaTarjeta,
        fechaVencimiento: '',
        tipoViaCobro: tipo,
        viaCobro: this.idViaCobro,
        tipoCuenta: this.cmbTipoCuenta,
        moneda: this.cmbMoneda,
        estado: 1,
        codPeriodoPago: this.frecuencia,
        codRamo: '1',
        codSubRamo: '01',
        numDiaCobro: 2,
        usuario: 'adn',
        numeroTarjetaPp: '',
        fechaVencimientoPp: '',
        tipoViaCobroPp: 3,
        viaCobroPp: 13,
        tipoCuentaPp: 0,
        ip: localStorage.getItem('client_ip'),
        pasarela: 'Niubiz',
        pasarelaPp: 'Niubiz',
        tarjetaCobroRecurrente: this.cardNumber
      }
      this.$store.dispatch('afiliaWebAction', request)
        .then((response) => {
          this.pagoRecurrente = false
          if (response.code === '01') {
            this.resumenMedioPago = localStorage.getItem('CARD_BRAND')
            this.resumenTotalPago = localStorage.getItem('AMOUNT_PAY')
            this.resumenTarjetaPago = localStorage.getItem('CARD_NUMBER')
            this.alert1 = true
          } else {
            // this.showErrorApp = true
            // this.errorMessageApp = response.message
            this.error = true
            this.errorMessage = 'Su pago ha sido registrado, pero ocurrieron errores internos. Contacte a su agente.'
            this.errorTry = false
          }
        })
    },
    describeTipoCuenta (tipoCuenta) {
      switch (tipoCuenta) {
        case '1': return 'CORRIENTE'
        case '2': return 'AHORRO'
        default: return 'Otro'
      }
    },
    changeBank (val) {
      this.cmbTipoCuenta = null
      this.cmbMoneda = null
      this.txtTarget3 = ''
      this.tipoViaCobro = 2
      this.tipoCuentas = []
      const temp = this.infoCobro.filter(v => v.tipoViaCobro === 2 && v.codigoViaCobro === val)
      for (let i = 0; i < temp.length; i++) {
        this.tipoCuentas.push({ codigo: temp[i].tipoCuenta, descripcion: this.describeTipoCuenta(temp[i].tipoCuenta) })
      }
      this.tipoCuentas = [...new Set(this.tipoCuentas)]
    },
    changeCuenta (val) {
      this.txtTarget3 = ''
      this.maskTarget3 = this.infoCobro.filter(v => v.codigoViaCobro === this.cmbBanco && v.tipoViaCobro === 2 && v.tipoCuenta === val)[0].mascara.replace(/x/gi, '#')
      this.maskTarget3Text = this.maskTarget3.replace(/#/gi, 9)
      this.sizeTarget3 = this.maskTarget3.length
    },
    retry () {
      this.pagarAlternativo()
    },
    validate () {
      setTimeout(() => {
        if (this.txtDocument === this.documento) {
          this.validador = false
          if (this.formulario * 1 === 0) {
            this.primeraPrima = true
          } else {
            this.pagoRecurrente = true
          }
        }
      }, 500)
    },
    cargarDatosCuentaBancaria () {
      this.$store.dispatch('pagoWebInit', null)
        .then((response) => {
          this.showErrorApp = false
          this.errorMessageApp = ''
          if (response.code === '01') {
            this.infoCobro = response.viasCobro
            const viaCuentas = this.infoCobro.filter(v => v.tipoViaCobro === 2)
            for (let i = 0; i < viaCuentas.length; i++) {
              this.bancos.push({ descripcion: viaCuentas[i].nombreViaCobro, codigo: viaCuentas[i].codigoViaCobro })
            }
            this.bancos = [...new Set(this.bancos)]
            this.monedas.push({ descripcion: 'SOLES', codigo: '2163' })
            this.monedas.push({ descripcion: 'DOLARES', codigo: '2123' })
            const size = this.documento.length
            let textMask = ''
            for (let i = 0; i < size; i++) {
              textMask += '#'
            }
            this.maskDocument = textMask
          } else {
            this.showErrorApp = true
            this.errorMessageApp = response.message
          }
        })
    },
    prepararPagoRecurrente () {
      localStorage.setItem('data_form_page', 2)
      this.cargarDatosCuentaBancaria()
      this.sesionRecurrente()
      this.pagoRecurrente = true
      this.alert2 = false
    },
    pagarAlternativo () {
      const token = localStorage.getItem('_token_')
      this.$router.push('/zonasegura/pago2?cliente=' + token)
    }
  }
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
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
.header-screen {
  background-color: white;
  height: 55px;
  color: #233b5e!important;
  font-family: 'omnesregular'!important;
  font-size: 18px!important;
  text-transform: capitalize;
}
.header-screen-mobile {
  background-color: white;
  height: 40px;
  color: #233b5e!important;
  font-family: 'omnesregular'!important;
  font-size: 15px!important;
  text-transform: capitalize;
}
.v-card {
  border-bottom-left-radius: 6px!important;
  border-bottom-right-radius: 6px!important;
  border-top-left-radius: 6px!important;
  border-top-right-radius: 6px!important;
}
.title {
  color: #0caced;
  font-family: 'omnessemibold'!important;
  font-size: 30px!important;
  text-align: center!important;
  width: 100%;
}
.subtitle {
  color: #233b5e!important;
  font-family: 'omnesregular'!important;
  font-size: 20px!important;
  font-weight: normal!important;
  text-align: center!important;
}
.footer {
  background: #efefef;
  color: #0855c4;
  font-family: 'omnessemibold';
  font-size: 16px;
  align-items: center;
  justify-content: center;
}
.v-application .title {
  font-size: 25px!important;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
  font-family: 'omnessemibold'!important;
}
.link-conditions {
  color: #0CACED!important;
  text-decoration: none!important;
}
.conditions {
  text-align: center;
  font-family: 'omnesregular'!important;
  font-size: 14px;
}
.btn-amount {
  font-family: 'omnessemibold'!important;
  font-size: 18px!important;
}
.finalice-message, .finalice-icon {
  color: #0CACED!important;
  font-family: 'omnessemibold'!important;
  font-size: 18px!important;
}
.finalice-data {
  color: #0855c4!important;
  font-family: 'omnesregular'!important;
  font-size: 15px!important;
}
.finalice-text {
  color: #0CACED!important;
  font-family: 'omnesregular'!important;
  font-size: 15px!important;
}
.error-message, .error-icon {
  color: #D54223!important;
  font-family: 'omnessemibold'!important;
  font-size: 18px!important;
}
.error-text {
  color: #D54223!important;
  font-family: 'omnesregular'!important;
  font-size: 15px!important;
}
.target-title {
  text-align: center;
  font-family: 'omnesregular'!important;
  font-size: 16px;
}
.target-message-button {
  text-align: center;
  font-family: 'omnesregular'!important;
  font-size: 14px;
}
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #0CACED !important;
}
.v-tab {
  text-transform: none!important;
  font-family: 'omnesregular'!important;
}
.text-secure {
  color: #0855c4!important;
  font-family: 'omnesregular'!important;
}
#inputTarjeta, #inputFechaNacimiento, #inputCvv {
  border: 1px solid #b3d4fc;
  padding: 5px 5px 5px 15px;
  height: 45px;
  background-color: white;
  border-radius: 4px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: flex-start;
  -webkit-box-flex: 1;
  display: table;
  margin-bottom: 5px;
}
.__PrivateStripeElement {
  vertical-align: middle;
  display: table-cell!important;
}
.targetValidate, .expiryValidate, .cvvValidate {
  color: red;
  font-size: 90%;
}
.v-btn__content {
  font-size: 18px;
  font-family: 'omnessemibold'!important;
}
.v-input--selection-controls {
  margin-top: 0px!important;
  padding-top: 0px!important;
}
.v-input--selection-controls__ripple:before {
  border-radius: inherit;
  bottom: 0;
  content: "";
  position: absolute;
  opacity: .2;
  left: 0;
  right: 0;
  top: 0;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  -webkit-transform: scale(.2);
  transform: scale(.2);
  -webkit-transition: inherit;
  transition: inherit;
}
.v-input--selection-controls__ripple:before {
  border-radius: inherit;
  bottom: 0;
  content: "";
  position: absolute;
  opacity: .2;
  left: 0;
  right: 0;
  top: 0;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  -webkit-transform: scale(.2);
  transform: scale(.2);
  -webkit-transition: inherit;
  transition: inherit;
}
.v-input--selection-controls.v-input {
  -webkit-box-flex: 0;
  flex: 0 1 auto;
}
</style>
