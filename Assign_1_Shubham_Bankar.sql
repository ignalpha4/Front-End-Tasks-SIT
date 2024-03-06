
create database assign_1_shubham_bankar

use assign_1_shubham_bankar

create table emp_details(
EMP_IDNO INT Primary KEY,
EMP_FNAME Varchar(30),
EMP_LNAME varchar(30),
EMP_DEPT INT);

INSERT INTO emp_details VALUES
(127323,'Michale','Robbin',57),
(526689,'Carlos','Snares',63),
(843795,'Enric','Dosio',57),
(328717,'Jhon','Snares',63),
(444527,'Joseph','Dosni',47),
(659831,'Zanifer','Emily',47),
(847674,'Kuleswar','Sitaraman',57),
(748681,'Henrey','Gabriel',47),
(555935,'Alex','Manuel',57),
(539569,'George','Mardy',27),
(733843,'Mario','Saule',63),
(631548,'Alan','Snappy',27),
(839139,'Maria','Foster',57)


SELECT * From emp_details


CREATE TABLE emp_department(
DPT_CODE INT PRIMARY KEY,
DPT_NAME VARCHAR(30),
DPT_ALLOTMENT INT);


INSERT INTO emp_department VALUES
(57,'IT',65000),
(63,'Finance',15000),
(47,'HR',240000),
(27,'RD',55000),
(89,'QC',75000)

CREATE TABLE company_mast(
COM_ID INT PRIMARY KEY,
COM_NAME VARCHAR(50),
)

INSERT INTO company_mast VALUES
(11,'Samsung'),
(12,'iBall'),
(13,'Epsion'),
(14,'Zebronics'),
(15,'Asus'),
(16,'Frontech')


CREATE TABLE item_mast(
PRO_ID INT PRIMARY KEY,
PRO_NAME VARCHAR(50),
PRO_PRICE INT,
PRO_COM INT)

INSERT INTO item_mast VALUES
(101,'Mother Board',3200,15),
(102,'Key Board',450,16),
(103,'ZIP drive',250,14),
(104,'Speaker',550,16),
(105,'Monitor',5000,11),
(106,'DVD drive',900,12),
(107,'CD drive',800,12),
(108,'Printer',2600,13),
(109,'Refill cartridge',350,13),
(110,'Mouse',250,12)

CREATE TABLE orders(
ord_no INT PRIMARY KEY,
purch_amt DECIMAL(10,2),
ord_date DATE,
customer_id INT,
salesman_id INT)


INSERT INTO orders VALUES
(70001,150.5,'2012-10-05',3005,5002),
(70009,270.65,'2012-09-10',3001,5005),
(70002,65.26,'2012-10-05',3002,5001),
(70004,110.5,'2012-08-17',3009,5003),
(70007,948.5,'2012-09-10',3005,5002),
(70005,2400.6,'2012-07-27',3007,5001),
(70008,5760,'2012-09-10',3002,5001),
(70010,1983.43,'2012-10-10',3004,5006),
(70003,2480.4,'2012-10-10',3009,5003),
(70012,250.45,'2012-06-27',3008,5002),
(70011,75.29,'2012-08-17',3003,5007),
(70013,3045.6,'2012-04-25',3002,5001)

CREATE TABLE salesman(
salesman_id INT PRIMARY KEY,
name VARCHAR(30),
city VARCHAR(20),
comission DECIMAL(3,2))

INSERT INTO salesman VALUES
(5001,'James Hoog','New York',0.15),
(5002,'Nail Knite','Paris',0.13),
(5005,'Pit Alex','London',0.11),
(5006,'Mc Lyon','Paris',0.14),
(5007,'Paul Adam','Rome',0.13),
(5003,'Lauson Hen','San Jose',0.12)

CREATE TABLE customer(
customer_id INT PRIMARY KEY,
cust_name VARCHAR(30),
city VARCHAR(20),
grade INT,
salesman_id INT)


INSERT INTO customer VALUES
(3002,'Nick Rimando','New York',100,5001),
(3007,'Brad Davis','New York',200,5001),
(3005,'Graham Zusi','California',200,5002),
(3008,'Julian Green','London',300,5002),
(3004,'Fabian Johnson','Paris',300,5006),
(3009,'Geoff Cameron','Berlin',100,5003),
(3003,'Jozy Altidor','Moscow',200,5007),
(3001,'Brad Guzan','London',NULL,5005)

select * from customer


/*Foreign keys*/

ALTER TABLE emp_details 
ADD CONSTRAINT fk_emp_dept
FOREIGN KEY (EMP_DEPT) REFERENCES emp_department(DPT_CODE); 

ALTER TABLE item_mast 
ADD CONSTRAINT fk_pro_com
FOREIGN KEY (PRO_COM) REFERENCES company_mast(COM_ID);

ALTER TABLE orders
ADD CONSTRAINT fk_customer_id 
FOREIGN KEY (customer_id) REFERENCES customer(customer_id);

ALTER TABLE orders
ADD CONSTRAINT fk_salesman_id
FOREIGN KEY (salesman_id) REFERENCES salesman(salesman_id);

ALTER TABLE customer
ADD CONSTRAINT fk_salesman_id_customer
FOREIGN KEY (salesman_id) REFERENCES salesman(salesman_id);

SELECT * FROM emp_details;
SELECT * FROM emp_department;
SELECT * FROM company_mast;
SELECT * FROM item_mast;
SELECT * FROM orders;
SELECT * FROM salesman;
SELECT * FROM customer;

/*(1) Write a SQL statement to find the total purchase amount of all orders.*/

SELECT * FROM orders;

SELECT SUM(purch_amt) AS total_amount FROM orders; 

/*(2) Write a SQL statement to find the average purchase amount of all orders.*/

SELECT * FROM orders;

SELECT AVG(purch_amt) AS avg_amount FROM orders; 

/*(3) Write a SQL statement to find the number of salesmen currently listing for all of their customers*/

SELECT * FROM salesman;

SELECT COUNT(salesman_id) AS total_number_of_salesman FROM salesman;

/*(4) Write a SQL statement to know how many customer have listed their names.*/

SELECT * FROM customer;

SELECT COUNT(customer_id) AS total_customers FROM customer;

/*(5) Write a SQL statement find the number of customers who gets at least a gradation for his/her performance*/

SELECT COUNT(customer_id)  AS no_of_customers FROM customer WHERE grade IS NOT NULL ;

/*(6) Write a SQL statement to get the maximum purchase amount of all the orders*/

SELECT * FROM orders;

SELECT MAX(purch_amt) AS max_amt FROM orders;

/*(7) Write a SQL statement to get the minimum purchase amount of all the orders*/

SELECT * FROM orders;

SELECT MIN(purch_amt)AS min_amt FROM orders;

/*(8) Write a SQL statement which selects the highest grade for each of the cities of the customers.*/

SELECT * FROm customer;

SELECT city,MAX(grade) AS max_of_city FROM customer GROUP BY city;

/*(9) Write a SQL statement to find the highest purchase amount ordered by the each customer with their ID and highest purchase amount.  */

SELECT * FROM orders;

SELECT customer_id,max(purch_amt) AS highest_purchase_amt FROM orders GROUP BY customer_id;

/*(10) Write a SQL statement to find the highest purchase amount ordered by the each customer
on a particular date with their ID, order date and highest purchase amount. */

SELECT * FROM orders;

SELECT customer_id,ord_date,max(purch_amt) AS highest_purchase_amt FROM orders 

GROUP BY customer_id,ord_date;


/*(11) Write a SQL statement to find the highest purchase amount on a date '2012-08-17' for each salesman with their ID.*/

SELECT * FROM orders;

SELECT salesman_id,max(purch_amt) As max_amt FROM orders
WHERE ord_date='2012-08-17'
GROUP BY salesman_id;

/*(12) Write a SQL statement to find the highest purchase amount with their ID and order date, 
for only those customers who have highest purchase amount in a day is more than 2000.  */

SELECT * FROM orders;

SELECT customer_id,ord_date,max(purch_amt) AS highest_purchase_amt FROM orders 

WHERE purch_amt>2000

GROUP BY customer_id,ord_date;


/*(13)Write a SQL statement to find the highest purchase amount with their ID and order date, 
for those customers who have a higher purchase amount in a day is within the range 2000 and 6000*/

SELECT * from orders;

SELECT customer_id,ord_date,max(purch_amt) FROM orders
WHERE purch_amt BETWEEN 2000 and 6000
GROUP BY customer_id,ord_date;


/*(14) Write a SQL statement to find the highest purchase amount with their ID and order date,
for only those customers who have a higher purchase amount in a day is within the list 2000,3000,5760 &6000.  */

SELECT * from orders;

SELECT customer_id,ord_date,max(purch_amt) FROM orders
WHERE purch_amt IN(2000,3000,5760,6000)
GROUP BY customer_id,ord_date;

/*(15) Write a SQL statement to find the highest purchase amount with their ID, 
for only those customers whose ID is within the range 3002 and 3007.*/

SELECT * FROM orders;

SELECT customer_id,max(purch_amt) AS max_purch_amt FROM orders
WHERE customer_id BETWEEN 3002 and 3007
GROUP BY customer_id;


/*(16) Write a SQL statement to display customer details (ID and purchase amount) 
whose IDs are within the range 3002 and 3007 and highest purchase amount is more than 1000.  */

SELECT * FROM orders;

SELECT customer_id,purch_amt FROM orders
WHERE (customer_id BETWEEN 3002 AND 3007) AND (purch_amt>1000); 


/*(17) Write a SQL statement to find the highest purchase amount with their ID,
for only those salesmen whose ID is within the range 5003 and 5008. */

SELECT * FROM orders;

SELECT salesman_id,max(purch_amt) AS max_purch_amt FROM orders
WHERE salesman_id BETWEEN 5003 AND 5008
GROUP BY salesman_id;

/*(18) Write a SQL statement that counts all orders for a date August 17th, 2012.   */

SELECT * FROM orders;

SELECT count(ord_no) AS total_orders FROM orders
WHERE ord_date='2012-08-17';


/*(19) Write a SQL statement that count the number of salesmen for whom a city is specified.
Note that there may be spaces or no spaces in the city column if no city is specified.*/

SELECT * FROM salesman;

/*UPDATE  salesman SET city='  ' WHERE salesman_id=5002 */;
/*updated the table to check if its working correctly orr not*/

SELECT count(salesman_id) AS total_cty_cnt FROM salesman WHERE city!=' '; 


/*(20) Write a query that counts the number of salesmen with 
their order date and ID registering orders for each day.*/
SELECT * from orders;

SELECT ord_date, salesman_id, COUNT(salesman_id) AS num_orders FROM orders
GROUP BY ord_date, salesman_id;



/*(21) Write a SQL query to calculate the average price of all the products. */


SELECT * FROM item_mast;
SELECT avg(PRO_PRICE) AS avg_product_price FROM item_mast; 

/*(22) Write a SQL query to find the number of products with a price more than or equal to Rs.350.*/

SELECT * FROM item_mast;

SELECT count(PRO_ID) AS products_having_price_morethan_350  
FROM item_mast 
WHERE PRO_PRICE >= 350;


/*(23) Write a SQL query to display the average price of each company's products, along with their code.*/


SELECT * FROM item_mast;

SELECT PRO_COM,avg(PRO_PRICE) FROM item_mast GROUP BY PRO_COM;

/*(24) Write a query in SQL to find the sum of the allotment amount of all departments. */

SELECT * FROM emp_department;

SELECT sum(DPT_ALLOTMENT) AS total_allotment FROM emp_department;

/*(25) Write a query in SQL to find the number of employees in each department along with the department code.*/

SELECT * FROM emp_details;

SELECT EMP_DEPT , count(EMP_IDNO) AS emp_in_dept FROM emp_details GROUP BY EMP_DEPT; 