<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <h1>Users</h1>
    <div v-for="item in items" :key="item">
      <div style="display: inline-block">
        <img :src="item.avatar" alt="" />
      </div>
      <div style="display: inline-block">
        <div>{{ item.last_name }} {{ item.first_name }}</div>
        <div>{{ item.email }}</div>
      </div>
    </div>
  </div>
</template>
