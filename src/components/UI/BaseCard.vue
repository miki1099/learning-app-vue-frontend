<template>
    <div id="card">
        <slot></slot>
    </div>
</template>

<style scoped>
#card {
  border-radius: 20px;
  box-shadow: 0 2px 8px #434343;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 65%;
  background-color: #3C3C3C;
}

@media (max-width: 600px) {
  #card {
    max-width: 95%;
  }
}
</style>