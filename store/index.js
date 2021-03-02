import qs from 'querystring'
import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({

 

    state: {

      user: {

        id : null,
        name : null,
        lastname : null,
        userid : null,
        cod_perfil : null,
        uspassword : null,
        fechacreation : null,
        usermodificacion : null,
        fechamodificacion :null
     } ,



      load: false,
      userCurrent: null,
      adnCurrent: null,
      token: null,
      formData: null,
      quotations: [],
      urlQuote1: null,
      urlQuote2: null,
      requestCurrent: null,
      existeSolicitud: false,
      existeObservacion: false,
      paydata: null
    },
    mutations: {

      setUserlogin (state, user) {
        state.user = user
      },



      setUser (state, user) {
        state.userCurrent = user
      },
      setAdn (state, adn) {
        state.adnCurrent = adn
      },
      setFormData (state, formData) {
        state.formData = formData
      },
      setQuotations (state, quotations) {
        state.quotations = quotations
      },
      setQuote1 (state, quote1) {
        state.quote1 = quote1
      },
      setQuote2 (state, quote2) {
        state.quote2 = quote2
      },
      setRequestCurrent (state, request) {
        state.requestCurrent = request
      },
      setToken (state, token) {
        state.token = token
      },
      clearToken (state) {
        state.token = null
      },
      setLoading (state, val) {
        state.load = val
      },
      setExisteSolicitud (state, val) {
        state.existeSolicitud = val
      },
      setExisteObservacion (state, val) {
        state.existeObservacion = val
      },
      setPaydata (state, paydata) {
        state.paydata = paydata
      }
    },
    actions: {
      authenticateUser (vuexContext, authData) {
        if (!authData.isLogin) {
          localStorage.setItem('redis_key_user', authData.usuario)
          localStorage.setItem('redis_key_quote', 'L')
          localStorage.setItem('redis_key_document', 'L')
          return this.$axios.$post('login/Auth', authData)
            .then((response) => {
              console.log("inicio 01");
console.log(response);

              if (response.responseCode === '02') {
                console.log("iinicio 02 ");
                vuexContext.commit('setUserlogin', response.responseData)
                vuexContext.commit('setToken', response.jwtToken)
                localStorage.setItem('token', response.jwtToken)
                localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt('3600000'))
                localStorage.setItem('user', JSON.stringify(response.responseData))
              //  localStorage.setItem('JSONLOGIN', JSON.stringify(response))
                Cookie.set('jwt', response.jwtToken)
                Cookie.set('expirationDate', new Date().getTime() + Number.parseInt('3600000'))
              /*  Cookie.set('AgentId', response.idUsuario)
                Cookie.set('AgentCRMId', response.codigoVendedorCRM)
                Cookie.set('AgentUserId', response.idUsuarioCRM)
                Cookie.set('Agentmail', response.correoUsuario)
                Cookie.set('AgentName', response.nombreUsuario)
                Cookie.set('AgentWork', response.codigoAgenciaCRM)
                Cookie.set('AgentPermission', response.esAgenteSolicitud)*/
                return {
                 token: response.jwtToken,
                // token: response.responseCode,
                  message: ''
                }
              } else {
                return {
                  token: '',
                  message: 'No se pudo encontrar usuario. Inténtelo nuevamente.'
                }
              }
            })
            .catch((e) => {
              vuexContext.commit('setLoading', false)
              return {
                token: '',
                message: 'Problemas de conexión. Inténtelo mas tarde.'
              }
            })
        }
      },
      initAuth (vuexContext, req) {
        let token
        let expirationDate
        let user
        if (req) {
          console.log('Si hay cabecera')
          if (!req.headers.cookie) {
            console.log('Hay cookies')
            return
          }
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            console.log('Hay JWT')
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1]
          user = {
            idUsuario: req.headers.cookie.split(';').find(c => c.trim().startsWith('AgentId=')).split('=')[1],
            nombreUsuario: req.headers.cookie.split(';').find(c => c.trim().startsWith('AgentName=')).split('=')[1],
            idUsuarioCRM: req.headers.cookie.split(';').find(c => c.trim().startsWith('AgentUserId=')).split('=')[1],
            codigoAgenciaCRM: req.headers.cookie.split(';').find(c => c.trim().startsWith('AgentWork=')).split('=')[1],
            codigoVendedorCRM: req.headers.cookie.split(';').find(c => c.trim().startsWith('AgentCRMId=')).split('=')[1],
            correoUsuario: req.headers.cookie.split(';').find(c => c.trim().startsWith('Agentmail=')).split('=')[1],
            esAgenteSolicitud: req.headers.cookie.split(';').find(c => c.trim().startsWith('AgentPermission=')).split('=')[1]
          }
          console.log(user)
        } else {
          console.log('No hay cabecera')
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
          user = localStorage.getItem('user')
        }
        console.log(new Date().getTime(), +expirationDate)
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          // vuexContext.commit('clearToken')
          vuexContext.dispatch('logout')
          return
        }
        console.log('Pasos correctos')
        vuexContext.commit('setToken', token)
        vuexContext.commit('setUser', user)
      },
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        Cookie.remove('AgentId')
        Cookie.remove('AgentCRMId')
        Cookie.remove('AgentUserId')
        Cookie.remove('Agentmail')
        Cookie.remove('AgentName')
        Cookie.remove('AgentWork')
        Cookie.remove('AgentPermission')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
          localStorage.removeItem('user')
          localStorage.removeItem('idUsuarioCrm')
          localStorage.removeItem('objEstadoCivil')
          localStorage.removeItem('objNacionalidad')
          localStorage.removeItem('objTipoVia')
          localStorage.removeItem('objDepartamento')
          localStorage.removeItem('objProvincia')
          localStorage.removeItem('objDistrito')
          localStorage.removeItem('objTipoRelacion')
          localStorage.removeItem('objActividadEconomica')
          localStorage.removeItem('solicitudId')
          localStorage.removeItem('formDataRequest')
          localStorage.removeItem('documentoIdentidad')
          localStorage.removeItem('flagCargaInicial')
          localStorage.removeItem('idPersona')
          localStorage.removeItem('tipoCotizador')
          localStorage.removeItem('idOportunidadCRM')
          localStorage.removeItem('edadActuarial')
          localStorage.removeItem('statusRequest')
          localStorage.removeItem('nombreAsegurado')
          localStorage.removeItem('responseRequest')
          localStorage.removeItem('sexo')
          localStorage.removeItem('idContactoCRM')
          localStorage.removeItem('telefono')
          localStorage.removeItem('objTipoDocumento')
          localStorage.removeItem('fechaNacimiento')
          localStorage.removeItem('personaId')
          localStorage.removeItem('tipoDocumento')
          localStorage.removeItem('lpdpActivo')
          localStorage.removeItem('numeroCotizacion')
          localStorage.removeItem('JSONLOGIN')
          localStorage.removeItem('SOLICITUDESTADO')
          localStorage.removeItem('JSONSOLICITUDINPUT')
          localStorage.removeItem('VINCULOLISTA')
          localStorage.removeItem('VINCULOCONRUC')
          localStorage.removeItem('VINCULOSINRUC')
          localStorage.removeItem('messageError')
          localStorage.removeItem('jsonNuevo')
          localStorage.removeItem('objViaCobro')
          localStorage.removeItem('ESTADOCRM')
          localStorage.removeItem('codigoError')
          localStorage.removeItem('correoAsegurado')
          localStorage.removeItem('PRIMAFRECUENCIA')
        }
      },
      refreshToken (vuexContext) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/usuarios/refreshToken', config)
          .then((response) => {
            if (response.codigoRespuesta === '01') {
              vuexContext.commit('setToken', response.jwtToken)
              localStorage.setItem('token', response.jwtToken)
              localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt('3600000'))
              Cookie.set('jwt', response.jwtToken)
              Cookie.set('expirationDate', new Date().getTime() + Number.parseInt('3600000'))
            }
            return {
              code: response.codigoRespuesta,
              message: ''
            }
          })
      },
     /* initForms (vuexContext) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/adns/inicializaciones', config)
          .then((response) => {
            if (response.codigoRespuesta === '01') {
              localStorage.setItem('objEstadoCivil', JSON.stringify(response.estadoCivil))
              localStorage.setItem('objNacionalidad', JSON.stringify(response.nacionalidad))
              localStorage.setItem('objTipoVia', JSON.stringify(response.tipoDireccion))
              localStorage.setItem('objDepartamento', JSON.stringify(response.departamento))
              localStorage.setItem('objProvincia', JSON.stringify(response.provincia))
              localStorage.setItem('objDistrito', JSON.stringify(response.distrito))
              localStorage.setItem('objActividadEconomica', JSON.stringify(response.actividadEconomica))
              localStorage.setItem('objTipoRelacion', JSON.stringify(response.tipoRelacion))
              localStorage.setItem('objTipoDocumento', JSON.stringify(response.tipoDocumento))
              localStorage.setItem('objViaCobro', JSON.stringify(response.viasCobro))
              return {
                code: '01',
                message: ''
              }
            } else {
              return {
                code: '99',
                message: process.env.error_adn_inicializar
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },*/
      searchClient (vuexContext, req) {
        localStorage.setItem('redis_key_document', req.numeroDocumento)
        localStorage.setItem('redis_key_quote', 'C')
        const urlPart = req.tipoDoc + '/' + req.numeroDocumento + '/' + req.idUsuario + '/' + req.correoUsuario
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/adns/reglamentos/' + urlPart, config)
          .then((response) => {
            if (response !== null) {
              vuexContext.commit('setAdn', response)
              localStorage.setItem('lpdpActivo', 1)
              if (response.codigoRespuesta === '99') {
                return {
                  code: '99',
                  message: process.env.error_adn_buscar_cliente
                }
              } else {
                return {
                  code: response.codigoRespuesta,
                  message: response.mensajeRespuesta
                }
              }
              /* if (response.codigoRespuesta === '01') {
                return {
                  code: '01'
                }
              } else if (response.codigoRespuesta === '02' || response.codigoRespuesta === '98' || response.codigoRespuesta === '96') {
                return {
                  code: response.codigoRespuesta,
                  message: response.mensajeRespuesta
                }
              } else {
                return {
                  code: '99',
                  message: process.env.error_adn_buscar_cliente
                }
              } */
            } else {
              vuexContext.commit('setAdn', null)
              localStorage.setItem('lpdpActivo', 2)
              return {
                code: '99',
                message: process.env.error_adn_buscar_cliente
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            vuexContext.commit('setAdn', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      saveAdn (vuexContext, adnBody) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$post('/adns/registros', adnBody, config)
          .then((response) => {
            if (response !== null && response.codigoRespuesta === '01') {
              vuexContext.commit('setAdn', response)
              return {
                code: '01'
              }
            } else {
              vuexContext.commit('setAdn', null)
              return {
                code: '99',
                message: process.env.error_adn_registro
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            vuexContext.commit('setAdn', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      saveReferidos (vuexContext, referidoBody) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$post('/adns/referidos', referidoBody, config)
          .then((response) => {
            if (response !== null && response.codigoRespuesta === '01') {
              vuexContext.commit('setReferido', response)
            } else {
              vuexContext.commit('setReferido', null)
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            vuexContext.commit('setReferido', null)
          })
      },
      listQuotations (vuexContext, req) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/cotizaciones/intermedio/' + req.numeroDocumento +'/'+req.agenteCorreo, config)
          .then((response) => {
            if (response !== null) {
              vuexContext.commit('setQuotations', response)
              return {
                code: '01'
              }
            } else {
              vuexContext.commit('setQuotations', null)
              return {
                code: '99',
                message: process.env.error_cotizador_listar
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            vuexContext.commit('setQuotations', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      callQuote1 (vuexContext, opportunityID) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/cotizaciones/intermedio/nuevo/' + opportunityID, config)
          .then((response) => {
            if (response !== null && response.result) {
              vuexContext.commit('setQuote1', response.url)
              return {
                code: '01'
              }
            } else {
              vuexContext.commit('setQuote1', null)
              return {
                code: '99',
                message: process.env.error_cotizador_abrir_vida
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setQuote1', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      callQuote2 (vuexContext, params) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$post('/cotizaciones/intermedio/vidafree', params, config)
          .then((response) => {
            if (response !== null && response.codigoRespuesta === '01') {
              vuexContext.commit('setQuote2', response.mensajeRespuesta)
              return {
                code: '01'
              }
            } else {
              vuexContext.commit('setQuote2', null)
              return {
                code: '99',
                message: process.env.error_cotizador_abrir_free
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setQuote2', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      callRecotization (vuexContext, quoteID) {
        localStorage.setItem('redis_key_quote', quoteID)
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/cotizaciones/recotiza/' + quoteID, config)
          .then((response) => {
            if (response !== null && response.result) {
              vuexContext.commit('setQuote1', response.url)
              return {
                code: '01'
              }
            } else {
              vuexContext.commit('setQuote1', null)
              return {
                code: '99',
                message: process.env.error_cotizador_abrir_vida
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setQuote1', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      validaCotizacion (vuexContext, quoteID) {
        localStorage.setItem('redis_key_quote', quoteID)
        return this.$axios.$get('/cotizaciones/vidafree/validar/' + quoteID)
          .then((response) => {
            if (response !== null) {
              if (response.codigoRespuesta === '98') {
                vuexContext.commit('setExisteObservacion', true)
              } else if (response.codigoRespuesta === '01') {
                vuexContext.commit('setExisteObservacion', false)
              } else {
                vuexContext.commit('setExisteObservacion', null)
              }
            } else {
              vuexContext.commit('setExisteObservacion', null)
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setExisteObservacion', null)
          })
      },
      validaPDFSolicitud (vuexContext, quoteID) {
        localStorage.setItem('redis_key_quote', quoteID)
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/solicitudes/pdf/valida/' + quoteID, config)
          .then((response) => {
            if (response !== null) {
              if (response.codigoRespuesta === '01') {
                vuexContext.commit('setExisteSolicitud', true)
              } else if (response.codigoRespuesta === '97') {
                vuexContext.commit('setExisteSolicitud', false)
              } else {
                vuexContext.commit('setExisteSolicitud', null)
              }
            } else {
              vuexContext.commit('setExisteSolicitud', null)
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setExisteSolicitud', null)
          })
      },
      sendMailPDFQuotation (vuexContext, params) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$post('/cotizaciones/intermedio/correo', params, config)
          .then((response) => {
            return {
              code: '01'
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      callInfoQuote (vuexContext, params) {
        localStorage.setItem('redis_key_quote', params.numeroCotizacion)
        const urlPart = params.tipoDoc +
          '/' + params.numeroDocumento +
          '/' + params.numeroCotizacion +
          '/' + params.usuarioLogin +
          '/' + params.agenteNombres +
          '/' + params.agenteCorreo +
          '/' + params.agenteNumVendedor +
          '/' + params.agenteIdCRM +
          '/' + params.tipoProducto
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/solicitudes/reglamentos/' + urlPart, config)
          .then((response) => {
            if (response !== null && response.codigoRespuesta === '01') {
              localStorage.setItem('codigoError', 0)
              localStorage.setItem('jsonNuevo', response.esNuevo ? 1 : 0)
              localStorage.setItem('JSONSOLICITUDINPUT', JSON.stringify(response))
              localStorage.setItem('solicitudId', response.idSolicitud)
              return {
                code: '01'
              }
            } else {
              localStorage.setItem('solicitudId', null)
              return {
                code: '99',
                message: process.env.error_cotizador_solicitud
              }
            }
          })
          .catch((e) => {
            localStorage.setItem('solicitudId', null)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      pagoWebLinkDecrypt (vuexContext, request) {
        localStorage.setItem('redis_key_user', 'Client')
        localStorage.setItem('redis_key_document', '-')
        /* const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        } */
        return this.$axios.$post('/solicitudes/link-pago/operaciones/decrypt', request)
          .then((response) => {
            if (response !== null) {
              vuexContext.commit('setPaydata', response.tokenDecrypt)
              return {
                code: response.codigoRespuesta,
                obj: response.tokenDecrypt
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_decrypt
              }
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      pagoWebLinkHelp (vuexContext, params) {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/solicitudes/link-pago/help/' + params.numeroCotizacion, config)
          .then((response) => {
            if (response !== null && response.codigoRespuesta === '01') {
              return {
                code: '01',
                message: 'OK'
              }
            } else {
              return {
                code: '99',
                message: 'Error al enviar correo...'
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      pagoWebInit (vuexContext, params) {
        return this.$axios.$get('/solicitudes/link-pago/operaciones/inicializaciones')
          .then((response) => {
            if (response !== null && response.codigoRespuesta === '01') {
              return {
                code: '01',
                viasCobro: response.viasCobro
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_solicitud
              }
            }
          })
          .catch((e) => {
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      pagoWebAction (vuexContext, request) {
        return this.$axios.$post('/solicitudes/link-pago/operaciones/pagar', request)
          .then((response) => {
            if (response !== null) {
              return {
                code: response.codigoRespuesta,
                message: response.mensajeRespuesta
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_action
              }
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      afiliaWebAction (vuexContext, request) {
        return this.$axios.$post('/solicitudes/link-pago/operaciones/afiliar', request)
          .then((response) => {
            if (response !== null) {
              return {
                code: response.codigoRespuesta,
                message: response.mensajeRespuesta
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_action
              }
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      getLogger (vuexContext, request) {
        console.log(request)
        const header = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const requestBody = { key: request.key }
        return this.$axios.$post(process.env.baseAPI + '/api/logger/query', qs.stringify(requestBody), header)
          .then((response) => {
            return response
          })
          .catch((e) => {
            console.log(e)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      callDetailQuote (vuexContext, params) {
        localStorage.setItem('redis_key_quote', params.numeroCotizacion)
        const urlPart = params.numeroCotizacion
        const config = {
          headers: {
            'Authorization': 'Bearer ' + vuexContext.state.token
          }
        }
        return this.$axios.$get('/solicitudes/detalle/' + urlPart, config)
          .then((response) => {
            console.log(response)
            if (response !== null && response.codigoRespuesta === '01') {
              return {
                code: '01',
                data: response
              }
            } else {
              return {
                code: '99',
                message: process.env.error_cotizador_solicitud
              }
            }
          })
          .catch((e) => {
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      niubizSessionAction (vuexContext, request) {
        return this.$axios.$post('/solicitudes/link-pago/operaciones/niubiz/sesion', request)
          .then((response) => {
            if (response !== null) {
              return {
                code: response.codigoRespuesta,
                data: response
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_action
              }
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      pasarellaTokenizeAction (vuexContext, request) {
        return this.$axios.$post('/solicitudes/link-pago/operaciones/niubiz/tokenizar', request)
          .then((response) => {
            if (response !== null) {
              return {
                code: response.codigoRespuesta,
                data: response
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_action
              }
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      },
      pasarellaPayAction (vuexContext, request) {
        return this.$axios.$post('/solicitudes/link-pago/operaciones/niubiz/primerPago', request)
          .then((response) => {
            if (response !== null) {
              return {
                code: response.codigoRespuesta,
                data: response
              }
            } else {
              return {
                code: '99',
                message: process.env.error_pago_web_action
              }
            }
          })
          .catch((e) => {
            console.log(e)
            vuexContext.commit('setLoading', false)
            return {
              code: '99',
              message: process.env.error_server
            }
          })
      }
    },
    getters: {
      isAuthenticated (state) {
        return state.token != null
      },
      getUser (state) {
        try {
          return JSON.parse(state.userCurrent)
        } catch (e) {
          return null
        }
      },
      getFormData (state) {
        return state.formData
      },
      getAdn (state) {
        return state.adnCurrent
      },
      listQuotations (state) {
        return state.quotations
      },
      getQuote1 (state) {
        return state.quote1
      },
      getQuote2 (state) {
        return state.quote2
      },
      getLoading (state) {
        return state.load
      },
      getExisteSolicitud (state) {
        return state.existeSolicitud
      },
      getPayData (state) {
        return state.paydata
      }
    }
  })
}

export default createStore
