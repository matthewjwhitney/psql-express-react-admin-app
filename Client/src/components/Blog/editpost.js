import React, { Component } from 'react';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



class EditPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }

  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.props.post.title,
      body: this.props.location.state.props.post.body
    })
  }


  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()


    const user_id = this.props.location.state.props.post.user_id
    const username = this.props.location.state.props.post.author
    const pid = this.props.location.state.props.post.pid
    console.log(user_id)
    const data = {title: event.target.title.value, body: event.target.body.value, pid: pid,  uid: user_id, username: username}
    axios.put('api/put/post', data)
      .then(response => console.log(response))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/profile') }, 700))
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
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <br/>
          <TextField
          id="body"
          label="Post"
          multiline
          rows="4"
          margin="normal"
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <br />
          <Button variant="contained" color="primary" type="submit" >Submit</Button>
          <br />
        </div>
      </form>
      <br/ >
      <button onClick={() => history.goBack()} > Cancel </button>
      </div>
  )};
}



export default EditPost;
