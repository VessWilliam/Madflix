export interface Genre{
    id:number,
    name:string
}

export interface Movie{
    title:string,
    backdrop_path:string,
    media_type?:string,
    release_date?:string,
    first_air_date:string,
    genre_id:number[],
    id:number,
    name:string,
    origin_country:string[],
    ori_language:string,
    ori_name:string,
    overview:string,
    popularity:number,
    poster_path:number,
    vote_average:number,
    vote_count:number
}


export interface Element{
    type:| 'Bloopers' | 'Featurette' | 'Behind The Scenes' | 'Clip' | 'Trailer' | 'Teaser'
}