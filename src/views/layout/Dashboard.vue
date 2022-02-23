<template>
    <!-- App.vue -->

    <v-app te>
        <v-navigation-drawer app v-model="isOpenDrawer">
            <v-list
                nav
                dense
            >
                <v-list-item-group
                active-class="deep-purple--text text--accent-4"
                >
                <v-list-item-title class="text-h6">
                    Product Management
                </v-list-item-title>
                    <v-list-item>
                        <v-list-item-title>Product</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dense>
            <!-- -->
            <v-app-bar-nav-icon @click.stop="isOpenDrawer = !isOpenDrawer"></v-app-bar-nav-icon>
            <h3 v-if="!isOpenDrawer">Product Management</h3>
            <v-spacer></v-spacer>
            <v-switch
                class="pt-5 mx-2"
                v-model="active"
                @change="isDark()"
                :label="active ? 'Dark Mode' : 'Light Mode'"
            ></v-switch>
            <v-btn icon @click="logout()">
                <v-icon>mdi-logout</v-icon>
            </v-btn>

        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
        active: this.$vuetify.theme.dark,
        isOpenDrawer: false
        }
    },
    methods: {
        isDark() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        logout() {
            this.$store.commit('SET_IS_LOGIN', false)
            this.$router.push({name: 'Login'})
        }
    },
}
</script>