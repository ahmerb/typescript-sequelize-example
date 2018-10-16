import express from 'express';
import Sequelize from 'sequelize';
import { Request, Response } from 'express';
import { createModels } from './models';
import { CommentInstance } from 'models/Comment';
import { PostInstance } from 'models/Post';
import { UserInstance } from 'models/User';

const Op = Sequelize.Op;

const app: express.Application = express();

const sequelizeConfig = require('./config/sequelizeConfig.json');
const db = createModels(sequelizeConfig);
db.sequelize.sync();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello, world' });
});

app.get('/users', (req: Request, res: Response) => {
  db.User.findAll()
    .then((users: UserInstance[]) => res.status(200).json({ users }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/comments', (req: Request, res: Response) => {
  db.Comment.findAll()
    .then((comments: CommentInstance[]) => res.status(200).json({ comments }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/posts', (req: Request, res: Response) => {
  db.Post.findAll()
    .then((posts: PostInstance[]) => res.status(200).json({ posts }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

// GET all users that upvoted a comment
app.get('/comments/:id/upvoters', (req: Request, res: Response) => {
  db.Comment.findById(req.params.id)
    .then(comment => comment.getUpvoters())
    .then(upvoters =>
      res.status(200).json({
        user_ids: upvoters.map(user => user.id)
      })
    )
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

// GET all posts a user has authored
app.get('/users/:id/posts', (req: Request, res: Response) => {
  db.User.findById(req.params.id)
    .then(user => user.getPosts())
    .then(posts => 
      res.status(200).json({ posts })
    )
    .catch(err => res.status(500).json({ err: ['oops', err] }))
});

// POST create new dummy user with posts
app.post('/seed/user', (req: Request, res: Response) => {
  db.User.create({
    name: 'John Doe',
    posts: [
      {
        name: 'post1',
        title: 'Croissants are tasty',
        text: 'I recently ate a croissant from France. It was nice.',
        category: 'croissants'
      },
      {
        name: 'post2',
        title: 'my fav techno music',
        text: 'I love the song TECHNO by TechnoGang.',
        category: 'techno'
      }
    ]
  },
  { 
    include: [{ model: db.Post, as: 'posts' }]
  })
    .then(user => res.status(201).json({ user }))
    .catch(err => res.status(500).json({ err: ['oops', err] }))
});

// POST create new dummy upvotes for comment
// also, use async/await syntax here, just to demonstrate you can do it in typescript
app.post('/seed/user/:user_id/upvotes', async (req: Request, res: Response) => {
  try {
    const user = await db.User.findById(req.params.user_id);
    const comment = await user.createComment({
      text: 'this comment is cool.'
    });
    await user.addUpvotedComment(comment.id);
    res.status(201).json({ comment });
  } catch (err) {
    res.status(500).json({ err: ['oops', err] });
  }
});

// POST add upvoter
app.post('/comment/:comment_id/upvoter/:upvoter_id', (req: Request, res: Response) => {
  db.Comment.findById(req.params.comment_id)
    .then(comment => comment.addUpvoter(req.params.upvoter_id))
    .catch(err => res.status(500).json({ err: ['oops', err] }))
});

// GET all upvoted comments for specified users (using eager loading)
// userIds go in query params, e.g. /upvoted_comments?userIds=[1,2,3]
app.get('/upvoted_comments', (req: Request, res: Response) =>  {
  console.log(req.query.userIds);
  const userIds = JSON.parse(req.query.userIds);
  db.User.findAll({
    where: { id: { [Op.in]: userIds } },
    include: [{ model: db.Comment, as: 'upvotedComments' }]
  })
    .then(users => {
      const flatten = (flattened: CommentInstance[], next: CommentInstance[]) => ([
        ...flattened,
        ...next
      ]);
      const comments = users.map(user => user.upvotedComments)
        .reduce(flatten, []);
      res.status(200).json({ upvotedComments: comments });
    })
    .catch(err => res.status(500).json({ err: ['oops', err] }))
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
