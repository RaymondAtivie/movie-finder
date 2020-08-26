import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Movie from '~/models/Movie'
import { RootState } from '.'
import Vue from 'vue'

export const state = () => ({
  popularMovies: [] as Movie[],
  autoCompleteMovies: [] as Movie[],

  allMovies: [] as Movie[],
  movieMap: [] as number[],
  query: "" as string,
  currentSlideIndex: 0 as number,
})

export type NotificationState = ReturnType<typeof state>

export const getters: GetterTree<NotificationState, RootState> = {
  movies: state => state.allMovies,
  autoCompleteMovies: state => state.autoCompleteMovies,
  popularMovies: state => state.popularMovies,
  filteredMovies: (state) => {
    const searchTerm = state.query.toLowerCase();

    const ms = Array.from(state.allMovies.values());

    return ms.filter((movie) => {
      return movie.title.toLowerCase().includes(searchTerm);
    });
  },
  searchTerm: state => state.query,
  slideIndex: state => state.currentSlideIndex,
}

export const mutations: MutationTree<NotificationState> = {
  LOAD_MOVIES: (state, movies: Movie[]) => {


    let count = 0;
    movies.forEach(movie => {
      if (!state.movieMap.includes(movie.id)) {
        state.movieMap.push(movie.id);
        state.allMovies.push(movie);
        count++;
      }
    })

    console.log("added " + count + " movies for search");
  },
  UPDATE_AUTO_COMPLETE: (state, movies: Movie[]) => {
    state.autoCompleteMovies = movies;
  },
  LOAD_POPULAR_MOVIES: (state, movies: Movie[]) => {
    state.popularMovies = movies;
  },
  UPDATE_SEARCH_QUERY: (state, query: string) => {
    state.query = query;
  },
  UPDATE_SLIDE_INDEX: (state, index: number) => {
    state.currentSlideIndex = index;
  }
}
export const actions: ActionTree<NotificationState, RootState> = {
  async loadPopularMovies({ commit }) {
    const response = await this.$axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9099d4a456925cc52c8aed25ab61ba4e");

    const movies: Movie[] = Movie.fromArray(response.data.results).slice(0, 16);

    commit('LOAD_POPULAR_MOVIES', movies);
  },

  async search({ commit }, query: string) {
    commit('UPDATE_SLIDE_INDEX', 0);

    if (!query) return;

    const response = await this.$axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9099d4a456925cc52c8aed25ab61ba4e&query=${query}`);

    const movies: Movie[] = Movie.fromArray(response.data.results);

    commit('UPDATE_AUTO_COMPLETE', movies);
    commit('LOAD_MOVIES', movies);
  },

  async getMovie({ state }, movie_id: number): Promise<Movie> {
    return new Promise((resolve, reject) => {
      const foundMovie = state.allMovies.find(movie => movie.id == movie_id)
      if (foundMovie) {
        return resolve(foundMovie);
      }

      this.$axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=9099d4a456925cc52c8aed25ab61ba4e`)
        .then((response) => {
          console.log(response.data);

          resolve(Movie.fromJson(response.data))
        });

    })
  }
}
