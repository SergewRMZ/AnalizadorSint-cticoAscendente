<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-bg">
    <div class="container">
      <!-- <router-link class="navbar-brand" :to="{ name: 'home' }">Logo</router-link> -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'parser' }">Parser</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
div a {
  margin: 0 10px;
  font-weight: bold;
}

div .router-link-exact-active {
  color: rgb(4, 58, 219);
}

.navbar-bg {
  background-color: #000;
}

</style>
