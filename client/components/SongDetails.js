import React ,{Component} from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import likeLyric from '../queries/likeLyric';
import { optimistic } from 'apollo-client/optimistic-data/store';

class SongDetails extends Component{
  render(){
    console.log(this.props);
    const {song} = this.props.data;
    const pointer = {cursor: 'pointer'};

    const thumbsUpLyric=(id,likes) =>{
      console.log("Liked Lyric id: ",id);
       this.props.mutate({
        variables: { id },
        optimisticResponse:{
          __typeName:'Mutation',
          likeLyric:{
            id,
            __typeName:'LyricType',
            likes:likes+1
          }
        }
      }).then(()=>{
        hashHistory.push('/')
      });
    }
    const renderLyrics =()=>{
      return song.lyrics.map(({id,content,likes})=>{
        return(
          <li key={id} className='collection-item' >
            {content}
            <i 
              className='material-icons right' 
              style={pointer} 
              onClick={()=>thumbsUpLyric(id,likes)}>
              thumb_up
            </i>
            <span className='right'>{likes}</span>
          </li>
        )
      })
    }

    if(!song){
       return <div> Loading ...</div>
    }else{
      return(
        <div>
          <Link to='/'>Back</Link>
          <h3>{song.title}</h3>
          <ul className='collection'>
            {renderLyrics()}
          </ul>
          <LyricCreate songId={song.id}/>
        </div>
      )
    }
  }
} 
const LikeLyric =graphql(likeLyric);

export default graphql(fetchSong,{
  options: (props)=> {
    return {variables: {id:props.params.id}}
  }
})(LikeLyric(SongDetails))