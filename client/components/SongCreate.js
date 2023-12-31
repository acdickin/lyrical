import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
import addSong from '../queries/addSong';
class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title,
      }
    }).then(()=>{
      hashHistory.push('/')
    });
  }

  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        <Link to='/'>Back</Link>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = graphql(addSong);

export default mutation(SongCreate);
