var express = require('express');
var request = require('request');
const pool = require('./db');

var router = express.Router();



/*
      POSTS ROUTES SECTION
*/

//Get all posts
router.get('/api/get/allposts', (req, res, next) => {
  pool.query("SELECT * FROM posts ORDER by date_created DESC", (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

//save posts to db
router.post('/api/post/poststodb', (req, res, next) => {
  const body_vector = String(req.body.body)
  const title_vector = String(req.body.title)
  const username_vector = String(req.body.username)

  const search_vector = [title_vector, body_vector, username_vector]
  const values = [req.body.title, req.body.body, search_vector, req.body.uid, req.body.username]
  pool.query('INSERT INTO posts(title, body, search_vector, user_id, author, date_created) VALUES($1, $2, to_tsvector($3), $4, $5, NOW())', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Edit posts
router.put('/api/put/post', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query('UPDATE posts SET title = $1, body = $2, user_id = $3, author= $5, date_created = NOW() WHERE pid = $4', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Delete Comments associated with Post
router.delete('/api/delete/postcomments', (req, res, next) => {
  post_id = req.body.post_id
  pool.query('DELETE FROM comments WHERE post_id = $1', [ post_id ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Then delete the post
router.delete('/api/delete/post', (req, res, next) => {
  post_id = req.body.post_id
  pool.query('DELETE FROM posts WHERE pid = $1', [ post_id ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Search Posts
router.get('/api/get/searchpost', (req, res, next) => {
  search_query = String(req.query.search_query)
  console.log(search_query)
  pool.query('SELECT * FROM posts WHERE search_vector @@ to_tsquery($1)', [ search_query ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});


/*
    Comments Routes Section
*/

//Post comment with user id and post id
router.post('/api/post/commenttodb', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
  pool.query('INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW())', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Edit comments
router.put('/api/put/commenttodb', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  pool.query('UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author=$4, date_created = NOW() WHERE cid = $5', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Delete comment
router.delete('/api/delete/comment', (req, res, next) => {
  cid = req.body.cid
  pool.query('DELETE FROM comments where cid = $1', [ cid ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Retreive all comments associated with a certain post
router.get('/api/get/allpostcomments', (req, res, next) => {
  const post_id = String(req.query.post_id)
  pool.query("SELECT * FROM comments WHERE post_id = $1", [ post_id ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});


/*
      USER PROFILE ROUTES SECTION
*/


/* Get all users  */
router.get('/api/get/allusers', (req, res, next) => {
  pool.query("SELECT * FROM users", (q_err, q_res) => {
    res.json(q_res.rows)
  });
});


/*
 Delete Users and all Accompanying Posts and Comments
*/

router.delete('/api/delete/usercomments', (req, res, next) => {
  uid = req.body.uid

  pool.query('DELETE FROM comments WHERE user_id = $1', [ uid ], (q_err, q_res) => {
    res.json(q_res);
  });
});

router.get('/api/get/user_postids', (req, res, next) => {
  const user_id = req.query.uid

  pool.query("SELECT pid FROM posts WHERE user_id = $1", [ user_id ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

router.delete('/api/delete/userpostcomments', (req, res, next) => {
  post_id = req.body.post_id

  pool.query('DELETE FROM comments WHERE post_id = $1', [ post_id ], (q_err, q_res) => {
    res.json(q_res);
  });
});

router.delete('/api/delete/userposts', (req, res, next) => {
  uid = req.body.uid
  pool.query('DELETE FROM posts WHERE user_id = $1', [ uid ], (q_err, q_res) => {
    res.json(q_res);
  });
});

router.delete('/api/delete/user', (req, res, next) => {
  uid = req.body.uid
  console.log(uid)
  pool.query('DELETE FROM users WHERE uid = $1', [ uid ], (q_err, q_res) => {
    res.json(q_res);
    console.log(q_err)
  });
});

/*
      DATE APPOINTMENTS

*/

router.post('/api/post/appointment', (req, res, next) => {
  const values = [req.body.title, req.body.start_time, req.body.end_time]
  pool.query('INSERT INTO appointments(title, start_time, end_time) VALUES($1, $2, $3 )', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});


router.get('/api/get/allappointments', (req, res, next) => {
  pool.query("SELECT * FROM appointments", (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

module.exports = router;
