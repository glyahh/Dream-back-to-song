梦回宋朝 · Sql_script 数据库脚本说明
================================

本文件夹用途：
  存放 MySQL 建库、建表与演示种子数据脚本，与《数据库设计文档》及后端 MyBatis 实体对齐。
  种子数据与前端静态/mock 数据（marketProducts.js、discover.vue、me 各页 mock）保持一致。

文件说明：
  00_create_database.sql  创建库 dream_back_to_song（utf8mb4）
  01_schema.sql             全部表结构（22 张表，含 product_tags）
  02_seed_data.sql          演示种子数据（开发环境可重复执行）

推荐执行顺序（在项目根目录或本目录下执行）：
  mysql -u root -p < 00_create_database.sql
  mysql -u root -p dream_back_to_song < 01_schema.sql
  mysql -u root -p dream_back_to_song < 02_seed_data.sql

说明：
  - 生产环境通常只执行 00 + 01，不执行 02。
  - 02 开头会清空种子相关表后重新插入，请勿在生产库运行。
  - 后端配置见 Dream-Back-To-Song_backend/src/main/resources/application-dev.yml
