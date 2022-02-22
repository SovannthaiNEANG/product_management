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
                <v-slot name="content"></v-slot>
              <div class="text-right">
                <v-btn color="secondary" @click="back()" class="mx-3">Back</v-btn>
                <v-slot name="button"></v-slot> 
              </div>
            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>