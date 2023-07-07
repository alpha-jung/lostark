<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LostArk API</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <router-link to="/">Home</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Ranking</a>
          </li>
        </ul>
        <form class="d-flex" role="search" @keydown.enter="searchCharacter">
          <input class="form-control me-2" type="search" placeholder="캐릭터 검색" aria-label="Search" @input="setSearchText" :value="searchText">
          <button class="btn btn-outline-success" type="submit" @click="searchCharacter">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script lang="ts">
import { ref, defineComponent} from 'vue';
import router from './router';

export default defineComponent({
  name: 'App',
  setup() {
    let searchText = ref('');

    function setSearchText(e: Event) {
      let text = (e.target as HTMLInputElement).value;
      searchText.value = text;
    }

    function searchCharacter(e: any) {
      e.preventDefault();
      console.log(searchText.value);

      router.push(`/character/${searchText.value}`);
    }

    return { searchText, setSearchText, searchCharacter };
  }
})

</script>

<style>

</style>
