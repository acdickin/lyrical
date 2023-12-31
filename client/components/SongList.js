import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';
const SongList =({data,mutate})=> {
  const pointer = {cursor: 'pointer'};
  const renderSongs=()=> {
    console.log(data)
    return data.songs.map(({id,title}) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={"song/"+id}> {title} </Link>
          <i className='material-icons right' style={pointer} onClick={()=>deleteThisSong(id)}>delete</i>
        </li>
      );
    });
  }
  const deleteThisSong=(songId)=>{
    mutate({
      variables: {
        id:songId
      }
    }).then(()=>data.refetch());
  }
  if (data.loading) { return <div>Loading...</div>; }

  return (
    <div>
      <h3>Song List</h3>
      <ul className='collection'>
        {renderSongs()}
      </ul>
      <Link to='songs/new' className='btn-floading btn-large red right'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
}

export default graphql(deleteSong)(
  graphql(fetchSongs)(SongList)
);
