import React, { Component } from 'react';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class AddPost extends Component {

  handleSubmit = event => {
    event.preventDefault()
    const user_id = 26
    const username = 'admin'
    const data = {title: event.target.title.value, body: event.target.body.value, username: username, uid: user_id}
    axios.post('api/post/poststodb', data)
      .then(response => console.log(response))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/') }, 700))
     }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div>
        <TextField
          id="title"
          label="Title"
          margin="normal"
        />
        <br/>
          <TextField
          id="body"
          label="Post"
          multiline
          rows="4"
          margin="normal"
        />
        <br/>

          <Button variant="contained" color="primary" type="submit" >Submit</Button>
        </div>
      </form>
      <br/ >
      <button onClick={() => history.goBack()} > Cancel </button>
      </div>
  )};
}



export default AddPost;
