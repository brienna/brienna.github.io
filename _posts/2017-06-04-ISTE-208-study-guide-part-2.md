---
layout: post
title: ISTE-608 Study Guide, Part 2
date: 2017-06-04
comments: true
---

*This post is the second in a series that serves as a study guide for the ISTE-608 waiver exam at the Rochester Institute of Technology.*

### WRITTEN EXAM, CONT.

### State what data modeling is and why it is important.

Data modeling describes the logical structure of a database. It is an important step in database design and implementation, since the data model is used as the basis for the creation of the physical structure.

The Entity-Relationship Model (ERM) is the widely accepted standard for data modeling. Normally represented in an Entity-Relationship Diagram (ERD), the ERM uses graphical representations to model the database's main components: entities, attributes, and relationships. 

### **Define and contrast the terms Relation, Attribute, and Tuples, as they pertain to the relational model.**
 
Relation — (table) a set of tuples that have the same attributes, represents an entity class. 

Attribute — (column) a name paired with a data type (or domain), represents a property of the entity. 

Tuple — (row) a set of attribute values, represents an entity instance.

![relational model terms](/assets/06-04-17/relational database terms.png)

### Describe and identify the difference between an Entity Class and an Entity Instance.

An entity class, is a group of entities of the same type, whereas an entity instance is a particular entity. 

In the relational database, an entity class is mapped to a table, and an entity instance corresponds to a tuple. 

### Recognize the following, when given an ER diagram, and state what the meaning is: Entity, Attribute (simple vs composite; single-valued vs multi-valued, stored vs derived, and identifier).

![types of attributes](/assets/06-04-17/attributes.png){: .center-image }
 
Entity — Real-world object or concept. Term refers to the entity class, not the entity instance.
 
Attribute — Descriptive property of the entity.

<u>Types of attributes:</u><br>
Simple attribute — Atomic.

Composite attribute — Contains sub-attributes. 

Single-valued attribute — Contains a single value.

Multi-valued attribute — Contains multiple values. 

Stored attribute — Value is physically stored in the database. 

Derived attribute — Value is derived from other attributes. 

Identifier attribute — Uniquely identifies a particular entity instance.

### Compare and contrast the Chen notation and the Crow’s foot notation.
 
The Chen notation favors conceptual modeling, whereas the Crow’s Foot notation favors a more implementation-oriented approach.

### Describe what an identifier is and its usage.
 
An identifier, or primary key, is an attribute(s) whose value is unique for each entity instance and thus identifies that particular entity instance.

### Appropriately represent simple identifiers and composite identifiers, using either Chen or Crow’s feet notation.

### Describe a composite identifier. 
 
A simple identifier is composed of a single attribute, whereas a composite identifier, or composite key, is a set of attributes. 

### List the steps involved in creating a database.
 
Steps differ between resources. Below are the [guidelines](https://support.office.com/en-US/article/Database-design-basics-EB2159CF-1E30-401A-8084-BD4F9C9CA1F5) provided by Microsoft Access:

1. Determine the purpose of the database.
2. Find and organize the information required. 
3. Divide the information into major entities, or tables.
4. Turn information items into columns. 
5. Specify primary keys. 
6. Set up the table relationships. 
7. Refine the design.
8. Apply the normalization rules. 
 
*NOTE: I will update this list when I find/understand a better one.* 

### Transpose an ER diagram, with Chen or Crow’s Feet notation, of a single entity into a relation.

<u>Basic rules:</u><br>
Each entity always corresponds to a relation. 
 
Simple attributes correspond to columns, with the identifier attribute(s) underlined. 

Composite attributes are merged into the same relation the same way as simple attributes.

Multi-valued attributes get their own relations. Within each new relation, add the identifier attribute of the parent entity as a foreign key. 

Derived attributes can be ignored, since they are not physically stored in the database.

<u>ER diagram, with Chen notation:</u>

![types of attributes](/assets/06-04-17/ER-diagram.png){: .center-image }

<u>Relations:</u>

Person(<u>SSN</u>, FirstName, LastName, Address, Birthdate)

Hobby(<u>SSN</u>, <u>Hobby</u>)



