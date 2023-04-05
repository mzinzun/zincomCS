const sql1 = `DROP database if exists zincomdb;CREATE database zincomdb;use zincomdb;
CREATE TABLE \`comments\` (
  \`comment_id\` tinyint NOT NULL AUTO_INCREMENT,
  \`name\` varchar(80) NOT NULL,
  \`email\` varchar(80) NOT NULL,
  \`subject\` tinytext NOT NULL,
  \`comment\` text NOT NULL,
  PRIMARY KEY (\`comment_id\`),
  UNIQUE KEY \`email\` (\`email\`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES \`comments\` WRITE;
INSERT INTO \`comments\` VALUES (1,'Michael Zinzun','mzinzun@hotmail.zinzun','Test stuff','Just Testing you out'),(2,'Michael Zinzun','mzinzun@hotmail.com','test stuff','Just testing');
UNLOCK TABLES;
CREATE TABLE \`customers\` (
  \`cust_id\` tinyint NOT NULL AUTO_INCREMENT,
  \`fName\` varchar(80) NOT NULL,
  \`lName\` varchar(80) NOT NULL,
  \`phone\` varchar(20) DEFAULT NULL,
  \`email\` varchar(80) NOT NULL,
  \`address\` varchar(50) NOT NULL,
  \`city\` varchar(50) NOT NULL,
  \`state\` varchar(50) NOT NULL,
  \`zip\` int NOT NULL,
  PRIMARY KEY (\`cust_id\`),
  UNIQUE KEY \`email\` (\`email\`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES \`customers\` WRITE;
INSERT INTO \`customers\` VALUES (1,'Jane','Smith','213-452-4545','jsmith@gmail.com','421 Somewhere St.','noWhere','Ca',91102),(2,'John','Jones','213-452-4545','jjones@gmail.com','421 Somewhere St.','noWhere','Ca',91102),(3,'Michael','Zinzun','213-624-5845','mzinzun@hotmail.com','123 Here Ave','Alto','CA',91023);
UNLOCK TABLES;
CREATE TABLE \`employees\` (
  \`emp_id\` tinyint NOT NULL AUTO_INCREMENT,
  \`f_name\` varchar(80) NOT NULL,
  \`l_name\` varchar(80) NOT NULL,
  \`username\` varchar(80) NOT NULL,
  \`password\` varchar(80) NOT NULL,
  \`position\` varchar(80) NOT NULL,
  PRIMARY KEY (\`emp_id\`),
  UNIQUE KEY \`username\` (\`username\`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES \`employees\` WRITE;
INSERT INTO \`employees\` VALUES (1,'Michael','Zinzun','mzinzun@zincom.net','mzinzun','admin'),(2,'Robert','Simms','rsimms@zincom.net','rsimms','Shipping');
UNLOCK TABLES;
CREATE TABLE \`products\` (
  \`prod_id\` tinyint NOT NULL AUTO_INCREMENT,
  \`catagory\` varchar(30) NOT NULL,
  \`name\` varchar(50) NOT NULL,
  \`descrip\` tinytext NOT NULL,
  \`sku\` varchar(20) NOT NULL,
  \`price\` float(8,2) NOT NULL,
  \`units\` tinyint NOT NULL,
  PRIMARY KEY (\`prod_id\`),
  UNIQUE KEY \`sku\` (\`sku\`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES \`products\` WRITE;
INSERT INTO \`products\` VALUES (1,'Power Supply','750W Seasonic Focus+','750 Watt Desktop Power Supply','sfp1-001',125.00,5),(2,'Processors','Intel Core-i9 ','Intel i9 10900K processor - desktop','icp9-001',350.00,5),(3,'Graphics Cards','AMD RX 6900XT','AMD Radeon RX 6900XT - 16GB Graphics Processor - desktop','arr69-001',329.00,5),(4,'Storage','Corsair MP400 1TB','1TB SSD Corsair MP400 M.2 PCIe 3.0 ','cmp400-001',115.00,5),(5,'Storage','Western Digital Blue 6TB','6TB HDD - Western Digital Blue - desktop','wdb6-001',130.00,5),(6,'Software','Windows 10 - Home','Windows 10 64-bit Operating System-Home version','wos10-001',32.00,5),(7,'Cases','Lian Li PC011-Dynamic','Lian desktop case- 20x8 - Gun Metal Black','LLP-002',168.00,5),(8,'Power Supply','650W Seasonic Focus+ Gold','650 Watt Seasonic Desktop Power Supply','sfp650-002',95.00,5),(9,'Processors','Intel Core-i7 ','Intel i7 10700K processor - desktop','icp7-002',250.00,5),(10,'Graphics Cards','Nvidia GetForce RTX 3080 10GB','Nvidia GetForce - 10GB Graphics Processor - desktop','ngf80-002',700.00,5),(11,'RAM','T-Force DDR4 32GB ','T-Force 32GB(2x16GB) Dark Za DDR4 @3,600Mhz','ttf32-002',159.00,5),(12,'Storage','Sabrant Rocket 4 - 1TB','1TB SSD Sabrant Rocket 4.0 M.2 PCIe 4.0 ','sbr4-002',150.00,5),(13,'Storage','Western Digital Caviar 1TB','1TB HDD - Western Caviar Blue 7200  - desktop','wdc1-002',45.00,5),(14,'Cases','Corsair 4000D AirFlow','Corsair AirFlow vented desktop case- 10x8 ','caa4-003',95.00,5),(15,'Power Supply','450W EVGA 450 ','450W EVGA 450 BR 80+ Bronze power supply','evga450-003',50.00,5),(16,'Processors','Intel Core-i3 ','Intel i3 10100K processor - desktop','icp3-003',159.00,5),(17,'Graphics Cards','Nvidia GetForce RTX 3060 10GB','Nvidia GetForce - 12GB Graphics Processor - desktop','ngf60-003',400.00,5),(18,'RAM','G. Skill Aegis 16GB ','Aegis 16GB(2x8GB) DDR4 @3,200Mhz','gsa16-003',76.00,5),(19,'Storage','Samsung 970 Evo+ 250GB','Samsung Evo+ SSD 250GB M.2 PCIe 3.0','sep250-003',150.00,5),(20,'Storage','Seagate Barracuda 1TB','Seagate Barracuda 1TB 7200  - desktop','sgb1-003',45.00,5),(21,'Cases','Phanteks Shift 2 Air','Phanteks Shift 2 Air desktop case- 7.3x19.3x10.8 ','psa2-004',100.00,5),(22,'Power Supply','450W Corsair CV','450W Corsair CV 80+ Bronze power supply','ccv450-004',29.00,5),(23,'Processors','AMD Athelon 300G','AMD Athelon 300G processor - desktop','amdA3-004',106.00,5),(24,'RAM','Crucial Ballistic RAM 16GB ','Crucial Ballistic RAM 16GB(2x8GB) DDR4 @3,200Mhz','cb16-004',72.00,5),(25,'Storage','WD Black SN750 500GB','Western Digital Black 500GB SSD M.2 PCIe 3.0','wdb500-004',69.00,5),(26,'RAM','G.Skills Trident Z DDR4-32G','Trident Z 32G(2/16GB) Neo RGB DDR4 @3,600MHz','gst32-001',199.99,5),(27,'Cases','Phanteck Enthro Pro 2','Phanteck desktop case- 20x8 Tempered Glass','pep2-001',147.50,5);
UNLOCK TABLES;
CREATE TABLE \`purchases\` (
  \`purch_id\` tinyint NOT NULL AUTO_INCREMENT,
  \`cust_email\` varchar(80) NOT NULL,
  \`purchDate\` varchar(20) NOT NULL,
  \`ccType\` enum('Visa','MasterCard','Discover','Checking','American Express') NOT NULL,
  \`cardNum\` varchar(20) NOT NULL,
  \`items\` text NOT NULL,
  PRIMARY KEY (\`purch_id\`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES \`purchases\` WRITE;
INSERT INTO \`purchases\` VALUES (1,'jjones@gmail.com','11/16/2021','Visa','1234','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":1},{\"sku\":\"caa4-003\",\"price\":95,\"qty\":1}]'),(2,'jsmith@gmail.com','12/7/2021','MasterCard','21345','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":1}]'),(3,'jsmith@gmail.com','12/7/2021','Visa','233420','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":1}]'),(4,'jsmith@gmail.com','12/7/2021','Visa','12334','[{\"sku\":\"caa4-003\",\"price\":95,\"qty\":1},{\"sku\":\"pep2-001\",\"price\":147.5,\"qty\":1}]'),(5,'jsmith@gmail.com','12/7/2021','Visa','4355667','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":1},{\"sku\":\"caa4-003\",\"price\":95,\"qty\":1}]'),(6,'mzinzun@hotmail.com','12/7/2021','Visa','12345','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":1},{\"sku\":\"pep2-001\",\"price\":147.5,\"qty\":1}]'),(7,'mzinzun@hotmail.com','12/7/2021','MasterCard','21345','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":1},{\"sku\":\"cmp400-001\",\"price\":115,\"qty\":1},{\"sku\":\"wdb6-001\",\"price\":130,\"qty\":1},{\"sku\":\"icp7-002\",\"price\":250,\"qty\":1},{\"sku\":\"icp3-003\",\"price\":159,\"qty\":1}]'),(8,'mzinzun@hotmail.com','12/7/2021','Checking','2343','[{\"sku\":\"LLP-002\",\"price\":168,\"qty\":\"4\"},{\"sku\":\"psa2-004\",\"price\":100,\"qty\":\"2\"},{\"sku\":\"ttf32-002\",\"price\":159,\"qty\":\"3\"},{\"sku\":\"icp9-001\",\"price\":350,\"qty\":1},{\"sku\":\"amdA3-004\",\"price\":106,\"qty\":\"4\"}]'),(9,'mzinzun@hotmail.com','12/7/2021','Visa','12234','[{\"sku\":\"wos10-001\",\"price\":32,\"qty\":\"5\"}]');
UNLOCK TABLES;`

module.exports = sql1;