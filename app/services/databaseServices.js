const db = require("../database");
const { v4: uuidv4 } = require("uuid");

const create = ({ collectionType, filters, filter, data }) => {
  const uid = uuidv4();
  let result = null;
  let _data = {
    createdAt: +new Date(),
    updatedAt: +new Date(),
  };
  const usersCollection = () => {
    _data = {
      ..._data,
      ...data,
      uid: uid,
    };
    db.usersCollection[uid] = {
      ..._data,
    };
    result = {
      ..._data,
    };
  };

  const postsCollection = () => {
    _data = {
      ..._data,
      ...data,
    };
    db.postsCollection[uid] = {
      ..._data,
    };
    result = {
      ..._data,
      documentId: uid,
    };
  };

  switch (collectionType) {
    case "USERS":
      usersCollection();
      break;
    case "POSTS":
      postsCollection();
      break;
    default: {
      throw "Please Proved Collection Type";
    }
  }

  console.log("postsCollection : ", db.postsCollection);

  return result;
};

const read = ({ collectionType, filters, filter }) => {
  // operand1
  // for (const filter of filters) {

  // }
  console.log("Read");
  let result = null;

  const usersCollection = () => {
    console.log("usersCollection");
    const users = { ...db.usersCollection };
    for (const key in users) {
      console.log("users[key] : ", users[key]);
      if (users[key][filter.operand] === filter.value) {
        result = {
          ...users[key],
        };
        break;
      }
    }
  };

  const postsCollection = () => {
    console.log("postsCollection");
    const posts = { ...db.postsCollection };

    for (const key in posts) {
      if (posts[key][filter.operand] === filter.value) {
        result = {
          ...posts[key],
        };
        break;
      }
    }
  };

  switch (collectionType) {
    case "USERS":
      usersCollection();
      break;
    case "POSTS":
      postsCollection();
      break;
    default: {
      throw "Please Proved Collection Type";
    }
  }

  return result;
};

const update = () => {};

const deleteData = () => {};

module.exports = {
  create: create,
  read: read,
  update: update,
  delete: deleteData,
};
