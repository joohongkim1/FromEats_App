show databases;
use mysql;
select @@global.sql_mode;
show tables;
use deploydb;
show tables;
desc api_review_user;



select * from api_review_user;
show variables like 'char%';

show variables like 'sql_mode';
show global variables like 'sql_mode';
SET GLOBAL sql_mode = 'modes';
SET SESSION sql_mode = 'modes';

# insert 에러 푸려고 이렇게 모드 변환
set @@global.sql_mode = "ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION";




select * from api_review_user;
select * from api_store;
select * from api_review;
select * from api_menu;
select * from api_hour;
select * from account_user;
select * from account_emailaddress;
select * from account_emailconfirmation;
select * from auth_user;

drop table account_user;

delete from django_migrations where app = 'account';






drop table api_hour;
drop table api_menu;
drop table api_review_user;
drop table api_review;
drop table account_user;
drop table api_store;
drop table auth_group;
drop table auth_user;
drop table auth_user_groups;
drop table auth_group_permissions;
drop table auth_user_user_permissions;
drop table authtoken_token;
drop table auth_permission;
drop table django_admin_log;
drop table django_content_type;
drop table django_migrations;
drop table django_session;
drop table account_emailconfirmation;
drop table account_emailaddress;
drop table socialaccount_socialaccount;
drop table socialaccount_socialapp;
drop table socialaccount_socialapp_sites;
drop table socialaccount_socialtoken;
drop table django_site;




set global net_buffer_length=1000000; 
set global max_allowed_packet=1000000000;


# for view


SELECT
    s.id,
    s.store_name,
    r.content,
    m.menu_name
FROM api_store s
LEFT JOIN api_review r ON s.id=r.store_id
LEFT JOIN api_menu m ON s.id=m.store_id;





# rating dict 확인위함
SELECT
    s.id,
    s.store_name,
    s.big_cate,
    r.content,
    r.score,
    u.id
FROM api_storenew s
LEFT JOIN api_review r ON s.id=r.store_id
LEFT JOIN api_review_user u ON r.user_id=u.id
where r.user_id = 7;

SELECT
    m.mem_id,
    l.like_no,
    l.post_no,
    p.post_title,
    p.post_category,
    p.post_regtime,
    p.post_city,
    p.post_hits
FROM members m
LEFT JOIN likes l ON m.mem_no = l.liker_mem_no AND l.like_del_check=FALSE AND l.like_type = 1
LEFT JOIN post p ON l.post_no = p.post_no AND p.post_del_check=FALSE
		WHERE m.mem_no = 2 AND m.mem_del_check = FALSE; 
        select * from post;



# for detail page
SELECT
	l.id,
	l.store_id,
    l.store_name,
    l.lifestyle, 
    l.branch, 
    l.area,
    l.tel,
    l.address,
    l.latitude,
    l.longitude,
    l.category,
    l.big_cate,
    l.mean_score,
    l.ratio,
    m.menu_name,
    m.price,
    h.start_time,
    h.end_time,
    r.user_id,
    r.content,
    r.reg_time
FROM api_lifestyle l
LEFT JOIN api_menu m on l.store_id = m.store_id
LEFT JOIN api_hour h on l.store_id = h.store_id
LEFT JOIN api_review r on l.store_id = r.store_id;
