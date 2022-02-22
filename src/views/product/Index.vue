<template>
  <div>
    <div class="mt-4 mb-4">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Search Option</v-expansion-panel-header>
          <v-expansion-panel-content>
                <v-form>
                  <v-text-field
                    name="name"
                    label="Name"
                    type="text"
                    v-model="filter.name"
                    autocomplete="off"
                  ></v-text-field>
                  <v-text-field
                    id="description"
                    name="description"
                    label="description"
                    type="description"
                    v-model="filter.description"
                    autocomplete="off"
                  ></v-text-field>
                  <v-text-field
                    name="price"
                    label="Price"
                    type="number"
                    v-model="filter.price"
                    autocomplete="off"
                  ></v-text-field>
                  <v-text-field
                    id="quantity"
                    name="quantity"
                    label="quantity"
                    type="number"
                    v-model="filter.quantity"
                    autocomplete="off"
                  ></v-text-field>
                </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="getProductList">Search</v-btn>
              </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="text-right my-2">
      <v-btn color="secondary" @click="createdForm()">ADD</v-btn>
    </div>
    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Image</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products"
            :key="index"
            v-bind:class="{ 'grey lighten-1': item.quantity < 10 }"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
            <td v-bind:class="{ 'red--text': item.quantity == 0 }">
              {{ item.quantity == 0 ? "Out of stock" : item.quantity }}
            </td>
            <td><img height="100" width="100" :src="item.image" alt="" /></td>
            <td>
              <v-btn color="primary" fab small :to="`product/${item.id}`"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn
                class="ml-2"
                color="red"
                fab
                small
                @click="onDeleteProduct(item.id)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      filter: {
        name: null,
        description: null,
        price: null,
        quantity: null,
      },
      products: {},
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    ...mapActions({
      listProduct: "listProduct",
      deleteProduct: "deleteProduct",
    }),
    createdForm() {
      return this.$router.push({ name: "product.create" });
    },
    async onDeleteProduct(id) {
      await this.deleteProduct(id);
      await this.getProductList();
    },
    async getProductList() {
      this.products = await this.listProduct(this.filter);
    },
  },
};
</script>