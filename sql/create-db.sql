drop database if exists cafes;
create database cafes;
use cafes;

drop table if exists cafes;
drop table if exists business_hours;
drop table if exists users;
drop table if exists favorites;

create table users (
user_id varchar(60),
user_name varchar(255) not null,
first_name varchar(255),
last_name varchar(255),
email varchar(255) unique,
primary key (user_id)
);

create table cafes (
cafe_id int auto_increment,
user_id varchar(60),
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
open_time time,
close_time time,
primary key (cafe_id),
foreign key (user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
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

insert into users(user_id,user_name,first_name,last_name,email)
values
('1','jtl','josef','tonnesen-lucas','jtl@email.com'),
('2','jens','jens','nielsen','jens@email.com');

insert into favorites(user_id, cafe_id)
values (1,1);