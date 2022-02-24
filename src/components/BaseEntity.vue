<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
              <slot name="content"></slot>
              <div class="text-right">
                <slot name="button"></slot> 
              </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
    }
}
</script>