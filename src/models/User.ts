import * as Sequelize from 'sequelize';
import { CommentAttributes, CommentInstance } from 'models/Comment';
import { PostAttributes, PostInstance } from 'models/Post';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface UserAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: CommentAttributes[] | CommentAttributes['id'][];
  posts?: PostAttributes[] | PostAttributes['id'][];
  upvotedComments?: CommentAttributes[] | CommentAttributes['id'][];
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getComments: Sequelize.HasManyGetAssociationsMixin<CommentInstance>;
  setComments: Sequelize.HasManySetAssociationsMixin<CommentInstance, CommentInstance['id']>;
  addComments: Sequelize.HasManyAddAssociationsMixin<CommentInstance, CommentInstance['id']>;
  addComment: Sequelize.HasManyAddAssociationMixin<CommentInstance, CommentInstance['id']>;
  createComment: Sequelize.HasManyCreateAssociationMixin<CommentAttributes, CommentInstance>;
  removeComment: Sequelize.HasManyRemoveAssociationMixin<CommentInstance, CommentInstance['id']>;
  removeComments: Sequelize.HasManyRemoveAssociationsMixin<CommentInstance, CommentInstance['id']>;
  hasComment: Sequelize.HasManyHasAssociationMixin<CommentInstance, CommentInstance['id']>;
  hasComments: Sequelize.HasManyHasAssociationsMixin<CommentInstance, CommentInstance['id']>;
  countComments: Sequelize.HasManyCountAssociationsMixin;

  getPosts: Sequelize.HasManyGetAssociationsMixin<PostInstance>;
  setPosts: Sequelize.HasManySetAssociationsMixin<PostInstance, PostInstance['id']>;
  addPosts: Sequelize.HasManyAddAssociationsMixin<PostInstance, PostInstance['id']>;
  addPost: Sequelize.HasManyAddAssociationMixin<PostInstance, PostInstance['id']>;
  createPost: Sequelize.HasManyCreateAssociationMixin<PostAttributes, PostInstance>;
  removePost: Sequelize.HasManyRemoveAssociationMixin<PostInstance, PostInstance['id']>;
  removePosts: Sequelize.HasManyRemoveAssociationsMixin<PostInstance, PostInstance['id']>;
  hasPost: Sequelize.HasManyHasAssociationMixin<PostInstance, PostInstance['id']>;
  hasPosts: Sequelize.HasManyHasAssociationsMixin<PostInstance, PostInstance['id']>;
  countPosts: Sequelize.HasManyCountAssociationsMixin;

  getUpvotedComments: Sequelize.BelongsToManyGetAssociationsMixin<CommentInstance>;
  setUpvotedComments: Sequelize.BelongsToManySetAssociationsMixin<CommentInstance, CommentInstance['id'], 'PostUpvotes'>;
  addUpvotedComments: Sequelize.BelongsToManyAddAssociationsMixin<CommentInstance, CommentInstance['id'], 'PostUpvotes'>;
  addUpvotedComment: Sequelize.BelongsToManyAddAssociationMixin<CommentInstance, CommentInstance['id'], 'PostUpvotes'>;
  createUpvotedComment: Sequelize.BelongsToManyCreateAssociationMixin<CommentAttributes, CommentInstance['id'], 'PostUpvotes'>;
  removeUpvotedComment: Sequelize.BelongsToManyRemoveAssociationMixin<CommentInstance, CommentInstance['id']>;
  removeUpvotedComments: Sequelize.BelongsToManyRemoveAssociationsMixin<CommentInstance, CommentInstance['id']>;
  hasUpvotedComment: Sequelize.BelongsToManyHasAssociationMixin<CommentInstance, CommentInstance['id']>;
  hasUpvotedComments: Sequelize.BelongsToManyHasAssociationsMixin<CommentInstance, CommentInstance['id']>;
  countUpvotedComments: Sequelize.BelongsToManyCountAssociationsMixin;
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasMany(models.Comment, { foreignKey: 'AuthorId', as: 'comments' });
    User.hasMany(models.Post, { foreignKey: 'AuthorId', as: 'posts' });
    User.belongsToMany(models.Comment, {
      through: 'PostUpvotes',
      as: 'upvotedComments'
    });
  };

  return User;
};
