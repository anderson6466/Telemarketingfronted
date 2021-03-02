export default {
  callLogin: ({ commit }, data) => {
    return this.$axios.$post('/usuarios/ingresos', data) // .then(response => commit('update_user', response.data))
  },
  callRefreshToken: ({ commit }, req) => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + req.token
      }
    }
    return this.$axios.$get('/usuarios/refreshToken', config)
  }
}
