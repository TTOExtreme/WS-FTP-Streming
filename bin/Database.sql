Create Database WS_Podcast;
Create User 'WS_Podcast'@'localhost' identified by 'TTO@WS2019';
grant all privileges on WS_Podcast.* to 'WS_Podcast'@'localhost';
flush privileges;

use WS_Podcast;
create table _Users(
	id INT(10) primary key auto_increment,
    user VARCHAR(100),
    username VARCHAR(100),
    UUID VARCHAR(4096),
    pass VARCHAR(4096),
    lastLogin VARCHAR(100)
    
    );
create table _Podcasts(
	id INT(10) primary key auto_increment,
    title VARCHAR(400),
    description VARCHAR(4096),
    biggerbox int(1),
    folder varchar(64)
    
    );

update WS_Podcast._Podcasts set biggerbox=0 where biggerbox=1;

insert into WS_Podcast._Users (user,username,pass) value('admin','Administrador','857b47cfadee1b62e6057c23d3cb880e7d5c5c19edcd95c71d3a0b4a0164c21445d3afa8acecc86099d54c9696db0e5a953634b44b1652fbdf5838bff97f3d4b');
    

    