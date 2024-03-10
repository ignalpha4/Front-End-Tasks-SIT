CREATE DATABASE Assign_3_Shubham_Bankar;

USE Assign_3_Shubham_Bankar;

CREATE TABLE actor(
act_id INT PRIMARY KEY IDENTITY(1,1),
act_fname VARCHAR(30),
act_lname VARCHAR(30),
act_gender CHAR(6));

CREATE TABLE genre(
gen_id INT PRIMARY KEY IDENTITY(1,1),
gen_title VARCHAR(50));

CREATE TABLE director(
dir_id INT PRIMARY KEY IDENTITY(1,1),
dir_fname VARCHAR(30),
dir_lname VARCHAR(30));

CREATE TABLE movie(
mov_id INT PRIMARY KEY IDENTITY(1,1),
mov_title VARCHAR(50),
mov_year INT,
mov_time INT,
mov_lang VARCHAR(30),
mov_dt_rel DATE,
mov_release_country VARCHAR(50));


CREATE TABLE movie_genres(
mov_id INT,
gen_id INT,
PRIMARY KEY (mov_id, gen_id),
FOREIGN KEY (mov_id) REFERENCES movie(mov_id),
FOREIGN KEY (gen_id) REFERENCES genre(gen_id));

CREATE TABLE movie_direction(
dir_id INT,
mov_id INT,
PRIMARY KEY (dir_id, mov_id),
FOREIGN KEY (dir_id) REFERENCES director(dir_id),
FOREIGN KEY (mov_id) REFERENCES movie(mov_id));

CREATE TABLE reviewer(
rev_id INT PRIMARY KEY IDENTITY(1,1),
rev_name VARCHAR(50));

CREATE TABLE rating(
mov_id INT,
rev_id INT,
rev_stars INT,
num_o_rating INT,
PRIMARY KEY (mov_id, rev_id),
FOREIGN KEY (mov_id) REFERENCES movie(mov_id),
FOREIGN KEY (rev_id) REFERENCES reviewer(rev_id));


CREATE TABLE movie_cast(
act_id INT,
mov_id INT,
role VARCHAR(50),
PRIMARY KEY (act_id, mov_id),
FOREIGN KEY (act_id) REFERENCES actor(act_id),
FOREIGN KEY (mov_id) REFERENCES movie(mov_id));


INSERT INTO actor (act_fname, act_lname, act_gender) VALUES
('Jonny', 'Depp', 'Male'),
('Amir', 'Khan', 'Male'),
('Akshay', 'Kumar', 'Male'),
('Vicky', 'Kaushal', 'Male'),
('Robert', 'Downey Jr', 'Male'),
('Emma', 'Watson', 'Female'),
('Carly', 'Chaikin', 'Female'),
('Daniel', 'Radcliff', 'Male');

INSERT INTO genre (gen_title) VALUES
('Action'),
('Horror'),
('Thriller'),
('Drama'),
('Comedy'),
('Romance');

INSERT INTO director (dir_fname, dir_lname) VALUES
('Christopher', 'Nolan'),
('Raja', 'Mouli'),
('Karan', 'Jouhar'),
('David', 'Fincher'),
('James', 'Cameron'),
('Spike', 'Lee');

INSERT INTO movie (mov_title, mov_year, mov_time, mov_lang, mov_dt_rel, mov_release_country) VALUES
('Lord of the Rings', 2003, 150, 'English', '2003-11-26', 'USA'),
('Avengers', 2012, 180, 'English', '2012-4-11', 'USA'),
('Avatar', 2000, 210, 'English', '2002-04-15', 'USA'),
('Shutter Island', 2006, 116, 'English', '2006-10-09', 'India'),
('Pardes',1997,140,'Hindi','1997-05-20','India'),
('RRR', 2019, 180, 'Hindi', '2019-12-10', 'India');

INSERT INTO movie_genres (mov_id, gen_id) VALUES
(1, 4), -- Lord of the Rings (Drama)
(2, 1), -- Avengers (Action)
(3, 1), -- Avatar (Action)
(4, 3), -- Shutter Island (Thriller)
(5, 4); -- RRR (Drama)

INSERT INTO movie_direction (dir_id, mov_id) VALUES
(1, 1), 
(5, 2), 
(5, 3), 
(4, 4), 
(2, 5);

INSERT INTO movie_cast (act_id, mov_id, role) VALUES
(1, 1, 'Jack Sparrow'), 
(5, 2, 'Tony Stark'), 
(7, 4, 'Alice'), 
(2, 5, 'Lead role');

INSERT INTO reviewer(rev_name) VALUES
('Emily Johnson'),
('Michael Davis'),
('Sophia Lee'),
('William Taylor');

INSERT INTO rating (mov_id, rev_id, rev_stars, num_o_rating) VALUES
(1, 1, 4, 90),   
(1, 3, 5, 120),  
(2, 2, 9, 80),  
(3, 4, 5, 100),  
(4, 3, 3, 70),   
(5, 1, 5, 110); 




SELECT * FROM actor;
SELECT * FROM genre;
SELECT * FROM director;
SELECT * FROM movie;
SELECT * FROM movie_genres;
SELECT * FROM movie_direction;
SELECT * FROM reviewer;
SELECT * FROM rating;
SELECT * FROM movie_cast;


/*1) From the following table, write a SQL query to find the name and year of the movies. 
Return movie title, movie release year*/

SELECT * FROM movie;

SELECT mov_title,mov_year FROM movie;

/*2. From the following table, write a SQL query to find when the movie specific released. 
Return movie release year*/

SELECT * FROM movie;

SELECT mov_year FROM movie
Where mov_title='Avengers';

/*3.From the following table, write a SQL query to find the movie that was released in 1999. 
Return movie title.*/

SELECT * FROM movie;

SELECT mov_title FROM movie
WHERE mov_year='1999';


/*4. From the following table, write a SQL query to find those movies,
which were released before 1998. Return movie title.*/

SELECT * FROM movie;
SELECT mov_title FROM movie
WHERE mov_year<1998;

/*5. From the following tables, 
write a SQL query to find the name of all reviewers and movies together in a single list*/

SELECT * FROM reviewer;
SELECT * FROM movie;

SELECT rev_name FROM reviewer
UNION
SELECT mov_title FROm movie;


/*6. From the following table, write a SQL query to find all reviewers who have rated seven or more stars to their rating. 
Return reviewer name.*/


SELECT * FROM reviewer;
SELECT * FROm rating;

SELECT rev.rev_name
FROM reviewer AS rev 
JOIN rating AS rat ON rev.rev_id = rat.rev_id
WHERE rat.rev_stars >= 7;

/*7. From the following tables, write a SQL query to find the movies without any rating. 
Return movie title.*/

SELECT * FROM movie;
SELECT * FROM rating;

SELECT mov.mov_title,rat.rev_stars
FROM movie AS mov LEFT JOIN  rating AS rat
ON
mov.mov_id=rat.mov_id
WHERE rat.rev_stars IS NULL;

/*8. From the following table, write a SQL query to find the movies with ID 1 or 4 or 6. 
Return movie title.*/

SELECT * FROM movie;

SELECT mov_id,mov_title FROM movie WHERE mov_id IN(1,4,6);

/*
9. From the following table, write a SQL query to find the movie titles that contain the specific word. 
Sort the result-set in ascending order by movie year. Return movie ID, movie title and movie release year. */

SELECT * FROM movie;

SELECT mov_id,mov_title,mov_year FROM movie WHERE mov_title LIKE '%Av%' 
ORDER BY mov_year;

/*10. From the following table, write a SQL query to find those actors with the first name 'Woody'
and the last name 'Allen'. Return actor ID*/

SELECT * FROM actor;

INSERT INTO actor VALUES('Woody','Allen','Male');

SELECT act_id, act_fname+act_lname AS actor_name FROM actor
WHERE act_fname='Woody' AND act_lname='Allen';

/*11. get directors who have directed movies with avrage rating higher then 5*/

SELECT * FROM movie_direction;
SELECT * FROM rating;

SELECT d.dir_id,r.rev_stars FROM movie_direction AS d 
INNER JOIN rating AS r
ON
d.mov_id=r.mov_id
WHERE r.rev_stars>5;

/*12. get all actors who have worked for movies that were directed by specific director*/

SELECT * FROM movie_cast;
SELECT * FROM movie_direction;


SELECT d.dir_id,a.act_id FROM
movie_cast AS a INNER JOIN movie_direction AS d
ON
a.mov_id=d.mov_id
WHERE d.dir_id=4














