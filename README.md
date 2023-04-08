# Thesis Project - Track 2: Zincom Computer Solutions
### Created by Michael Zinzun
### completed Dec 22, 2021

# Thesis Project overview and objective
This Thesis Project is intended to build on the competency-project site which Models a complete site with business services. This Project demonstrates self-directed learning by choosing and explaining a feature utilizing a technology or feature that was not taught in the core curriculum. The objective is to develop a full stack, fully functional web site – especially with business data management included. The Thesis project builds on this objective by including SQL database and Authentication technologies that were not a part of the track 2 curriculum. Small businesses need to be able to receive and manage customer data as well as interact with customers. 

## RESEARCH & EXPLANATION: The technologies beyond MERN utilized for this project include MySQL database and Expresses' PassPort authentication module
### <b>PASSPORT</b>

    PassPort is an Express session-based authentication middleware used for allowing secure communication between the browser user and server. This method of authentication is "server-side", which means our Express application and database work together to keep the current authentication status of each user that visits our application. While Passport is able to use Tokens and store data in browser LocalStorage, the version of PassPort I am using is session-cookie based. The cookie data is encrypted and only stores minimal user information needed to verify with the server. PassPort also allows optional Database session stores and password encryption. 

    The greatest strength of PassPort is its flexibilty and modularity through use of “Strategies”. It allows you to use pre-built strategies for third-party authentication such as Google or Facebook. Or the developer can use a custom “local” strategy that makes use of local assets. My application of PassPort uses a basic “local” strategy checking authentication from a ‘username’ and ‘password’ retrieved from a login form and compared to a database table of authorized users. The Database creation also allows for using added fields for authorization.

### <b>MySQL</b>

	SQL is a relational database, meaning it is modeled to relate database tables effectively.  My Thesis project is making use of MySQL – an OpenSource version of the popular database.  Primarily, relationship functionality is performed through indexing and relating redundant data among tables.  Consequently, SQL is a highly structured database. These features are quite different from MongoDB which is an ODM – Object Document Model. Where Mongo allows different Document sizes (equivalent to SQL records), SQL requires uniform pre-defined table definitions. ODM’s also allow you to change ‘Schemas’ after creation with little data interruption.  SQL is much more strict with regards to Table schemes and structures.  MySQL makes use of command line development or use of the MYSQL workbench. SQL scripts can be easily written and saved for reuse.

	By far, the greatest strength of SQL is its strict structure and joining of multiple tables (hence the term relational).  Because the structure is strict, it doesn't allow for mistakes in design.  It also makes data structure and storage more clearly defined. The other strength is SQL’s age (It’s first standards were developed in the mid 80’s), which shows staying power.  The age has also allowed many of the issues and bugs to be worked out.  SQL is a widely supported database. 


# Getting Started:
## <em>Configure Database:</em>
         Database connections happen through the Nodejs mysql2 (for mysql 8.) module.  I also added a SQL query that creates the zincomdb Schema, tables, and data at startup if they do not exist. There are no steps needed to startup the MySQL database.

        ** Note: The root user password for MySQL must be 'dev1root'. 

## <em>Install Dependencies:</em>
        Dependency are installed from your terminal using npm. From your terminal, download the zincomCS folder. In the zincomCS folder are 2 sub-folders: client and server.  Each folder contains a portion of the project development MERN stack. You MUST install dependencies for each folder . To do this: 

        1. From the zincomCS folder, go to the server folder (e.g from bash: cd server) 
        2. insure that package.json exist in the folder
        3. type npm install (You will see the installation process start)
        4. When process completes return to  zincomCS folder (e.g. from bash: cd ..).
        5. From the zincomCS folder, go to client folder and repeat 2 through 4

##  <em>Starting the site:</em>
### To use the web site you must first start the web server and then start client index page. 
> <b>How to start and access the servers</b><br>

        1. From the zincomCS folder, go to the server folder (e.g from bash: cd server) 
        2. type npm start: you will see a console message telling you:
                'Zincom Server now running on port 8000'
                'connected as id 26' (id # may vary)
                'connected to zincomdb Database'
                -- The terminal window is now being used by the server.
                -- Press <ctl>-c  to stop server when finished using server
        3. In a new terminal window,  from the zincomCS folder, go to the client folder 
        4. type npm start: you will see a console message telling you: 'You can now view client in the browser.
                On Your Network:  http://<ip address>:3000' 
        5. -- You can now go to your browser and type: 'http://localhost:3000' to start the web site (this project is using react-scripts so the browser should automatically open to the site)

## Using the front-end as a typical user

***

Zincom Computer solutions is a Computer Services site for serving computers, including purchasing parts.  The menu consists of 4 pages: <b>Home, Products, Contact Us, and About Us</b>.  All pages are functional but the project focuses on the <b>Products</b> page.  This is where you will find the most functionality.  <br><p>

><b>Here You Can:</b>
>- See List of available products and prices by catagory
>- Select Items to Purchase
>- Access Checkout page to make purchases
>- When making a purchase, customer data is stored in database
>- view purchasing history with purchaing email

<p>In addition to these functions, the <b>Contact Us</b> page let's you leave comments, and the <b>About Us</b> page has links to <b>Contact Us</b> and <b>Products</b> pages.</p>

><b>Sample Data</b>
><p>The site comes with sample Data for example use. The sample data include:<p>
> 
>- 27 detailed computer products of various catagories and prices
>- 3 sets of complete customer info including email and purchasing history:
>   - Jane Smith,  jsmith@gmail.com
>   - John Jones, jjones@gmail.com
>   - Michael Zinzun, mzinzun@hotmail.com

## Using the front-end as a administrator through Portal

***

The function of the employee Portal is to allow data administrators to manage and analyze company data.  There are three sections to the Portal page: Menu section, Form/Analytic section, and Table view.  When a user selects a table to view, the associated form is displayed and populated with the first record.  In addition, a full table query is displayed..

>> ### <b>Signing In</b>
> 
>  <b>My Zincom Database comes with 2 employee users for employee signin.</b>
> - Michael, Zinzun, <b>username:</b> <em>mzinzun@zincom.net</em>,  <b>password:</b> <em>mzinzun</em>, <b>position:</b>  <em>admin</em>
> - Robert, Simms, <b>username:</b> <em>rsimms@zincom.net</em>, <b>password:</b> <em>rsimms</em>,  <b>position:</b> <em>Shipping</em>
>
> <b> ** The Employee Portal Sign in link is discretely placed in the page Footer at 'Zincom Computer Solution' </b><br>
> <b> **  Click on 'Zincom' in the footer to reach Portal login. </b>
>
> <b>Some examples of Administrative tasks through Portal:</b>
>- manage customer and empoyee information
>- Reset employee passwords.
>- Product data can be updated or analyzed
>- Purchase orders viewed and marked shipped.      
>- Inventory viewed and updated
> 
> 


