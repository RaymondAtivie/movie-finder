class Movie {
  constructor(
    public id: number,
    public title: string,
    public poster: string,
    public director: string,
    public release: string,
  ) { }

  get posterUrl(): string | null {
    if (this.poster)
      return "https://image.tmdb.org/t/p/w500" + this.poster;

    return null
  }
  get thumbnailUrl(): string | null {
    if (this.poster)
      return "https://image.tmdb.org/t/p/w92" + this.poster;

    return null;
  }

  get year(): string {
    return this.release?.split("-")[0]
  }

  static fromJson(json: any): Movie {
    return new Movie(
      json.id,
      json.original_title,
      json.poster_path,
      json.overview,
      json.release_date,
    );
  }

  static fromArray(arr: any[]): Movie[] {
    return arr.map(json => Movie.fromJson(json));
  }

}

export default Movie;
