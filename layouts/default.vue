<template>
  <div>
    <header>
      <img src="/img/sticker.webp" alt="Sticker" class="sticker-image" />
      <h1>Доска стикеров</h1>
      <nav>
        <NuxtLink to="/">Главная</NuxtLink>
        <span>|</span>
        <NuxtLink to="/settings">Настройки</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss">
$header-bg-color: #007bff;
$header-text-color: white;

header {
  text-align: center;
  margin-bottom: 20px;
  background-color: $header-bg-color;
  color: $header-text-color;
  padding: 20px;
  position: relative;

  .sticker-image {
    position: absolute;
    bottom: -5px;
    left: -2px;
    width: 85px;
    height: auto;
  }

  nav {
    margin-top: 10px;

    a {
      margin: 0 10px;
      text-decoration: none;
      color: $header-text-color;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: $header-text-color;
    }
  }
}
</style>
