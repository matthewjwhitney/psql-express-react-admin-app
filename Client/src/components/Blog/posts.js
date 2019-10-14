import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ACTIONS from '../../store/actions/actions';
import axios from '../../utils/axios_instance';
import history from '../../utils/history';

import Button from '@material-ui/core/Button';

import '../../App.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Posts extends Component {
  componentDidMount() {
    axios.get('api/get/allposts')
    .then(res => this.props.posts_success(res.data))
    .catch(function (error) {
        console.log(error);
      });
   }

   state = {
     open: false,
     post_id: null
   }

   handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false, post_id: null });
    };

    handleChange = (event) => {
      event.preventDefault()
      const search_query = event.target.value
      axios.get('api/get/searchpost', {params: {search_query: search_query} })
      .then(res => this.props.search_posts_success(res.data))
      .catch(function (error) {
        console.log(error);
      })
    }

    DeletePost = () => {
      const post_id = this.state.post_id
      axios.delete('api/delete/postcomments', { data: { post_id: post_id }})
      .then(() =>{ axios.delete('api/delete/post', { data: { post_id: post_id }})
         .then(res => console.log(res))  })
      .catch(function (error) {
          console.log(error);
        })
      .then(() => this.handleClose())
      .then(() => setTimeout( function() { history.replace('/') }, 700))
    }


  RenderPosts = (props) => (
     <TableRow>
         <TableCell><Link to={{pathname:"/post/" + props.post.pid, state:{props} }}><h4> { props.post.title }</h4></Link>
           <p> { props.post.body } </p>
           <small> { props.post.date_created } </small>
           <p> By: { props.post.author} </p>
           <button><Link to={{pathname:"/editpost/" + props.post.pid, state:{props} }}>Edit</Link></button>
           <button onClick={() => this.setState({open: true, post_id: props.post.pid})}>Delete</button>
         <br/>
      </TableCell>
     </TableRow>
   )



render() {
 return (
  <div>
  <div className="FlexRowAddPost">
    <br />
    <Link to="/newpost">
      <Button variant="contained" color="primary">
        Add Post
      </Button>
    </Link>
    </div>

    <div className="FlexRow">
      <TextField
        id="search"
        label="Search"
        margin="normal"
        onChange={this.handleChange}
      />
    </div>

    <div className='FlexRow'>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell> <strong> Search Results </strong> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
           { this.props.db_search_posts  ?
             this.props.db_search_posts.map(post =>
             <this.RenderPosts key={ post.pid } post={post} />)
           : null
           }
        </TableBody>
      </Table>
     <br />
    </div>

    <br />
    <hr className="style-one" />
    <h1>All Posts</h1>
    <div className="FlexRow">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell> Posts </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
           { this.props.dbposts ?
             this.props.dbposts.map(post =>
             <this.RenderPosts key={ post.pid } post={post} />)
           : null
           }
        </TableBody>
      </Table>
    </div>

    <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleteing Post
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.DeletePost()} color="primary" autoFocus>
            Agree
          </Button>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
   </div>
    )
  }
}


function mapStateToProps(state) {
  return {
      dbposts: state.posts_reducer.db_posts,
      db_search_posts: state.posts_reducer.db_search_posts
  };
}

function mapDispatchToProps (dispatch) {
  return {
    posts_success: (posts) => dispatch(ACTIONS.get_db_posts(posts)),
    search_posts_success: (posts) => dispatch(ACTIONS.get_search_posts(posts)),
    remove_search_posts: () => dispatch(ACTIONS.remove_search_posts())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
