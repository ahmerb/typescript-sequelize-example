import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface PostAttributes {
  id?: number;
  name: string;
  title: string;
  text: string;
  category: 'tech' | 'croissants' | 'techno';
  createdAt?: Date;
  updatedAt?: Date;
};

export interface PostInstance extends Sequelize.Instance<PostAttributes>, PostAttributes {
};

export const PostFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PostInstance, PostAttributes> => {
  const attributes: SequelizeAttributes<PostAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING(5000) // extra long length
    },
    category: {
      type: DataTypes.ENUM('tech', 'croissants', 'techno')
    }
  };

  const Post = sequelize.define<PostInstance, PostAttributes>("Post", attributes);

  return Post;
};
