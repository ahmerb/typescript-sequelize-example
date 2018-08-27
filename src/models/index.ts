import Sequelize from 'sequelize';
import { DbInterface } from'typings/DbInterface';
import { UserFactory } from './User';
import { PostFactory } from './Post';
import { CommentFactory } from './Comment';

export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Comment: CommentFactory(sequelize, Sequelize),
    Post: PostFactory(sequelize, Sequelize),
    User: UserFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
