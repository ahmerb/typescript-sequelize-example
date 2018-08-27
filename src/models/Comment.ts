import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface CommentAttributes {
  id?: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
};

export const CommentFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<CommentInstance, CommentAttributes> => {
  const attributes: SequelizeAttributes<CommentAttributes> = {
    text: {
      type: DataTypes.STRING(1000)
    }
  };

  const Comment = sequelize.define<CommentInstance, CommentAttributes>("Comment", attributes);

  return Comment;
};
