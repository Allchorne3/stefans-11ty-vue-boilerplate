<template>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Game List</h1>
  
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by game title..."
        class="mb-4 p-2 border rounded w-full"
      />
  
      <div class="grid grid-cols-2 gap-4 mb-6">
        <select v-model="filters.releaseYear" class="p-2 border rounded">
          <option value="">All Years</option>
          <option v-for="year in releaseYears" :key="year" :value="year">{{ year }}</option>
        </select>
  
        <select v-model="filters.genre" class="p-2 border rounded">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
  
        <select v-model="filters.developer" class="p-2 border rounded">
          <option value="">All Developers</option>
          <option v-for="dev in developers" :key="dev" :value="dev">{{ dev }}</option>
        </select>
  
        <select v-model="filters.status" class="p-2 border rounded">
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
      </div>
  
      <ul>
        <li v-for="game in filteredGames" :key="game.id" class="mb-2 p-4 border rounded">
          <h2 class="text-lg font-semibold">{{ game.title }}</h2>
          <p>Year: {{ game.releaseYear }} | Genre: {{ game.genre }} | Developer: {{ game.developer }} | Status: {{ game.status }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Fuse from 'fuse.js';
  
  export default {
    name: 'GameList',
    data() {
      return {
        searchQuery: '',
        filters: {
          releaseYear: '',
          genre: '',
          developer: '',
          status: ''
        },
        games: [
          { id: 1, title: 'Adventure Quest', releaseYear: 2020, genre: 'RPG', developer: 'DevStudio A', status: 'Completed' },
          { id: 2, title: 'Battle Arena', releaseYear: 2021, genre: 'Action', developer: 'DevStudio B', status: 'In Progress' },
          { id: 3, title: 'Puzzle World', releaseYear: 2022, genre: 'Puzzle', developer: 'DevStudio A', status: 'Not Started' },
          { id: 4, title: 'Action Heroes', releaseYear: 2020, genre: 'Action', developer: 'DevStudio C', status: 'Completed' },
          // Add more games as needed
        ]
      };
    },
    computed: {
      releaseYears() {
        return [...new Set(this.games.map(game => game.releaseYear))].sort();
      },
      genres() {
        return [...new Set(this.games.map(game => game.genre))].sort();
      },
      developers() {
        return [...new Set(this.games.map(game => game.developer))].sort();
      },
      filteredGames() {
        let results = this.games;
  
        if (this.searchQuery) {
          const fuse = new Fuse(this.games, {
            keys: ['title'],
            threshold: 0.3
          });
          results = fuse.search(this.searchQuery).map(result => result.item);
        }
  
        return results.filter(game => {
          return (
            (!this.filters.releaseYear || game.releaseYear === parseInt(this.filters.releaseYear)) &&
            (!this.filters.genre || game.genre === this.filters.genre) &&
            (!this.filters.developer || game.developer === this.filters.developer) &&
            (!this.filters.status || game.status === this.filters.status)
          );
        });
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
  }
  </style>
  