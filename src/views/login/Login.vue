<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form 
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    name="username"
                    label="Username"
                    type="text"
                    :rules="usernameRule"
                    v-model="username"
                    prepend-icon="mdi-account"
                    autocomplete="off"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    :rules="passwordRule"
                    v-model="password"
                    autocomplete="off"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                  <div v-if="showMessage == false">
                    <p class="red--text">Username or Password is not correct.</p>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: "Login",
      username: null,
      password: null,
      valid: true,
      showMessage: true,
      usernameRule: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Username must be less than 20 characters',
      ],
      passwordRule: [
        v => !!v || 'Password is required',
        v => (v && (v.length <= 12 && v.length >= 6)) || 'The password must be at least 6 characters and at most 12 characters',
      ],
    };
  },

  methods: {
    login() {
      if(this.$refs.form.validate() == true){ 
        let user = this.$store.state.users.find( (el) => {
            return (el.username == this.username) && (el.password == this.password)
        });
        if (user) {
            this.$store.commit('SET_IS_LOGIN', true)
            this.$router.push({name: 'product'})
        }else{
          this.showMessage = false
        }
      }
    },
  }
};
</script>