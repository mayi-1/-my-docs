<template>
  <div>
    默认插槽:
    <sonSlot> 你好！默认插槽 </sonSlot>
    具名插槽：
    <sonSlot>
      <template #title> title </template>
      <template #main>main </template>
      <template #footer>footer</template>
    </sonSlot>
    作用域插槽：
    <sonSlot>
      <template #name="{ msg }"> {{ msg }} </template>
    </sonSlot>
  </div>
</template>

<script>
import sonSlot from "./sonSlot.vue";
export default {
  name: "FatherSlot",
  components: {
    sonSlot,
  },
};
</script>
