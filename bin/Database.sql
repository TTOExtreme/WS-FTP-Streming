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
    