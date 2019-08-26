import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // Must put 'as' so when you send the data, the name doesn`t come with 'File'
      // Important: The model 'User' must have the 'as' defined too.
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
