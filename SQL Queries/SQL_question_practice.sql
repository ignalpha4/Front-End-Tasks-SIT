use assign_1_shubham_bankar2



/*1) write a SQL query to find the details of those salespeople who come from the 'Paris' City or 'Rome' City. 
Return salesman_id, name, city, commission.*/

SELECT * FROM salesman;

SELECT * from salesman
WHERE city='Paris' OR city='Rome';

/*3. write a SQL query to find the details of those salespeople who live in cities other than Paris and Rome.
Return salesman_id, name, city, commission*/

SELECT * FROM salesman
WHERE city!='Paris' and city!='Rome';

/*4.write a SQL query to retrieve the details of all customers whose ID belongs to any of the values 3007, 3008 or 3009.
Return customer_id, cust_name, city, grade, and salesman_id.*/

SELECT * FROM customer;

SELECT * FROM customer
WHERE customer_id IN(3007,3008,3009);

/*5.write a SQL query to find salespeople who receive commissions between 0.12 and 0.14 (begin and end values are included). 
Return salesman_id, name, city, and commission. */

SELECT * FROM salesman;

SELECT * FROM salesman
WHERE comission BETWEEN 0.12 AND 0.14;

/*6.write a SQL query to select orders between 500 and 4000 (begin and end values are included).
Exclude orders amount 948.50 and 1983.43. 
Return ord_no, purch_amt, ord_date, customer_id, and salesman_id. */

SELECT * FROM orders;

SELECT * FROM orders
WHERE (purch_amt>=500 AND purch_amt<=4000) AND (purch_amt !=948.50) AND (purch_amt !=1983.43);

/*7.write a SQL query to retrieve the details of the salespeople whose names begin with any letter between 'A' and 'L' .
Return salesman_id, name, city, commission. */

SELECT * FROM salesman;

SELECT *  FROM salesman
WHERE name BETWEEN 'A%'  AND 'L%';

/*8.views/

CREATE VIEW [special salesman] AS
SELECT * FROM salesman
WHERE name NOT BETWEEN 'A%' AND 'L%';

SELECT * FROM [special salesman];


