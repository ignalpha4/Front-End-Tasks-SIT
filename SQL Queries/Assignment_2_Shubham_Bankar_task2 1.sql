CREATE DATABASE Assign_3_Shubham_Bankar;

USE Assign_3_Shubham_Bankar;



--ALTER DATABASE Assign_3_Shubham_Bankar SET MULTI_USER

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

SELECT * FROM rating;

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
('Daniel', 'Radcliff', 'Male'),
('Woody','Allen','Male');



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
('Lord of the Rings', 1999, 150, 'English', '1999-11-26', 'USA'),
('Avengers', 2012, 180, 'English', '2012-4-11', 'USA'),
('Avatar', 2000, 210, 'English', '2002-04-15', 'USA'),
('Shutter Island', 2006, 116, 'English', '2006-10-09', 'India'),
('Pardes',1997,140,'Hindi','1997-05-20','India'),
('RRR', 2023, 180, 'Hindi', '2023-10-15', 'India'),
('Avatar 2',2023,200,'English','2023-12-20','USA'),
('MI6',2012,300,'English','2012-12-12','USA');


INSERT INTO movie_genres (mov_id, gen_id) VALUES
(1,4), 
(2,1), 
(3,1), 
(4,3), 
(5,4),
(8,1);



INSERT INTO movie_direction (dir_id, mov_id) VALUES
(1,1), 
(5,2), 
(5,3), 
(4,4), 
(2,5),
(5,7);

INSERT INTO movie_cast (act_id, mov_id, role) VALUES
(1,1,'Jack Sparrow'), 
(5,2,'Tony Stark'), 
(7,4,'Alice'), 
(2,5,'Lead role'),
(6,2,'black widow');

INSERT INTO reviewer(rev_name) VALUES
('Emily Johnson'),
('Michael Davis'),
('Sophia Lee'),
('William Taylor');



INSERT INTO rating (mov_id, rev_id, rev_stars, num_o_rating) VALUES
(1,1,4,90),   
(2,2,9,80),  
(3,4,5,100),  
(4,3,3,70),   
(5,1,5,110),
(6,3,8,130),
(8,4,7,150);





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
WHERE mov_year=1999;


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
UNION ALL
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

SELECT mov_id,mov_title,mov_year FROM movie WHERE mov_title LIKE '%Avatar%' 
ORDER BY mov_year;

/*10. From the following table, write a SQL query to find those actors with the first name 'Woody'
and the last name 'Allen'. Return actor ID*/

SELECT * FROM actor;


SELECT act_id, act_fname+act_lname AS actor_name FROM actor
WHERE act_fname='Woody' AND act_lname='Allen';

/*11. get directors who have directed movies with average rating higher then 5*/

SELECT * FROM movie_direction;
SELECT * FROM rating;
SELECT * FROM director;


SELECT d.dir_fname + ' ' + d.dir_lname AS director_name, AVG(r.rev_stars) AS avg_rating
FROM movie_direction AS md 
INNER JOIN rating AS r ON md.mov_id = r.mov_id 
INNER JOIN director AS d ON d.dir_id = md.dir_id
GROUP BY md.dir_id,d.dir_fname,d.dir_lname
HAVING AVG(r.rev_stars) > 5;



/*12. get all actors who have worked for movies that were directed by specific director*/

SELECT * FROM movie_cast;
SELECT * FROM movie_direction;
SELECT * FROM director;
SELECT * FROM actor;
SELECT * FROM movie_cast;


SELECT d.dir_fname+' '+d.dir_lname AS director_name,a.act_fname + ' ' + a.act_lname AS actor_name
FROM movie_cast AS mc 
INNER JOIN movie_direction AS md ON mc.mov_id=md.mov_id
INNER JOIN director AS d ON md.dir_id=d.dir_id
INNER JOIN actor AS a ON mc.act_id=a.act_id
WHERE md.dir_id=4


/*13. create a stored proc to get list of movies which is 3 years old and having rating greater than 5*/

SELECT * FROM movie;
SELECT * FROM rating;

SELECT m.mov_title,m.mov_year,r.rev_stars FROM movie AS m INNER JOIN rating AS r
ON
m.mov_id=r.mov_id
WHERE m.mov_year>2021 AND r.rev_stars>5;




/*14. create a stored proc to get list of all directors who have directed more then 2 movies*/

SELECT * FROM director;

SELECT * FROM movie;

SELECT * FROM movie_direction

SELECT d.dir_fname+' '+d.dir_lname AS director_name,count(md.mov_id) AS number_of_movies FROM movie_direction  AS md
INNER JOIN director AS d ON md.dir_id=d.dir_id
GROUP BY d.dir_id,d.dir_fname,d.dir_lname
HAVING count(mov_id)>2;


/*15. create a stored proc to get list of all directors which have directed a movie which have rating greater than 3.*/


SELECT * FROM movie_direction;
SELECT * FROM rating;
SELECT * FROM director;

SELECT d.dir_fname+' '+d.dir_lname AS director_name ,r.mov_id,r.rev_stars FROM  movie_direction AS md 
INNER JOIN rating As r ON md.mov_id =r.mov_id
INNER JOIN director As d ON d.dir_id=md.dir_id
WHERE r.rev_stars>3;


/*16. create a function to get worst director according to movie rating*/
SELECT * FROM movie_direction;
SELECT * FROM rating;
SELECT * FROM director;

SELECT TOP 1 d.dir_fname+' '+d.dir_lname AS director_name ,r.mov_id,r.rev_stars FROM  movie_direction AS md 
INNER JOIN rating As r ON md.mov_id =r.mov_id
INNER JOIN director As d ON d.dir_id=md.dir_id
ORDER BY r.rev_stars;



/*17.  create a function to get worst actor according to movie rating*/

SELECT * FROM movie_cast;
SELECT * FROM rating;
SELECT * FROM actor;

SELECT TOP 1 a.act_fname+' '+a.act_lname AS actor_name FROM actor As a
INNER JOIN movie_cast AS mc ON mc.act_id=a.act_id
INNER JOIN rating AS r ON r.mov_id=mc.mov_id
ORDER BY r.rev_stars;

/*Another way*/
SELECT TOP 1 a.act_fname+' '+a.act_lname AS actor_name,min(r.rev_stars) AS ratings FROM actor AS a
INNER JOIN movie_cast AS mc ON mc.act_id=a.act_id
INNER JOIN rating As r ON r.mov_id=mc.mov_id
GROUP BY a.act_fname,a.act_lname;

/*18. create a parameterized stored procedure which accept genre and give movie accordingly */

SELECT * FROM movie_genres
SELECT * FROM genre
SELECT * FROM movie

SELECT m.mov_title FROM movie AS m INNER JOIN movie_genres AS mg ON mg.mov_id=m.mov_id
INNER JOIN genre AS g ON g.gen_id=mg.gen_id 
WHERE g.gen_title='Thriller'

/*19. get list of movies that start with 'a' and end with letter 'e'(s) and movie released before 2015*/

SELECT * FROM movie;

SELECT mov_title,mov_year FROM  movie
WHERE mov_title LIKE 'a%s' AND mov_year<2015;

/*20. get a movie with highest movie cast*/

SELECT * FROM movie_cast
SELECT * FROM movie;


SELECT  TOP 1 m.mov_title, COUNT(mc.mov_id) AS cast_count
FROM movie m
INNER JOIN movie_cast mc ON m.mov_id = mc.mov_id
GROUP BY m.mov_title
ORDER BY cast_count DESC;

/*21.create a function to get reviewer that has rated highest number of movies*/

SELECT * FROM rating;
SELECT * FROM reviewer;

SELECT TOP 1 rev.rev_name,count(r.rev_id) AS number_of_movies_rated FROM reviewer AS rev
INNER JOIN rating AS r ON rev.rev_id=r.rev_id
GROUP BY rev.rev_name
ORDER BY number_of_movies_rated DESC;


/*22. From the following tables, write a query in SQL to generate a report, which contain the fields movie title, 
name of the female actor, year of the movie, role, movie genres, the director, date of release, and rating of that movie.*/
SELECT * FROM actor;
SELECT * FROM genre;
SELECT * FROM director;
SELECT * FROM movie;
SELECT * FROM movie_genres;
SELECT * FROM movie_direction;
SELECT * FROM rating;
SELECT * FROM movie_cast;

SELECT m.mov_title,a.act_fname+a.act_lname AS actor_name,m.mov_year,g.gen_title,d.dir_fname+d.dir_lname AS director_name,
m.mov_dt_rel,r.rev_stars 
FROM movie AS m 
INNER JOIN movie_genres AS mg ON m.mov_id=mg.mov_id
INNER JOIN movie_direction AS md ON mg.mov_id=md.mov_id
INNER JOIN rating AS r ON md.mov_id=r.mov_id
INNER JOIN movie_cast AS mc ON r.mov_id=mc.mov_id
INNER JOIN actor AS a ON mc.act_id=a.act_id
INNER JOIN genre AS g ON mg.gen_id=g.gen_id
INNER JOIN director as d ON md.dir_id=d.dir_id
WHERE a.act_gender='Female'


/*23. From the following tables, write a SQL query to find the years when most of the ‘Mystery Movies’ produced.
Count the number of generic title and compute their average rating. Group the result set on movie release year, generic title. 
Return movie year, generic title, number of generic title and average rating.*/

SELECT * FROM genre;
SELECT * FROM movie_genres;
SELECT * FROM movie;
SELECT * FROM rating;

SELECT TOP 1 m.mov_year,g.gen_title,count(g.gen_title) AS number_of_gen_titles,avg(r.rev_stars) AS avg_rating FROM genre AS g 
INNER JOIN movie_genres AS mg ON mg.gen_id=g.gen_id
INNER JOIN movie AS m ON m.mov_id=mg.mov_id
INNER JOIN rating AS r ON r.mov_id=m.mov_id
GROUP BY m.mov_year,g.gen_title
HAVING g.gen_title='Action'
ORDER BY number_of_gen_titles DESC;



/*24.  From the following tables, write a SQL query to find the highest-rated ‘Action Movies’.
Return the title, year, and rating*/


SELECT * FROM movie
SELECT * FROM movie_genres;
SELECT * FROm genre
SELECT * FROM rating;

SELECT TOP 1 m.mov_title,m.mov_year,r.rev_stars FROM movie AS m
INNER JOIN movie_genres AS mg ON m.mov_id=mg.mov_id
INNER JOIN genre AS g ON mg.gen_id=g.gen_id
INNER JOIN rating AS r ON m.mov_id=r.mov_id
WHERE g.gen_title='Action'
ORDER BY r.rev_stars DESC;



/*25. create a function which accepts genre and suggests best movie according to ratings */

SELECT TOP 1 m.mov_title, r.rev_stars AS max_rating
FROM movie AS m
INNER JOIN movie_genres AS mg ON m.mov_id = mg.mov_id
INNER JOIN genre AS g ON mg.gen_id = g.gen_id
INNER JOIN rating AS r ON m.mov_id = r.mov_id
WHERE g.gen_title = 'Action'
ORDER BY r.rev_stars DESC

/*26. create a function which accepts genre and suggests best director according to ratings. */

SELECT * FROM director;
SELECT * FROM movie_direction;
SELECT * FROM rating
SELECT * FROM genre
SELECT * FROM movie_genres

SELECT TOP 1 d.dir_fname+d.dir_lname AS best_director FROM director As d
INNER JOIN movie_direction AS md On md.dir_id=d.dir_id
INNER JOIN rating As r ON r.mov_id=md.mov_id
INNER JOIN movie_genres AS mg ON mg.mov_id=r.mov_id
INNER JOIN genre AS g ON g.gen_id=mg.gen_id
WHERE g.gen_title='Thriller'
ORDER BY r.rev_stars DESC


/*27. create a function that accepts a genre and give random movie according to genre*/
SELECT * FROm movie;
SELECT * FROM movie_genres
SELECT * FROM genre

SELECT TOP 1 m.mov_title
FROM movie AS m
INNER JOIN movie_genres AS mg ON m.mov_id = mg.mov_id
INNER JOIN genre AS g ON g.gen_id = mg.gen_id
WHERE g.gen_title ='Action'
ORDER BY NEWID(); 