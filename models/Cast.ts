class Cast {
  constructor(
    public id: number,
    public name: string,
    public picture: string,
  ) { }

  get pictureUrl(): string | null {
    if (this.picture)
      return "https://image.tmdb.org/t/p/w92" + this.picture;

    return null
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
