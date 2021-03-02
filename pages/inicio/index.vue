<template>
  <v-container>
    <v-alert
      dense
      text
      prominent
      :type=alertType
      icon="mdi-cloud-alert"
      v-if="showError"
    >
      {{error}}
    </v-alert>
    <v-form v-model="validClient" ref="formClient">
      <v-container style="margin-top: -12px">
        <v-card
          class="mx-auto"
        >
          <v-toolbar
            color="#0855c4"
            dark
            short
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="accordion-text">Datos del asegurado</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container fluid>
            <v-row dense>
              <v-col
                cols="12"
                md="3"
                sm="6"
                class="pt-3"
              >
                <v-select
                  v-model="titular.tipoDocumento"
                  :items="documentsType"
                  item-text="name"
                  menu-props="auto"
                  label="Tipo documento"
                  prepend-icon="mdi-tag"
                  hide-details
                  class="pl-2 pr-2"
                  dense
                  v-on:change="cambiarTipoDocumento"
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
                class="pt-3"
              >
                <v-text-field
                  v-model="titular.numeroDocumento"
                  :rules="documentRules"
                  label="Número documento"
                  prepend-icon="mdi-credit-card"
                  required
                  class="pl-2 pr-2"
                  v-mask="maskDocument"
                  dense
                  v-on:keyup="loadInfoAdn"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="titular.nombres"
                  :rules="nameRules1"
                  label="Nombres"
                  prepend-icon="mdi-user"
                  @keypress="isLetter($event)"
                  required
                  ref="nombres"
                  class="pl-2 pr-2"
                  dense
                  id="input-adn-11"
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
              >
                <v-text-field
                  v-model="titular.apellidoPaterno"
                  :rules="nameRules2"
                  @keypress="isLetter($event)"
                  prepend-icon="mdi-user"
                  label="Apellido paterno"
                  required
                  class="pl-2 pr-2"
                  id="input-adn-12"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
              >
                <v-text-field
                  v-model="titular.apellidoMaterno"
                  :rules="nameRules2"
                  @keypress="isLetter($event)"
                  prepend-icon="mdi-user"
                  label="Apellido materno"
                  required
                  class="pl-2 pr-2"
                  id="input-adn-13"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
              >
                <v-radio-group style="margin-top: 0px; padding-bottom: 0px;" v-model="titular.genero" row :rules="genericoRules">
                  <v-radio style="margin-top: 1px;" label="Hombre" value="1" color="#0855c4"></v-radio>
                  <v-radio style="margin-top: 1px;" label="Mujer" value="2" color="#0855c4"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
              >
                <v-text-field
                  v-model="titular.fechaNacimiento"
                  :rules="birthdayRules"
                  prepend-icon="mdi-calendar"
                  v-mask="maskDate"
                  label="Fecha nacimiento"
                  placeholder="dd/mm/aaaa"
                  required
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
                sm="6"
              >
                <v-text-field
                  v-model="titular.celularTemp"
                  :rules="phoneRules"
                  prepend-icon="mdi-phone"
                  label="Telefono celular"
                  placeholder="999-999-999"
                  v-mask="maskPhone"
                  required
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
                sm="6"
              >
                <v-text-field
                  v-model="titular.correo"
                  :rules="emailRules"
                  label="E-mail"
                  placeholder="yo@email.com"
                  prepend-icon="mdi-at"
                  required
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="3"
                sm="6"
                style="margin-top: 5px; font-size: 12px;"
              >
                <v-select
                  v-model="titular.tipoCasa"
                  :items="houses"
                  menu-props="auto"
                  label="Casa"
                  :rules="genericoRules"
                  prepend-icon="mdi-home"
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                md="3"
                sm="6"
                style="padding-left: 45px; margin-top: -15px;"
              >
                <span style="font-size: 80%;">Tienes vehículo?</span><br>
                <v-btn-toggle
                  v-model="titular.tieneVehiculo"
                  :rules="genericoRules"
                  rounded
                  dense
                  >
                  <v-btn :value="1" :disabled="blockFields" @click="faltaVehiculo = false">
                    SI
                  </v-btn>
                  <v-btn :value="2" :disabled="blockFields" @click="faltaVehiculo = false">
                    NO
                  </v-btn>
                </v-btn-toggle><br>
                <span v-show="faltaVehiculo" style="font-size: 80%; color: #ff5252 !important;">
                  Dato es requerido
                </span>
                <!-- <v-switch
                  v-model="titular.tieneVehiculo"
                  label="Tienes vehículo?"
                  prepend-icon="mdi-user"
                  color="#00adee"
                  hide-details
                  :disabled="blockFields"
                ></v-switch> -->
              </v-col>
              <v-col
                cols="12"
                md="3"
                sm="6"
                style="padding-left: 45px; margin-top: -15px;"
              >
                <span style="font-size: 80%;">Tienes AFP?</span><br>
                <v-btn-toggle
                  v-model="titular.tieneAfp"
                  :rules="genericoRules"
                  rounded
                  dense
                  >
                  <v-btn :value="1" :disabled="blockFields" @click="faltaAfp = false">
                    SI
                  </v-btn>
                  <v-btn :value="2" :disabled="blockFields" @click="faltaAfp = false">
                    NO
                  </v-btn>
                </v-btn-toggle><br>
                <span v-show="faltaAfp" style="font-size: 80%; color: #ff5252 !important;">
                  Dato es requerido
                </span>
                <!-- <v-switch
                  v-model="titular.tieneAfp"
                  label="Tienes AFP?"
                  prepend-icon="mdi-user"
                  color="#00adee"
                  hide-details
                  :disabled="blockFields"
                ></v-switch> -->
              </v-col>
              <v-col
                cols="12"
                md="3"
                sm="6"
                style="padding-left: 45px; margin-top: -15px;"
              >
                <span style="font-size: 80%;">Tienes seguro vida?</span><br>
                <v-btn-toggle
                  v-model="titular.tieneSeguro"
                  :rules="toogleRules"
                  rounded
                  dense
                  >
                  <v-btn :value="1" :disabled="blockFields" @click="faltaSeguro = false">
                    SI
                  </v-btn>
                  <v-btn :value="2" :disabled="blockFields" @click="faltaSeguro = false">
                    NO
                  </v-btn>
                </v-btn-toggle>
                <br>
                <span v-show="faltaSeguro" style="font-size: 80%; color: #ff5252 !important;">
                  Dato es requerido
                </span>
                <!-- <v-switch
                  v-model="titular.tieneSeguro"
                  label="Tienes seguro vida?"
                  prepend-icon="mdi-user"
                  color="#00adee"
                  hide-details
                  :disabled="blockFields"
                ></v-switch> -->
              </v-col>
            </v-row>
            <v-expansion-panels class="mt-6" focusable>
              <v-expansion-panel>
                <v-expansion-panel-header class="accordion-text">
                  Datos de los familiares
                  <template v-slot:actions>
                    <v-icon color="#FFFFFF">$expand</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    :headers="headers"
                    :items="familiar"
                    sort-by="tipoRelacion"
                    class="elevation-1 mt-2"
                    hide-default-footer
                  >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-toolbar-title>Familiares</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                          <template v-slot:activator="{ on }">
                            <v-btn color="#ea0c90" dark class="mb-2" v-on="on">Agregar familiar</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-form v-model="validRelacion" ref="formRelacion">
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-select
                                        v-model="editedItem.tipoRelacion"
                                        :items="relations"
                                        item-text="descripcion"
                                        item-value="codigo"
                                        menu-props="auto"
                                        label="Relación"
                                        :rules="genericoRules"
                                      ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="8">
                                      <v-text-field
                                        v-model="editedItem.nombres"
                                        label="Nombres"
                                        :rules="genericoRules"
                                        @keypress="isLetter($event)"
                                        id="input-adn-111"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem.edad"
                                        label="Edad"
                                        v-mask="maskEdad"
                                        :rules="genericoRules"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="8">
                                      <v-text-field
                                        v-model="editedItem.centroLaboral"
                                        label="Centro estudios o labores"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-form>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                              <v-btn color="blue darken-1" text @click="save">Agregar</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.tipoRelacion="{ item }">
                      {{relations.filter(p => p.codigo === item.tipoRelacion)[0] !== undefined ? relations.filter(p => p.codigo === item.tipoRelacion)[0].descripcion : ''}}
                    </template>
                    <template v-slot:item.edit="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                      >
                        mdi-pencil-outline
                      </v-icon>
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-icon
                        small
                        @click="deleteItem(item)"
                      >
                        mdi-close-outline
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels class="mt-2" focusable>
              <v-expansion-panel>
                <v-expansion-panel-header class="accordion-text">
                  Datos de los referidos
                  <template v-slot:actions>
                    <v-icon color="#FFFFFF">$expand</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    :headers="headers1"
                    :items="referidos"
                    class="elevation-1 mt-2"
                    hide-default-footer
                  >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-toolbar-title>Referidos</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog1" max-width="500px">
                          <template v-slot:activator="{ on }">
                            <v-btn color="#ea0c90" dark class="mb-2" v-on="on">Agregar referido</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formTitle1 }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-form v-model="validReferido" ref="formReferido">
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="8">
                                      <v-text-field
                                        v-model="editedItem1.nombres"
                                        label="Nombres"
                                        :rules="genericoRules"
                                        @keypress="isLetter($event)"
                                        id="input-adn-111"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem1.telefono"
                                        label="Telefono"
                                        @keypress="isNumber($event)"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-form>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close1">Cancelar</v-btn>
                              <v-btn color="blue darken-1" text @click="save1">Agregar</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.edit="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                        @click="editItem1(item)"
                      >
                        mdi-pencil-outline
                      </v-icon>
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-icon
                        small
                        @click="deleteItem1(item)"
                      >
                        mdi-close-outline
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </v-card>
        <v-card
          class="mx-auto mt-2"
        >
          <v-toolbar
            color="#0855c4"
            dark
            short
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="accordion-text">Planes a futuro</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container fluid>
            <v-row>
              <v-col cols="6" sm="4">
                <v-row>
                  <v-col cols="6" sm="4" class="text-right">
                    <img :src="require('../../assets/ico_educacion.jpg')" @click="pdfView(1)"/>
                  </v-col>
                  <v-col cols="6" sm="8">
                    <v-checkbox :disabled="blockFields" v-model="planFuturo.base.planEducacionTmp" class="mx-2" label="Educación"></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="6" sm="4">
                <v-row>
                  <v-col cols="6" sm="4" class="text-right">
                    <img :src="require('../../assets/ico_viajes.jpg')" @click="pdfView(2)"/>
                  </v-col>
                  <v-col cols="6" sm="8">
                    <v-checkbox :disabled="blockFields" v-model="planFuturo.base.planPoryectoTmp" class="mx-2" label="Proyectos (Viajes, auto)"></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="6" sm="4">
                <v-row>
                  <v-col cols="6" sm="4" class="text-right">
                    <img :src="require('../../assets/ico_jubilacion.jpg')" @click="pdfView(3)"/>
                  </v-col>
                  <v-col cols="6" sm="8">
                    <v-checkbox :disabled="blockFields" v-model="planFuturo.base.planJubilacionTmp" class="mx-2" label="Jubilación"></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <h3>&nbsp;&nbsp;Inversión esperada</h3>
            <v-row dense class="pt-3">
              <v-col
                cols="12"
                md="5"
                sm="6"
              >
                <v-text-field
                  type="tel"
                  v-model="planFuturo.base.ingresoTitular"
                  :rules="MoneyRules"
                  @keypress="isNumber($event)"
                  label="Cuanto deseas invertir en tu seguro al mes?"
                  prefix="S/."
                  prepend-icon="mdi-money"
                  required
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="2"
                sm="0"
              >
              </v-col>
              <v-col
                cols="12"
                md="5"
                sm="6"
              >
                <v-text-field
                  type="tel"
                  v-model="planFuturo.base.anioProteccion"
                  :rules="YearRules"
                  v-mask="maskYear"
                  label="Cuantos años quisieras estar asegurado?"
                  prepend-icon="mdi-money"
                  required
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-text-field
                  v-model="planFuturo.base.informacionAdicional"
                  :counter="200"
                  label="Información adicional"
                  prepend-icon="mdi-money"
                  class="pl-2 pr-2"
                  dense
                  :disabled="blockFields"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
      <v-fab-transition>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="!hidden"
              color="#0855c4"
              fab
              dark
              medium
              fixed
              top
              right
              style="margin-top: 60px"
              v-on="on"
              @click="nuevoAdn"
            >
              <v-icon>mdi-comment-text</v-icon>
            </v-btn>
          </template>
          <span>Manual de evidencias</span>
        </v-tooltip>
      </v-fab-transition>
      <v-fab-transition>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="!hidden"
              color="#0855c4"
              fab
              dark
              medium
              fixed
              bottom
              right
              v-on="on"
              style="margin-bottom: 80px"
              @click="analizarCliente(1)"
            >
              <v-icon>mdi-calculator</v-icon>
            </v-btn>
          </template>
          <span>Ir a Cotizador Vida</span>
        </v-tooltip>
      </v-fab-transition>
      <v-fab-transition>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="!hidden"
              color="#ea0c90"
              fab
              dark
              medium
              fixed
              bottom
              right
              v-on="on"
              style="margin-bottom: 20px"
              @click="analizarCliente(2)"
            >
              <v-icon>mdi-calculator</v-icon>
            </v-btn>
          </template>
          <span>Ir a Cotizador Vida Free</span>
        </v-tooltip>
      </v-fab-transition>
      <v-fab-transition>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="!hidden"
              color="#ea0c90"
              fab
              dark
              medium
              fixed
              top
              right
              v-on="on"
              style="margin-top: 120px"
              @click="analizarCliente(0)"
            >
              <v-icon>mdi-table-column-width</v-icon>
            </v-btn>
          </template>
          <span>Ir a Histórico de Cotizaciones</span>
        </v-tooltip>
      </v-fab-transition>
    </v-form>
    <v-dialog v-model="leyProteccion" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">LEY DE PROTECCION DE DATOS PERSONALES</span>
        </v-card-title>
        <v-card-text>
          <h4 class="text-center"><u>An&aacute;lisis de Necesidades</u></h4>
          <p><strong><u>Tratamiento de Datos Personales</u></strong></p>
          <div style="height:150px; overflow-y: scroll; overflow-x: hidden;">
            <p style="text-align: justify;">
              Conforme con la Ley de Protección de Datos Personales, Ley 29733, y su Reglamento,
              Decreto Supremo 3-2013-JUS, Interseguro Compañía de Seguros S.A. (“Interseguro”)
              con domicilio en Av. Javier Prado Este N° 492, oficina 2601, San Isidro, Lima, Perú,
              podrá realizar el tratamiento de los datos personales y sensibles (“Datos Personales”)
              que usted nos facilita en este formulario  para asesorarlo en la elección de su seguro de vida y
              enviarle información y comunicaciones relacionadas con su posible contratación. Este tratamiento
              es necesario para poder cumplir con las finalidades antes señaladas. No podremos cumplir
              con dichas finalidades si usted no nos otorga su consentimiento,
              el cual no lo vincula contractualmente ni de ninguna forma a Interseguro,
              solo nos permite mostrarle alternativas en una decisión muy importante en su vida.
            </p>
            <p style="text-align: justify;">
              Sus Datos Personales serán almacenados en el banco de datos “Prospectos” de titularidad de Interseguro,
              inscrito en el Registro Nacional de Protección de Datos Personales,
              donde se  tratarán hasta el momento en que usted revoque formalmente
              el consentimiento que nos otorgó para su tratamiento.
            </p>
            <p style="text-align: justify;">
              Usted puede ejercer los derechos de acceso, rectificación, cancelación y oposición al tratamiento
              de Datos Personales en cualquier momento, de manera libre, irrestricta y gratuita,
              mediante el envío de una comunicación a servicios@interseguro.com.pe o a
              Av. Paseo de la República 3071, San Isidro, Lima, Perú, conteniendo lo siguiente:
              a) nombres y apellidos del titular del derecho y acreditación de los mismos.
              En caso de actuar a través de representante legal, deberá, adicionalmente,
              adjuntar copia del DNI del representante legal y del título que acredite la representación;
              b) Petición concreta que da lugar a la solicitud;
              c) Domicilio o dirección electrónica, a efectos de recibir las respuestas o notificaciones que correspondan;
              d) Fecha y firma (no aplica firma si es por vía de correo electrónico);
              e) Documentos que sustenten la petición, de ser el caso.
              Interseguro atenderá las solicitudes cumpliendo con los plazos y formalidades
              que establece la Ley de Protección de Datos Personales y su Reglamento.
            </p>
          </div>
          <p style="text-align: justify; padding-top: 5px;">
            <strong>A</strong>l dar click en la casilla de verificación y dar click en el botón Continuar,
            usted otorga a Interseguro consentimiento libre, previo, expreso e inequívoco
            para tratar sus Datos Personales en los términos anteriormente descritos.
          </p>
          <p>
            Nombres: <strong style="text-transform: uppercase;">{{this.titular.nombres + ' ' + this.titular.apellidoPaterno + ' ' + this.titular.apellidoMaterno}}</strong><br>
            Documento de identidad: <strong>{{this.titular.numeroDocumento}}</strong><br>
            Fecha y hora: <strong>{{this.fechaActual + ' ' + this.horaActual}}</strong>
          </p>
          <v-row>
            <v-col cols="12" md="8" sm="8">
              <v-checkbox
                v-model="acceptLPDP"
                label="Acepto el tratamiento de mis Datos Personales">
              </v-checkbox>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-btn
              depressed
              color="#0855c4"
              style="color: white;"
              class="mt-5"
              :disabled="!acceptLPDP"
              @click="saveChanges(true)">
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="visor" fullscreen hide-overlay>
      <v-card>
        <v-card-title>
          <v-icon @click="visor = false">mdi-close-outline</v-icon>
          <span class="headline">&nbsp;&nbsp;&nbsp;&nbsp;{{ tituloVisor }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <iframe v-show="evidencias" style="width:100%; height:100vh;" src="https://docs.google.com/viewerng/viewer?url=https://wwwp.interseguro.pe/siv-web/files/Manual_de_Evidencias_Vida_Individual.pdf&embedded=true"></iframe>
          <iframe v-show="educacion" style="width:100%; height:100vh;" src="https://docs.google.com/viewerng/viewer?url=https://wwwp.interseguro.pe/siv-web/files/Prod_EducGarantizada.pdf&embedded=true"></iframe>
          <iframe v-show="proyectos" style="width:100%; height:100vh;" src="https://docs.google.com/viewerng/viewer?url=https://wwwp.interseguro.pe/siv-web/files/Prod_SuenioGarantizado.pdf&embedded=true"></iframe>
          <iframe v-show="jubilacion" style="width:100%; height:100vh;" src="https://docs.google.com/viewerng/viewer?url=https://wwwp.interseguro.pe/siv-web/files/Prod_JubilacGarantizada.pdf&embedded=true"></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  middleware: ['check-auth', 'auth'],
  data: () => ({
    alertType: 'error',
    formulario: '1',
    tipo: '1',
    hidden: false,
    validClient: false,
    compareShortInit: {
      tipoDocumento: '',
      numeroDocumento: '',
      fechaNacimiento: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: ''
    },
    compareFullInit: '',
    titular: {
      numeroDocumento: '',
      tipoDocumento: 1,
      fechaNacimiento: '',
      edadActuarial: '',
      celular: '',
      celularTemp: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      genero: '',
      tipoCasa: '',
      tieneVehiculo: null,
      tieneAfp: null,
      tieneSeguro: null,
      tieneSeguroVida: null
    },
    planFuturo: {
      base: {
        planEducacionTmp: null,
        planEducacion: false,
        planPoryectoTmp: null,
        planPoryecto: false,
        planJubilacionTmp: null,
        planJubilacion: false,
        ingresoTitular: '',
        anioProteccion: '',
        informacionAdicional: ''
      }
    },
    titularDefault: {
      numeroDocumento: '',
      tipoDocumento: 1,
      fechaNacimiento: '',
      edadActuarial: '',
      celular: '',
      celularTemp: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      genero: '',
      tipoCasa: '',
      tieneVehiculo: null,
      tieneAfp: null,
      tieneSeguro: null,
      tieneSeguroVida: null
    },
    planFuturoDefault: {
      base: {
        planEducacion: false,
        planProyecto: false,
        planJubilacion: false,
        planEducacionTmp: null,
        planPoryectoTmp: null,
        planJubilacionTmp: null,
        ingresoTitular: '',
        anioProteccion: '',
        informacionAdicional: ''
      }
    },
    genericoRules: [
      v => !!v || 'Dato es requerido'
    ],
    toogleRules: [
      v => (v === 0 || v === 1) || 'Dato requerido'
    ],
    documentRules: [
      v => !!v || 'Documento es requerido',
      v => (v.length >= 8 && v.length <= 12) || 'Documento no válido'
    ],
    birthdayRules: [
      v => !!v || 'Fecha es requerida',
      v => (v !== null && v.length > 0 && v.split('/')[1] > 0 && v.split('/')[1] < 13 && v.split('/')[2] > 1900 && v.split('/')[2] < ((new Date()).getFullYear() - 17) && v.split('/')[0] > 0 && v.split('/')[0] <= (new Date(v.split('/')[2], v.split('/')[1], 0)).getDate()) || 'Fecha no válida'
    ],
    phoneRules: [
      v => !!v || 'Teléfono es requerido',
      v => (v !== null && v !== undefined && v.replace(/-/g, '').length === 9) || 'Teléfono no válido',
      v => (v !== null && v !== undefined && v.split('')[0] === '9') || 'Teléfono no válido'
    ],
    nameRules1: [
      v => !!v || 'Nombre es requerido'
    ],
    nameRules2: [
      v => !!v || 'Apellido es requerido'
    ],
    emailRules: [
      v => !!v || 'E-mail es requerido',
      v => /.+@.+/.test(v) || 'E-mail no es valido'
    ],
    MoneyRules: [
      v => !!v || 'Informacion requerida'
    ],
    YearRules: [
      v => !!v || 'Informacion requerida'
    ],
    houses: [
      'Casa propia', 'Casa alquilada', 'Casa familiar'
    ],
    relations: [],
    dialog: false,
    dialog1: false,
    blockFields: false,
    headers: [
      {
        text: 'Relacion',
        align: 'left',
        sortable: false,
        value: 'tipoRelacion'
      },
      { text: 'Nombres', value: 'nombres' },
      { text: 'Edad', value: 'edad' },
      { text: 'Centro de estudio o trabajo', value: 'centroLaboral' },
      { text: '', value: 'edit' },
      { text: '', value: 'delete' }
    ],
    headers1: [
      { text: 'Nombres', value: 'nombres' },
      { text: 'Telefono', value: 'telefono' },
      { text: '', value: 'edit' },
      { text: '', value: 'delete' }
    ],
    documentsType: [
      { name: 'DNI', value: 1 },
      { name: 'Carnet de extranjería', value: 2 }
    ],
    familiar: [],
    referidos: [],
    editedIndex: -1,
    editedIndex1: -1,
    editedItem: {
      tipoRelacion: '',
      nombres: '',
      edad: '',
      centroLaboral: ''
    },
    editedItem1: {
      nombres: '',
      telefono: ''
    },
    defaultItem: {
      tipoRelacion: '',
      nombres: '',
      edad: '',
      centroLaboral: ''
    },
    defaultItem1: {
      nombres: '',
      telefono: ''
    },
    idADN: null,
    showError: false,
    error: '',
    leyProteccion: false,
    acceptLPDP: false,
    maskPhone: '###-###-###',
    maskDate: '##/##/####',
    maskDocument: '########',
    maskEdad: '##',
    maskMoney: '######',
    maskYear: '##',
    maskDigit: 'X',
    maskLetter: 'AAAAAAAAAAAAAAAAAAAA',
    validRelacion: false,
    validReferido: false,
    visor: false,
    tituloVisor: '',
    evidencias: false,
    educacion: false,
    proyectos: false,
    jubilacion: false,
    fechaActual: '',
    horaActual: '',
    faltaVehiculo: false,
    faltaAfp: false,
    faltaSeguro: false,
    tipoTemporal: null
  }),
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    
    /*
    if (localStorage.getItem('flagCargaInicial') === undefined || localStorage.getItem('flagCargaInicial') === null) {
     // localStorage.setItem('flagCargaInicial', true)
    //  this.initForms()
      // console.log('No existe flag')
       localStorage.setItem('flagCargaInicial', false)
    } else {
      // console.log('Existe flag')
      this.relations = JSON.parse(localStorage.getItem('objTipoRelacion'))
    }
    if (localStorage.getItem('documentoIdentidad') !== undefined && localStorage.getItem('documentoIdentidad') !== null) {
      this.titular.numeroDocumento = localStorage.getItem('documentoIdentidad')
      this.titular.tipoDocumento = localStorage.getItem('tipoDocumento') * 1
      //this.loadInfoAdnEvent()
    }

*/

  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Agregar familiar' : 'Editar familiar'
    },
    formTitle1 () {
      return this.editedIndex1 === -1 ? 'Agregar referido' : 'Editar referido'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialog1 (val) {
      val || this.close1()
    }
  },
  methods: {
    pdfView (item) {
      this.visor = true
      this.evidencias = true
      if (item === 1) {
        this.educacion = true
        this.proyectos = false
        this.jubilacion = false
        this.tituloVisor = 'Educación'
      } else if (item === 2) {
        this.educacion = false
        this.proyectos = true
        this.jubilacion = false
        this.tituloVisor = 'Proyectos'
      } else if (item === 3) {
        this.educacion = false
        this.proyectos = false
        this.jubilacion = true
        this.tituloVisor = 'Jubilación'
      }
    },
    nuevoAdn () {
      this.visor = true
      this.evidencias = true
      this.educacion = false
      this.proyectos = false
      this.jubilacion = false
      this.tituloVisor = 'Manual de evidencias'
    },
    initForms () {
      this.$store.dispatch('initForms')
        .then((response) => {
          if (response.code === '01') {
            this.relations = JSON.parse(localStorage.getItem('objTipoRelacion'))
          } else {
            this.showError = true
            this.alertType = 'error'
            this.error = response.message
          }
        })
      localStorage.setItem('flagCargaInicial', true)
    },
    async loadInfoAdnEvent () {
      this.$refs.nombres.focus()
      const request = {
        tipoDoc: this.titular.tipoDocumento,
        numeroDocumento: this.titular.numeroDocumento,
        idUsuario: this.$store.getters.getUser.idUsuario,
        correoUsuario: this.$store.getters.getUser.correoUsuario
      }
      await this.$store.dispatch('searchClient', request)
        .then((response) => {
          if (response.code === '01' || response.code === '05') {
            const respuesta = this.$store.state.adnCurrent
            // Tipo de formulario (Nuevo = 1 o Edicion = 2)
            this.idAdn = respuesta.idAdn
            this.tipo = respuesta.idAdn !== null ? '2' : '1'
            // Informacion de titular
            this.titular.nombres = respuesta.titular.nombres
            this.titular.apellidoPaterno = respuesta.titular.apellidoPaterno
            this.titular.apellidoMaterno = respuesta.titular.apellidoMaterno
            this.titular.celularTemp = respuesta.titular.celular
            this.titular.correo = respuesta.titular.correo
            this.titular.fechaNacimiento = respuesta.titular.fechaNacimiento
            this.titular.genero = respuesta.titular.genero
            this.titular.tieneVehiculo = respuesta.titular.tieneVehiculo
            this.titular.tieneAfp = respuesta.titular.tieneAfp
            this.titular.tieneSeguro = respuesta.titular.tieneSeguro
            if (this.titular.tieneVehiculo !== null) {
              this.titular.tieneVehiculo *= 1
            }
            if (this.titular.tieneAfp !== null) {
              this.titular.tieneAfp *= 1
            }
            if (this.titular.tieneSeguro !== null) {
              this.titular.tieneSeguro *= 1
            }
            this.titular.tipoCasa = respuesta.titular.tipoCasa
            this.titular.profesion = 1
            this.titular.actividadEconomica = 1
            this.titular.fumador = 2
            this.familiar = respuesta.familiar === null ? [] : respuesta.familiar
            this.referidos = respuesta.referido === null ? [] : respuesta.referido

            // Informacion de Planes a Futuro
            if (respuesta.planFuturo !== null && respuesta.planFuturo.base !== null) {
              this.planFuturo.base.planEducacionTmp = respuesta.planFuturo.base.planEducacion === '1'
              this.planFuturo.base.planPoryectoTmp = respuesta.planFuturo.base.planProyecto === '1'
              this.planFuturo.base.planJubilacionTmp = respuesta.planFuturo.base.planJubilacion === '1'
              this.planFuturo.base.ingresoTitular = this.numFormat(respuesta.planFuturo.base.ingresoTitular).fmt
              this.planFuturo.base.anioProteccion = respuesta.planFuturo.base.anioProteccion
              this.planFuturo.base.informacionAdicional = respuesta.planFuturo.base.informacionAdicional
            } else {
              this.planFuturo.base.planEducacionTmp = false
              this.planFuturo.base.planPoryectoTmp = false
              this.planFuturo.base.planJubilacionTmp = false
              this.planFuturo.base.ingresoTitular = null
              this.planFuturo.base.anioProteccion = null
              this.planFuturo.base.informacionAdicional = ''
            }
            this.compareShortInit.tipoDocumento = this.titular.tipoDocumento
            this.compareShortInit.numeroDocumento = this.titular.numeroDocumento
            this.compareShortInit.fechaNacimiento = respuesta.titular.fechaNacimiento
            this.compareShortInit.nombres = respuesta.titular.nombres
            this.compareShortInit.apellidoPaterno = respuesta.titular.apellidoPaterno
            this.compareShortInit.apellidoMaterno = respuesta.titular.apellidoMaterno

            const objTemp = {
              titular: this.titular,
              planFuturo: this.planFuturo
            }

            this.compareFullInit = JSON.stringify(objTemp)

            this.showError = false
            this.blockFields = false
            // TODO
            if (response.code === '05') {
              this.showError = true
              this.alertType = 'warning'
              console.log(response.message)
              const array = JSON.parse(response.message)
              let mensajePoliza = ''
              for (let i = 0; i < array.length; i++) {
                mensajePoliza += array[i] + ' '
              }
              this.error = mensajePoliza
            }
          } else {
            this.idAdn = null
            this.showError = true
            this.alertType = 'error'
            this.error = response.message
            this.titular = this.titularDefault
            this.planFuturo = this.planFuturoDefault
            this.familiar = []
            this.blockFields = true
          }
        })
    },
    loadInfoAdn (e) {
      if ((this.titular.tipoDocumento === 1 && this.titular.numeroDocumento.length === this.maskDocument.length) ||
        (this.titular.tipoDocumento === 2 && this.titular.numeroDocumento.length >= 4 && this.titular.numeroDocumento.length <= this.maskDocument.length)) {
        setTimeout(() => {
          this.loadInfoAdnEvent()
        }, 500)
      }
    },
    analizarCliente (opcion) {
      console.log(this.titular.tieneVehiculo)
      console.log(this.titular.tieneAfp)
      console.log(this.titular.tieneSeguro)
      if (this.titular.tieneVehiculo !== 2 && this.titular.tieneVehiculo !== 1) {
        this.faltaVehiculo = true
      }
      if (this.titular.tieneAfp !== 2 && this.titular.tieneAfp !== 1) {
        this.faltaAfp = true
      }
      if (this.titular.tieneSeguro !== 2 && this.titular.tieneSeguro !== 1) {
        this.faltaSeguro = true
      }
      if (this.$refs.formClient.validate() && !this.faltaVehiculo && !this.faltaAfp && !this.faltaSeguro) {
        const obj = {
          tipoDocumento: this.titular.tipoDocumento,
          numeroDocumento: this.titular.numeroDocumento,
          fechaNacimiento: this.titular.fechaNacimiento,
          nombres: this.titular.nombres,
          apellidoPaterno: this.titular.apellidoPaterno,
          apellidoMaterno: this.titular.apellidoMaterno
        }
        console.log('COMPARANDO===>')
        console.log(JSON.stringify(obj))
        console.log(JSON.stringify(this.compareShortInit))
        console.log(JSON.stringify(obj) === JSON.stringify(this.compareShortInit))
        this.tipoTemporal = opcion
        if (localStorage.getItem('lpdpActivo') * 1 === 1) {
          if (JSON.stringify(obj) !== JSON.stringify(this.compareShortInit)) {
            console.log('Diferencia en tramas')
            this.obtenerFechaHora()
            this.leyProteccion = true
          } else {
            console.log('Diferencia iguales')
            this.saveChanges(false, opcion)
          }
        } else {
          console.log('LPDP status 2===>')
          console.log(localStorage.getItem('lpdpActivo'))
          this.obtenerFechaHora()
          this.leyProteccion = true
        }
      }
    },
    saveChanges (esLpdp, tipo) {
      if (this.$refs.formClient.validate()) {
        let indicadorCambioTemp = 2
        /* [INI] Actualizando comparadores */
        const obj = {}
        obj.titular = this.titular
        obj.planFuturo = this.planFuturo
        obj.titular.celularTemp = obj.titular.celularTemp.replace(/-/g, '')

        this.compareShortInit.tipoDocumento = this.titular.tipoDocumento
        this.compareShortInit.numeroDocumento = this.titular.numeroDocumento
        this.compareShortInit.fechaNacimiento = this.titular.fechaNacimiento
        this.compareShortInit.nombres = this.titular.nombres
        this.compareShortInit.apellidoPaterno = this.titular.apellidoPaterno
        this.compareShortInit.apellidoMaterno = this.titular.apellidoMaterno
        /* [FIN] Actualizando comparadores */

        if (JSON.stringify(obj) !== this.compareFullInit) {
          indicadorCambioTemp = 1
        }
        this.titular.correo = this.titular.correo.replace(/ /g, '')
        this.titular.celular = this.titular.celularTemp.replace(/-/g, '')
        this.titular.tieneSeguroVida = this.titular.tieneSeguro
        this.titular.edadActuarial = this.calcularEdadActurial()
        this.planFuturo.base.planEducacion = this.planFuturo.base.planEducacionTmp ? '1' : '2'
        this.planFuturo.base.planProyecto = this.planFuturo.base.planPoryectoTmp ? '1' : '2'
        this.planFuturo.base.planJubilacion = this.planFuturo.base.planJubilacionTmp ? '1' : '2'
        this.planFuturo.base.ingresoTitular = this.planFuturo.base.ingresoTitular.replace(',', '')
        const request = {
          tipo: this.tipo,
          titular: this.titular,
          familiar: this.familiar,
          referidos: this.referidos,
          planFuturo: this.planFuturo,
          idAutoguardado: 0,
          idCircuitoFirma: 0,
          idCircuitoFirmaAntigua: 0,
          idUsuario: this.$store.getters.getUser.idUsuario,
          idUsuarioCRM: this.$store.getters.getUser.idUsuarioCRM,
          codigoVendedorCRM: this.$store.getters.getUser.codigoVendedorCRM,
          idAdn: this.idAdn,
          formulario: esLpdp ? '1' : '2',
          indicadorCambio: indicadorCambioTemp,
          flagLDPDP: localStorage.getItem('lpdpActivo'),
          correoUsuario: this.$store.getters.getUser.correoUsuario
        }

        this.leyProteccion = false
        this.$store.dispatch('saveAdn', request)
          .then((response) => {
            if (response.code === '01') {
              const respuesta = this.$store.state.adnCurrent
              if (respuesta.idOportunidadCRM !== undefined && respuesta.idOportunidadCRM !== null) {
                localStorage.setItem('tipoDocumento', this.titular.tipoDocumento)
                localStorage.setItem('documentoIdentidad', this.titular.numeroDocumento)
                localStorage.setItem('nombreAsegurado', this.titular.nombres + ' ' + this.titular.apellidoPaterno + ' ' + this.titular.apellidoMaterno)
                localStorage.setItem('fechaNacimiento', this.titular.fechaNacimiento)
                localStorage.setItem('edadActuarial', this.titular.edadActuarial)
                localStorage.setItem('telefono', this.titular.celularTemp)
                localStorage.setItem('idUsuarioCrm', this.titular.correo)
                localStorage.setItem('correoAsegurado', this.titular.correo)
                localStorage.setItem('sexo', this.titular.genero)
                localStorage.setItem('idOportunidadCRM', respuesta.idOportunidadCRM)
                localStorage.setItem('idContactoCRM', respuesta.idContactoCRM)

                const objRef = {}
                objRef.idAdn = respuesta.idAdn
                objRef.referidos = this.referidos
                objRef.idUsuario = this.$store.getters.getUser.idUsuario

                this.$store.dispatch('saveReferidos', objRef)
                  .then(() => {
                    console.log('Guardando referidos')
                  })

                const objTemp = {
                  titular: this.titular,
                  planFuturo: this.planFuturo
                }

                this.compareFullInit = JSON.stringify(objTemp)

                if (tipo === undefined || tipo === null) {
                  tipo = this.tipoTemporal
                }
                if (tipo === 0) {
                  this.$router.push({ name: 'cotizador' })
                } else if (tipo === 1) {
                  this.abrirCotizadorVida()
                  this.loadInfoAdn()
                } else if (tipo === 2) {
                  this.abrirCotizadorVidaFree()
                  this.loadInfoAdn()
                }
                this.showError = false
              } else {
                this.showError = true
                this.alertType = 'error'
                this.error = process.env.error_adn_registro_oportunidad
                this.$vuetify.goTo(0)
              }
            } else {
              this.showError = true
              this.alertType = 'error'
              this.error = response.message
            }
          })
      }
    },
    async abrirCotizadorVida () {
      const oportunidad = localStorage.getItem('idOportunidadCRM')
      if (oportunidad !== null && oportunidad !== '') {
        await this.$store.dispatch('callQuote1', oportunidad)
          .then((response) => {
            if (response.code === '01') {
              this.showError = false
              window.open(this.$store.state.quote1)
            } else {
              this.showError = true
              this.alertType = 'error'
              this.error = response.message
            }
          })
      } else {
        this.showError = true
        this.alertType = 'error'
        this.error = process.env.error_adn_registro_oportunidad
      }
    },/*
    async abrirCotizadorVidaFree () {
      if (parseInt(this.titular.edadActuarial) >= 18) {
        const obj = {
          idUsuarioCrm: localStorage.getItem('idContactoCRM'),
          nombreUsuario: this.$store.getters.getUser.nombreUsuario,
          rol: 'AGENTE',
          tipoDocumentoCliente: '1',
          numeroDocumentoCliente: localStorage.getItem('documentoIdentidad'),
          nombreCliente: localStorage.getItem('nombreAsegurado'),
          edadActuarial: localStorage.getItem('edadActuarial'),
          fechaNacimiento: localStorage.getItem('fechaNacimiento'),
          sexo: localStorage.getItem('sexo'),
          numeroCotizacion: '',
          fechaCotizacion: new Date().toLocaleString('es-ES').split(' ')[0],
          idOportunidadCrm: localStorage.getItem('idOportunidadCRM'),
          idCotizacionCrm: '0'
        }
        await this.$store.dispatch('callQuote2', obj)
          .then((response) => {
            if (response.code === '01') {
              this.showError = false
              window.open(this.$store.state.quote2)
            } else {
              this.showError = true
              this.alertType = 'error'
              this.error = process.env.error_cotizador_abrir_free
            }
          })
      } else {
        this.showError = true
        this.alertType = 'error'
        this.error = process.env.error_cotizador_valida_edad
      }
    },
    editItem (item) {
      this.editedIndex = this.familiar.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },*/
    editItem1 (item) {
      this.editedIndex1 = this.referidos.indexOf(item)
      this.editedItem1 = Object.assign({}, item)
      this.dialog1 = true
    },
    deleteItem1 (item) {
      const index = this.referidos.indexOf(item)
      confirm('Seguro de eliminar registro de referido?') && this.referidos.splice(index, 1)
    },
    save () {
      if (this.$refs.formRelacion.validate()) {
        this.editedItem.nombres = this.editedItem.nombres.toUpperCase()
        if (this.editedIndex > -1) {
          Object.assign(this.familiar[this.editedIndex], this.editedItem)
        } else {
          this.familiar.push(this.editedItem)
        }
        this.close()
      }
    },
    save1 () {
      if (this.$refs.formReferido.validate()) {
        this.editedItem1.nombres = this.editedItem1.nombres.toUpperCase()
        if (this.editedIndex1 > -1) {
          Object.assign(this.referidos[this.editedIndex1], this.editedItem1)
        } else {
          this.referidos.push(this.editedItem1)
        }
        this.close1()
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    close1 () {
      this.dialog1 = false
      setTimeout(() => {
        this.editedItem1 = Object.assign({}, this.defaultItem1)
        this.editedIndex1 = -1
      }, 300)
    },
    obtenerFechaHora () {
      this.fechaActual = moment().format('DD/MM/YYYY')
      this.horaActual = moment().format('HH:mm:ss')
    },
    calcularEdadActurial () {
      const fechaNacimiento = this.titular.fechaNacimiento
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

      if (dateRegex.test(fechaNacimiento)) {
        let edadActurial = ''

        const fechaActual = moment().format('DD/MM/YYYY')
        const anioActual = moment().format('YYYY')
        const dia = moment(fechaNacimiento, 'DD/MM/YYYY').format('DD')
        const mes = moment(fechaNacimiento, 'DD/MM/YYYY').format('MM')
        const anio = moment(fechaNacimiento, 'DD/MM/YYYY').format('YYYY')

        const edad = Math.abs(moment().diff(moment(fechaNacimiento, 'DD/MM/YYYY'), 'years'))
        edadActurial = edad
        let mesesTrans = moment(fechaActual, 'DD/MM/YYYY').diff(moment(dia + '/' + mes + '/' + anio, 'DD/MM/YYYY'), 'months')
        mesesTrans = mesesTrans - (edadActurial * 12)
        let diasTrans = moment(dia + '/' + mes + '/' + anioActual, 'DD/MM/YYYY').diff(moment(fechaActual, 'DD/MM/YYYY'), 'days')
        if (diasTrans < 0) {
          diasTrans = 0
        }

        if ((mesesTrans === 6 && diasTrans > 1) || mesesTrans > 6) {
          edadActurial = edad + 1
        }
        return edadActurial
      } else {
        return 0
      }
    },
    cambiarTipoDocumento (a) {
      if (a === '1') {
        this.titular.numeroDocumento = ''
        this.maskDocument = '########'
      } else {
        this.titular.numeroDocumento = ''
        this.maskDocument = '############'
      }
    },
    isNumber (evt) {
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    isLetter (evt) {
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode < 97 || charCode > 122) && (charCode < 65 || charCode > 90) && charCode !== 45 && charCode !== 32 && charCode !== 39) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    numberSeparator (_num, _sep) {
      _sep = _sep || ','
      return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, _sep)
    },
    numFormat (_value, _fixed) {
      _fixed = typeof _fixed === 'undefined' ? true : _fixed
      const result = { val: 0, fmt: '0' }
      if ((typeof _value === 'string' || typeof _value === 'number') && _value.toString() !== '' && !isNaN(_value)) {
        result.val = _fixed ? parseFloat(_value).toFixed(0) : Math.round(parseFloat(_value) * 100) / 100
        result.fmt = this.numberSeparator(result.val)
      }
      return result
    }
  }
}
</script>
<style>
  body {
    background-image: url('../../assets/fondo.svg');
  }
  .theme--light.v-data-table thead tr th {
    color: #3067c8;
    background-color: #e1eaf8;
    font-family: Omnes Regular,sans-serif;
  }
  input[id^=input-] {
    color: #000000!important;
    cursor: default;
  }
  .v-text-field__slot label[for^=input-] {
    color: #3f3d3d!important;
  }
  .theme--light.v-label {
    color: #3f3d3d;
  }
  .v-btn:before {
    background-color: #00adee;
  }
  .theme--light.v-icon {
      color: #00adee;
  }
  input[id^=input-adn-] {
    text-transform: uppercase;
  }
  input[id^=input-adn-2] {
    color: white!important;
    cursor: default;
  }
  .v-text-field__slot label[for^=input-adn-2] {
    color: white!important;
  }
  .v-toolbar__title {
    font-size: 1.17em!important;
    font-weight: bold;
  }
</style>
