

--use master 
--drop database shubham_assign_6;


CREATE DATABASE shubham_assign_6;

ALTER DATABASE shubham_assign_6 SET MULTI_USER;

USE shubham_assign_6


CREATE TABLE customers(
cust_id INT PRIMARY KEY IDENTITY(1,1),
cust_name VARCHAR(80),
cust_address VARCHAR(200)
);


CREATE TABLE products(
pro_id INT PRIMARY KEY IDENTITY(1,1),
pro_name VARCHAR(100),
pro_price INT
);



CREATE TABLE orders(
order_id INT PRIMARY KEY IDENTITY(1,1),
customer_id INT FOREIGN KEY REFERENCES customers(cust_id),
product_id INT FOREIGN KEY REFERENCES products(pro_id),
order_date DATE,
quantity INT,
total_amount INT,
payment INT,
);


INSERT INTO customers VALUES
('Shubham','Pune,Maharashtra'),
('Pratik','Baramati,Maharashtra'),
('Chirag','Ahmedabad,Gujarat'),
('Aditya','Phaltan,Maharashtra'),
('Prajwal','Pune,Maharashtra'),
('Shubham','Pune,Maharashtra'),
('Saurabh','Malegaon,Maharashtra'),
('Omkar','Mumbai,Maharashtra'),
('Pravin','Nashik,Maharashtra'),
('Piyush','Noida,Uttar Pradesh'),
('Rahul','Delhi,Delhi'),
('Neha','Mumbai,Maharashtra'),
('Rajesh','Chennai,Tamil Nadu'),
('Anjali','Kolkata,West Bengal'),
('Amit','Bangalore,Karnataka'),
('Nisha','Hyderabad,Telangana'),
('Manoj','Jaipur,Rajasthan'),
('Priya','Lucknow,Uttar Pradesh'),
('Vinod','Pune,Maharashtra'),
('Kavita','Ahmedabad,Gujarat');

INSERT INTO products VALUES
('Pen',10),
('Notebook',40),
('Pencil',4),
('Highlighter',10),
('Chalk Box',50),
('Stapler',80),
('Staples',20),
('Marker',45),
('Eraser',5),
('sharpener',5),
('Glue',10),
('Scissors',25),
('Water Bottle',50),
('Scientific Calculator',1100),
('Drawing Pencils',10),
('whitener',25),
('Ruler',8),
('Paint Brush',4),
('Calculator',150),
('Cardboard',10);

INSERT INTO orders VALUES
(13,13,'2021-02-10',2,100,50),
(8,8,'2020-08-15',3,135,100),
(4,4,'2023-04-25',1,10,10),
(1,12,'2024-01-10',5,125,100),
(18,16,'2020-07-05',2,50,30),
(4,10,'2023-03-15',4,20,20),
(9,4,'2020-09-20',3,30,30),
(10,14,'2020-10-25',2,2200,2000),
(2,5,'2023-02-15',1,50,20),
(7,12,'2020-07-10',6,150,100),
(5,7,'2023-05-30',4,80,80),
(6,6,'2020-06-05',1,80,40),
(20,19,'2021-09-15',3,450,300),
(6,15,'2023-04-20',2,20,20),
(19,19,'2021-08-10',1,150,150),
(11,9,'2020-11-30',2,10,10),
(3,12,'2022-03-20',3,75,60),
(6,20,'2021-06-30',5,50,50),
(12,1,'2020-01-05',1,10,5),
(16,18,'2024-01-25',2,8,8);

SELECT * FROM orders;
SELECT * FROM products
/*1.Create a stored procedure called "get_customers" that returns all customers from the "customers" table.*/


CREATE PROC get_customers 
AS
BEGIN 

	SELECT cust_name FROm customers;

END

get_customers;

/*2.Create a stored procedure called "get_orders" that returns all orders from the "orders" table.*/

CREATE PROC get_orders 
AS
BEGIN 

	SELECT order_id FROm orders;

END

get_orders;


/*3.Create a stored procedure called "get_order_details" that accepts an order ID as a parameter 
and returns the details of that order (i.e., the products and quantities).*/

SELECT * FROM orders;

CREATE PROC get_order_details @order_id INT
AS
BEGIN 
	SELECT product_id,quantity FROM orders
	WHERE order_id= @order_id;
END

get_order_details @order_id=4

/*4.Create a stored procedure called "get_customer_orders" 
that accepts a customer ID as a parameter and returns all orders for that customer.*/

CREATE PROC get_customer_orders @customer_id INT
AS
BEGIN 

	SELECT order_id FROM orders
	WHERE customer_id= @customer_id;
END

get_customer_orders @customer_id=4

/*5.Create a stored procedure called "get_order_total" that accepts an order ID 
as a parameter and returns the total amount of the order.*/

SELECT * FROm orders;
SELECT * FROm products;

CREATE PROCEDURE get_order_total @order_id INT
AS
BEGIN

    SELECT total_amount
    FROM orders 
    WHERE order_id = @order_id;
END;

get_order_total @order_id=4


/*6.Create a stored procedure called "get_product_list" that returns a list of all products from the "products" table.*/

SELECT * FROM products;

CREATE PROC get_product_list 
AS
BEGIN
	SELECT pro_id,pro_name FROM products;
END

get_product_list

/*7.Create a stored procedure called "get_product_info" that accepts a product ID as a parameter and returns the details of that product.*/

SELECT * FROM products;

CREATE PROC get_product_info @pro_id INT
AS
BEGIN
	SELECT pro_id,pro_name FROM products
	WHERE pro_id=@pro_id;
END

get_product_info @pro_id=3

/*8.Create a stored procedure called "get_customer_info" that accepts a customer ID as a parameter and returns the details of that customer.*/

SELECT * FROM customers;

CREATE PROC get_customer_info @customer_id INT
AS
BEGIN
	SELECT cust_id,cust_name,cust_address FROM customers
	WHERE cust_id=@customer_id;
END

get_customer_info @customer_id=5


/*9.Create a stored procedure called "update_customer_info" that accepts a customer ID and 
new information as parameters and updates the customer's information in the "customers" table.*/

SELECT * FROM customers;

CREATE PROCEDURE update_customer_info @customer_id INT,@customer_name VARCHAR(80),@customer_address VARCHAR(200)
AS
BEGIN
    UPDATE customers 
    SET cust_name =@customer_name,cust_address =@customer_address 
    WHERE cust_id =@customer_id;
END;

update_customer_info @customer_id = 7, @customer_name = 'Shree', @customer_address = 'Patna, Bihar';

/*10.Create a stored procedure called "delete_customer" that accepts a customer ID as a parameter and deletes
that customer from the "customers" table.*/

SELECT * FROM customers;
SELECT * FROM orders;

CREATE PROC delete_customer @customer_id INT
AS
BEGIN
	DELETE FROM orders WHERE customer_id=@customer_id 
    DELETE FROM customers WHERE cust_id =@customer_id;
END;

delete_customer @customer_id=20

/*11.Create a stored procedure called "get_order_count" that accepts a customer ID as a parameter and returns the number 
of orders for that customer.*/

SELECT * FROM customers;
SELECT * FROM orders;

CREATE PROC get_order_count @customer_id INT
AS
BEGIN
	SELECT count(DISTINCT order_id) AS number_of_orders
	FROM orders
	WHERE customer_id=@customer_id
END;

get_order_count @customer_id=4

/*12.Create a stored procedure called "get_customer_balance" that accepts a customer ID as a parameter and returns 
the customer's balance (i.e., the total amount of all orders minus the total amount of all payments).*/

SELECT * FROm orders;

CREATE PROCEDURE get_customer_balance @customer_id INT
AS
BEGIN
    SELECT SUM(total_amount) - SUM(payment) AS customer_balance
    FROM orders 
    WHERE customer_id = @customer_id;
END;


get_customer_balance @customer_id=2;  

/*13.Create a stored procedure called "get_customer_payments" that accepts 
a customer ID as a parameter and returns all payments made by that customer.*/

SELECT * FROM orders


CREATE PROC get_customer_payments @customer_id INT
As 
BEGIN 
	SELECT order_id,payment FROM orders
	WHERE customer_id=@customer_id;
END;

get_customer_payments @customer_id=4

/*14.Create a stored procedure called "add_customer" that accepts a name and 
address as parameters and adds a new customer to the "customers" table.*/

SELECT * FROM customers;

CREATE PROC add_customer @name VARCHAR(80),@address VARCHAR(200)
AS
BEGIN
	INSERT INTO customers VALUES(@name,@address);
END;

add_customer @name='dharmik',@address='Jaipur,Rajasthan';

/*15.Create a stored procedure called "get_top_products" that returns the top 10 products based on sales volume.*/

SELECT * FROM orders

CREATE PROCEDURE get_top_products
AS
BEGIN
    SELECT TOP 10 p.pro_id,p.pro_name,SUM(o.quantity) AS sales_volume
    FROM orders AS o
    INNER JOIN
    products AS p ON o.product_id = p.pro_id
    GROUP BY p.pro_id,p.pro_name
    ORDER BY sales_volume DESC;
END;


get_top_products

/*16.Create a stored procedure called "get_product_sales" that accepts a product ID as a parameter and 
returns the total sales volume for that product.*/

SELECT * FROM orders;

CREATE PROC get_product_sales @product_id INT
AS
BEGIN
	SELECT  p.pro_id,p.pro_name,SUM(o.quantity) AS sales_volume
    FROM orders AS o
    INNER JOIN
    products AS p ON o.product_id = p.pro_id
    GROUP BY p.pro_id,p.pro_name,o.product_id
	HAVING o.product_id=@product_id
    ORDER BY sales_volume DESC;
END

get_product_sales @product_id=12


/*17.Create a stored procedure called "get_customer_orders_by_date" that accepts a customer ID and date range as
parameters and returns all orders for that customer within the specified date range.*/

SELECT * FROM orders;

CREATE PROC get_customer_orders_by_date @customer_id INT,@from_date DATE,@to_date DATE
AS
BEGIN
	SELECT order_id,customer_id,order_date
	FROM orders
	WHERE customer_id=@customer_id AND (order_date BETWEEN @from_date AND @to_date)
END

get_customer_orders_by_date @customer_id=4,@from_date='2023-01-01',@to_date='2024-01-01'

/*18.Create a stored procedure called "get_order_details_by_date" that accepts an order ID and date range as parameters 
and returns the details of that order within the specified date range.*/

SELECT * FROM orders;

CREATE PROC get_order_details_by_date @order_id INT,@from_date DATE,@to_date DATE
AS
BEGIN
	SELECT order_id,customer_id,order_date
	FROM orders
	WHERE order_id=@order_id AND (order_date BETWEEN @from_date AND @to_date)
END

get_order_details_by_date @order_id=3,@from_date='2023-01-01',@to_date='2024-01-01'

/*19.Create a stored procedure called "get_product_sales_by_date" that accepts a product ID and date range as parameters
and returns the total sales volume for that product within the specified date range.*/

SELECT * FROM orders;

DROP proc get_product_sales_by_date

CREATE PROC get_product_sales_by_date @product_id INT,@from_date DATE,@to_date DATE
AS
BEGIN
	SELECT product_id,order_date,SUM(order_id) AS sales_volume
	FROM orders
	GROUP BY product_id,order_date
	HAVING product_id=@product_id AND (order_date BETWEEN @from_date AND @to_date)
END

get_product_sales_by_date @product_id=12,@from_date='2020-01-01',@to_date='2024-04-04';


/*20.Create a stored procedure called "get_customer_balance_by_date" that accepts a customer ID and date range as 
parameters and returns the customer's balance within the specified date range.*/

SELECT * FROM orders;

CREATE PROC get_customer_balance_by_date @customer_id INT,@from_date DATE,@to_date DATE
AS
BEGIN
	SELECT SUM(total_amount) - SUM(payment) AS customer_balance
	FROM orders
	WHERE customer_id=@customer_id AND (order_date BETWEEN @from_date AND @to_date)
END

get_customer_balance_by_date @customer_id=2,@from_date='2020-02-20',@to_date='2024-01-20';

/*21.Create a stored procedure called "add_order" that accepts a customer ID, order date, and total amount as parameters 
and adds a new order to the "orders" table.*/

SELECT * FROM orders;

CREATE PROC add_order @customer_id INT,@order_date DATE,@total_amount INT
AS
BEGIN
	INSERT INTO orders(customer_id,order_date,total_amount) VALUES
	(@customer_id,@order_date,@total_amount);
END

add_order @customer_id=5,@order_date='2022-05-01',@total_amount=200;


/*22.Create a stored procedure called "update_order_total" that accepts an order ID and a new total amount as
parameters and updates the total amount of the order in the "orders" table.*/

SELECT * FROM orders;

CREATE PROC update_order_total @order_id INT,@total_amount INT
AS
BEGIN
	UPDATE orders SET total_amount=@total_amount 
	WHERE order_id=@order_id
END

update_order_total @order_id=7,@total_amount=50;

/*23.Create a stored procedure called "delete_order" that accepts an order ID as a parameter and 
deletes that order from the "orders" table.*/
SELECT * FROM orders;

CREATE PROC delete_order @order_id INT
AS
BEGIN
	DELETE FROM orders WHERE order_id=@order_id
END

delete_order @order_id=20;