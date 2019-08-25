import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // Passe no objeto apenas as colunas que o usuário vai informar de informacao,
    // colunas que tem seu conteudo colocado automaticamente no banco nao precisa estar aqui.
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
