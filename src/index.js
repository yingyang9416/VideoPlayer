import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyCPLtrMIGf-4cJSCBEiG9J74RWhbDRzY28';


// Create a new component. This component should produce some html
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null
    };
    this.videoSearch('surfboards');

  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      // this.setState({videos: videos});
    });
  }

  render() {
    //console.log(this.state.videos[0]);
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
    return(
      <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
      </div>
    );
  }
}


// Take this component's generated HTML and put it on the page (in the DOM)
// Should pass an instance to render()
// Wrong: ReactDOM.render(App);
ReactDOM.render(<App />, document.querySelector('.container'));
