class Cast {
  constructor(
    public id: number,
    public name: string,
    public picture: string,
  ) { }

  get pictureUrl(): string | null {
    if (this.picture)
      return "https://image.tmdb.org/t/p/w92" + this.picture;

    return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIs3peZbmHi0e-uTv4_RB4RWFfqEzE7BNNSg&usqp=CAU"
  }
  static fromJson(json: any): Cast {
    return new Cast(
      json.id,
      json.name,
      json.profile_path,
    );
  }

  static fromArray(arr: any[]): Cast[] {
    return arr.map(json => Cast.fromJson(json));
  }

}

export default Cast;
