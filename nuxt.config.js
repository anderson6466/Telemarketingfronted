import colors from 'vuetify/es5/util/colors'

export default {
  router: {
    base: '/new-telemarketing'
  },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_description,
    title: process.env.npm_package_description || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: '/siv-web/scripts/payform.min.js?v=1'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'stylesheet', href: '/siv-web/stylesheet/payform.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    '@assets/styles.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios'
  ],
  /* router: {
    middleware: ['auth']
  }, */
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/device',
    'nuxtjs-mdi-font'
    // '@nuxtjs/auth'
  ],
  /* auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/auth/login', method: 'post', propertyName: 'jwt'},
          logout: {url: '/auth/logout', method: 'post'},
          user: {url: '/users/1', method: 'get', propertyName: 'user'}
        }
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'https://wwwp.interseguro.pe/siv-admin/api/v1'
      baseURL: 'http://localhost:8090'
   // baseURL: 'https://wwwu.interseguro.pe/siv-admin/api/v1'
    // baseURL: 'https://wwwi.interseguro.pe/siv-admin/api/v1'
    // baseURL: 'https://10.29.27.170/siv-admin/api/v1'

    //baseURL: 'http://docker-host.interseguro.com.pe:8002/siv-admin/api/v1'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    // baseURL: 'https://10.29.27.170',
    baseURL: 'https://wwwu.interseguro.pe',
    // baseURL: 'http://localhost:8002',
    // baseURL: 'https://wwwp.interseguro.pe',
    // baseURL: 'https://wwwi.interseguro.pe',
    // baseAPI: 'https://s275vup.interseguro.com.pe/server',
    baseAPI: 'https://10.29.27.170/server',
    logger_use: false,
    niubiz_test_active: false,
    niubiz_test_amount: 1.00,
    // merchantid_pen: '650168418',
    // merchantid_usd: '650168419',
    // merchantid_r_pen: '650168418',
    // merchantid_r_usd: '650168419',
    // merchantid_r_pen: '650168420',
    // merchantid_r_usd: '650168461',
    merchantid_pen: '342062522',
    merchantid_usd: '115015006',
    merchantid_r_pen: '342062522',
    merchantid_r_usd: '115015006',
    // niubiz_redirect: 'https://www.interseguro.pe/payment-api/api/v2/token?path=siv-web/zonasegura/pago&host=wwwp.interseguro.pe&protocol=https',
    niubiz_redirect: 'https://test.interseguro.pe/payment-api/api/v2/token?path=siv-web/zonasegura/pago&host=wwwu.interseguro.pe&protocol=https',
    // niubiz_redirect: 'https://dev.interseguro.pe/payment-api/api/v2/token?path=siv-web/zonasegura/pago&host=10.29.27.170&protocol=https',
    error_server: 'No hay conexión con servidores, inténtelo mas tarde.',
    error_adn_inicializar: 'Ocurrió un error. No se pudo cargar datos de la aplicación.',
    error_adn_buscar_cliente: 'Ocurrió un error. No se pudo realizar la búsqueda de cliente.',
    error_adn_registro: 'Ocurrió un error. No se pudo realizar registro de cliente en ADN.',
    error_adn_registro_oportunidad: 'Ocurrió un error. No se encontró Oportunidad en CRM para este cliente.',
    error_cotizador_valida_edad: 'Cliente es menor de 18 años, no se puede efectuar cotización',
    error_cotizador_valida_id_crm: 'No se encontró ID CRM para esta cotizacion',
    error_cotizador_listar: 'Ocurrió un error. No se pudo listar cotizaciones.',
    error_cotizador_abrir_vida: 'Ocurrió un error. No se pudo abrir cotizador vida, inténtelo más tarde.',
    error_cotizador_abrir_free: 'Ocurrió un error. No se pudo abrir cotizador vida free, inténtelo más tarde.',
    error_cotizador_solicitud: 'Ocurrió un error. No se pudo ir a la solicitud, inténtelo más tarde.',
    error_pago_web_decrypt: 'Ocurrió un error. No se pudo obtener datos de la solicitud, contacte a su agente.',
    error_pago_web_token_usado: 'Link ya fue utilizado, contacte a su agente.',
    error_pago_web_token_caducado: 'Link está caducado, contacte a su agente.',
    error_pago_web_solicitud: 'Ocurrió un error. No se pudo inicializar la información de pago, inténtelo más tarde.',
    error_pago_web_action: 'Ocurrió un error. No se pudo realizar el pago, inténtelo nuevamente.',
    error_pago_web_afilia: 'Se realizó cobro. Contacte a su agente para cerrar proceso.',
    error_pago_web_culqi_400: 'Por favor, intente con otra tarjeta. No se realizó cobro.',
    error_pago_web_culqi_500: 'Ha ocurrido un error. Por favor, intente nuevamente.',
    error_message_pago: [
      {codigo: '101', mensaje: 'La tarjeta ingresada se encuentra vencida. Por favor, veririfque los datos o intente con otra tarjeta.'},
      {codigo: '266', mensaje: 'La tarjeta ingresada se encuentra vencida. Por favor, veririfque los datos o intente con otra tarjeta.'},
      {codigo: '102', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '107', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '948', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '949', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '965', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '190', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '191', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '192', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '100', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '202', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '207', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '416', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '417', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '418', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '419', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '916', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '928', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '290', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '306', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '402', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '42', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '668', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '942', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '424', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '104', mensaje: 'Operación no permitida para esta tarjeta. Contacte a su banco.'},
      {codigo: '110', mensaje: 'Operación no permitida para esta tarjeta. Contacte a su banco.'},
      {codigo: '204', mensaje: 'Operación no permitida para esta tarjeta. Contacte a su banco.'},
      {codigo: '106', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '119', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '206', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '108', mensaje: 'Ha excedido el número de intentos permitidos. Intentar con otra tarjeta.'},
      {codigo: '11', mensaje: 'Contacte a Interseguro.'},
      {codigo: '404', mensaje: 'Contacte a Interseguro.'},
      {codigo: '116', mensaje: 'La tarjeta no cuenta con los fondos suficientes. Intente con otra tarjeta.'},
      {codigo: '118', mensaje: 'Tarjeta inválida. Intente con otra tarjeta o contacte a su banco.'},
      {codigo: '180', mensaje: 'Tarjeta inválida. Intente con otra tarjeta o contacte a su banco.'},
      {codigo: '129', mensaje: 'Tarjeta inválida. Intente con otra tarjeta o contacte a su banco.'},
      {codigo: '181', mensaje: 'La tarjeta tiene restricciones de cobro. Contacte a su banco.'},
      {codigo: '182', mensaje: 'La tarjeta tiene restricciones de cobro. Contacte a su banco.'},
      {codigo: '183', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '201', mensaje: 'La tarjeta se encuentra vencida. Intente con otra tarjeta.'},
      {codigo: '208', mensaje: 'La tarjeta ha sido reportada como extraviada. Contacte a su banco o intente con otra tarjeta.'},
      {codigo: '209', mensaje: 'La tarjeta ha sido reportada como extraviada. Contacte a su banco o intente con otra tarjeta.'},
      {codigo: '263', mensaje: 'La información de la tarjeta no se envió de manera correcta. Contacte a Interseguro.'},
      {codigo: '264', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '405', mensaje: 'Ha excedido el número de intentos permitidos. Intentar con otra tarjeta.'},
      {codigo: '406', mensaje: 'Contacte a Interseguro.'},
      {codigo: '408', mensaje: 'CVV incorrecto'},
      {codigo: '409', mensaje: 'Intente nuevamente.'},
      {codigo: '410', mensaje: 'CVV incorrecto'},
      {codigo: '411', mensaje: 'Intente nuevamente.'},
      {codigo: '412', mensaje: 'Intente nuevamente.'},
      {codigo: '413', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '414', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '415', mensaje: 'Operación Denegada. Contacte a su banco.'},
      {codigo: '423', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '666', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '667', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '670', mensaje: 'Operación denegada. Contacte a Interseguro.'},
      {codigo: '672', mensaje: 'Operación denegada. Contacte a Interseguro.'},
      {codigo: '673', mensaje: 'Operación denegada. Contacte a Interseguro.'},
      {codigo: '674', mensaje: 'Operación denegada. Contacte a Interseguro.'},
      {codigo: '676', mensaje: 'Operación denegada. Contacte a Interseguro.'},
      {codigo: '677', mensaje: 'Operación denegada. Contacte a Interseguro.'},
      {codigo: '682', mensaje: 'Expiró la sesión. Ingrese nuevamente.'},
      {codigo: '909', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '910', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '912', mensaje: 'Problemas de comunicación. Intente en un momento.'},
      {codigo: '913', mensaje: 'Contacte a Interseguro'},
      {codigo: '940', mensaje: 'Contacte a Interseguro'},
      {codigo: '941', mensaje: 'Contacte a Interseguro'},
      {codigo: '943', mensaje: 'Error en los datos ingresados. Intente nuevamente'},
      {codigo: '945', mensaje: 'Contacte a Interseguro'},
      {codigo: '946', mensaje: 'Contacte a Interseguro'},
      {codigo: '947', mensaje: 'Problemas de comunicación. Intente en un momento.'}
    ]
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
