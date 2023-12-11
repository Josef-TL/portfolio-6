drop database if exists cafes;
create database cafes;
use cafes;

drop table if exists cafes;
drop table if exists business_hours;
drop table if exists users;
drop table if exists favorites;

create table cafes (
cafe_id int auto_increment,
cafe_name varchar(255) NOT NULL,
location varchar(255) NOT NULL,
cost varchar(255),
wifi boolean,
noise varchar(255),
food boolean,
`group` boolean,
gluten boolean,
vegetarian boolean,
pets boolean,
primary key (cafe_id)
);

create table business_hours (
	cafe_id int NOT NULL,
    `day` int,
    open_time time,
    close_time time,
    foreign key (cafe_id) references cafes(cafe_id)
);


create table users (
user_id varchar(60),
user_name varchar(255) not null,
first_name varchar(255),
last_name varchar(255),
email varchar(255) unique,
primary key (user_id)
);


create table favorites (
	cafe_id int,
    user_id varchar(60),
    foreign key (cafe_id) references cafes(cafe_id),
    foreign key (user_id) references users(user_id)
);


insert into cafes(cafe_name, location, cost, wifi, noise, food, `group`, gluten, vegetarian, pets)
values
('minas','nørrebro','low',true,'middle',true,false,true,true,false),
('Study Brew','nørrebro','low',true,'low',true,true,false,true,false),
('Code Corner','Frederiksberg','middle',true,'middle',true,false,true,true,true),
('Espresso Emporium','Østerbro','high',true,'low',false,true,false,true,true),
('Green Grind','Vesterbro','middle',true,'low',true,false,true,true,false),
('The Latte Lounge','Indre By','low',true,'middle',true,false,true,true,false),
('Nordic Nook','Christianshavn','middle',true,'high',true,false,true,true,false),
('The Artisan\'s Brew','Valby','low',true,'low',true,false,true,true,false),
('Café Cerebral','nørrebro','low',true,'middle',true,false,true,true,false),
('Bibliotek Barista','nørrebro','low',true,'middle',true,false,true,true,false);

insert into business_hours (cafe_id, `day`, open_time, close_time)
values
(1,0,100000,160000),
(1,1,080000,170000),
(1,2,080000,170000),
(1,3,080000,170000),
(1,4,080000,170000),
(1,5,080000,170000),
(1,6,100000,160000),
(2,0,100000,160000),
(2,1,080000,170000),
(2,2,080000,170000),
(2,3,080000,170000),
(2,4,080000,170000),
(2,5,080000,170000),
(2,6,100000,160000),
(3,0,100000,160000),
(3,1,080000,170000),
(3,2,080000,170000),
(3,3,080000,170000),
(3,4,080000,170000),
(3,5,080000,170000),
(3,6,100000,160000),
(4,0,100000,160000),
(4,1,080000,170000),
(4,2,080000,170000),
(4,3,080000,170000),
(4,4,080000,170000),
(4,5,080000,170000),
(4,6,100000,160000),
(5,0,100000,160000),
(5,1,080000,170000),
(5,2,080000,170000),
(5,3,080000,170000),
(5,4,080000,170000),
(5,5,080000,170000),
(5,6,100000,160000),
(6,0,100000,160000),
(6,1,080000,170000),
(6,2,080000,170000),
(6,3,080000,170000),
(6,4,080000,170000),
(6,5,080000,170000),
(6,6,100000,160000),
(7,0,100000,160000),
(7,1,080000,170000),
(7,2,080000,170000),
(7,3,080000,170000),
(7,4,080000,170000),
(7,5,080000,170000),
(7,6,100000,160000),
(8,0,100000,160000),
(8,1,080000,170000),
(8,2,080000,170000),
(8,3,080000,170000),
(8,4,080000,170000),
(8,5,080000,170000),
(8,6,100000,160000),
(9,0,100000,160000),
(9,1,080000,170000),
(9,2,080000,170000),
(9,3,080000,170000),
(9,4,080000,170000),
(9,5,080000,170000),
(9,6,100000,160000),
(10,0,100000,160000),
(10,1,080000,170000),
(10,2,080000,170000),
(10,3,080000,170000),
(10,4,080000,170000),
(10,5,080000,170000),
(10,6,100000,160000);


insert into users(user_id,user_name,first_name,last_name,email)
values
('1','jtl','josef','tonnesen-lucas','jtl@email.com'),
('2','jens','jens','nielsen','jens@email.com');

insert into favorites(user_id, cafe_id)
values (1,1);