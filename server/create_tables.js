const mysql = require('mysql');
const nconf = require('./config');
const connection = mysql.createConnection(nconf.get('db'));

exports.create_tables = function () {

    connection.connect();

    let createUsers = `create table if not exists Users(
                          user_id int primary key auto_increment,
                          email varchar(255) not null unique,
                          username varchar(255) not null unique,
                          password varchar(255) not null
                      ) character set=utf8`;

    connection.query(createUsers);

    let createGroups = `create table if not exists Groups(
                          group_id int primary key auto_increment,
                          name varchar(255) not null,
                          user_id int,
                          FOREIGN KEY (user_id) REFERENCES Users(user_id)
                          on update cascade
                          on delete cascade
                      ) engine=innodb character set=utf8`;

    connection.query(createGroups);

    let createTasks = `create table if not exists Tasks(
                          task_id int primary key auto_increment,
                          name varchar(255) not null,
                          checked bit(1) not null,
                          group_id int,
                          foreign key (group_id) references Groups(group_id)
                          on update cascade
                          on delete cascade
                      ) engine=innodb character set=utf8`;

    connection.query(createTasks);

};