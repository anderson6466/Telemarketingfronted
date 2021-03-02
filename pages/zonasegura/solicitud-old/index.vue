<template>
  <div style="margin: 0; height: 100%;">
    <v-subheader v-if="!$device.isMobile" class="header-screen pl-8"><v-icon>mdi-trophy</v-icon>&nbsp;{{producto}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-icon>mdi-account</v-icon>&nbsp;{{cliente}}</v-subheader>
    <v-subheader v-if="$device.isMobile" class="header-screen-mobile pl-8"><v-icon>mdi-trophy</v-icon>&nbsp;{{producto}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <v-icon>mdi-account</v-icon>&nbsp;{{cliente}}</v-subheader>
    <v-row style="height: 70vh;">
      <v-col
      cols="12"
      lg="7"
      md="7"
      sm="12"
      fill-height
      align-self="center">
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
            <v-row dense>
              <v-col cols="12" class="error-icon">
                <v-icon style="color: #D54223!important">mdi-close-circle</v-icon>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" class="error-message">
                {{errorMessage}}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="error-text">
                Finalizar
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
        <v-form v-model="validForm1" ref="formPrimeraPrima">
          <v-card
            class="mx-auto mb-2"
            max-width="550"
            tile
            elevation=5
            v-show="primeraPrima"
          >
            <v-card-title class="mt-8 mb-2"><div class="mt-8 title">Pago de prima</div></v-card-title>
            <v-card-subtitle class="subtitle">Ingresa los datos de tu tarjeta de crédito o débito</v-card-subtitle>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="12" sm="12">
                  <v-text-field
                  v-model="txtTarget"
                  placeholder="9999 9999 9999 9999"
                  prepend-inner-icon="mdi-keyboard"
                  outlined
                  required
                  :rules="targetRules"
                  v-mask="maskTarget"
                  v-on:keyup="changeIcon">
                    <v-icon slot="append" color="#0855c4">{{iconTarget}}</v-icon>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense style="margin-top: -16px;">
                <v-col cols="6">
                  <v-text-field
                  v-model="txtExpiry"
                  prepend-inner-icon="mdi-calendar"
                  placeholder="MM/YY"
                  outlined
                  required
                  :rules="expiryRules"
                  v-mask="maskExpiry">
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                  v-model="txtCvv"
                  prepend-inner-icon="mdi-credit-card"
                  placeholder="CVV"
                  type="password"
                  outlined
                  required
                  :rules="cvvRules"
                  v-mask="maskCvv">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense style="margin-top: -16px;">
                <v-col cols="12">
                  <v-checkbox
                    v-model="checkPrimeraPrima"
                    label="xxx"
                    required
                    color="#0855c4"
                    style="font-family: 'omnesregular'; color: #233b5e;"
                  >
                    <template v-slot:label>
                      <div>Autorizo se realicen cobros de mis <strong>cuotas recurrentes</strong> a esta tarjeta</div>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row dense style="margin-top: -8px;">
                <v-col cols="12">
                  <v-btn
                  color="#ea0c90"
                  @click="pagarPrimeraPrima"
                  raiced
                  class="white--text btn-amount"
                  block
                  large
                  :loading="loading1"
                  :disabled="loading1">
                    PAGAR {{monto}}
                    <template v-slot:loader>
                      <span>Pagando...</span>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row dense class="mb-4">
                <v-col cols="12" class="mb-8 conditions">
                  Al continuar <a href="#" @click="dialog=true" class="link-conditions">acepto las condiciones del convenio de pagos</a>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="footer"><v-icon color="#0855c4" size="small">mdi-lock</v-icon>Pago online 100% seguro</v-card-actions>
          </v-card>
        </v-form>
        <v-card
          class="mx-auto mb-2"
          max-width="550"
          tile
          elevation=2
          v-show="alert1"
        >
          <v-card-text style="text-align: center;">
            <v-row dense>
              <v-col cols="12" class="finalice-icon">
                <v-icon style="color: #0CACED!important">mdi-check-circle-outline</v-icon>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" class="finalice-message">
                ¡Pago y afiliaci&oacute;n realizados con &eacute;xito!
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="finalice-text">
                Finalizar
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
                @click="pagoRecurrente = true; alert2 = false"
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
                <v-row dense>
                  <v-col cols="12" md="8" sm="12">
                    <v-text-field
                    v-model="txtTarget2"
                    placeholder="9999 9999 9999 9999"
                    prepend-inner-icon="mdi-keyboard"
                    outlined
                    :rules="targetRules2"
                    v-mask="maskTarget2"
                    v-on:keyup="changeIcon2">
                      <v-icon slot="append" color="#0855c4">{{iconTarget2}}</v-icon>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-text-field
                    v-model="txtExpiry2"
                    prepend-inner-icon="mdi-calendar"
                    placeholder="MM/YY"
                    outlined
                    :rules="expiryRules"
                    v-mask="maskExpiry">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: -8px;">
                  <v-col cols="12" class="target-message-button pb-6">
                    Dando clic en ACEPTAR autorizo el cargo recurrente de las primas.
                  </v-col>
                </v-row>
                <v-row dense style="margin-top: -8px;">
                  <v-col cols="12">
                    <v-btn
                    color="#ea0c90"
                    raiced
                    class="white--text btn-amount"
                    block
                    large
                    @click="pagarPrimaRecurrente(2)">ACEPTAR</v-btn>
                  </v-col>
                </v-row>
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
    <v-footer
      v-if="!$device.isMobile"
      absolute
      class="font-weight-small mt-5"
      color="#0855C4"
      dark
    >
      <v-row>
        <v-col
          class="text-left"
          cols="12"
          md="6"
          lg="6"
          sm="12"
        >
          <v-icon>mdi-email</v-icon>&nbsp;{{agente}}
        </v-col>
        <v-col
          class="text-right"
          cols="12"
          md="6"
          lg="6"
          sm="12"
        >
          <!-- <img src="../../../assets/is_logo.svg" style="width: 160px;" alt="logo_blanco" class="mb-2"> --><div class="box-tarjetas"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAANCAYAAAA0XUfWAAAC2klEQVR4nH2UTWxWZRCFn9MfW2yByE/UWopVbImSiOlGjC7AxsQCaxcukMTfjWxYsIWGLRoIC0NIYGEiC7UbSIsR0qhRm4Y2sClECa3VUhYEm1IrLT0svrnt9Ounk9y8856ZO/fcM/O+sv0usAdoZMmmgBOSfkkYtvcDLwILwLikE7YPAC2R0ivpu8itAl4HOoEmYD1wH7gJnJX0e6q7Cng/1bkn6WgRr5H0pe1vgbeBQ8AzEWsCdqZCDcBeoDagn2LdATSE3xO59UA3sJXlthZ4BThXhr8HvFUmyFpJfwNUAUiakfQ1cAQYirw221ndNxLBf4FLttclggBjsX6QCM4DA8Al4GrsRxOZRuBNVtoLhVNTFhgAPgR+pqTQNqBoeS7UL2na9vaELQB/2RbwasK/krSonO3HJc2keCdQl36o4NQGDEIoWZikSWACeIxSO1+Owk0sb92FWFsSNiFpLmrWJ/w125vTNxYJxg91pdye5LcXzjKSYcOx1icSWcWRNPSbEj4WJB4CPyT8OeC47Y9try77VgfwdPg3gb4Ua/s/kkPJXxOndFfCLiQ/KzmW/C+Ay2lfBewGPrO9MeF7kv+9pNvAvdg3RgcrkrxGab4AnqU0XxtiPwX8mHKzkn8UjqR/JB0DDgPjKedJYB8sjlBH4A+B/vBvpPy2iiQlTQO/JWh/8i/G3GH7CSC3LytZ1BoEPgWuJ3hLrHkW54CDtruB1oS3VyQZllv+VKwGehOeVVwA/rRdbbvL9poUM5BP82jco50Jqwe2x5PHoR1WXkGFDQPvlGGDcfoLy/M4KemB7WbgE+Aj25NBrpmlKwZK9+VOlu7XWVZ2YQslAVtt1/4XyZF4OV8l58tyVpzshFWxdGoLmwfOSPrV9smE90o6nRNtfw48T0nE1ookJc3b/iZ9dBa4UpZ2m5IqpNgIcAp4CVgHVAN34id6Jd2N030rHoCLFSj0RQ2Aukd1nPa/tU66NQAAAABJRU5ErkJggg==" alt="visa"><img data-v-756affbc="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAABHNCSVQICAgIfAhkiAAAAohJREFUSImV1k9vlFUUBvDfKUOlf8QyaqUomkhJoCT+iRoWxIXRb2Bwo1/Ar+PKpQsTEuLCjUsTYwIsCCHRoDERgwghyljRlgaG1uvinInN0MK8Z/W+d+5zn3Oe89zzTtghWmuBgziEecyh4R4GuBURgzHMYZzEcfTxBNZxA5dxPiK2xrliB/KDWCnSR8UqvqszPsRrj9n/J76KiHO7JtBaO1Lkk8YBWXWvA+briDg7epnaRv5yR3LYI1X4vQPm3dba6dFLr8hncawj+XtSAbKQu12wrbVLEfFLVAJvSMNNGoEnx9aWcLTDGVci4pNeOX4RL2IDD/A0rmNzF/DbO5ANcaewTZput5jBm621pR4WMC2d/H09r+BzvIBf5XU6gZs4jTOy7/twBa/jNj6S128o/TFf+0Y3aqP4+pXgcq+y6eOfAverkj2lwPu4hb+lZx5IuU9UYvN4B99KT3xTCixVMccLN8R+/FG/XcPCVJE8WyTLVcltnMKRIvxBmnRBDpYDVf3eqmwgW7ZR5DN4CU9hqxS4WUn8VHvuYnOqCBYrga2q/g6eqeT+kgYdVrXP1VqrfVOFvTHqLQ6XgiGn57+FmcVbtTaN36JM+EFVMldJDOt5sw6aqwPW8Xw9L5e0a4W9J6fh/mrnXBXXKsn1SlDh9uLj0TVcKbknjX5Vsj2mi2zSuBwRn44m4VXc7wBexUXZ9+v4uSP5EGepURwR93Gp4yFr0pSL8kZ0iS8iYpWHP0ZLeNX/7n5cbEi3n5xw/yY+i4iLo4WdPsczeEVWtltsSdmvSoefkvNi9hGYH/FlRFzbvvhQAmOJHJIy9+RtWJP9H1Tbtu/fJ8fzUanKUCo0wIXxPzCj+A9+kcajszlApQAAAABJRU5ErkJggg==" alt="mastercard"><img data-v-756affbc="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAchJREFUOI3tk79vEnEYxj/H/aBpC9IAvSsHREix/kg0+p84GWNioquDiauTq4mzk4ObcXDhnzCpEjBotQdCUIpnz2I5JMLd974OYmN1cLCT8VmeN+/wvHnyPK8ipazy92jHjkAEgH9YSIuiiK9BAIAeixHM519hGAZSSoIgQNf1AwbQdR3twcNHCCn5sOOiGSoFO0e3945UMoG39xk7n6Pf32E0+sKpShnX85jOpqyXyjQaTcrlEjdvXEfLZtIcLxZ4Kp5hWRZ520RRFKZhiGXEObNRYTKZsF4q8fhJlTu3b7E/9nFdj2tXL7NZqwOg3L13v5rOpPB9n+HQ/+43rpIzLdxdDyFCDM1gJgSJxTiaaoCqsOcNWVqMY1omVy5dbCs/F/LVa4dtpwNIzLUs7sADIJQhmqLNWZ3vBKoCQsJCfGFwKLV64yXFYo7n9RfsDjy2HAdzbZVwNiNvm6ykkmQyaUa+T3JpmdbbHlZ2lW63l/0t/kgIRBQCoKIyGY+pNZp8Gu7jfRwiZYQIBY7T4cL5czhOh5MbFeWwta1t3rRaABRsm/d9l8SxZc6ePsFmrQkIZlNxcPSH5dRKoq/8f9o/QgPaR6DT+wYCHcxete8J4wAAAABJRU5ErkJggg==" alt="amex"><img data-v-756affbc="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAYAAABxnDbHAAAABHNCSVQICAgIfAhkiAAAAt9JREFUSIml1ltvVlUQBuBn2sJXIVBAVCKUxnqCKFEh8YKQGBMSzwleGKLxB6j/wj/gH9BbEi80nqKRa1O9qBFRq9gqQRIKMSXWcmirtuPFmk8/CJbG7pu1s2aveWfemXnXDqt8MnMH9mEvBnEO87iM33A6Ii6uxlesAmwdnsRr2HPdmUl8WsCJbzEeEUtrBX0er2MzFtEpU/d9AW9hrvYnImJsJZ99NwHcjVcKcBLHeszv4YRG9XM9+w9k5q7/DYoDuF/L5kP82WNbwnHMYgRDPba9awG9t9Zp/HED+zJ+qfcdPfvb1gK6WGtnhW8Ga+1tnhUb6WagJzRqd7o2k+6zBXdrGU/37F9YK+jn9X4U9/TYRvASBvAVrtb+Ik6u5HQ1I3Mf3sCD//HJz3hHozRxPCLOrgm0gO/Eqzik0dynUfiNJgjwKz5bjSpFzVRiNiKuZGY/1kfE/HXAfVpX3ooNPaY5zGj0jlQwQ9gQEVN1toP9EfEFrR7PYhw7M3MUH9Sha0AjYrmcz9yAids1gXgfDxUTWzBVZxczcz/+AZ3FXERMZeY+rXaRmYfwQx0+X1nO4FFN7JeKnVN4EW9GxFWMlZJtz8zD+KnY6WTmM/ix271Z61IPTVsjYqKCeFobi8R6fI0n/KtQS5pUdp9+/IVR7QYaxeWI+BiHB7QZnM/MwcpoDpuwLTM3FdWXKtpLlflmTXsf17r3GF7OzE8wXAEO4TbtZhrCcDEwITM7dX116zOQmetqfyAzN2ZmVFAyM2rtzax7dqjHHpl5S/nolM+hbk1fwEJmjmniHtha0V7UNHc7JjPzMbybmcMYzcxTWuOcxV3aCPVnJhzU5veOovcjPIW3+6pGkzhSQN9p0nelaEmteRbxvaZMy9q87qnAxzUNPhgRJ/EwTmsNtlzJHKhai8w8gt8xpv2OnKuo58pRp4A3FvBZ7MYZTSwu4Muq77Q2LgsV8Hnsqro/Un7O/A0Y3DQxpEhDHwAAAABJRU5ErkJggg==" alt="dinners"></div>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  layout: 'external',
  data () {
    return {
      dialog: false,
      checkPrimeraPrima: true,
      validador: true,
      primeraPrima: false,
      loader: null,
      loading1: false,
      loading2: false,
      alert1: false,
      alert2: false,
      error: false,
      errorMessage: '',
      errorMessageApp: '',
      showErrorApp: false,
      pagoRecurrente: false,
      tab: null,
      validForm1: false,
      validForm2: false,
      showError: false,
      solicitud: '',
      producto: '',
      documento: '',
      cliente: '',
      agente: '',
      monto: '',
      frecuencia: '',
      infoCobro: [],
      sizeTarget: 16,
      sizeCvv: 3,
      documentRules: [
        v => !!v || 'Documento es requerido'
      ],
      maskDocument: '########',
      txtDocument: '',
      txtTarget: '',
      iconTarget: 'fab fa-cc-visa',
      targetRules: [
        v => !!v || 'Tarjeta es requerida',
        v => (v !== undefined && v.length === this.sizeTarget) || this.maskTargetText
      ],
      maskTarget: '####-####-####-####',
      maskTargetText: '9999-9999-9999-9999',
      expiryRules: [
        v => !!v || 'Vencimiento es requerido',
        v => (v !== null && v !== undefined && v.length > 0 && v.split('/')[0] > 0 && v.split('/')[0] < 13) || 'Mes no válido',
        v => (v !== null && v !== undefined && v.length > 3 && ((v.split('/')[1] >= ((new Date()).getFullYear() - 2000)))) || (v !== undefined && v.split('/')[1] === ((new Date()).getFullYear() - 2000) && v.split('/')[0] > ((new Date()).getMonth() + 1)) || 'Año no válido'
      ],
      maskExpiry: '##/##',
      txtExpiry: '',
      sizeTarget2: 16,
      txtTarget2: '',
      iconTarget2: 'fab fa-cc-visa',
      targetRules2: [
        v => !!v || 'Tarjeta es requerida',
        v => (v !== undefined && v.length === this.sizeTarget2) || this.maskTarget2Text
      ],
      maskTarget2: '####-####-####-####',
      maskTarget2Text: '9999-9999-9999-9999',
      txtExpiry2: '',
      txtTarget3: '',
      targetRules3: [
        v => !!v || 'Cuenta es requerida',
        v => (v !== undefined && v.length === this.sizeTarget3) || this.maskTarget3Text
      ],
      maskTarget3: '####-####-####-####',
      maskTarget3Text: '9999-9999-9999-9999',
      sizeTarget3: 16,
      cvvRules: [
        v => !!v || 'CVV es requerido',
        v => (v !== undefined && v.length === this.sizeCvv) || 'Cvv inválido'
      ],
      txtCvv: '',
      maskCvv: '###',
      cmbBanco: null,
      cmbTipoCuenta: null,
      cmbMoneda: null,
      bancos: [],
      tipoCuentas: [],
      monedas: [],
      idViaCobro: 0,
      idViaCobro2: 0,
      idTipoViaCobro: 1
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => {
        this.primeraPrima = false
        if (this.checkPrimeraPrima) {
          this.alert1 = true
        } else {
          this.alert2 = true
        }
        this[l] = false
      }
      , 3000)
      this.loader = null
    }
  },
  mounted () {
    localStorage.setItem('TOKEN_EXCEPTION', true)
    this.decryptUrl()
  },
  beforeUpdate () {
    if (localStorage.getItem('ap26499_cliente') !== undefined && localStorage.getItem('ap26499_cliente') !== null) {
      this.solicitud = localStorage.getItem('ap26499_solicitud')
      const temp = localStorage.getItem('ap26499_cliente')
      const array = temp.split(' ')
      let nombres = ''
      for (let i = 0; i < array.length; i++) {
        if (i === 0 || i === 2) {
          nombres += array[i] + ' '
        }
      }
      this.cliente = nombres
      this.producto = localStorage.getItem('ap26499_producto')
      this.agente = localStorage.getItem('ap26499_agente')
      this.monto = localStorage.getItem('ap26499_monto')
      this.documento = localStorage.getItem('ap26499_documento')
      this.frecuencia = localStorage.getItem('ap26499_frecuencia')
      this.numeroPropuesta = localStorage.getItem('ap26499_propuesta')
      this.initialize()
      localStorage.removeItem('ap26499_cliente')
    }
    // this.decryptUrl()
  },
  methods: {
    initialize () {
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
    decryptUrl () {
      if (this.$route.query.cliente !== undefined) {
        const request = {
          token: this.$route.query.cliente.replace(/ /g, '+')
        }
        this.$store.dispatch('pagoWebLinkDecrypt', request)
          .then((response) => {
            if (response.code === '01') {
              localStorage.setItem('ap26499_solicitud', response.obj.solicitud)
              localStorage.setItem('ap26499_propuesta', response.obj.numeroPropuesta)
              localStorage.setItem('ap26499_cliente', response.obj.cliente)
              localStorage.setItem('ap26499_producto', response.obj.plan)
              localStorage.setItem('ap26499_agente', response.obj.correoAgente)
              localStorage.setItem('ap26499_monto', response.obj.monto)
              localStorage.setItem('ap26499_documento', response.obj.documento)
              localStorage.setItem('ap26499_frecuencia', response.obj.frecuencia)
              localStorage.setItem('redis_key_document', response.obj.documento)
              localStorage.setItem('redis_key_quote', response.obj.numeroPropuesta)
              this.$router.push('/zonasegura/solicitud?producto=seguroVida')
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
      if (this.$route.query.producto !== undefined) {
        alert('Sesión finalizada')
      }
    },
    validate () {
      setTimeout(() => {
        if (this.txtDocument === this.documento) {
          this.validador = false
          this.primeraPrima = true
        }
      }, 500)
    },
    changeIcon (e) {
      this.idTipoViaCobro = 2
      const cadena = this.txtTarget
      if (cadena.match(/^[0-9]/)) {
        this.iconTarget = 'fab fa-cc-visa'
        this.idViaCobro = 8
      }
      if (cadena.match(/^5[1-5]| ^2[2-7]/)) {
        this.iconTarget = 'fab fa-cc-mastercard'
        this.idViaCobro = 10
      }
      if (cadena.match(/^3[47]/)) {
        this.iconTarget = 'fab fa-cc-amex'
        this.idViaCobro = 9
      }
      if (cadena.startsWith('36')) {
        this.iconTarget = 'fab fa-cc-diners-club'
        this.idViaCobro = 11
      }
      this.maskTarget = this.infoCobro.filter(v => v.codigoViaCobro === this.idViaCobro && v.tipoViaCobro === 1)[0].mascara.replace(/x/gi, '#')
      this.maskTargetText = this.maskTarget.replace(/#/gi, '9')
      this.sizeCvv = this.infoCobro.filter(v => v.codigoViaCobro === this.idViaCobro && v.tipoViaCobro === 1)[0].ccv
      this.sizeTarget = this.maskTarget.length
      let textCvv = ''
      for (let i = 0; i < this.sizeCvv; i++) {
        textCvv += '#'
      }
      this.maskCvv = textCvv
    },
    changeIcon2 (e) {
      this.idTipoViaCobro = 2
      const cadena = this.txtTarget2
      if (cadena.match(/^[0-9]/)) {
        this.iconTarget2 = 'fab fa-cc-visa'
        this.idViaCobro2 = 8
      }
      if (cadena.match(/^5[1-5]| ^2[2-7]/)) {
        this.iconTarget2 = 'fab fa-cc-mastercard'
        this.idViaCobro2 = 10
      }
      if (cadena.match(/^3[47]/)) {
        this.iconTarget2 = 'fab fa-cc-amex'
        this.idViaCobro2 = 9
      }
      if (cadena.startsWith('36')) {
        this.iconTarget2 = 'fab fa-cc-diners-club'
        this.idViaCobro2 = 11
      }
      this.maskTarget2 = this.infoCobro.filter(v => v.codigoViaCobro === this.idViaCobro && v.tipoViaCobro === 1)[0].mascara.replace(/x/gi, '#')
      this.maskTarget2Text = this.maskTarget2.replace(/#/gi, '9')
      this.sizeTarget2 = this.maskTarget2.length
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
    pagarPrimeraPrima () {
      // this.loader = this.loading1
      if (this.$refs.formPrimeraPrima.validate()) {
        const request0 = {
          tarjetaNumero: this.txtTarget,
          tarjetaCcv: this.txtCvv,
          tarjetaVencimiento: this.txtExpiry,
          usuarioLogin: 'adn',
          idSolicitud: this.solicitud
        }
        let request = {}
        if (this.checkPrimeraPrima) {
          request = {
            numeroPropuesta: this.numeroPropuesta,
            numeroTarjeta: this.txtTarget,
            fechaVencimiento: this.txtExpiry,
            tipoViaCobro: 2,
            viaCobro: this.idViaCobro,
            tipoCuenta: 0,
            estado: 1,
            codPeriodoPago: this.frecuencia,
            codRamo: '1',
            codSubRamo: '01',
            numDiaCobro: 2,
            usuario: 'adn',
            numeroTarjetaPp: this.txtTarget,
            fechaVencimientoPp: this.txtExpiry,
            tipoViaCobroPp: 2,
            viaCobroPp: this.idViaCobro,
            tipoCuentaPp: 0,
            ip: localStorage.getItem('client_ip')
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
            numeroTarjetaPp: this.txtTarget,
            fechaVencimientoPp: this.txtExpiry,
            tipoViaCobroPp: 2,
            viaCobroPp: this.idViaCobro,
            tipoCuentaPp: 0,
            ip: localStorage.getItem('client_ip')
          }
        }
        this.$store.dispatch('pagoWebAction', request0)
          .then((response) => {
            this.showErrorApp = false
            this.errorMessageApp = ''
            if (response.code === '01') {
              this.$store.dispatch('afiliaWebAction', request)
                .then((response) => {
                  if (response.code === '01' || response.code === '98') {
                    this.primeraPrima = false
                    if (this.checkPrimeraPrima) {
                      this.alert1 = true
                    } else {
                      this.alert2 = true
                    }
                  } else {
                    this.showErrorApp = true
                    this.errorMessageApp = response.message
                  }
                })
            } else if (response.code === '95' || response.code === '94') {
              this.showErrorApp = true
              this.errorMessageApp = response.message
            } else {
              this.showErrorApp = true
              this.errorMessageApp = process.env.error_pago_web_culqi_500
            }
          })
      }
    },
    pagarPrimaRecurrente (tipo) {
      this.showErrorApp = false
      this.errorMessageApp = ''
      let cuentaTarjeta = ''
      if (tipo === 1) {
        cuentaTarjeta = this.txtTarget3
        this.idViaCobro = this.cmbBanco
      } else {
        cuentaTarjeta = this.txtTarget2
      }
      const request = {
        numeroPropuesta: this.numeroPropuesta,
        numeroTarjeta: cuentaTarjeta,
        fechaVencimiento: this.txtExpiry2,
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
        numeroTarjetaPp: this.txtTarget,
        fechaVencimientoPp: this.txtExpiry,
        tipoViaCobroPp: 2,
        viaCobroPp: this.idViaCobro,
        tipoCuentaPp: 0,
        ip: localStorage.getItem('client_ip')
      }
      this.$store.dispatch('afiliaWebAction', request)
        .then((response) => {
          if (response.code === '01') {
            this.pagoRecurrente = false
            this.alert1 = true
          } else {
            this.showErrorApp = true
            this.errorMessageApp = response.message
          }
        })
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
  width: 100%;
  position: absolute;
  bottom: 0;;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 30px 30px;
}
.v-input--selection-controls {
  margin-top: 0px!important;
  padding-top: 0px!important;
}
.v-application .title {
  font-size: 25px!important;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
  font-family: 'omnessemibold'!important;
}
.theme--light.v-text-field--outlined fieldset {
  border-color: #caddff!important;
}
.theme--light.v-icon {
  color: #0855c4!important;
}
.link-conditions {
  color: #0CACED!important;
  text-decoration: none!important;
}
.conditions {
  text-align: center;
  font-family: 'omnesregular'!important;
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
</style>
