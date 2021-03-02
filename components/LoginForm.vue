<template>
  <div class="q-pa-md" style="max-width: 400px; padding-top: 95px;">
    
    
    
      
    
    
    
    <v-form
      ref="formLogin"
      v-model="valid"
      class="q-gutter-md"
    >
<v-card-text > <h2  style="color:#14529C"      >Plataforma TLMK</h2> </v-card-text>


      <!-- <span style="font-family: omnes-pro; padding-bottom: 5px;">Ingresa tu usuario y contraseña</span> -->
      <v-text-field
        v-model="login.user"
        solo
        label="Usuario"
        append-icon="mdi-account-outline"
        :rules="rulesUser"
      ></v-text-field>
 <v-text-field
        v-model="login.dni"
        solo
        label="Dni"
        append-icon="mdi-card-account-details"
        :rules="rulesDni"
      ></v-text-field>
      <v-text-field
        v-model="login.password"
        solo
        label="Contraseña"
        append-icon="mdi-lock-outline"
        :rules="rulesPassword"
        type="password"
        id="clave"
        v-on:keyup.enter="onSubmit"
      ></v-text-field>

      <v-btn
        color="#ea0c90"
        class="pa-2"
        style="width: 100%; color: white;"
        @click="onSubmit()"
      >
      Ingresar
      </v-btn>
    </v-form>
 
     






  </div>
</template>

<script>
export default {
  name: 'LoginFormComponent',
  data () {
    return {
      valid: false,
      url_logo: 'static/logo_interseguro.png',
      login: {
        user: '',
        dni:'',
        password: ''
      },
 rulesDni: [
        v => !!v || 'Dni es requerido'
      ]
      ,
      rulesUser: [
        v => !!v || 'Nombre de usuario es requerido'
      ],
      rulesPassword: [
        v => !!v || 'Contraseña es requerida'
      ]
    }
  },
  mounted () {
    /* eslint-disable */
    const myInput = document.getElementById('clave')
    myInput.onpaste = function (event) {
      event.preventDefault()
    }
    /* eslint-enable */
    // let client
    this.$axios.$get('https://api.ipify.org?format=json').then((response) => {
      // console.log('IP: ' + response.ip)
      localStorage.setItem('client_ip', response.ip)
    })
    if (this.$device.isDesktop) {
      localStorage.setItem('redis_key_device', 'Desktop')
    } else if (this.$device.isTablet) {
      localStorage.setItem('redis_key_device', 'Tablet')
    } else if (this.$device.isMobile) {
      localStorage.setItem('redis_key_device', 'Mobile')
    } else {
      localStorage.setItem('redis_key_device', 'Desconocido')
    }
    if (this.$device.isWindows) {
      localStorage.setItem('redis_key_os', 'Windows')
    } else if (this.$device.isIos) {
      localStorage.setItem('redis_key_os', 'iOS')
    } else if (this.$device.isMacOS) {
      localStorage.setItem('redis_key_os', 'MacOS')
    } else if (this.$device.isAndroid) {
      localStorage.setItem('redis_key_os', 'Android')
    } else {
      localStorage.setItem('redis_key_os', 'Desconocido')
    }
  },
  methods: {
    onSubmit () {
      if (this.login.user !== '' && this.login.password !== '') {
        this.$emit('onLogin', this.login)
      }
    }
  }
}
</script>

<style>
</style>
