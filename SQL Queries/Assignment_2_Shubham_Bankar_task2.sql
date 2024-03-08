USE assign_2_Shubham_Bankar

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

CREATE Table movie(
mov_id INT PRIMARY KEY IDENTITY(1,1),
mov_title VARCHAR(50),
mov_year INT,
mov_time INT,
mov_lang VARCHAR(30),
mov_dt_rel DATE,
mov_release_country VARCHAR(50));


CREATE TABLE movie_genres(
mov_id INT PRIMARY KEY IDENTITY(1,1),
gen_id INT FOREIGN KEY REFERENCES genre(gen_id));

CREATE TABLE movie_direction(
dir_id INT FOREIGN KEY REFERENCES director(dir_id),
mov_id INT FOREIGN KEY REFERENCES movie(mov_id));

CREATE TABLE reviewer(
rev_id INT PRIMARY KEY IDENTITY(1,1),
rev_name VARCHAR(50));

CREATE TABLE rating(
mov_id INT FOREIGN KEY REFERENCES movie(mov_id),
rev_id INT FOREIGN KEY REFERENCES reviewer(rev_id),
rev_stars INT,
num_o_rating INT);


CREATE TABLE movie_cast(
act_id INT FOREIGN KEY REFERENCES actor(act_id),
mov_id INT FOREIGN KEY REFERENCES movie(mov_id),
role VARCHAR(50));


INSERT INTO  actor VALUES
('Jonny','Depp','Male'),
('Robert','Downey Jr','Male'),
('Emma','Watson','Female'),
('Carly','Chaikin','Female'),
('Daniel','Radcliff','Male');

INSERT INTO genre VALUES
('Action'),
('Horror'),
('Thriller'),
('Drama'),
('Comedy'),
('Romance');


INSERT INTO director VALUES
('Christopher','Nolan'),
('David','Fincher'),
('James','Cameron'),
('Spike','Lee')


INSERT INTO movie VALUES
('Lord of the rings',2003,150,'English,Hindi,Korean','2003-11-26','USA,China,India,South Korea'),
('Avengers',2012,180,'English,Hindi,Korean,Japnese','2012-4-11','USA,China,India,South Korea'),
('Avatar',2000,210,'English,Hindi,Japnese','2002-04-15','USA,China,Indi,Sri-Lanka,UK'),
('Shutter Island',2006,116,'English,Hindi,Japnese,Korea','2006-10-09','USA,China,India,UK')




/*1) From the following table, write a SQL query to find the name and year of the movies. Return movie title, movie release year*/

