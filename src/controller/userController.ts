

import { IUserRepo, UserRepository } from "../repository/userRepository";

export class UserController {
  private _userRepository: IUserRepo;

  constructor(user: IUserRepo) {

    this._userRepository = user;

  }

  static getUserInstance(): UserController {
    let userRepo = new UserRepository();
    return new UserController(userRepo);
  }
  createUser = async (req, res) => {
    try {
      let userObject = req.body;
      // let userObject = req.body;
      if (await this._userRepository.exists({
        user: userObject
      })) {
        return res.status(401).send("email already used")
      }
      await this._userRepository.createUser(userObject);

      return res.status(201).json({
        "status": "created"
      });
    } catch (error) {

      return res.status(404).send("failed");
    }
  };
  login = async (req, res) => {
    try {
      let userObject = req.body;
      // let userObject = req.body;
      let logged = await this._userRepository.login(userObject);

      return res.status(200).send(logged);
    } catch (error) {

      return res.status(404).send("failed");
    }
  }
  //Update not required at the moment so not written
  updateUser = async (req, res) => {
    try {
      let userObject = req.body;
      await this._userRepository.updateUser(userObject);
      return res.status(201).send("update Done");

    } catch (error) {
      return res.status(404).send("failed");

    }
  };

  getUser = async (req, res) => {
    try {
      let model = req.body;
      let userList = await this._userRepository.getUser(model);
      console.log(userList)
      res.status(200).send(userList);
    }
    catch (error) {
      return res.status(404).send("notFOund");
    }
  }

}
