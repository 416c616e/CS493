DROP TABLE IF EXISTS photos;
CREATE TABLE photos(
   id         INTEGER  NOT NULL PRIMARY KEY AUTO_INCREMENT
  ,userID     INTEGER  NOT NULL
  ,businessID INTEGER  NOT NULL
  ,caption    VARCHAR(255)
  ,data       VARCHAR(255) NOT NULL
);
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (0,7,8,'This is my dinner.','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (1,25,2,'','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (2,26,1,'Hops','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (3,21,14,'','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (4,28,18,'Sticky Hands','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (5,21,9,'Popcorn!','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (6,26,8,'','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (7,25,18,'Big fermentor','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (8,20,2,'','010010101110101010110');
INSERT INTO photos(id,userID,businessID,caption,data) VALUES (9,6,15,'Cake!','010010101110101010110');
