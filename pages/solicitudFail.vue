<template>
  <div id="scroll-target">
    <v-card v-scroll:#scroll-target="onScroll">
      <v-app-bar
        color="#0855c4"
        dark
      >
        <div
          class=" row omnes-semibold ml-7"
        >
          <span class="omnes-medium" style="color: white; font-size: 70%;">Cliente:</span><br>
          <span class="omnes-semibold mt-5" style="color: white;">
            {{nombreAsegurado}} <v-icon color="white" @click="openPortada">mdi-gesture-double-tap</v-icon>
          </span>
        </div>
      </v-app-bar>
      <div style="width: 100%;">
        <v-stepper v-model="e1">
          <v-stepper-header style="width: 100%;">
            <v-stepper-step :complete="e1 > 1" :step="es1">Sobre el <br>asegurado</v-stepper-step>

            <v-divider v-show="es3 != 2"></v-divider>

            <v-stepper-step v-show="es3 != 2" :complete="e1 > 2" :step="es2">Sobre el <br>contrantante</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" :step="es3">Beneficiarios</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" :step="es4">Declaración <br>personal de salud</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :step="es5">Consentimientos</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items v-scroll:#scroll-target="onScroll">
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
            <v-stepper-content step="1">
              <v-form ref="formDataAsegurado">
                <v-container
                style="margin-top: -12px; background-color: white!important; border: 1px solid #eee; box-shadow: 0px 0px 6px 6px #888888;">
                  <v-row dense class="pt-3 solicitud-subtitulo">Datos personales del asegurado</v-row>
                  <v-row dense>
                    <v-col
                      cols="12"
                      md="3"
                      sm="6"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.estadoCivil"
                        :items="estadosCiviles"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Estado civil"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      sm="6"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.nacionalidad"
                        :items="nacionalidades"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Nacionalidad"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-3 solicitud-subtitulo">Dirección</v-row>
                  <v-row dense>
                    <v-col
                      cols="12"
                      md="2"
                      sm="4"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.direccionTipo"
                        :items="tiposVia"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Tipo de vía"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      sm="8"
                      class="pt-3"
                    >
                      <v-text-field
                        v-model="asegurado.direccionNombreVia"
                        :rules="direccionRules"
                        label="Nombre de vía"
                        required
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="4"
                      class="pt-3"
                    >
                      <v-text-field
                        v-model="asegurado.direccionNroMz"
                        :rules="direccionRules"
                        label="Nro./Mz. Lt."
                        required
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="4"
                      class="pt-3"
                    >
                      <v-text-field
                        v-model="asegurado.direccionInterior"
                        :rules="direccionRules"
                        label="Dpto./Oficina"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="3"
                      sm="4"
                      class="pt-3"
                    >
                      <v-text-field
                        v-model="asegurado.direccionUrbanizacion"
                        :rules="direccionRules"
                        label="Urbanización"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col
                      cols="12"
                      md="4"
                      sm="4"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.direccionDepartamento"
                        :items="departamentos"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Departamento"
                        class="pl-2 pr-2"
                        dense
                        v-on:change="cambiarDepartamento"
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="4"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.direccionProvincia"
                        :items="provinciasFiltro"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Provincia"
                        class="pl-2 pr-2"
                        dense
                        v-on:change="cambiarProvincia"
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="4"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.direccionDistrito"
                        :items="distritosFiltro"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Distrito"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-3 solicitud-subtitulo">Datos laborales</v-row>
                  <v-row dense>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                      class="pt-3"
                    >
                      <v-text-field
                        v-model="asegurado.centroTrabajo"
                        :rules="centroTrabajoRules"
                        label="Centro de trabajo"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                      class="pt-3"
                    >
                      <v-select
                        v-model="asegurado.actividadEconomica"
                        :items="actividadesEconomicas"
                        :rules="genericoRules"
                        item-text="descripcion"
                        item-value="codigo"
                        menu-props="auto"
                        label="Actividad económica"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="2"
                      class="pt-3"
                    >
                      <v-btn-toggle
                        v-model="asegurado.ingresoMoneda"
                        :rules="genericoRules"
                        rounded
                        mandatory
                        >
                        <v-btn :disabled="blockFields">
                          S/
                        </v-btn>
                        <v-btn :disabled="blockFields">
                          US$
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="10"
                      class="pt-3"
                    >
                      <v-text-field
                        v-model="asegurado.ingresoValor"
                        :rules="montoRules"
                        label="Monto"
                        class="pl-2 pr-2"
                        dense
                        :disabled="blockFields"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-3 solicitud-subtitulo">Otros datos</v-row>
                  <v-row dense class="pt-3">
                    <v-col
                      cols="12"
                      md="6"
                      sm="6"
                    >
                      <span class="solicitud-label">Persona contratante es la misma que el asegurado
                      <v-icon>mdi-help-circle-outline</v-icon></span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      sm="6"
                    >
                      <v-btn-toggle
                        v-model="aseguradoIgualContratante"
                        :rules="genericoRules"
                        rounded
                        mandatory
                        >
                        <v-btn @click="es3=2; es4=3; es5=4" :disabled="blockFields">
                          SI
                        </v-btn>
                        <v-btn @click="es3=3; es4=4; es5=5" :disabled="blockFields">
                          NO
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-3">
                    <v-col
                      cols="12"
                      md="6"
                      sm="6"
                    >
                      <span class="solicitud-label">¿Es Persona Expuesta Políticamente (PEP)?
                      <v-icon>mdi-help-circle-outline</v-icon></span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      sm="6"
                    >
                      <v-btn-toggle
                        v-model="asegurado.esPEP"
                        :rules="genericoRules"
                        rounded
                        mandatory
                        >
                        <v-btn :disabled="blockFields">
                          SI
                        </v-btn>
                        <v-btn :disabled="blockFields">
                          NO
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-3">
                    <v-col
                      cols="12"
                      md="6"
                      sm="6"
                    >
                      <span class="solicitud-label">¿Es Sujeto Obligado?
                      <v-icon>mdi-help-circle-outline</v-icon></span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      sm="6"
                    >
                      <v-btn-toggle
                        v-model="asegurado.esSujetoObligado"
                        :rules="genericoRules"
                        rounded
                        mandatory
                        >
                        <v-btn :disabled="blockFields">
                          SI
                        </v-btn>
                        <v-btn :disabled="blockFields">
                          NO
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-container>
              </v-container>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-container>
                <v-data-table
                  :headers="headersBeneficiarios"
                  :items="beneficiarios"
                  class="elevation-1"
                  hide-default-footer
                  :sort-by="['tipoBeneficiario']"
                  :sort-desc="[false]"
                >
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title class="pt-3 pb-3 solicitud-subtitulo">Declaración de beneficiarios</v-toolbar-title>
                      <v-divider
                        class="mx-4"
                        inset
                        vertical
                      ></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialogPrincipal" max-width="600px">
                        <template v-slot:activator="{ on }">
                          <v-btn
                          color="#ea0c90"
                          dark
                          class="mb-2"
                          v-on="on"
                          @click="dialogTipoBeneficiario = 'C'"
                          :disabled="blockFields">
                            Beneficiario contingente
                            <v-icon right dark>mdi-plus</v-icon>
                          </v-btn>
                          &nbsp;
                          <v-btn
                          color="#ea0c90"
                          dark
                          class="mb-2"
                          v-on="on"
                          @click="dialogTipoBeneficiario = 'P'"
                          :disabled="blockFields">
                            Beneficiario principal
                            <v-icon right dark>mdi-plus</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title
                          class="headline fondo-cabecera"
                          primary-title>
                            <span class="headline">
                              Información Beneficiario {{ dialogTipoBeneficiario == 'P' ? 'Principal' : 'Contingente' }}
                            </span>
                          </v-card-title>

                          <v-card-text>
                            <v-form v-model="validbeneficiario" ref="formBeneficiario">
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-select
                                      v-model="editedItem.tipoDocumento"
                                      :items="tiposDocumento"
                                      :rules="genericoRules"
                                      item-text="descripcion"
                                      item-value="codigo"
                                      menu-props="auto"
                                      label="Tipo documento"
                                      v-on:change="cambiarTipoDocumento"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      v-model="editedItem.numeroDocumento"
                                      label="Número de documento"
                                      :rules="documentRules"
                                      v-mask="maskDocument"
                                      v-on:keyup="loadInfoBeneficiario">
                                    </v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      v-model="editedItem.fechaNacimiento"
                                      label="Fecha nacimiento"
                                      ref="benfen"
                                      :rules="fechaRules"
                                      placeholder="dd/mm/aaaa"
                                      v-mask="maskDate">
                                    </v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      v-model="editedItem.nombres"
                                      label="Nombres"
                                      v-mask="maskLetter"
                                      :rules="genericoRules"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      v-model="editedItem.apellidoPaterno"
                                      label="Apellido paterno"
                                      v-mask="maskLetter"
                                      :rules="genericoRules"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      v-model="editedItem.apellidoMaterno"
                                      label="Apellido materno"
                                      v-mask="maskLetter"
                                      :rules="genericoRules"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-select
                                      v-model="editedItem.tipoRelacion"
                                      :items="parentezcos"
                                      :rules="genericoRules"
                                      item-text="descripcion"
                                      item-value="codigo"
                                      menu-props="auto"
                                      label="Tipo relación"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                      v-model="editedItem.distribucion"
                                      :rules="porcentajeRules"
                                      v-mask="maskPorcentaje"
                                      label="Porcentaje">
                                    </v-text-field>
                                  </v-col>
                                </v-row>
                                <v-overlay
                                  :absolute="absolute"
                                  :value="overlay"
                                >
                                </v-overlay>
                              </v-container>
                            </v-form>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="saveBeneficiario(dialogTipoBeneficiario)">Agregar</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.tipoBeneficiario="{ item }">
                    {{item.tipoBeneficiario === '1' ? 'Principal' : 'Contingente'}}
                  </template>
                  <template v-slot:item.tipoRelacion="{ item }">
                    {{parentezcos.filter(p => p.codigo === item.tipoRelacion)[0].descripcion}}
                  </template>
                  <template v-slot:item.editar="{ item }">
                    <v-icon
                    medium
                    class="mr-2"
                    :disabled="blockFields"
                    @click="editarBeneficiario(item)"
                    >
                      mdi-pencil-outline
                    </v-icon>
                  </template>
                  <template v-slot:item.eliminar="{ item }">
                    <v-icon
                    medium
                    :disabled="blockFields"
                    @click="eliminarBeneficiario(item)"
                    >
                      mdi-close-outline
                    </v-icon>
                  </template>
                </v-data-table>
              </v-container>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-container>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="accordion-text" style="font-size: 120%;">
                      Declaración personal de salud (DPS) del asegurado
                      <template v-slot:actions>
                        <v-icon color="#FFFFFF">$expand</v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-form v-model="validDPS" ref="formDPS">
                        <v-row dense class="pt-3">
                          <v-col
                            cols="12"
                            md="4"
                          >
                            <v-text-field
                              v-model="dps.estatura"
                              label="Estatura"
                              class="pl-2 pr-2"
                              dense
                              :rules="genericoRules"
                              v-on:input="calcularIMC"
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                          >
                            <v-text-field
                              v-model="dps.peso"
                              label="Peso"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              v-on:input="calcularIMC"
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                          >
                            <v-text-field
                              v-model="dps.imc"
                              label="IMC(Índice de masa corporal)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Ha tenido variación de más de 5kg de peso en el último año?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="dps.pesoVariacion"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn
                            :value="1"
                            :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn
                            :value="0"
                            :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formMasa">
                        <v-row dense class="pt-3" v-show="dps.pesoVariacion === 1">
                          <v-col
                            cols="12"
                            md="8"
                          >
                            <v-radio-group row v-model="dps.pesoAumentoDisminuyo" :rules="genericoRules" :disabled="blockFields">
                              <v-radio label="Aumentó" value="1" color="#0855c4"></v-radio>
                              <v-radio label="Disminuyó" value="2" color="#0855c4"></v-radio>
                            </v-radio-group>
                          </v-col>
                          <v-col cols="12" md="4" sm ="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="dps.pesoCantidad"
                              type="number"
                              label="¿En cuánto? (KG)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="dps.pesoMotivo"
                              label="Motivo"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Usted fuma cigarrillos?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="dps.fumador"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn
                            :value="1"
                            :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn
                            :value="0"
                            :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formFumador">
                        <v-row dense class="pt-3" v-show="dps.fumador === 1">
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="dps.fumadorCantidad"
                              label="Cantidad"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="dps.fumadorFrecuencia"
                              label="Frecuencia"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="8"
                            class="solicitud-referencia"
                          >
                            Para indicar NO en la pregunta anterior considerar que implica:<br>
                            * No haber consumido productos que contengan tabaco los últimos
                            12 meses.<br>
                            * Haber interrumpido el consumo de productos que contengan tabaco
                            desde hace más de 1 año y que esta interrupción no haya sido motivada
                            por la existencia de alguna enfermedad.
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Usted consume o ha consumido drogas?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="dps.drogas"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn
                            :value="1"
                            :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn
                            :value="0"
                            :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formDrogas">
                        <v-row dense class="pt-3" v-show="dps.drogas === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="dps.drogasFecha"
                              label="Indicar fecha de última vez de consumo"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Usted consume alcohol?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="dps.alcohol"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn
                            :value="1"
                            :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn
                            :value="0"
                            :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formAlcohol">
                        <v-row dense class="pt-3" v-show="dps.alcohol === 1">
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="dps.alcoholCantidad"
                              label="Indicar cantidad"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="dps.alcoholFrecuencia"
                              label="Frecuencia"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                          sm="6"
                        >
                          <span class="solicitud-label">¿Usted toma medicamentos?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                          sm="6"
                        >
                          <v-btn-toggle
                            v-model="op1.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta1">
                        <v-row dense class="pt-3" v-show="op1.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op1.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op1.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op1.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op1.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op1.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Padece o ha padecido, recibe o ha recibido tratamiento médico o quirúrgico
    por alguna enfermedad?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op2.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta2">
                        <v-row dense class="pt-3" v-show="op2.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op2.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op2.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op2.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op2.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op2.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Está siendo evaluado para el diagnóstico de alguna enfermedad?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op3.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta3">
                        <v-row dense class="pt-3" v-show="op3.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op3.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op3.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op3.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op3.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op3.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Padece de algún problema físico mental o enfermedad lesión, afección o
    dolencia no mencionado anteriormente?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op4.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta4">
                        <v-row dense class="pt-3" v-show="op4.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op4.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op4.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op4.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op4.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op4.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Tiene alguna otra información que declarar concerniente a su salud?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op5.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta5">
                        <v-row dense class="pt-3" v-show="op5.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op5.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op5.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op5.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op5.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op5.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Está usted embarazada en este momento? indicar tiempo gestación?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op6.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta6">
                        <v-row dense class="pt-3" v-show="op6.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op6.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op6.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op6.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op6.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op6.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">En caso fuera afirmativo, ¿Su embarazo actual o anteriores ha(n) sido considerados por su médico tratante de alto riesgo y/o le ha solicitado tener cuidados especiales y/o ha evolucionado con problemas?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op7.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta7">
                        <v-row dense class="pt-3" v-show="op7.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op7.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op7.enfermedad"
                              label="Enfermedad, dolencia o afección"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op7.fechaDiagnostico"
                              label="Fecha de diagnóstico (mes y año)"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="4"></v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op7.condicionActual"
                              label="Condición actual"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="4"
                            sm="4"
                          >
                            <v-text-field
                              v-model="op7.nombreMedicoHospital"
                              label="Nombre de médico y/o clínica u hospital"
                              class="pl-2 pr-2"
                              :rules="genericoRules"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header class="accordion-text" style="font-size: 120%;">
                      Información adicional del asegurado
                      <template v-slot:actions>
                        <v-icon color="#FFFFFF">$expand</v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Realiza alguna actividad (profesional o laboral) adicional a la declarada anteriormente?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op8.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta8">
                        <v-row dense class="pt-3" v-show="op8.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op8.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Prática algunos de los siguientes deportes de riesgo: inmersión, submarina, montañismo, ala Delta, parapente, canotaje, rafting, saltos ornamentales, paracaidismo, cacería con armas de fuego, boxeo, artes marciales, cañoning, kayak surf, alpinimo, trekking, puenting, tirolina, street luge?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op9.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta9">
                        <v-row dense class="pt-3" v-show="op9.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op9.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Participa en entrenamientos o competencias, como profesional o aficionado, como conductor o acompañante en deporte de velocidad, carreras automóviles, lanchas, motocicletas, motocross, o carreras de caballo? ¿Otras competencias? Indicar</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op10.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta10">
                        <v-row dense class="pt-3" v-show="op10.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op10.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Practica otros deportes o hobbies? ¿Cuáles? ¿Frecuencia?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op11.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta11">
                        <v-row dense class="pt-3" v-show="op11.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op11.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Utiliza moto? Indicar frecuencia de uso</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op12.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta12">
                        <v-row dense class="pt-3" v-show="op12.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            Deberá completar el cuestionario correspondiente
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row dense class="pt-3">
                        <v-col
                          cols="12"
                          md="8"
                        >
                          <span class="solicitud-label">¿Practica otros deportes o hobbies? ¿Cuáles? ¿Frecuencia?</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-btn-toggle
                            v-model="op13.respuesta"
                            rounded
                            style="margin-top: -10px;"
                            >
                            <v-btn :value="1" :disabled="blockFields">
                              SI
                            </v-btn>
                            <v-btn :value="0" :disabled="blockFields">
                              NO
                            </v-btn>
                          </v-btn-toggle>
                        </v-col>
                      </v-row>
                      <v-form ref="formPregunta13">
                        <v-row dense class="pt-3" v-show="op13.respuesta === 1">
                          <v-col
                            cols="12"
                            md="8"
                            sm="8"
                          >
                            <v-text-field
                              v-model="op13.detalle"
                              label="Detalle"
                              class="pl-2 pr-2"
                              dense
                              :disabled="blockFields"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="5">
              <v-container class="solicitud-confirmar">
                Con mi firma acepto los siguientes términos y condiciones:<br><br>
                <ul>
                  <li>Conformidad de <span style="color: #00adee"><u>Exactitud y Sinceridad de las declaraciones</u></span></li>
                  <li>Consentimiento del Contratante para el <span style="color: #00adee"><u>envío de la poliza de Seguro Electrónica Mecanismo de Comunicación Pactado</u></span></li>
                  <li>Conoce nuestra <span style="color: #00adee"><u>Política de Privacidad</u></span></li>
                </ul>
                <br><br>
                <v-row>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    Consentimiento para el <span style="color: #00adee"><u>Tratamiento opcional de datos personales</u></span>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-btn-toggle
                      v-model="op14"
                      rounded
                      style="margin-top: -10px;"
                      >
                      <v-btn :value="1">
                        SI
                      </v-btn>
                      <v-btn :value="0">
                        NO
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </v-card>
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
            style="margin-bottom: 20px"
            v-on="on"
            @click="regresar()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>Regresar</span>
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
            style="margin-bottom: 20px"
            v-on="on"
            v-show="!(estadoFirmado && e1 === 4)"
            @click="siguiente()"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>
        <span>Siguiente</span>
      </v-tooltip>
    </v-fab-transition>
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="overlay"
      :z-index="zIndex"
    >
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
          style="color: white!important"
        >
          <v-text-field
            v-model="portada.cliente"
            label="Cliente"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.tipoDocumento"
            label="Tipo documento"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.fechaNacimiento"
            label="Fecha nacimiento"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.genero"
            label="Sexo"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.producto"
            label="Producto"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.plazoCobertura"
            label="Plazo de cobertura"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.montoPrima"
            label="Monto de prima"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.frecuenciaPago"
            label="Frecuencia de pago"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.fondoGarantizado"
            label="Fondo garantizado"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.tasaGarantizada"
            label="Tasa garantizada"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.pagoBeneficio"
            label="Pago beneficio"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
          class="pt-3"
        >
          <v-text-field
            v-model="portada.numeroCotizacion"
            label="Numero cotización"
            class="pl-2 pr-2"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-overlay>
    <v-dialog v-model="dialogFinal" max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <center class="solicitud-subtitulo pb-3" v-show="!estadoPorFirmar">Firmar solicitud</center>
            <center v-show="!estadoPorFirmar">Con mi firma autorizo la solicitud del seguro</center>
            <div class="is_wrapperCodSMS" v-show="!estadoPorFirmar">
              <span>Ingresa los 6 d&iacute;gitos enviados <br /> al <i class='sms_celular'>{{telefonoActivo}}</i></span>
              <div class="is_wrappernumer_CodSMS">
                <v-row>
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field
                      v-model="codeP1"
                      class="pl-1 pr-1"
                      dense
                      ref="P1"
                      v-mask="maskDigit"
                      @keyup="nextDigit($event, 1)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field
                      v-model="codeP2"
                      class="pl-1 pr-1"
                      dense
                      ref="P2"
                      v-mask="maskDigit"
                      @keyup="nextDigit($event, 2)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field
                      v-model="codeP3"
                      class="pl-1 pr-1"
                      dense
                      ref="P3"
                      v-mask="maskDigit"
                      @keyup="nextDigit($event, 3)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field
                      v-model="codeP4"
                      class="pl-1 pr-1"
                      dense
                      ref="P4"
                      v-mask="maskDigit"
                      @keyup="nextDigit($event, 4)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field
                      v-model="codeP5"
                      class="pl-1 pr-1"
                      dense
                      ref="P5"
                      v-mask="maskDigit"
                      @keyup="nextDigit($event, 5)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" sm="2">
                    <v-text-field
                      v-model="codeP6"
                      class="pl-1 pr-1"
                      dense
                      ref="P6"
                      v-mask="maskDigit"
                      @keyup="nextDigit($event, 6)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="is_blockPoup" v-show="estadoPorFirmar">
              <span><strong>FIRMADO</strong> <v-icon>mdi-checkbox-marked-outline</v-icon></span>
            </div>
            <div class="is_errorCode" v-show="errorCodigo">
              <span><center><strong>Error al validar el código, intente nuevamente.</strong></center></span>
            </div>
            <div style="padding-top: 5px; padding-bottom: 5px; text-align: center;">Asegurado</div>
            <div style="text-align: center; font-size: 110%; font-weight: bold;">{{nombreAsegurado}}</div>
            <div style="text-align: center; font-size: 110%; font-weight: bold;">{{tipoDocumento}}: {{numeroDocumento}}</div>
            <div style="text-align: center;"><a v-show="!estadoPorFirmar" @click="sendCodeSMS" href="#" style="text-decoration: underline; color: #00adee;">Enviar el código</a></div>
            <center><v-btn color="#ea0c90" dark class="ma-2" @click="finalizar" v-show="showFinalizar || estadoPorFirmar">
              Finalizar
            </v-btn></center>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  middleware: ['check-auth', 'auth'],
  data: () => ({
    nombreAsegurado: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefonoActivo: '000000000',
    cotizacionActiva: '',
    e1: 1, // Control Stepper
    estadosCiviles: [],
    nacionalidades: [],
    tiposVia: [],
    departamentos: [],
    provincias: [],
    provinciasFiltro: [],
    distritos: [],
    distritosFiltro: [],
    actividadesEconomicas: [],
    tiposDocumento: [],
    parentezcos: [],
    portada: {
      cliente: '',
      tipoDocumento: '',
      fechaNacimiento: '',
      genero: '',
      producto: '',
      plazoCobertura: '',
      montoPrima: '',
      frecuenciaPago: '',
      fondoGrantizado: '',
      tasaGarantizada: '',
      pagoBeneficio: '',
      numeroCotizacion: ''
    },
    asegurado: {
      estadoCivil: {
        codigo: '',
        descripcion: ''
      },
      nacionalidad: {
        descripcion: 'Peruano'
      },
      direccionTipo: '',
      direccionNombreVia: '',
      direccionNroMz: '',
      direccionInterior: '',
      direccionUrbanizacion: '',
      direccionDepartamento: {
        codigo: '',
        descripcion: 'LIMA'
      },
      direccionProvincia: {
        codigo: '',
        descripcion: 'LIMA'
      },
      direccionDistrito: {
        codigo: '',
        descripcion: ''
      },
      centroTrabajo: '',
      actividadEconomica: '',
      ingresoValor: '',
      ingresoMoneda: '',
      esPEP: 1,
      esSujetoObligado: 1
    },
    aseguradoIgualContratante: 1,
    dps: {
      estatura: '',
      peso: '',
      imc: '',
      pesoVariacion: 0,
      pesoMotivo: '',
      pesoCantidad: '',
      pesoAumentoDisminuyo: '',
      fumador: 0,
      fumadorCantidad: '',
      fumadorFrecuencia: '',
      drogas: 0,
      drogasFecha: '',
      alcohol: 0,
      alcoholCantidad: '',
      alcoholFrecuencia: '',
      preguntas: []
    },
    defaultDPS: {
      estatura: '',
      peso: '',
      imc: '',
      pesoVariacion: 0,
      pesoMotivo: '',
      pesoCantidad: '',
      pesoAumentoDisminuyo: '',
      fumador: 0,
      fumadorCantidad: '',
      fumadorFrecuencia: '',
      drogas: 0,
      drogasFecha: '',
      alcohol: 0,
      alcoholCantidad: '',
      alcoholFrecuencia: '',
      preguntas: [
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '1',
          nombreMedicoHospital: '',
          pregunta: '1',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '2',
          nombreMedicoHospital: '',
          pregunta: '2',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '3',
          nombreMedicoHospital: '',
          pregunta: '3',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '4',
          nombreMedicoHospital: '',
          pregunta: '4',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '5',
          nombreMedicoHospital: '',
          pregunta: '5',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '6',
          nombreMedicoHospital: '',
          pregunta: '6',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '7',
          nombreMedicoHospital: '',
          pregunta: '7',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '8',
          nombreMedicoHospital: '',
          pregunta: '8',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '9',
          nombreMedicoHospital: '',
          pregunta: '9',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '10',
          nombreMedicoHospital: '',
          pregunta: '10',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '11',
          nombreMedicoHospital: '',
          pregunta: '11',
          respuesta: '0'
        },
        {
          condicionActual: '',
          detalle: '',
          enfermedad: '',
          fechaDiagnostico: '',
          item: '12',
          nombreMedicoHospital: '',
          pregunta: '12',
          respuesta: '0'
        }
      ]
    },
    op1: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '1',
      nombreMedicoHospital: '',
      pregunta: '1',
      respuesta: 0
    },
    op2: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '2',
      nombreMedicoHospital: '',
      pregunta: '2',
      respuesta: 0
    },
    op3: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '3',
      nombreMedicoHospital: '',
      pregunta: '3',
      respuesta: 0
    },
    op4: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '4',
      nombreMedicoHospital: '',
      pregunta: '4',
      respuesta: 0
    },
    op5: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '5',
      nombreMedicoHospital: '',
      pregunta: '5',
      respuesta: 0
    },
    op6: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '6',
      nombreMedicoHospital: '',
      pregunta: '6',
      respuesta: 0
    },
    op7: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '7',
      nombreMedicoHospital: '',
      pregunta: '7',
      respuesta: 0
    },
    op8: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '8',
      nombreMedicoHospital: '',
      pregunta: '8',
      respuesta: 0
    },
    op9: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '9',
      nombreMedicoHospital: '',
      pregunta: '9',
      respuesta: 0
    },
    op10: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '10',
      nombreMedicoHospital: '',
      pregunta: '10',
      respuesta: 0
    },
    op11: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '11',
      nombreMedicoHospital: '',
      pregunta: '11',
      respuesta: 0
    },
    op12: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '12',
      nombreMedicoHospital: '',
      pregunta: '12',
      respuesta: 0
    },
    op13: {
      condicionActual: '',
      detalle: '',
      enfermedad: '',
      fechaDiagnostico: '',
      item: '13',
      nombreMedicoHospital: '',
      pregunta: '13',
      respuesta: 0
    },
    op14: 1,
    editedIndex: -1,
    editedItem: {
      tipoBeneficiario: '',
      tipoDocumento: '',
      tipoRelacion: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombres: '',
      numeroDocumento: '',
      fechaNacimiento: '',
      distribucion: ''
    },
    defaultItem: {
      tipoBeneficiario: '',
      tipoDocumento: '',
      tipoRelacion: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombres: '',
      numeroDocumento: '',
      fechaNacimiento: '',
      distribucion: ''
    },
    direccionRules: [
      v => !!v || 'Información requerida'
    ],
    montoRules: [
      v => !!v || 'Monto es requerida'
    ],
    centroTrabajoRules: [
      v => !!v || 'Centro de trabajo es requerida'
    ],
    genericoRules: [
      v => !!v || 'Dato es requerido'
    ],
    documentRules: [
      v => !!v || 'Documento es requerido'
    ],
    fechaRules: [
      v => !!v || 'Fecha es requerida',
      v => (v !== null && v.length > 0 && v.split('/')[1] > 0 && v.split('/')[1] < 13 && v.split('/')[2] > 1900 && v.split('/')[2] < 2100 && v.split('/')[0] > 0 && v.split('/')[0] <= (new Date(v.split('/')[2], v.split('/')[1], 0)).getDate()) || 'Fecha no válida'
    ],
    porcentajeRules: [
      v => !!v || 'Porcentaje es requerido'
    ],
    monedaIngresoNeto: '',
    headersBeneficiarios: [
      {
        text: 'Tipo de beneficiario',
        align: 'center',
        value: 'tipoBeneficiario'
      },
      { text: 'Apellido paterno', align: 'center', value: 'apellidoPaterno', sortable: false },
      { text: 'Apellido materno', value: 'apellidoMaterno', sortable: false },
      { text: 'Nombres', value: 'nombres', sortable: false },
      { text: 'Fecha de nacimiento', align: 'center', value: 'fechaNacimiento', sortable: false },
      { text: 'Documento de identidad', align: 'center', value: 'numeroDocumento', sortable: false },
      { text: 'Parentesco', value: 'tipoRelacion', sortable: false },
      { text: 'Porcentaje asignado', align: 'center', value: 'distribucion', sortable: false },
      { text: '', value: 'editar', align: 'center', sortable: false },
      { text: '', value: 'eliminar', align: 'center', sortable: false }
    ],
    beneficiarios: [
    ],
    maskDate: '##/##/####',
    maskPorcentaje: '###',
    maskDocument: '########',
    maskDigit: 'X',
    maskLetter: 'AAAAAAAAAAAAAAAAAAAA',
    validbeneficiario: false,
    validDPS: false,
    validPeso: false,
    es1: 1,
    es2: 1,
    es3: 1,
    es4: 1,
    es5: 1,
    codeP1: '',
    codeP2: '',
    codeP3: '',
    codeP4: '',
    codeP5: '',
    codeP6: '',
    blockFields: false,
    errorCodigo: false,
    showBeneficiario: false,
    showFinalizar: false,
    estadoPorFirmar: true,
    estadoFirmado: true,
    absolute: false, // Overlay
    opacity: 0.56,
    overlay: false,
    zIndex: 5,
    showError: false,
    error: '',
    dialogPrincipal: false,
    dialogContingente: false,
    dialogTipoBeneficiario: 'P',
    dialogFinal: false
  }),
  mounted () {
    this.initialize()
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    initialize () {
      try {
        this.nombreAsegurado = this.portada.cliente = localStorage.getItem('nombreAsegurado')
        this.tipoDocumento = localStorage.getItem('tipoDocumento') === '1' ? 'DNI' : 'CE'
        this.numeroDocumento = this.portada.tipoDocumento = localStorage.getItem('documentoIdentidad')
        this.cotizacionActiva = this.portada.numeroCotizacion = localStorage.getItem('numeroCotizacion')
        this.telefonoActivo = localStorage.getItem('telefono')
        this.estadosCiviles = JSON.parse(localStorage.getItem('objEstadoCivil'))
        this.nacionalidades = JSON.parse(localStorage.getItem('objNacionalidad'))
        this.tiposVia = JSON.parse(localStorage.getItem('objTipoVia'))
        this.departamentos = JSON.parse(localStorage.getItem('objDepartamento'))
        this.provincias = JSON.parse(localStorage.getItem('objProvincia'))
        this.distritos = JSON.parse(localStorage.getItem('objDistrito'))
        this.actividadesEconomicas = JSON.parse(localStorage.getItem('objActividadEconomica'))
        this.tiposDocumento = JSON.parse(localStorage.getItem('objTipoDocumento'))
        this.parentezcos = JSON.parse(localStorage.getItem('objTipoRelacion'))
        this.showError = false
        this.error = ''
        const params = {
          tipoDoc: localStorage.getItem('tipoDocumento'),
          numeroDocumento: localStorage.getItem('documentoIdentidad'),
          numeroCotizacion: localStorage.getItem('numeroCotizacion'),
          usuarioLogin: this.$store.getters.getUser.idUsuario,
          agenteNombres: this.$store.getters.getUser.nombreUsuario,
          agenteCorreo: this.$store.getters.getUser.correoUsuario,
          agenteNumVendedor: this.$store.getters.getUser.codigoVendedorCRM,
          agenteIdCRM: this.$store.getters.getUser.idUsuarioCRM,
          tipoProducto: localStorage.getItem('tipoCotizador')
        }
        // setInterval(() => {}, 1000)
        this.$store.dispatch('callInfoQuote', params)
          .then((response) => {
            params.idSolicitud = localStorage.getItem('solicitudId')
            this.$store.dispatch('callInfoRequest', params)
              .then(() => {
                const data = JSON.parse(localStorage.getItem('formDataRequest'))
                console.log('STATUS ====>')
                console.log(localStorage.getItem('statusRequest'))
                this.estadoPorFirmar = localStorage.getItem('statusRequest') * 1 === 3
                this.estadoFirmado = localStorage.getItem('statusRequest') * 1 === 4
                this.blockFields = localStorage.getItem('statusRequest') * 1 === 4
                console.log('bloqueo==>' + this.blockFields)
                if (data !== undefined && data !== null && data.codigoRespuesta === '01') {
                  if (data.aseguradoIgualContratante !== '2') {
                    this.es2 = '2'
                    this.es3 = '2'
                    this.es4 = '3'
                    this.es5 = '4'
                  } else {
                    this.es2 = '2'
                    this.es3 = '3'
                    this.es4 = '4'
                    this.es5 = '5'
                  }
                  this.asegurado = data.asegurado
                  this.asegurado.ingresoMoneda = this.asegurado.ingresoMoneda !== '' && this.asegurado.ingresoMoneda !== null ? this.asegurado.ingresoMoneda - 1 : 0
                  this.aseguradoIgualContratante = this.aseguradoIgualContratante - 1
                  this.asegurado.esPEP = this.asegurado.esPEP - 1
                  this.asegurado.esSujetoObligado = this.asegurado.esSujetoObligado - 1
                  this.asegurado.nacionalidad = this.asegurado.nacionalidad === '' || this.asegurado.nacionalidad === null ? '92' : this.asegurado.nacionalidad
                  if (this.asegurado.direccionDepartamento === '' || this.asegurado.direccionDepartamento === null) {
                    this.asegurado.direccionDepartamento = '14'
                    this.cambiarDepartamento('14')
                  } else {
                    this.cambiarDepartamento(this.asegurado.direccionDepartamento)
                  }
                  if (this.asegurado.direccionProvincia !== '' && this.asegurado.direccionProvincia !== null) {
                    this.cambiarProvincia(this.asegurado.direccionProvincia)
                  }
                  this.beneficiarios = data.beneficiarios === null ? [] : data.beneficiarios
                  if (data.dps !== undefined && data.dps !== null) {
                    this.dps = data.dps
                    this.dps.pesoVariacion = this.dps.pesoVariacion * 1
                    this.dps.fumador = this.dps.fumador * 1
                    this.dps.drogas = this.dps.drogas * 1
                    this.dps.alcohol = this.dps.alcohol * 1
                    this.op1 = data.dps.preguntas[0] !== undefined ? data.dps.preguntas[0] : this.op1
                    this.op2 = data.dps.preguntas[1] !== undefined ? data.dps.preguntas[1] : this.op2
                    this.op3 = data.dps.preguntas[2] !== undefined ? data.dps.preguntas[2] : this.op3
                    this.op4 = data.dps.preguntas[3] !== undefined ? data.dps.preguntas[3] : this.op4
                    this.op5 = data.dps.preguntas[4] !== undefined ? data.dps.preguntas[4] : this.op5
                    this.op6 = data.dps.preguntas[5] !== undefined ? data.dps.preguntas[5] : this.op6
                    this.op7 = data.dps.preguntas[6] !== undefined ? data.dps.preguntas[6] : this.op7
                    this.op8 = data.dps.preguntas[7] !== undefined ? data.dps.preguntas[7] : this.op8
                    this.op9 = data.dps.preguntas[8] !== undefined ? data.dps.preguntas[8] : this.op9
                    this.op10 = data.dps.preguntas[9] !== undefined ? data.dps.preguntas[9] : this.op10
                    this.op11 = data.dps.preguntas[10] !== undefined ? data.dps.preguntas[10] : this.op11
                    this.op12 = data.dps.preguntas[11] !== undefined ? data.dps.preguntas[11] : this.op12
                    this.op1.respuesta = data.dps.preguntas[0] !== undefined ? data.dps.preguntas[0].respuesta * 1 : 0
                    this.op2.respuesta = data.dps.preguntas[1] !== undefined ? data.dps.preguntas[1].respuesta * 1 : 0
                    this.op3.respuesta = data.dps.preguntas[2] !== undefined ? data.dps.preguntas[2].respuesta * 1 : 0
                    this.op4.respuesta = data.dps.preguntas[3] !== undefined ? data.dps.preguntas[3].respuesta * 1 : 0
                    this.op5.respuesta = data.dps.preguntas[4] !== undefined ? data.dps.preguntas[4].respuesta * 1 : 0
                    this.op6.respuesta = data.dps.preguntas[5] !== undefined ? data.dps.preguntas[5].respuesta * 1 : 0
                    this.op7.respuesta = data.dps.preguntas[6] !== undefined ? data.dps.preguntas[6].respuesta * 1 : 0
                    this.op8.respuesta = data.dps.preguntas[7] !== undefined ? data.dps.preguntas[7].respuesta * 1 : 0
                    this.op9.respuesta = data.dps.preguntas[8] !== undefined ? data.dps.preguntas[8].respuesta * 1 : 0
                    this.op10.respuesta = data.dps.preguntas[9] !== undefined ? data.dps.preguntas[9].respuesta * 1 : 0
                    this.op11.respuesta = data.dps.preguntas[10] !== undefined ? data.dps.preguntas[10].respuesta * 1 : 0
                    this.op12.respuesta = data.dps.preguntas[11] !== undefined ? data.dps.preguntas[11].respuesta * 1 : 0
                  } else {
                    this.dps = this.defaultDPS
                  }
                }
              })
          })
          .catch((e) => {
            this.showError = true
            this.error = 'Ocurrió un error en el sistema. Inténtelo más tarde.'
            console.log(e)
          })
      } catch (e) {
        console.log(e)
        this.showError = true
        this.error = 'Ocurrió un error inesperado. Comuniquese con el Administrador.'
      }
    },
    cambiarDepartamento (a) {
      if (this.departamentos.length > 0 && this.provincias.length) {
        const departamentoUbigeo = this.departamentos.filter(d => d.codigo === a)[0].codigoAuxiliar
        this.provinciasFiltro = this.provincias.filter(p => p.codigoAuxiliar.substring(0, 2) === departamentoUbigeo.substring(0, 2))
      }
    },
    cambiarProvincia (a) {
      if (this.provincias.length > 0 && this.distritos.length) {
        const provinciaUbigeo = this.provincias.filter(d => d.codigo === a)[0].codigoAuxiliar
        this.distritosFiltro = this.distritos.filter(p => p.codigoAuxiliar.substring(0, 4) === provinciaUbigeo.substring(0, 4))
      }
    },
    regresar () {
      if (this.e1 === 5) {
        this.e1 = 4
      } else if (this.e1 === 4) {
        this.e1 = 3
      } else if (this.e1 === 3) {
        this.e1 = 2
      } else if (this.e1 === 2) {
        this.e1 = 1
      } else if (this.e1 === 1) {
        this.$router.push('/cotizador')
      }
    },
    siguiente () {
      if (this.e1 < 6) {
        const temp = {
          apellidoMaterno: this.asegurado.apellidoMaterno,
          apellidoPaterno: this.asegurado.apellidoPaterno,
          celular: this.asegurado.celular,
          centroTrabajo: this.asegurado.centroTrabajo,
          direccionInterior: this.asegurado.direccionInterior,
          direccionNombreVia: this.asegurado.direccionNombreVia,
          direccionNroMz: this.asegurado.direccionNroMz,
          direccionUrbanizacion: this.asegurado.direccionUrbanizacion,
          fechaNacimiento: this.asegurado.fechaNacimiento,
          genero: this.asegurado.genero,
          ingresoValor: this.asegurado.ingresoValor,
          nombres: this.asegurado.nombres,
          numeroDocumento: this.asegurado.numeroDocumento,
          profesionDetalle: this.asegurado.profesionDetalle,
          tipoDocumento: this.asegurado.tipoDocumento,
          actividadEconomica: this.asegurado.actividadEconomica,
          direccionDepartamento: this.asegurado.direccionDepartamento,
          direccionDistrito: this.asegurado.direccionDistrito,
          direccionProvincia: this.asegurado.direccionProvincia,
          estadoCivil: this.asegurado.estadoCivil,
          nacionalidad: this.asegurado.nacionalidad,
          direccionTipo: this.asegurado.direccionTipo,
          ingresoMoneda: this.asegurado.ingresoMoneda + 1,
          esSujetoObligado: this.asegurado.esSujetoObligado + 1,
          esPEP: this.asegurado.esPEP + 1,
          aseguradoIgualContratante: this.aseguradoIgualContratante + 1
        }
        this.dps.preguntas[0] = this.op1
        this.dps.preguntas[1] = this.op2
        this.dps.preguntas[2] = this.op3
        this.dps.preguntas[3] = this.op4
        this.dps.preguntas[4] = this.op5
        this.dps.preguntas[5] = this.op6
        this.dps.preguntas[6] = this.op7
        this.dps.preguntas[7] = this.op8
        this.dps.preguntas[8] = this.op9
        this.dps.preguntas[9] = this.op10
        this.dps.preguntas[10] = this.op11
        this.dps.preguntas[11] = this.op12
        const request = {
          idSolicitud: localStorage.getItem('solicitudId'),
          numeroCotizacion: localStorage.getItem('numeroCotizacion'),
          usuarioLogin: this.$store.getters.getUser.idUsuario,
          correoUsuario: this.$store.getters.getUser.correoUsuario,
          asegurado: temp,
          aseguradoIgualContratante: temp.aseguradoIgualContratante,
          vinculoAsegurado: '1',
          contratante: null,
          beneficiarios: this.beneficiarios,
          dps: this.dps,
          consentimientoAsegurado: '1',
          consentimientoContratante: '1'
        }
        console.log(request)
        let valid = false
        valid = this.e1 === 1 ? this.$refs.formDataAsegurado.validate() : true
        if (this.e1 === 4) {
          const validateDps = this.e1 === 4 ? this.$refs.formDPS.validate() : true
          // const validatePeso = this.dps.pesoVariacion * 1 === 1 ? this.$refs.formMasa.validate() : true
          const validateFumador = this.dps.fumador === 1 ? this.$refs.formFumador.validate() : true
          const validateDrogas = this.dps.drogas === 1 ? this.$refs.formDrogas.validate() : true
          const validateAlcohol = this.dps.alcohol === 1 ? this.$refs.formAlcohol.validate() : true
          const validateP1 = this.op1.respuesta === 1 ? this.$refs.formPregunta1.validate() : true
          const validateP2 = this.op2.respuesta === 1 ? this.$refs.formPregunta2.validate() : true
          const validateP3 = this.op3.respuesta === 1 ? this.$refs.formPregunta3.validate() : true
          const validateP4 = this.op4.respuesta === 1 ? this.$refs.formPregunta4.validate() : true
          const validateP5 = this.op5.respuesta === 1 ? this.$refs.formPregunta5.validate() : true
          const validateP6 = this.op6.respuesta === 1 ? this.$refs.formPregunta6.validate() : true
          const validateP7 = this.op7.respuesta === 1 ? this.$refs.formPregunta7.validate() : true
          const validateP8 = this.op8.respuesta === 1 ? this.$refs.formPregunta8.validate() : true
          const validateP9 = this.op9.respuesta === 1 ? this.$refs.formPregunta9.validate() : true
          const validateP10 = this.op10.respuesta === 1 ? this.$refs.formPregunta10.validate() : true
          const validateP11 = this.op11.respuesta === 1 ? this.$refs.formPregunta11.validate() : true
          const validateP12 = this.op12.respuesta === 1 ? this.$refs.formPregunta12.validate() : true
          const validateP13 = this.op13.respuesta === 1 ? this.$refs.formPregunta13.validate() : true
          valid = validateDps && validateFumador && validateDrogas &&
          validateAlcohol && validateP1 && validateP2 && validateP3 && validateP4 &&
          validateP5 && validateP6 && validateP7 && validateP8 && validateP9 &&
          validateP10 && validateP11 && validateP12 && validateP13
        }
        if (valid) {
          if (this.e1 < 5) {
            this.$store.dispatch('saveSimpleRequest', request)
              .then((respuesta) => {
                console.log('response=>' + respuesta)
                if (respuesta === '01') {
                  if (this.e1 === 1) {
                    console.log('aseguradoIgualContratante=>' + temp.aseguradoIgualContratante)
                    if (temp.aseguradoIgualContratante === 2) {
                      this.e1 = 2
                    } else {
                      this.e1 = 3
                    }
                  } else if (this.e1 === 3) {
                    console.log('===> 1')
                    if (this.beneficiarios === null || this.beneficiarios.length === 0) {
                      console.log('===> 2')
                      this.showError = true
                      this.error = 'Debe registrar al menos un beneficiario principal.'
                    } else {
                      console.log('===> 3')
                      const bp = this.beneficiarios.filter(b => b.tipoBeneficiario === '1')
                      const bc = this.beneficiarios.filter(b => b.tipoBeneficiario === '2')
                      if (bp !== undefined && bp.length > 0) {
                        console.log('===> 4')
                        let sumPorcentPrincipal = 0
                        let sumPorcentContingente = 0
                        bp.forEach((a) => {
                          sumPorcentPrincipal += a.distribucion * 1
                        })
                        bc.forEach((a) => {
                          sumPorcentContingente += a.distribucion * 1
                        })
                        console.log('SP' + sumPorcentPrincipal)
                        console.log('SC' + sumPorcentContingente)
                        if (sumPorcentPrincipal !== 100) {
                          this.showError = true
                          this.error = 'Distribución de beneficiario principal debe sumar el 100%.'
                        } else if (sumPorcentContingente !== 0 && sumPorcentContingente !== 100) {
                          this.showError = true
                          this.error = 'Distribución de beneficiario contingente debe sumar el 100%.'
                        } else {
                          this.e1 = 4
                          this.showError = false
                        }
                      } else {
                        console.log('===> 5')
                        this.showError = true
                        this.error = 'Debe registrar al menos un beneficiario principal.'
                      }
                    }
                    console.log('===> 6')
                  } else if (this.e1 === 4) {
                    this.errorCodigo = false
                    this.e1 = 5
                  }
                  console.log('e1=>' + this.e1)
                } else {
                  this.showError = true
                  this.error = 'Ocurrió un error inesperado. Comuniquese con el Administrador.'
                }
              })
          } else {
            this.$store.dispatch('saveFullRequest', request)
              .then(() => {
                const r = this.$store.state.requestCurrent
                if (r !== null && r !== undefined && r.codigoRespuesta === '01') {
                  console.log('Entando...')
                  this.dialogFinal = true
                } else {
                  this.dialogFinal = false
                }
              })
          }
        }
      } else {
        this.e1 = 1
      }
    },
    async loadInfoBeneficiario () {
      if (this.editedItem.numeroDocumento.length === this.maskDocument.length) {
        this.$refs.benfen.focus()
        try {
          const request = {
            tipoDoc: this.editedItem.tipoDocumento,
            numeroDocumento: this.editedItem.numeroDocumento,
            idUsuario: this.$store.getters.getUser.idUsuario,
            correoUsuario: this.$store.getters.getUser.correoUsuario
          }
          this.overlay = true
          await this.$store.dispatch('searchClient', request)
            .then(() => {
              const respuesta = this.$store.state.adnCurrent
              if (respuesta != null) {
                if (respuesta.codigoRespuesta === '01') {
                  this.editedItem.fechaNacimiento = respuesta.titular.fechaNacimiento
                  this.editedItem.nombres = respuesta.titular.nombres
                  this.editedItem.apellidoPaterno = respuesta.titular.apellidoPaterno
                  this.editedItem.apellidoMaterno = respuesta.titular.apellidoMaterno
                } else {
                  this.showError = true
                  this.error = respuesta.mensajeRespuesta
                  this.editedItem = this.defaultItem
                }
              } else {
                this.showError = true
                this.error = 'Ocurrió un error en el sistema. Inténtelo más tarde.'
                this.editedItem = this.defaultItem
              }
              this.overlay = false
            })
        } catch (e) {
          this.showError = true
          this.error = 'Ocurrió un error en el sistema. Inténtelo más tarde.'
          this.editedItem = this.defaultItem
          console.log(e)
        }
      }
    },
    sendCodeSMS () {
      const request = {
        usuarioLogin: this.$store.getters.getUser.idUsuario,
        idSolicitud: localStorage.getItem('solicitudId'),
        idPersona: localStorage.getItem('personaId')
      }
      this.$store.dispatch('sendSMSRequest', request)
        .then(() => {
          const r = this.$store.state.requestCurrent
          if (r.codigoRespuesta === '01') {
            alert('Código enviado!')
          } else {
            this.showError = true
            this.error = 'Ocurrió un error inesperado. Comuniquese con el Administrador.'
          }
        })
    },
    validarCodigoSMS () {
      let code = ''
      if (this.codeP1 && this.codeP2 && this.codeP3 && this.codeP4 && this.codeP5 && this.codeP6) {
        code = this.codeP1 + this.codeP2 + this.codeP3 + this.codeP4 + this.codeP5 + this.codeP6
      }
      const request = {
        usuarioLogin: this.$store.getters.getUser.idUsuario,
        idSolicitud: localStorage.getItem('solicitudId'),
        codigoAsegurado: code,
        codigoContratante: ''
      }
      this.$store.dispatch('validSMSRequest', request)
        .then(() => {
          const r = this.$store.state.requestCurrent
          if (r.codigoRespuesta === '01' || r.codigoRespuesta === '10') {
            this.showError = false
            this.showFinalizar = true
            this.errorCodigo = false
            this.estadoPorFirmar = true
          } else {
            this.errorCodigo = true
          }
        })
    },
    finalizar () {
      const request = {
        usuarioLogin: this.$store.getters.getUser.idUsuario,
        idSolicitud: localStorage.getItem('solicitudId')
      }
      this.$store.dispatch('finishRequest', request)
        .then(() => {
          const r = this.$store.state.requestCurrent
          if (r.codigoRespuesta === '01') {
            alert('Se generó la propuesta: ' + r.numeroPropuesta)
            this.dialogFinal = false
            this.e1 = 1
            this.blockFields = true
          } else {
            this.showError = true
            this.error = 'Ocurrió un error inesperado. Comuniquese con el Administrador.'
          }
        })
    },
    editarBeneficiario (item) {
      console.log(item)
      this.editedIndex = this.beneficiarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.dialog = true
      // this.editedItem = item
      this.dialogTipoBeneficiario = item.tipoBeneficiario === '1' ? 'P' : 'C'
      this.dialogPrincipal = true
    },
    eliminarBeneficiario (item) {
      const index = this.beneficiarios.indexOf(item)
      confirm('Seguro de eliminar registro de beneficiario?') && this.beneficiarios.splice(index, 1)
    },
    saveBeneficiario (item) {
      console.log(item)
      if (this.$refs.formBeneficiario.validate()) {
        this.showError = false
        if (item === 'P') {
          this.editedItem.tipoBeneficiario = '1'
        } else if (item === 'C') {
          this.editedItem.tipoBeneficiario = '2'
        }
        if (this.editedIndex > -1) {
          Object.assign(this.beneficiarios[this.editedIndex], this.editedItem)
        } else {
          this.beneficiarios.push(this.editedItem)
        }
        this.close()
      }
    },
    close () {
      this.dialogPrincipal = false
      this.dialogContingente = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    nextDigit (e, pos) {
      console.log(e.keyCode)
      const charCode = (e.which) ? e.which : e.keyCode
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode >= 65 && charCode <= 90)) {
        console.log(pos)
        if (pos === 1) {
          this.$refs.P2.focus()
        } else if (pos === 2) {
          this.$refs.P3.focus()
        } else if (pos === 3) {
          this.$refs.P4.focus()
        } else if (pos === 4) {
          this.$refs.P5.focus()
        } else if (pos === 5) {
          this.$refs.P6.focus()
        } else if (pos === 6) {
          this.validarCodigoSMS()
        }
      }
    },
    calcularIMC () {
      const altura = this.dps.estatura
      const peso = this.dps.peso
      let imc = 0
      if (altura > 0 && peso > 0) {
        imc = Math.round(peso * 10 / ((altura * altura) / 10000)) / 10
      }
      this.dps.imc = imc
    },
    openPortada () {
      this.overlay = true
    },
    cambiarTipoDocumento (a) {
      console.log(a)
      if (a === '1') {
        this.maskDocument = '########'
      } else {
        this.maskDocument = '############'
      }
    },
    onScroll (e) {
      console.log(e.target.scrollTop)
    }
  }
}
</script>
<style>
.theme--light.v-stepper {
  background-color: transparent!important;
}
.v-stepper__header {
  background-color: #0855c4;
}
.theme--light.v-stepper .v-stepper__label {
  color: white;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0px;
}
.v-stepper {
  border-radius: 0px;
}
.v-stepper__content {
  background-color: transparent!important;
  padding-top: 4px!important;
}
.v-stepper__label {
  color: white;
}
.theme--light.v-stepper .v-stepper__step--complete .v-stepper__label {
  color: #eee;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: white;
}
.v-btn:before {
    background-color: #00adee;
}
.theme--light.v-icon {
    color: #00adee;
}
</style>
