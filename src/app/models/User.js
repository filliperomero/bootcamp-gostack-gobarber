import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // Passe no objeto apenas as colunas que o usuário vai informar de informacao,
    // colunas que tem seu conteudo colocado automaticamente no banco nao precisa estar aqui.
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Campo que nunca irá existir no banco de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // 'beforeSave' will be executed before any changes on the database
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 12);
      }
    });

    return this;
  }
}

export default User;
