<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/projects/software">Software Projects</router-link> |
      <router-link to="/projects/volvo-240">Volvo Project</router-link> |
      <router-link to="/blog">Blog</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  padding: 20px;
}
</style>
