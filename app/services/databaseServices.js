const db = require("../database");
const { v4: uuidv4 } = require("uuid");

const create = ({ collection, filters, filter, data }) => {
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

  switch (collection) {
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

const read = ({ collection, filters, filter, documentId }) => {
  // operand1
  // for (const filter of filters) {

  // }
  console.log("Read");
  let result = null;

  const usersCollection = () => {
    console.log("usersCollection");
    const users = db.usersCollection;

    console.log("db.usersCollection : ", db.usersCollection);

    if (!users) return null;

    if (typeof documentId === "string") {
      result = users[documentId] ? users[documentId] : null;
    } else if (filter) {
      result = [];
      for (const key in users) {
        console.log("users[key] : ", users[key]);
        if (users[key][filter.operand] === filter.value) {
          result.push({
            ...users[key],
            documentId: key,
          });
        }
      }
    } else {
      result = null;
    }
  };

  const postsCollection = () => {
    console.log("postsCollection");
    const posts = { ...db.postsCollection };

    if (!posts) return null;

    if (typeof documentId === "string") {
      result = posts[documentId] ? posts[documentId] : null;
    } else if (filter) {
      result = [];
      for (const key in posts) {
        if (posts[key][filter.operand] === filter.value) {
          result.push({
            ...posts[key],
            documentId: key,
          });
        }
      }
    } else {
      result = null;
    }
  };

  switch (collection) {
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

const update = ({ collection, filters, filter, documentId, data }) => {
  let result = null;
  let _data = {
    updatedAt: +new Date(),
  };
  const usersCollection = () => {
    const users = { ...db.usersCollection };

    if (!users) return null;

    if (typeof documentId === "string") {
      _data = {
        ..._data,
        ...data,
      };
      db.usersCollection[documentId] = {
        ...db.usersCollection[documentId],
        ..._data,
      };
      result = {
        ..._data,
      };
    } else if (filter) {
      result = [];
      for (const key in users) {
        if (posts[key][filter.operand] === filter.value) {
          _data = {
            ...db.usersCollection[key],
            updatedAt: +new Date(),
            ...data,
          };
          db.usersCollection[key] = {
            ..._data,
          };
          result.push({
            ..._data,
            documentId: key,
          });
        }
      }
    } else {
      result = null;
    }
  };

  const postsCollection = () => {
    const posts = { ...db.postsCollection };

    if (!posts) return null;

    if (typeof documentId === "string") {
      _data = {
        ..._data,
        ...data,
      };
      db.postsCollection[documentId] = {
        ...db.postsCollection[documentId],
        ..._data,
      };
      result = {
        ..._data,
      };
    } else if (filter) {
      result = [];
      for (const key in posts) {
        if (posts[key][filter.operand] === filter.value) {
          _data = {
            ...db.postsCollection[key],
            updatedAt: +new Date(),
            ...data,
          };
          db.postsCollection[key] = {
            ..._data,
          };
          result.push({
            ..._data,
            documentId: key,
          });
        }
      }
    } else {
      result = null;
    }
  };

  switch (collection) {
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

  console.log("db.postsCollection : ", db.postsCollection);

  return result;
};

const deleteData = () => {};

// Not recommended this is for testing purpose
const clearUsersCollectionTest = () => {
  db.usersCollection = {};
};
const clearPostsCollectionTest = () => {
  db.postsCollection = {};
};
const clearFollowersCollectionTest = () => {
  db.followersCollection = {};
};

module.exports = {
  create: create,
  read: read,
  update: update,
  delete: deleteData,
  clearUsersCollectionTest: clearUsersCollectionTest,
  clearPostsCollectionTest: clearPostsCollectionTest,
  clearFollowersCollectionTest: clearFollowersCollectionTest,
};
