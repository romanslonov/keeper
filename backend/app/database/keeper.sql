DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users (id, email, name, password, createdAt)
VALUES
	(1,'admin@keeper.com','Sudo','$2a$10$NO3al1pFDDQOGXPSHomnkumxx.7QV8SpzpWJu0a1L2sjeQ9d5XFo2', '1970-01-01 00:00:01');

CREATE TABLE boards (
  id int(11) NOT NULL AUTO_INCREMENT,
  ownerId int(11) NOT NULL,
  name varchar(255) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (ownerId) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO boards (id, ownerId, name, createdAt)
VALUES
	(1, 1, 'Default', '1970-01-01 00:00:01');


CREATE TABLE usersBoards (
  userId int(11) NOT NULL,
  boardId int(11) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (boardId) REFERENCES boards(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO usersBoards (userId, boardId)
VALUES 
  (1, 1);
  
CREATE TABLE files (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId int(11) NOT NULL,
  boardId int(11) NOT NULL,
  name varchar(255) NOT NULL,
  bucket varchar(255) NOT NULL,
  etag varchar(255) NOT NULL,
  size varchar(255) NOT NULL,
  mimeType varchar(255) NOT NULL,
  url varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  uploadedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (boardId) REFERENCES boards(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
