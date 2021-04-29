<template>
  <h2>Co chcesz zrobić?</h2>
  <base-button>
    <router-link class="link" to="/admin/createQuestion">
      Stwórz nowe pytanie
    </router-link>
  </base-button>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: #ef3dff;
}

.link2 {
  text-decoration: none;
  color: #03e9f4;
}
</style>