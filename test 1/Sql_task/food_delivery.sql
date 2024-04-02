CREATE DATABASE food_delivery;
USE food_delivery;


ALTER DATABASE food_delivery SET MULTI_USER;

CREATE TABLE Category_Master (
    CategoryId INT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL,
    CategoryDescription VARCHAR(255),
    IsActive BIT NOT NULL,
    CreatedDate DATE NOT NULL
);

CREATE TABLE Item_Master (
    ItemId INT PRIMARY KEY,
    CategoryId INT,
    Itemname VARCHAR(100) NOT NULL,
    ItemDescription VARCHAR(255),
    Price FLOAT NOT NULL,
    Gst DECIMAL(4,2) NOT NULL,
    IsActive BIT NOT NULL,
    CreatedDate DATE NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Category_Master(CategoryId)
);

CREATE TABLE Coupon_Master (
    CouponId INT PRIMARY KEY,
    CouponText VARCHAR(255) NOT NULL,
    DiscountPercentage DECIMAL(5,2) NOT NULL,
    ExpiryDate DATE NOT NULL
);

CREATE TABLE Order_Master (
    OrderId INT PRIMARY KEY IDENTITY(1,1),
    Deliverycharge INT NOT NULL,
    CouponAmount FLOAT NOT NULL,
    Subtotal FLOAT NOT NULL,
    Total FLOAT NOT NULL,
    Orderdate DATE NOT NULL
);

CREATE TABLE Order_Details (
    OrderDetailsId INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT,
    ItemId INT NOT NULL,
    Quantity INT NOT NULL,
    Total FLOAT NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Order_Master(OrderId),
    FOREIGN KEY (ItemId) REFERENCES Item_Master(ItemId)
);

CREATE PROC insert_data
AS
BEGIN
    INSERT INTO Category_Master VALUES
    (1, 'Drinks', 'Contains variety of options including tea', 1, '2002-12-30'),
    (2, 'Breakfast', 'Contains Indian breakfast options like poha, upma, idli', 1, '2010-10-22'),
    (3, 'Starters', 'Contains variety of options like Papad', 0, '2020-09-29'),
    (4, 'Main Course', 'Contains variety of options like paneer, dal fry, thali', 1, '2005-05-06');

    INSERT INTO Item_Master VALUES
    (1, 1, 'Coke', 'Soft Drink', 50.0, 5.00, 1, '2009-04-04'),
    (2, 1, 'Red Bull', 'Energy Drink', 110.0, 10.00, 1, '2020-04-09'),
    (3, 2, 'Poha', 'Snacks', 20.0, 10.00, 1, '2011-04-10'),
    (4, 2, 'Idli', 'Rice Cake', 40.0, 10.00, 0, '2020-04-09'),
    (5, 4, 'Dal Fry', 'Spicy Lentils', 200.0, 10.00, 1, '2006-07-08');

    INSERT INTO Coupon_Master VALUES
    (1, '50 percent discount', 50.0, '2024-05-06'),
    (2, '30 percent discount', 30.0, '2023-05-06'),
    (3, '40 percent discount', 40.0, '2024-09-10'),
    (4, '10 percent discount', 10.0, '2024-12-12');
END;

EXEC insert_data;

SELECT * FROM Category_Master;
SELECT * FROM Item_Master;
SELECT * FROM Coupon_Master;





CREATE FUNCTION item_amount(@itemid INT,@quantity INT)
RETURNS FLOAT AS
BEGIN
	DECLARE @item_amt FLOAT;
	DECLARE @price FLOAT;

	SELECT @price = Price
    FROM Item_Master
    WHERE ItemId = @itemid;

	SET @item_amt=@price * @quantity;

	RETURN @item_amt;
END



/*questions*/

ALTER PROC main @ItemId INT,@Quantity INT,@CouponID INT =NULL
AS
BEGIN
	
	/*Q1*/
	DECLARE @active INT; 

	SET @active = (SELECT COUNT(*) FROM Item_Master WHERE ItemId = @ItemId AND IsActive = 1);

	IF @active = 0
	BEGIN
		PRINT 'Item is not available';
		RETURN;
	END;

	/*Q2 & Q3*/
	DECLARE @cat_active INT;

	SET @cat_active=
	(SELECT COUNt(*) FROM 
	Item_Master AS i INNER JOIN Category_Master As c
	ON
	i.CategoryId=c.CategoryId
	WHERE i.ItemId = @ItemId AND c.IsActive=1)

	IF @cat_active=0
	BEGIN
		PRINT 'category is not available';
		RETURN;
	END;

	/*Q4*/
	DECLARE @item_total_amt FLOAT;

	SET @item_total_amt = dbo.item_amount(@ItemId,@Quantity);

	/*Q5*/

	DECLARE @delivery_charges INT;

	IF @item_total_amt>1000 SET @delivery_charges=0;
	ELSE IF  @item_total_amt BETWEEN 500 AND 1000 SET @delivery_charges=50;
	ELSE SET @delivery_charges=80;

	DECLARE @sub_total FLOAT;

	SET @sub_total = @item_total_amt + @delivery_charges;

	/*@6*/

	DECLARE @discount FLOAT = 0;

	IF @CouponID IS NOT NULL
	BEGIN
		DECLARE @expired INT;

		SELECT @expired = COUNT(*) 
		FROM Coupon_Master
		WHERE CouponId = @CouponID AND ExpiryDate >= GETDATE();

		IF @expired > 0
		BEGIN
			DECLARE @discount_per DECIMAL(5,2);

			SELECT @discount_per = DiscountPercentage
			FROM Coupon_Master
			WHERE CouponId = @CouponID;

			SET @discount = (@item_total_amt * @discount_per) / 100; 
		END;
	END;

	/*Q7*/

	DECLARE @total FLOAT=0;

	SET @total=@sub_total-@discount;

	DECLARE @date DATE;
	SET @date=GETDATE();

	INSERT INTO Order_Master VALUES
	(@delivery_charges,@discount,@sub_total,@total,@date);


	DECLARE @OrderId INT;
    SET @OrderId = SCOPE_IDENTITY();

	INSERT INTO Order_Details VALUES
	(@OrderId,@ItemId,@Quantity,@total);

	/*Q8*/

	SELECT o.OrderId, o.Deliverycharge, o.CouponAmount, o.Subtotal, o.Total, o.Orderdate,
           d.OrderDetailsId, d.ItemId, d.Quantity, d.Total 
    FROM Order_Master o
    INNER JOIN Order_Details d ON 
	o.OrderId = d.OrderId
    WHERE o.OrderId = @OrderId; 

END;

SELECT * FROM Category_Master;
SELECT * FROM Item_Master;
SELECT * FROM Coupon_Master;


/*output*/
EXEC main @ItemId=4,@Quantity=10,@CouponID=3







