DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
   id         INTEGER  NOT NULL PRIMARY KEY AUTO_INCREMENT
  ,userID     INTEGER  NOT NULL
  ,businessID INTEGER  NOT NULL
  ,dollars    INTEGER  NOT NULL
  ,stars      INTEGER  NOT NULL
  ,review     VARCHAR(255)
  ,UNIQUE KEY (userID, businessID)
);
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (0,7,8,1,4.5,'Cheap, delicious food.');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (1,25,2,1,4,'How many fasteners can one room hold?');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (2,26,1,1,5,'Joel, the owner, is super friendly and helpful.');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (3,21,14,2,4,'');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (4,28,18,1,4,'Good beer, good food, though limited selection.');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (5,21,9,1,5,'A Corvallis gem.');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (6,26,8,1,5,'Yummmmmmm!');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (7,25,18,2,4.5,'');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (8,20,2,2,4,'');
INSERT INTO reviews(id,userID,businessID,dollars,stars,review) VALUES (9,6,15,2,5,'Try the hazlenut torte.  It''s the best!');
