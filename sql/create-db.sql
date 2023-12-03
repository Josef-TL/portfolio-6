drop database if exists cafes;
create database cafes;
use cafes;

drop table if exists cafes;
drop table if exists users;
drop table if exists favorites;

create table cafes (
cafe_id int auto_increment,
cafe_name varchar(255) NOT NULL,
city varchar(255) NOT NULL,
cost int,
`type` varchar(255),
study varchar(255),
primary key (cafe_id)
);
create table users (
user_id int auto_increment,
user_name varchar(255) not null,
first_name varchar(255),
last_name varchar(255),
email varchar(255) unique,
primary key (user_id)

);
create table favorites (
	cafe_id int,
    user_id int,
    foreign key (cafe_id) references cafes(cafe_id),
    foreign key (user_id) references users(user_id)
);


insert into cafes(cafe_name,city,cost,`type`,study) 
values 
('minas','copenhagen',3,'fancy','no'),
('cat cafe','aarhus',7,'cozy','yes'),
('broke boi','roskilde',1,'bar','no');

insert into users(user_name,first_name,last_name,email) 
values
('jtl','josef','tonnesen-lucas','jtl@email.com'),
('jens','jens','nielsen','jens@email.com');

insert into favorites(user_id,cafe_id)
values (1,1);