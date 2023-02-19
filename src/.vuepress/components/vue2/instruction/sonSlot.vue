<template>
  <div>
    <slot></slot>
    <slot name="title"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
    <slot name="name" msg="你好作用域插槽"></slot>
  </div>
</template>

<script>
export default {
  name: "son-slot",
};
</script>
