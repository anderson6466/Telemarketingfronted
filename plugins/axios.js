import qs from 'querystring'
import moment from 'moment'

export default function ({ store, redirect, dispatch, app: { $axios } }) {
  $axios.onRequest((config) => {
    if (config.url !== process.env.baseAPI + '/api/logger/register' &&
    config.url !== process.env.baseAPI + '/api/logger/query' &&
    config.url !== 'https://api.ipify.org?format=json') {
      store.commit('setLoading', true)
      const ipClient = localStorage.getItem('client_ip')
      let redisKey = ''
      const user = localStorage.getItem('redis_key_user')
      const document = localStorage.getItem('redis_key_document') === null ? 'L' : localStorage.getItem('redis_key_document')
      const quote = localStorage.getItem('redis_key_quote') === null ? 'C' : localStorage.getItem('redis_key_quote')
      const date = new Date()
      const today = moment(date).format('YYYYMMDDHHmmss') // + '.' + date.getMilliseconds()
      redisKey = user + ':' + document + ':' + quote + ':' + today + ':' + date.getMilliseconds()
      const obj = {
        userd: user,
        documentd: document,
        quoted: quote,
        ip: ipClient,
        device: localStorage.getItem('redis_key_device'),
        os: localStorage.getItem('redis_key_os'),
        time: today,
        type: 'IN',
        baseURL: config.baseURL,
        path: config.url,
        method: config.method,
        request: config.data
      }
      console.log('Log: ' + redisKey)
      console.log('Detail:')
      console.log(obj)
      const header = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const requestBody = { key: redisKey, value: JSON.stringify(obj) }
      if (process.env.logger_use) {
        $axios.$post(process.env.baseAPI + '/api/logger/register', qs.stringify(requestBody), header)
      }
      console.log(requestBody)
    }
  })

  $axios.onError((error) => {
    let _statusHttp
    let _message = ''
    console.log('Error detectado...')
    if (error.response === undefined) {
      _statusHttp = '-'
      _message = error
    } else {
      _statusHttp = error.response.status
      _message = 'No se pudo ejecutar servicio...'
    }
    const ipClient = localStorage.getItem('client_ip')
    let redisKey = ''
    const user = localStorage.getItem('redis_key_user')
    const document = localStorage.getItem('redis_key_document') === null ? 'L' : localStorage.getItem('redis_key_document')
    const quote = localStorage.getItem('redis_key_quote') === null ? 'C' : localStorage.getItem('redis_key_quote')
    const date = new Date()
    const today = moment(date).format('YYYYMMDDHHmmss') // + '.' + date.getMilliseconds()
    redisKey = user + ':' + document + ':' + quote + ':' + today + ':' + date.getMilliseconds()
    const obj = {
      userd: user,
      documentd: document,
      quoted: quote,
      ip: ipClient,
      device: localStorage.getItem('redis_key_device'),
      os: localStorage.getItem('redis_key_os'),
      time: today,
      type: 'ERROR',
      statusHttp: _statusHttp,
      message: _message
    }
    const header = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const requestBody = { key: redisKey, value: JSON.stringify(obj) }
    if (process.env.logger_use) {
      $axios.$post(process.env.baseAPI + '/api/logger/register', qs.stringify(requestBody), header)
    }
    console.log(requestBody)
    store.commit('setLoading', false)
  })

  $axios.onResponse((response) => {
    // console.log('Control de respuesta:')
    console.log(response)
    if (response !== undefined) {
      const _statusHttp = response.status
      const ipClient = localStorage.getItem('client_ip')
      let redisKey = ''
      const user = localStorage.getItem('redis_key_user')
      const document = localStorage.getItem('redis_key_document') === null ? 'L' : localStorage.getItem('redis_key_document')
      const quote = localStorage.getItem('redis_key_quote') === null ? 'C' : localStorage.getItem('redis_key_quote')
      const date = new Date()
      const today = moment(date).format('YYYYMMDDHHmmss') // + '.' + date.getMilliseconds()
      redisKey = user + ':' + document + ':' + quote + ':' + today + ':' + date.getMilliseconds()
      // console.log('StatusHTTP: ' + response.status)
      if (response.status === 200 && response.data.code === undefined && response.data.ip === undefined && response.data.jwtToken === undefined) {
        console.log('Print')
        const _statusApp = response.data.codigoRespuesta
        const _message = response.data.mensajeRespuesta
        let obj = {}
        if (response.data.codigoRespuesta === '01') {
          obj = {
            userd: user,
            documentd: document,
            quoted: quote,
            ip: ipClient,
            device: localStorage.getItem('redis_key_device'),
            os: localStorage.getItem('redis_key_os'),
            time: today,
            type: 'OUT',
            statusHttp: _statusHttp,
            statusApp: _statusApp,
            message: 'Proceso finalizado correctamente...'
          }
        } else {
          obj = {
            userd: user,
            documentd: document,
            quoted: quote,
            ip: ipClient,
            device: localStorage.getItem('redis_key_device'),
            os: localStorage.getItem('redis_key_os'),
            time: today,
            type: 'OUT',
            config: {
              url: response.config.url
            },
            statusHttp: _statusHttp,
            statusApp: _statusApp,
            message: _message
          }
        }
        const header = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const requestBody = { key: redisKey, value: JSON.stringify(obj) }
        if (process.env.logger_use) {
          $axios.$post(process.env.baseAPI + '/api/logger/register', qs.stringify(requestBody), header)
        }
        console.log(requestBody)

        if (response.data.mensajeRespuesta === 'Token - Expirado o Modificado') {
          redirect('/')
        } else {
          /* if (localStorage.getItem('_token_') === undefined || localStorage.getItem('_token_') === null) {
            console.log('Intentando refrescar token...')
            store.dispatch('refreshToken', null)
            .then((response) => {
              console.log('Refresh try...')
              if (response.code !== '99') {
                console.log('Refresh token...')
                store.commit('setLoading', false)
              }
            })
          } */
        }
        store.commit('setLoading', false)
      }
    }
  })
}
