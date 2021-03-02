<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="#0855C4"
      v-if="this.$route.path !== '/'"
    >
      <a href="#" class="is_logo margin">
        <img class="ml-5" :src="require('../assets/is_logo.svg')"/>
      </a>
      <span v-if="!$device.isMobile" class="is_title">Solicitud de Seguro de Vida</span>
      <span v-if="$device.isMobile" class="is_title_mobile">Solicitud de Seguro de Vida</span>
      <div class="is_clear"></div>
    </v-app-bar>
    <v-content class="fondo-externo-pago">
      <nuxt />
    </v-content>
    <!-- <v-footer
      v-if="!$device.isMobile"
      :fixed="fixed"
      app
      class="font-weight-small"
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
        </v-col>
        <v-col
          class="text-right"
          cols="12"
          md="6"
          lg="6"
          sm="12"
        >
          <div class="box-tarjetas"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAANCAYAAAA0XUfWAAAC2klEQVR4nH2UTWxWZRCFn9MfW2yByE/UWopVbImSiOlGjC7AxsQCaxcukMTfjWxYsIWGLRoIC0NIYGEiC7UbSIsR0qhRm4Y2sClECa3VUhYEm1IrLT0svrnt9Ounk9y8856ZO/fcM/O+sv0usAdoZMmmgBOSfkkYtvcDLwILwLikE7YPAC2R0ivpu8itAl4HOoEmYD1wH7gJnJX0e6q7Cng/1bkn6WgRr5H0pe1vgbeBQ8AzEWsCdqZCDcBeoDagn2LdATSE3xO59UA3sJXlthZ4BThXhr8HvFUmyFpJfwNUAUiakfQ1cAQYirw221ndNxLBf4FLttclggBjsX6QCM4DA8Al4GrsRxOZRuBNVtoLhVNTFhgAPgR+pqTQNqBoeS7UL2na9vaELQB/2RbwasK/krSonO3HJc2keCdQl36o4NQGDEIoWZikSWACeIxSO1+Owk0sb92FWFsSNiFpLmrWJ/w125vTNxYJxg91pdye5LcXzjKSYcOx1icSWcWRNPSbEj4WJB4CPyT8OeC47Y9try77VgfwdPg3gb4Ua/s/kkPJXxOndFfCLiQ/KzmW/C+Ay2lfBewGPrO9MeF7kv+9pNvAvdg3RgcrkrxGab4AnqU0XxtiPwX8mHKzkn8UjqR/JB0DDgPjKedJYB8sjlBH4A+B/vBvpPy2iiQlTQO/JWh/8i/G3GH7CSC3LytZ1BoEPgWuJ3hLrHkW54CDtruB1oS3VyQZllv+VKwGehOeVVwA/rRdbbvL9poUM5BP82jco50Jqwe2x5PHoR1WXkGFDQPvlGGDcfoLy/M4KemB7WbgE+Aj25NBrpmlKwZK9+VOlu7XWVZ2YQslAVtt1/4XyZF4OV8l58tyVpzshFWxdGoLmwfOSPrV9smE90o6nRNtfw48T0nE1ookJc3b/iZ9dBa4UpZ2m5IqpNgIcAp4CVgHVAN34id6Jd2N030rHoCLFSj0RQ2Aukd1nPa/tU66NQAAAABJRU5ErkJggg==" alt="visa"><img data-v-756affbc="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAABHNCSVQICAgIfAhkiAAAAohJREFUSImV1k9vlFUUBvDfKUOlf8QyaqUomkhJoCT+iRoWxIXRb2Bwo1/Ar+PKpQsTEuLCjUsTYwIsCCHRoDERgwghyljRlgaG1uvinInN0MK8Z/W+d+5zn3Oe89zzTtghWmuBgziEecyh4R4GuBURgzHMYZzEcfTxBNZxA5dxPiK2xrliB/KDWCnSR8UqvqszPsRrj9n/J76KiHO7JtBaO1Lkk8YBWXWvA+briDg7epnaRv5yR3LYI1X4vQPm3dba6dFLr8hncawj+XtSAbKQu12wrbVLEfFLVAJvSMNNGoEnx9aWcLTDGVci4pNeOX4RL2IDD/A0rmNzF/DbO5ANcaewTZput5jBm621pR4WMC2d/H09r+BzvIBf5XU6gZs4jTOy7/twBa/jNj6S128o/TFf+0Y3aqP4+pXgcq+y6eOfAverkj2lwPu4hb+lZx5IuU9UYvN4B99KT3xTCixVMccLN8R+/FG/XcPCVJE8WyTLVcltnMKRIvxBmnRBDpYDVf3eqmwgW7ZR5DN4CU9hqxS4WUn8VHvuYnOqCBYrga2q/g6eqeT+kgYdVrXP1VqrfVOFvTHqLQ6XgiGn57+FmcVbtTaN36JM+EFVMldJDOt5sw6aqwPW8Xw9L5e0a4W9J6fh/mrnXBXXKsn1SlDh9uLj0TVcKbknjX5Vsj2mi2zSuBwRn44m4VXc7wBexUXZ9+v4uSP5EGepURwR93Gp4yFr0pSL8kZ0iS8iYpWHP0ZLeNX/7n5cbEi3n5xw/yY+i4iLo4WdPsczeEVWtltsSdmvSoefkvNi9hGYH/FlRFzbvvhQAmOJHJIy9+RtWJP9H1Tbtu/fJ8fzUanKUCo0wIXxPzCj+A9+kcajszlApQAAAABJRU5ErkJggg==" alt="mastercard"><img data-v-756affbc="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAchJREFUOI3tk79vEnEYxj/H/aBpC9IAvSsHREix/kg0+p84GWNioquDiauTq4mzk4ObcXDhnzCpEjBotQdCUIpnz2I5JMLd974OYmN1cLCT8VmeN+/wvHnyPK8ipazy92jHjkAEgH9YSIuiiK9BAIAeixHM519hGAZSSoIgQNf1AwbQdR3twcNHCCn5sOOiGSoFO0e3945UMoG39xk7n6Pf32E0+sKpShnX85jOpqyXyjQaTcrlEjdvXEfLZtIcLxZ4Kp5hWRZ520RRFKZhiGXEObNRYTKZsF4q8fhJlTu3b7E/9nFdj2tXL7NZqwOg3L13v5rOpPB9n+HQ/+43rpIzLdxdDyFCDM1gJgSJxTiaaoCqsOcNWVqMY1omVy5dbCs/F/LVa4dtpwNIzLUs7sADIJQhmqLNWZ3vBKoCQsJCfGFwKLV64yXFYo7n9RfsDjy2HAdzbZVwNiNvm6ykkmQyaUa+T3JpmdbbHlZ2lW63l/0t/kgIRBQCoKIyGY+pNZp8Gu7jfRwiZYQIBY7T4cL5czhOh5MbFeWwta1t3rRaABRsm/d9l8SxZc6ePsFmrQkIZlNxcPSH5dRKoq/8f9o/QgPaR6DT+wYCHcxete8J4wAAAABJRU5ErkJggg==" alt="amex"><img data-v-756affbc="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAYAAABxnDbHAAAABHNCSVQICAgIfAhkiAAAAt9JREFUSIml1ltvVlUQBuBn2sJXIVBAVCKUxnqCKFEh8YKQGBMSzwleGKLxB6j/wj/gH9BbEi80nqKRa1O9qBFRq9gqQRIKMSXWcmirtuPFmk8/CJbG7pu1s2aveWfemXnXDqt8MnMH9mEvBnEO87iM33A6Ii6uxlesAmwdnsRr2HPdmUl8WsCJbzEeEUtrBX0er2MzFtEpU/d9AW9hrvYnImJsJZ99NwHcjVcKcBLHeszv4YRG9XM9+w9k5q7/DYoDuF/L5kP82WNbwnHMYgRDPba9awG9t9Zp/HED+zJ+qfcdPfvb1gK6WGtnhW8Ga+1tnhUb6WagJzRqd7o2k+6zBXdrGU/37F9YK+jn9X4U9/TYRvASBvAVrtb+Ik6u5HQ1I3Mf3sCD//HJz3hHozRxPCLOrgm0gO/Eqzik0dynUfiNJgjwKz5bjSpFzVRiNiKuZGY/1kfE/HXAfVpX3ooNPaY5zGj0jlQwQ9gQEVN1toP9EfEFrR7PYhw7M3MUH9Sha0AjYrmcz9yAids1gXgfDxUTWzBVZxczcz/+AZ3FXERMZeY+rXaRmYfwQx0+X1nO4FFN7JeKnVN4EW9GxFWMlZJtz8zD+KnY6WTmM/ix271Z61IPTVsjYqKCeFobi8R6fI0n/KtQS5pUdp9+/IVR7QYaxeWI+BiHB7QZnM/MwcpoDpuwLTM3FdWXKtpLlflmTXsf17r3GF7OzE8wXAEO4TbtZhrCcDEwITM7dX116zOQmetqfyAzN2ZmVFAyM2rtzax7dqjHHpl5S/nolM+hbk1fwEJmjmniHtha0V7UNHc7JjPzMbybmcMYzcxTWuOcxV3aCPVnJhzU5veOovcjPIW3+6pGkzhSQN9p0nelaEmteRbxvaZMy9q87qnAxzUNPhgRJ/EwTmsNtlzJHKhai8w8gt8xpv2OnKuo58pRp4A3FvBZ7MYZTSwu4Muq77Q2LgsV8Hnsqro/Un7O/A0Y3DQxpEhDHwAAAABJRU5ErkJggg==" alt="dinners"></div>
        </v-col>
      </v-row>
    </v-footer> -->
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="load"
      :z-index="zIndex"
    >
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      fixed: true,
      absolute: false, // Overlay
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
      value: 0
    }
  },
  mounted () {
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
  computed: {
    load () {
      return this.$store.getters.getLoading
    },
    agente () {
      return localStorage.getItem('ap26499_agente')
    },
    cliente () {
      return localStorage.getItem('ap26499_cliente')
    },
    producto () {
      return localStorage.getItem('ap26499_producto')
    }
  }
}
</script>

<style>
.is_logo img {
  height: 26px;
}
.is_title {
  font: 20px omnessemibold;
  color: #f2f2f2;
  float: left;
  margin-left: 22px;
  position: relative;
}
.is_title_mobile {
  font: 16px omnessemibold;
  color: #f2f2f2;
  float: left;
  margin-left: 22px;
  position: relative;
}
.is_title:before, .is_title_mobile:before {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  background: #0CACED;
  border-radius: 50%;
  left: -13px;
  top: 9px;
}
.is_clear {
  clear: both;
}
</style>
