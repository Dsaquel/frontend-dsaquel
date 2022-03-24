<template>
  <v-slide-group class="pa-4" show-arrows>
    <v-slide-item v-for="(item, i) in data" :key="i">
      <HoverComponent :item="item">
        <template v-slot:title> {{ item.title }} </template>
        <template v-slot:text> {{ item.type }} </template>
        <template v-slot:subTitle></template>
        <template v-slot:secondTitle> Quelques informations </template>
        <template v-slot:textContent>
          <slot name="textContent" />
        </template>
        <template v-slot:btnTo>
          <slot name="btnTo" />
        </template>
      </HoverComponent>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import HoverComponent from './HoverComponent'
export default {
  name: 'SlideComponent',
  components: {
    HoverComponent
  },
  mounted () {
    console.log(this.data)
  },
  props: {
    data: Object
  }
}
</script>
