import React, { Component } from 'react';

import * as ACTIONS from '../../store/actions/actions';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';



class ShowPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      comment: '',
      cid: ''
    }
  }

  componentDidMount() {
    axios.get('api/get/allpostcomments', {params: { post_id: this.props.location.state.props.post.pid}})
    .then(res => this.props.post_comment_success(res.data))
    .catch(function (error) {
        console.log(error);
      });
  }

  handleClickOpen = (cid, comment) => {
     this.setState({ open: true, comment: comment, cid: cid });
   };

   handleClose = () => {
     this.setState({ open: false, comment: '', cid: '' });
   };

   handleCommentChange = (event) => {
     this.setState({comment: event.target.value})
   }


  handleSubmit = event => {
    event.preventDefault()
    const user_id = 26
    const post_id = this.props.location.state.props.post.pid
    const username = 'admin'
    const data = {comment: event.target.comment.value, post_id: post_id, user_id: user_id, username: username}
    axios.post('api/post/commenttodb', data)
      .then(res => console.log(res))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/posts') }, 700))
     }

   handleUpdate = () => {
     const comment = this.state.comment
     const cid = this.state.cid
     const user_id = 26
     const post_id = this.props.location.state.props.post.pid
     const username = 'admin'
     const data = {cid: cid, comment: comment, post_id: post_id, user_id: user_id, username: username}
     axios.put('api/put/commenttodb', data)
       .then(res => console.log(res))
       .catch(function (error) {
         console.log(error);
       })
       .then(setTimeout( function() { history.replace('/posts') }, 700))
    }

   handleDeleteComment = () => {
     const cid = this.state.cid
     axios.delete('api/delete/comment', { data: { cid: cid }})
       .then(res => console.log(res))
       .catch(function (error) {
         console.log(error);
       })
       .then(setTimeout( function() { history.replace('/posts') }, 700))
   }

   RenderComments = (props) => (
      <div>
        <h3>{props.comment.comment}</h3>
        <small>{props.comment.date_created}</small>
        <p> By: {props.comment.author} </p>
        <button onClick={() => this.handleClickOpen(props.comment.cid, props.comment.comment) } > Edit </button>
      </div>
    );



render() {
  return (
  <div>
    <h1>Post</h1>
    <h4>{this.props.location.state.props.post.title}</h4>
    <p>{this.props.location.state.props.post.body}</p>
    <p> By: {this.props.location.state.props.post.author}</p>
    <br />
    <h1>Comments:</h1>
    { this.props.db_comments ?
      this.props.db_comments.map(comment =>
          <this.RenderComments key={comment.cid} cur_user_id={ 26 } comment={comment} />)
      : null
    }
    <br />
    <form onSubmit={this.handleSubmit}>
      <div>
      <TextField
        id="comment"
        label="Comment"
        margin="normal"
      />
      <br/>
        <Button variant="contained" color="primary" type="submit" >Submit</Button>
      </div>
    </form>
    <br />
    <button onClick={() => history.goBack()} > Cancel </button>
    <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Edit Comment </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <input type="text" value={this.state.comment} onChange={ this.handleCommentChange} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {this.handleUpdate(); this.setState({open: false})}} color="primary" autoFocus>
            Agree
          </Button>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleDeleteComment()} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  </div>
  )}
}


function mapStateToProps(state) {
  return {
      db_comments: state.posts_reducer.db_comments
  };
}

function mapDispatchToProps (dispatch) {
  return {
    post_comment_success: (comments) => dispatch(ACTIONS.get_db_post_comments(comments))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
