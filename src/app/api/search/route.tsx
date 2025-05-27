import { NextRequest,NextResponse } from "next/server";
import {connectToDatabase} from '@/db/dbConfig';
import Track from "@/model/searchModel";
import axios from "axios";
import {PodcastItem}from "@/app/types/iTunesTypes";
connectToDatabase();


export async function POST(request:NextRequest){
try {
    const requestBody=await request.json();
    const {term}=requestBody;
    const results=await axios.get(`https://itunes.apple.com/search?term=${term}`);
const filteredResults = results.data.results
  .filter((item:PodcastItem) => 'artworkUrl600' in item)
  .map((item:PodcastItem) => ({
    trackViewUrl: item.trackViewUrl,
    artistName: item.artistName,
    trackName: item.trackName,
    artworkUrl600: item.artworkUrl600
  }));
  
const newTrack= new Track({term, results:filteredResults});
        await newTrack.save();
        console.log('new track', newTrack);
        return NextResponse.json({success:true, results:filteredResults});
}catch(error){
    console.log("oops, something went wrong",error);
    return NextResponse.json({error},{status: 500});
}}