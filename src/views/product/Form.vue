<template>
  <entity-form>
    <template #content>
      <v-form ref="form" lazy-validation>
        <input-component
          label="Name"
          type="text"
          :rules="nameRules"
          v-model="users.name"
          autocomplete="off"
        >
        </input-component>
        <input-component
          label="description"
          :rules="[(v) => !!v || 'Description is required']"
          type="text"
          v-model="users.description"
          autocomplete="off"
        ></input-component>
        <input-component
          label="price"
          type="number"
          v-model="users.price"
          :rules="[(v) => !!v || 'Price is required']"
          autocomplete="off"
        ></input-component>
        <input-component
          label="quantity"
          type="number"
          :rules="[(v) => !!v || 'Quantity is required']"
          v-model="users.quantity"
          autocomplete="off"
        ></input-component>
        <div>

        <v-file-input
          accept="image/*"
          label="File input"
          v-model="users.image"
          prepend-icon="mdi-camera"
          :rules="[(v) => !!v || 'Image is required']"
          @change="onFileSelect"
        ></v-file-input>
        <div v-if="selectFile || users.image">
          <img
            width="150"
            height="150"
            :src="selectFile ? selectFile : users.image"
          />
        </div>
        </div>
        <div class="text-right">
          <v-btn color="secondary" @click="back()" class="mx-3">Back</v-btn>
          <v-btn color="secondary" @click="submit()">
            {{ isUpdate ? "Update" : "Create" }}
          </v-btn>
        </div>
      </v-form>
    </template>
  </entity-form>
</template>
<script>
import { mapActions } from "vuex";
import InputComponent from "@/components/InputComponent";
import EntityForm from "@/components/BaseEntity";
export default {
  data() {
    return {
      users: {
        id: null,
        name: null,
        description: null,
        price: null,
        quantity: null,
        image: null,
      },
      selectFile: null,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isUpdate() {
      return !!this.id;
    },
  },
  async created() {
    if (this.isUpdate) {
      this.users = await this.showProduct(this.id);
    }
  },
  methods: {
    ...mapActions({
      addNewProduct: "addNewProduct",
      showProduct: "showProduct",
      updateProduct: "updateProduct",
    }),
    onFileSelect(event) {
      this.selectFile = URL.createObjectURL(event);
    },
    submit() {
      if (this.$refs.form.validate() == true) {
        if (this.isUpdate) {
          this.users.image = this.selectFile ?? this.users.image;
          this.updateProduct({
            id: this.id,
            payload: this.users,
          });
        } else {
          this.users.image = this.selectFile;
          this.users.id = this.uid;
          this.addNewProduct(this.users);
        }
        this.$router.back();
      }
    },
    back() {
      this.$router.push({ name: "product" });
    },
  },
  components: {
    InputComponent,
    EntityForm,
  },
};
</script>
