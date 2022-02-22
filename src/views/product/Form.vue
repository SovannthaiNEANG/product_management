<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                label="Name"
                type="text"
                :rules="nameRules"
                v-model="users.name"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                label="description"
                :rules="[v => !!v || 'Description is required']"
                type="text"
                v-model="users.description"
                autocomplete="off"
              ></v-text-field>
               <v-text-field
                label="price"
                type="number"
                v-model="users.price"
                :rules="[v => !!v || 'Price is required']"
                autocomplete="off"
              ></v-text-field>
               <v-text-field
                label="quantity"
                type="number"
                :rules="[v => !!v || 'Quantity is required']"
                v-model="users.quantity"
                autocomplete="off"
              ></v-text-field>
               <v-file-input
                accept="image/*"
                label="File input"
                :rules="[v => !!v || 'Image is required']"
                v-model="users.image"
                prepend-icon="mdi-camera"
                @change="onFileSelect"
            ></v-file-input>
            <div v-if="this.selectFile || this.users.image">
              <img width="150" height="150" :src="this.selectFile ? this.selectFile : this.users.image"/>
            </div>
              <div class="text-right">
                <v-btn color="secondary" @click="back()" class="mx-3">Back</v-btn>
                <v-btn color="secondary" @click="_addNewProduct()">
                  {{ isUpdate ? 'Update' : 'Create' }}
                </v-btn>
              </div>
            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      users: {
          id: null,
          name: null,
          description: null,
          price: null,
          quantity: null,
          image: null
      },
      selectFile: null,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    isUpdate() {
      return !!this.id
    }
  },
  async created() {
    if(this.isUpdate) {
      this.users = await this.showProduct(this.id)
    }
  },
  methods: {
      ...mapActions({
        addNewProduct: 'addNewProduct',
        showProduct: 'showProduct',
        updateProduct: 'updateProduct'
      }),
      onFileSelect(event) {
        this.selectFile = URL.createObjectURL(event)
        console.log(this.selectFile)
      },
      _addNewProduct() {
          if(this.$refs.form.validate() == true){
            if (this.isUpdate) {
              this.users.image = this.selectFile;
              this.updateProduct({
                id: this.id,
                payload: this.users
              })
            } else {
              this.users.image = this.selectFile;
              console.log(this.users)
              this.users.id = this.uid;
              this.addNewProduct(this.users);
            }
            this.$router.back()
          }
      },
      back() {
        this.$router.push({name: 'product'})
      },
  }
};
</script>