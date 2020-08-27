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

    movies.forEach(movie => {
      if (!state.movieMap.includes(movie.id)) {
        state.movieMap.push(movie.id);
        state.allMovies.push(movie);
      }
    })

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
  loadPopularMovies({ commit }) {
    this.$axios.get("/movie/popular?api_key=9099d4a456925cc52c8aed25ab61ba4e")
      .then(response => {
        const movies: Movie[] = Movie.fromArray(response.data.results).slice(0, 16);

        commit('LOAD_POPULAR_MOVIES', movies);

      })
      .catch(error => {
        this.app.$toast.error("Something went wrong when getting popular moveis", { duration: 5000 });
      })

  },

  search({ commit }, query: string) {
    if (!query) return;

    this.$axios.get(`/search/movie?api_key=9099d4a456925cc52c8aed25ab61ba4e&query=${query}`).then(response => {
      const movies: Movie[] = Movie.fromArray(response.data.results);

      commit('UPDATE_AUTO_COMPLETE', movies);
      commit('LOAD_MOVIES', movies);
    })
      .catch(error => {
        this.app.$toast.error("Something went wrong with search", { duration: 5000 });
      })

  },

  getMovie({ state }, movie_id: number): Promise<Movie> {
    return new Promise((resolve, reject) => {
      const foundMovie = state.allMovies.find(movie => movie.id == movie_id)
      if (foundMovie) {
        return resolve(foundMovie);
      }

      this.$axios.get(`/movie/${movie_id}?api_key=9099d4a456925cc52c8aed25ab61ba4e`)
        .then((response) => {
          resolve(Movie.fromJson(response.data))
        })
        .catch(error => {
          this.app.$toast.error("Oh no. We could not find this movie", { duration: 5000 });
          reject(error);
        })
    })
  }
}
