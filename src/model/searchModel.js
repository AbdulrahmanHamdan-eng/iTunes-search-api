const mongoose = require('mongoose');



const resultSchema=new mongoose.Schema({

    trackViewUrl: {
    type: String,
  },
  artistName: {
    type: String,
  },
  trackName: {
    type: String,
  },
  artistViewUrl: {
    type: String,
  },
  artworkUrl600: {
    type: String,
  }
//  trackViewUrl: String,
//   artistName: String,
//   trackName: String,
//   artistViewUrl: String,
//   artworkUrl600: String,
},{_id:false});


const trackSchema = new mongoose.Schema({
  term:{
    type:String,
  },
  results:{
    type:[resultSchema],
  }

}, {
});

const Track= mongoose.model('Track', trackSchema);

export default Track;