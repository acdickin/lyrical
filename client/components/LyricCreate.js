import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addLyric from '../queries/addLyric';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
 
  constructor(props) {
      super(props);
      this.state= {content:''};
    }

  render(){
   
    const onSubmit=(e)=>{
      e.preventDefault();
      this.props.mutate({
      variables: {
        content: this.state.content,
        songId:this.props.songId
      }
      })
      this.setState({content:''});
    }

    const updateContent =(e)=>{
      console.log(e.target.value);
      this.setState({content:e.target.value});
    }
    return(
      <form onSubmit={(e)=>onSubmit(e)}>
        <label>Add Lyric</label>
        <input value= {this.state.content} onChange={e=>updateContent(e)}/>
      </form>
    )
  }
}
const mutation = graphql(addLyric);


export default mutation(LyricCreate);