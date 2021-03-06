import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BoardService {
  async getAll(userEmail) {
    return await dbContext.Boards.find({ collaborators: userEmail }).populate(
      "creator",
      "name picture"
    );
  }

  async getById(id, userEmail) {
    let data = await dbContext.Boards.findOne({
      _id: id,
      collaborators: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async checkForCollaboration(id, userEmail) {
    let data = await dbContext.Boards.findOne({
      _id: id,
      collaborators: userEmail,
    });
    if (!data) {
      throw new BadRequest(
        "Invalid ID or you are not a collaborator on this board"
      );
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Boards.create(rawData);
    return data;
  }

  async edit(id, userEmail, body) {
    console.log("service" + body.email);

    let data = await dbContext.Boards.findOneAndUpdate(
      { _id: id, collaborators: userEmail },
      body,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async addCollaborator(id, userEmail, body) {
    console.log("add colab", body);
    return await dbContext.Boards.findOneAndUpdate(
      { _id: id },
      { $addToSet: { collaborators: body.eMail } },
      { new: true }
    );
  }

  async delete(id, userEmail) {
    let data = await dbContext.Boards.findOneAndRemove({
      _id: id,
      collaborators: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
}

export const boardService = new BoardService();
