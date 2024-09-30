

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gen_table
-- ----------------------------
DROP TABLE IF EXISTS `gen_table`;
CREATE TABLE `gen_table`  (
  `table_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `table_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'Table Name',
  `table_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'Table Description',
  `sub_table_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'associated child table',
  `sub_table_fk_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'foreign key associated with the child table',
  `class_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'class name',
  `tpl_category` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'crud' COMMENT 'Templates used (crud single table operation tree Tree table operation)',
  `package_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'packet path',
  `module_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'module name',
  `business_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'business name',
  `function_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Business Description',
  `function_author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'author',
  `gen_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT 'Zip package or whatever（0zip 1other）',
  `gen_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '/' COMMENT 'path',
  `options` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'options',
  `internationalize` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '1/0  i18n/not i18n',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'remark',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`table_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Code generation business table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gen_table
-- ----------------------------
INSERT INTO `gen_table` VALUES (20, 't_demo_test_one', 'Demo Test 1', NULL, NULL, 'DemoTestOne', 'crud', 'system/src', 'system', 'demoTestOne', 'Demo Test 1', 'ruoyi', '0', '/', NULL, '0', NULL, 'admin', '2024-09-30 13:09:49', '', NULL);

-- ----------------------------
-- Table structure for gen_table_column
-- ----------------------------
DROP TABLE IF EXISTS `gen_table_column`;
CREATE TABLE `gen_table_column`  (
  `column_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `table_id` int(0) NULL DEFAULT NULL COMMENT 'Generate table ID',
  `column_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'column name',
  `column_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'column comment',
  `column_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'column type',
  `java_type` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'nestjs type',
  `java_field` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'nestjs field name',
  `is_pk` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'is primary key（1 YES）',
  `is_increment` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'is increment（1YES）',
  `is_required` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'required in form（1Yes）',
  `is_insert` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'show in create form（1Yes）',
  `is_edit` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'show in update form（1Yes）',
  `is_list` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'show in table list（1Yes）',
  `is_query` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'show in query form（1Yes）',
  `query_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'EQ' COMMENT 'Query Type（eq、!= 、>、<、range）',
  `html_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'react component type（Text、Textarea、Select、Checkbox、Radio、DateTimePicker）',
  `dict_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'use dictionary as data source for select or radio',
  `sort` int(0) NULL DEFAULT NULL COMMENT 'sort',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'create by',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT 'create time',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'update by',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT 'update time',
  PRIMARY KEY (`column_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 191 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'The code generates business table fields' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gen_table_column
-- ----------------------------
INSERT INTO `gen_table_column` VALUES (191, 20, 'test_id', 'ID', 'int', 'number', 'testId', '1', '1', '0', '0', '1', '0', '0', 'EQ', 'input', '', 1, 'admin', '2024-09-30 13:09:49', 'admin', '2024-09-30 13:09:49');
INSERT INTO `gen_table_column` VALUES (192, 20, 'test_name', 'Test Name', 'varchar', 'string', 'testName', '0', '0', '0', '1', '1', '1', '1', 'LIKE', 'input', '', 2, 'admin', '2024-09-30 13:09:49', 'admin', '2024-09-30 13:09:49');
INSERT INTO `gen_table_column` VALUES (193, 20, 'test_type', 'Test Type', 'char', 'string', 'testType', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'select', '', 3, 'admin', '2024-09-30 13:09:49', 'admin', '2024-09-30 13:09:49');
INSERT INTO `gen_table_column` VALUES (194, 20, 'status', 'Status', 'int', 'number', 'status', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'radio', '', 4, 'admin', '2024-09-30 13:09:50', 'admin', '2024-09-30 13:09:50');
INSERT INTO `gen_table_column` VALUES (195, 20, 'test_content', 'Content', 'varchar', 'string', 'testContent', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'textarea', '', 5, 'admin', '2024-09-30 13:09:50', 'admin', '2024-09-30 13:09:50');
INSERT INTO `gen_table_column` VALUES (196, 20, 'start_date', 'Start Time', 'datetime', 'Date', 'startDate', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'datetime', '', 6, 'admin', '2024-09-30 13:09:50', 'admin', '2024-09-30 13:09:50');
INSERT INTO `gen_table_column` VALUES (197, 20, 'remark', 'Remark', 'varchar', 'string', 'remark', '0', '0', '0', '1', '1', '1', '1', 'EQ', 'input', '', 7, 'admin', '2024-09-30 13:09:50', 'admin', '2024-09-30 13:09:50');
INSERT INTO `gen_table_column` VALUES (198, 20, 'create_by', 'Create By', 'varchar', 'string', 'createBy', '0', '0', '0', '0', '0', '0', '0', 'EQ', 'input', '', 8, 'admin', '2024-09-30 13:09:50', 'admin', '2024-09-30 13:09:50');
INSERT INTO `gen_table_column` VALUES (199, 20, 'create_time', 'Create Time', 'datetime', 'Date', 'createTime', '0', '0', '0', '0', '0', '0', '0', 'EQ', 'datetime', '', 9, 'admin', '2024-09-30 13:09:50', 'admin', '2024-09-30 13:09:50');
INSERT INTO `gen_table_column` VALUES (200, 20, 'update_by', 'Update By', 'varchar', 'string', 'updateBy', '0', '0', '0', '0', '0', '0', '0', 'EQ', 'input', '', 10, 'admin', '2024-09-30 13:09:51', 'admin', '2024-09-30 13:09:51');
INSERT INTO `gen_table_column` VALUES (201, 20, 'update_time', 'Update Time', 'datetime', 'Date', 'updateTime', '0', '0', '0', '0', '0', '0', '0', 'EQ', 'datetime', '', 11, 'admin', '2024-09-30 13:09:51', 'admin', '2024-09-30 13:09:51');

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `config_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'config name',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'key name',
  `config_value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'key value',
  `config_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N' COMMENT 'is built-in（Y or N）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'remark',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'create by',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT 'create time',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'update by',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT 'update time',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Parameter configuration table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, 'Main frame page - Default style name', 'sys.index.skinName', 'skin-blue', 'Y', '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_config` VALUES (2, 'User Management - Initial password of the account', 'sys.user.initPassword', '123456', 'Y', 'Initialize password 123456', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_config` VALUES (3, 'Main frame page - Sidebar theme', 'sys.index.sideTheme', 'theme-dark', 'Y', '深色主题theme-dark，浅色主题theme-light', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_config` VALUES (4, 'Account self-service - Whether to enable the user registration function', 'sys.account.registerUser', 'false', 'Y', ' enable the function for registering users (true enable, false disable)', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_config` VALUES (5, 'User login - Blacklist list', 'sys.login.blackIPList', '', 'Y', 'x`', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_config` VALUES (6, '11', '22', '22', 'N', '22', 'admin', '2024-09-29 10:28:02', 'admin', '2024-09-29 11:22:31');

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `dept_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parent_id` int(0) NULL DEFAULT 0 COMMENT 'parent dept id',
  `ancestors` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'ancestors',
  `dept_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'department name',
  `order_num` int(0) NULL DEFAULT 0 COMMENT 'sort num',
  `leader` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'leader',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'tel.',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'email',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT 'department status（0enable 1disable）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT 'delete flag（0using 1deleted）',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'remark',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'create by',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT 'create time',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'update by',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT 'update time',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 110 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Department table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (100, 0, '0', 'RUOYI Technology company', 0, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (101, 100, '0,100', 'Peking Head office', 1, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (102, 100, '0,100', 'ChongQing Head office', 2, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (103, 101, '0,100,101', 'Development', 1, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (104, 101, '0,100,101', 'Marketing', 2, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (105, 101, '0,100,101', 'Testing', 3, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (106, 101, '0,100,101', 'Financial', 4, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (107, 101, '0,100,101', 'Maintenance', 5, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (108, 102, '0,100,102', 'Marketing', 1, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_dept` VALUES (109, 102, '0,100,102', 'Financial', 2, 'RUOYI', '15888888888', 'ry@qq.com', '0', '0', NULL, 'admin', '2024-09-06 03:51:03', '', NULL);

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `dict_code` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dict_sort` int(0) NULL DEFAULT 0,
  `dict_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `dict_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `css_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `is_default` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N',
  `is_number` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0enable 1disable）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`dict_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Dictionary data table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES (1, 1, 'Male', '0', 'sys_user_sex', '', '', 'Y', 'Y', '0', '', 'admin', '2024-09-06 03:51:04', 'admin', '2024-09-27 15:53:34');
INSERT INTO `sys_dict_data` VALUES (2, 2, 'Female', '1', 'sys_user_sex', '', '', 'N', 'Y', '0', '', 'admin', '2024-09-06 03:51:04', 'admin', '2024-09-27 15:53:38');
INSERT INTO `sys_dict_data` VALUES (3, 3, 'Unknown', '2', 'sys_user_sex', '', '', 'N', 'Y', '0', '', 'admin', '2024-09-06 03:51:04', 'admin', '2024-09-27 15:53:42');
INSERT INTO `sys_dict_data` VALUES (4, 1, 'Show', '0', 'sys_show_hide', '', 'primary', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (5, 2, 'Hide', '1', 'sys_show_hide', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (6, 1, 'Enable', '0', 'sys_normal_disable', '', 'primary', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (7, 2, 'Disable', '1', 'sys_normal_disable', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (8, 1, 'Runing', '0', 'sys_job_status', '', 'primary', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (9, 2, 'Pause', '1', 'sys_job_status', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (10, 1, 'Default', 'DEFAULT', 'sys_job_group', '', '', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (11, 2, 'System', 'SYSTEM', 'sys_job_group', '', '', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (12, 1, 'Yes', 'Y', 'sys_yes_no', '', 'primary', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (13, 2, 'No', 'N', 'sys_yes_no', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (14, 1, 'Notice', '1', 'sys_notice_type', '', 'warning', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (15, 2, 'Announcement', '2', 'sys_notice_type', '', 'success', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (16, 1, 'Open', '0', 'sys_notice_status', '', 'primary', 'Y', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (17, 2, 'Close', '1', 'sys_notice_status', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (18, 99, 'Other', '0', 'sys_oper_type', '', 'info', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (19, 1, 'Add', '1', 'sys_oper_type', '', 'info', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (20, 2, 'Edit', '2', 'sys_oper_type', '', 'info', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (21, 3, 'Delete', '3', 'sys_oper_type', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (22, 4, 'Auth', '4', 'sys_oper_type', '', 'primary', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (23, 5, 'Export', '5', 'sys_oper_type', '', 'warning', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (24, 6, 'Import', '6', 'sys_oper_type', '', 'warning', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (25, 7, 'Forced Out', '7', 'sys_oper_type', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (26, 8, 'Code Genrate', '8', 'sys_oper_type', '', 'warning', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (27, 9, 'Clear Data', '9', 'sys_oper_type', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (28, 1, 'Success', '0', 'sys_common_status', '', 'primary', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_data` VALUES (29, 2, 'Failed', '1', 'sys_common_status', '', 'danger', 'N', 'N', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `dict_id` int(0) NOT NULL AUTO_INCREMENT,
  `dict_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0enable 1disable）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`dict_id`) USING BTREE,
  UNIQUE INDEX `dict_type`(`dict_type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Dictionary type table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1, 'Gender', 'sys_user_sex', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (2, 'Show_Hide', 'sys_show_hide', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (3, 'Enable_Disable', 'sys_normal_disable', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (4, 'Job Status', 'sys_job_status', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (5, 'Job Group', 'sys_job_group', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (6, 'Y&N', 'sys_yes_no', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (7, 'Notice Type', 'sys_notice_type', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (8, 'Notice Status', 'sys_notice_status', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (9, 'Operate Type', 'sys_oper_type', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_dict_type` VALUES (10, 'Operate Result', 'sys_common_status', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);

-- ----------------------------
-- Table structure for sys_logininfor
-- ----------------------------
DROP TABLE IF EXISTS `sys_logininfor`;
CREATE TABLE `sys_logininfor`  (
  `info_id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'account name',
  `ipaddr` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'login ip',
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `browser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `os` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '(0success 1failed)',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `login_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1018 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'System access record' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_logininfor
-- ----------------------------
INSERT INTO `sys_logininfor` VALUES (1018, 'admin', '::ffff:127.0.0.1', 'loginLocation todo', 'Chrome 129.0.0', 'Windows', '0', 'Login success', '2024-09-30 13:09:37');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` int(0) NULL DEFAULT 0,
  `order_num` int(0) NULL DEFAULT 0,
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'react page component path',
  `query` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'route params',
  `is_frame` int(0) NULL DEFAULT 1 COMMENT 'url or internal component（0-yes 1-no）',
  `is_cache` int(0) NULL DEFAULT 0 COMMENT '（0-cache 1-no cache）',
  `menu_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'menu type（M-Catalogue C- Page F-Permission）',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0-avaliable 1-hide）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0-enable 1-disable）',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'permission character',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '#' COMMENT 'menu icon',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2037 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Menu and permission table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 'System', 0, 1, 'system', NULL, '', 1, 0, 'M', '0', '0', '', 'system', '系统管理目录', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (2, 'Monitor', 0, 2, 'monitor', NULL, '', 1, 0, 'M', '0', '0', '', 'monitor', '系统监控目录', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (3, 'System Tool', 0, 3, 'tool', NULL, '', 1, 0, 'M', '0', '0', '', 'tool', '系统工具目录', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (4, 'Ruoyi', 0, 4, 'http://ruoyi.vip', NULL, '', 0, 0, 'M', '0', '0', '', 'guide', '若依官网地址', 'admin', '2024-09-06 03:51:03', 'admin', '2024-09-28 11:02:50');
INSERT INTO `sys_menu` VALUES (100, 'User', 1, 1, 'user', 'system/user/index', '', 1, 0, 'C', '0', '0', 'system:user:list', 'user', '用户管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (101, 'Role', 1, 2, 'role', 'system/role/index', '', 1, 0, 'C', '0', '0', 'system:role:list', 'peoples', '角色管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (102, 'Menu', 1, 3, 'menu', 'system/menu/index', '', 1, 0, 'C', '0', '0', 'system:menu:list', 'tree-table', '菜单管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (103, 'Department', 1, 4, 'dept', 'system/dept/index', '', 1, 0, 'C', '0', '0', 'system:dept:list', 'tree', '部门管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (104, 'Position', 1, 5, 'post', 'system/post/index', '', 1, 0, 'C', '0', '0', 'system:post:list', 'post', '岗位管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (105, 'Dictionary', 1, 6, 'dict', 'system/dict/index', '', 1, 0, 'C', '0', '0', 'system:dict:list', 'dict', '字典管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (106, 'Configuration', 1, 7, 'config', 'system/config/index', '', 1, 0, 'C', '0', '0', 'system:config:list', 'edit', '参数设置菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (107, 'Notice', 1, 8, 'notice', 'system/notice/index', '', 1, 0, 'C', '0', '0', 'system:notice:list', 'message', '通知公告菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (108, 'Log', 1, 9, 'log', '', '', 1, 0, 'M', '0', '0', '', 'log', '日志管理菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (109, 'Online User', 2, 1, 'online', 'monitor/online/index', '', 1, 0, 'C', '0', '0', 'monitor:online:list', 'online', '在线用户菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (110, 'Schedule', 2, 2, 'job', 'monitor/job/index', '', 1, 0, 'C', '0', '0', 'monitor:job:list', 'job', '定时任务菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (115, 'Code Generation', 3, 2, 'gen', 'tool/gen/index', '', 1, 0, 'C', '0', '0', 'tool:gen:list', 'code', '代码生成菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (116, 'System Api', 3, 3, 'http://localhost:8081/docs', '', '', 0, 0, 'C', '0', '0', 'tool:swagger:list', 'swagger', '系统接口菜单', 'admin', '2024-09-06 03:51:03', 'admin', '2024-09-23 14:11:42');
INSERT INTO `sys_menu` VALUES (500, 'Operation Log', 108, 1, 'operlog', 'system/operlog/index', '', 1, 0, 'C', '0', '0', 'system:operlog:list', 'form', '操作日志菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (501, 'Login Log', 108, 2, 'logininfor', 'system/logininfor/index', '', 1, 0, 'C', '0', '0', 'system:logininfor:list', 'logininfor', '登录日志菜单', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1000, 'User query', 100, 1, '', '', '', 1, 0, 'F', '0', '0', 'system:user:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1001, 'User add', 100, 2, '', '', '', 1, 0, 'F', '0', '0', 'system:user:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1002, 'User edit', 100, 3, '', '', '', 1, 0, 'F', '0', '0', 'system:user:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1003, 'User remove', 100, 4, '', '', '', 1, 0, 'F', '0', '0', 'system:user:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1004, 'User export', 100, 5, '', '', '', 1, 0, 'F', '0', '0', 'system:user:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1005, 'User import', 100, 6, '', '', '', 1, 0, 'F', '0', '0', 'system:user:import', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1006, 'Password reset', 100, 7, '', '', '', 1, 0, 'F', '0', '0', 'system:user:resetPwd', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1007, 'Role query', 101, 1, '', '', '', 1, 0, 'F', '0', '0', 'system:role:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1008, 'Role add', 101, 2, '', '', '', 1, 0, 'F', '0', '0', 'system:role:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1009, 'Role edit', 101, 3, '', '', '', 1, 0, 'F', '0', '0', 'system:role:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1010, 'Role remove', 101, 4, '', '', '', 1, 0, 'F', '0', '0', 'system:role:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1011, 'Role export', 101, 5, '', '', '', 1, 0, 'F', '0', '0', 'system:role:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1012, 'Menu query', 102, 1, '', '', '', 1, 0, 'F', '0', '0', 'system:menu:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1013, 'Menu add', 102, 2, '', '', '', 1, 0, 'F', '0', '0', 'system:menu:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1014, 'Menu edit', 102, 3, '', '', '', 1, 0, 'F', '0', '0', 'system:menu:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1015, 'Menu remove', 102, 4, '', '', '', 1, 0, 'F', '0', '0', 'system:menu:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1016, 'Department query', 103, 1, '', '', '', 1, 0, 'F', '0', '0', 'system:dept:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1017, 'Department add', 103, 2, '', '', '', 1, 0, 'F', '0', '0', 'system:dept:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1018, 'Department edit', 103, 3, '', '', '', 1, 0, 'F', '0', '0', 'system:dept:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1019, 'Department remove', 103, 4, '', '', '', 1, 0, 'F', '0', '0', 'system:dept:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1020, 'Position query', 104, 1, '', '', '', 1, 0, 'F', '0', '0', 'system:post:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1021, 'Position add', 104, 2, '', '', '', 1, 0, 'F', '0', '0', 'system:post:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1022, 'Position edit', 104, 3, '', '', '', 1, 0, 'F', '0', '0', 'system:post:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1023, 'Position remove', 104, 4, '', '', '', 1, 0, 'F', '0', '0', 'system:post:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1024, 'Position export', 104, 5, '', '', '', 1, 0, 'F', '0', '0', 'system:post:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1025, 'Dictionary query', 105, 1, '#', '', '', 1, 0, 'F', '0', '0', 'system:dict:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1026, 'Dictionary add', 105, 2, '#', '', '', 1, 0, 'F', '0', '0', 'system:dict:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1027, 'Dictionary edit', 105, 3, '#', '', '', 1, 0, 'F', '0', '0', 'system:dict:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1028, 'Dictionary remove', 105, 4, '#', '', '', 1, 0, 'F', '0', '0', 'system:dict:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1029, 'Dictionary export', 105, 5, '#', '', '', 1, 0, 'F', '0', '0', 'system:dict:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1030, 'Configuration query', 106, 1, '#', '', '', 1, 0, 'F', '0', '0', 'system:config:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1031, 'Configuration add', 106, 2, '#', '', '', 1, 0, 'F', '0', '0', 'system:config:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1032, 'Configuration edit', 106, 3, '#', '', '', 1, 0, 'F', '0', '0', 'system:config:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1033, 'Configuration remove', 106, 4, '#', '', '', 1, 0, 'F', '0', '0', 'system:config:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1034, 'Configuration export', 106, 5, '#', '', '', 1, 0, 'F', '0', '0', 'system:config:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1035, 'Notice query', 107, 1, '#', '', '', 1, 0, 'F', '0', '0', 'system:notice:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1036, 'Notice add', 107, 2, '#', '', '', 1, 0, 'F', '0', '0', 'system:notice:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1037, 'Notice edit', 107, 3, '#', '', '', 1, 0, 'F', '0', '0', 'system:notice:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1038, 'Notice remove', 107, 4, '#', '', '', 1, 0, 'F', '0', '0', 'system:notice:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1039, 'Operate Log query', 500, 1, '#', '', '', 1, 0, 'F', '0', '0', 'system:operlog:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1040, 'Operate Log remove', 500, 2, '#', '', '', 1, 0, 'F', '0', '0', 'system:operlog:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1041, 'Operate Log export', 500, 3, '#', '', '', 1, 0, 'F', '0', '0', 'system:operlog:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1042, 'Login Log query', 501, 1, '#', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1043, 'Login Log remove', 501, 2, '#', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1044, 'Login Log export', 501, 3, '#', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1045, 'Account Unlock', 501, 4, '#', '', '', 1, 0, 'F', '0', '0', 'system:logininfor:unlock', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1046, 'Online User query', 109, 1, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:online:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1047, 'Batch Force Out', 109, 2, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:online:batchLogout', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1048, 'Force Out', 109, 3, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:online:forceLogout', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1049, 'Job query', 110, 1, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:job:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1050, 'Job add', 110, 2, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:job:add', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1051, 'Job edit', 110, 3, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:job:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1052, 'Job remove', 110, 4, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:job:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1053, 'Job Status change', 110, 5, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:job:changeStatus', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1054, 'Job export', 110, 6, '#', '', '', 1, 0, 'F', '0', '0', 'monitor:job:export', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1055, 'Code Generation query', 115, 1, '#', '', '', 1, 0, 'F', '0', '0', 'tool:gen:query', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1056, 'Code Generation edit', 115, 2, '#', '', '', 1, 0, 'F', '0', '0', 'tool:gen:edit', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1057, 'Code Generation remove', 115, 3, '#', '', '', 1, 0, 'F', '0', '0', 'tool:gen:remove', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1058, 'Code Generation import', 115, 2, '#', '', '', 1, 0, 'F', '0', '0', 'tool:gen:import', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (1059, 'Code Generation preview', 115, 4, '#', '', '', 1, 0, 'F', '0', '0', 'tool:gen:preview', '#', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_menu` VALUES (2030, 'Demo', 0, 6, 'demo', NULL, NULL, 1, 0, 'M', '0', '0', NULL, '#', '', 'admin', '2024-09-29 15:14:41', 'admin', '2024-09-29 15:40:03');

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `notice_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `notice_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'title',
  `notice_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '（1Notice 2Announcement）',
  `notice_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0ENABLE 1DISABLE）',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Notice and announcement table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES (1, 'Warm reminder new version is released', '2', 'New version content', '0', '', 'admin', '2024-09-06 03:51:04', '', NULL);
INSERT INTO `sys_notice` VALUES (2, 'Maintenance notice: system is maintained', '1', 'Maintenance Content', '0', '', 'admin', '2024-09-06 03:51:04', '', '2024-09-19 05:07:05');
INSERT INTO `sys_notice` VALUES (11, 'test', '1', '222222222', '0', '22', '', NULL, '', '2024-09-20 02:24:55');

-- ----------------------------
-- Table structure for sys_oper_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_oper_log`;
CREATE TABLE `sys_oper_log`  (
  `oper_id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'module title',
  `business_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT 'operate type（0Other 1add 2edit  3delete）',
  `method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'nest controller function',
  `request_method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'request method',
  `operator_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0other 1web Mobile ）',
  `oper_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'department name',
  `oper_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'request URL',
  `oper_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'operator ip',
  `oper_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `oper_param` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'request body',
  `json_result` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'response',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0success 1failed）',
  `error_msg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'error message',
  `oper_time` datetime(0) NULL DEFAULT NULL,
  `cost_time` bigint(0) NULL DEFAULT 0,
  PRIMARY KEY (`oper_id`) USING BTREE,
  INDEX `idx_sys_oper_log_bt`(`business_type`) USING BTREE,
  INDEX `idx_sys_oper_log_s`(`status`) USING BTREE,
  INDEX `idx_sys_oper_log_ot`(`oper_time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 147 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Operation log table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post`  (
  `post_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `post_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'position code',
  `post_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'position name',
  `post_sort` int(0) NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '（0enable 1disable）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Job position table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
INSERT INTO `sys_post` VALUES (1, 'ceo', 'CEO', 1, '0', '', NULL, 'admin', '', NULL);
INSERT INTO `sys_post` VALUES (2, 'se', 'Project Manager', 2, '0', '', NULL, 'admin', '', NULL);
INSERT INTO `sys_post` VALUES (3, 'hr', 'HR', 3, '0', '', NULL, 'admin', '', NULL);
INSERT INTO `sys_post` VALUES (4, 'user', 'Worker', 4, '0', '', NULL, 'admin', '', NULL);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Role ID',
  `role_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'role name',
  `role_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Role permission charater',
  `role_sort` int(0) NOT NULL,
  `data_scope` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '1：all department 2：custom 3：current department 4：current partment and below）',
  `menu_check_strictly` tinyint(1) NULL DEFAULT 1 COMMENT 'Whether menu tree selections are displayed in association',
  `dept_check_strictly` tinyint(1) NULL DEFAULT 1 COMMENT 'Whether the department tree selection is displayed associated',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '（0enable 1disable）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0using 1deleted）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Role information table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, 'Administrator', 'admin', 1, '1', 1, 1, '0', '0', '', 'admin', '2024-09-06 03:51:03', '', NULL);
INSERT INTO `sys_role` VALUES (2, 'Normal user', 'common', 2, '1', 1, 1, '0', '0', '', 'admin', '2024-09-06 03:51:03', 'admin', '2024-09-28 13:23:26');

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept`  (
  `role_id` int(0) NOT NULL,
  `dept_id` int(0) NOT NULL,
  PRIMARY KEY (`role_id`, `dept_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Association table of roles and departments' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------
INSERT INTO `sys_role_dept` VALUES (2, 100);
INSERT INTO `sys_role_dept` VALUES (2, 101);
INSERT INTO `sys_role_dept` VALUES (2, 105);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` int(0) NOT NULL,
  `menu_id` int(0) NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Role and menu association table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (2, 1);
INSERT INTO `sys_role_menu` VALUES (2, 2);
INSERT INTO `sys_role_menu` VALUES (2, 3);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (2, 100);
INSERT INTO `sys_role_menu` VALUES (2, 101);
INSERT INTO `sys_role_menu` VALUES (2, 102);
INSERT INTO `sys_role_menu` VALUES (2, 103);
INSERT INTO `sys_role_menu` VALUES (2, 104);
INSERT INTO `sys_role_menu` VALUES (2, 105);
INSERT INTO `sys_role_menu` VALUES (2, 106);
INSERT INTO `sys_role_menu` VALUES (2, 107);
INSERT INTO `sys_role_menu` VALUES (2, 108);
INSERT INTO `sys_role_menu` VALUES (2, 109);
INSERT INTO `sys_role_menu` VALUES (2, 110);
INSERT INTO `sys_role_menu` VALUES (2, 111);
INSERT INTO `sys_role_menu` VALUES (2, 112);
INSERT INTO `sys_role_menu` VALUES (2, 113);
INSERT INTO `sys_role_menu` VALUES (2, 114);
INSERT INTO `sys_role_menu` VALUES (2, 115);
INSERT INTO `sys_role_menu` VALUES (2, 116);
INSERT INTO `sys_role_menu` VALUES (2, 500);
INSERT INTO `sys_role_menu` VALUES (2, 501);
INSERT INTO `sys_role_menu` VALUES (2, 1000);
INSERT INTO `sys_role_menu` VALUES (2, 1001);
INSERT INTO `sys_role_menu` VALUES (2, 1002);
INSERT INTO `sys_role_menu` VALUES (2, 1003);
INSERT INTO `sys_role_menu` VALUES (2, 1004);
INSERT INTO `sys_role_menu` VALUES (2, 1005);
INSERT INTO `sys_role_menu` VALUES (2, 1006);
INSERT INTO `sys_role_menu` VALUES (2, 1007);
INSERT INTO `sys_role_menu` VALUES (2, 1008);
INSERT INTO `sys_role_menu` VALUES (2, 1009);
INSERT INTO `sys_role_menu` VALUES (2, 1010);
INSERT INTO `sys_role_menu` VALUES (2, 1011);
INSERT INTO `sys_role_menu` VALUES (2, 1012);
INSERT INTO `sys_role_menu` VALUES (2, 1013);
INSERT INTO `sys_role_menu` VALUES (2, 1014);
INSERT INTO `sys_role_menu` VALUES (2, 1015);
INSERT INTO `sys_role_menu` VALUES (2, 1016);
INSERT INTO `sys_role_menu` VALUES (2, 1017);
INSERT INTO `sys_role_menu` VALUES (2, 1018);
INSERT INTO `sys_role_menu` VALUES (2, 1019);
INSERT INTO `sys_role_menu` VALUES (2, 1020);
INSERT INTO `sys_role_menu` VALUES (2, 1021);
INSERT INTO `sys_role_menu` VALUES (2, 1022);
INSERT INTO `sys_role_menu` VALUES (2, 1023);
INSERT INTO `sys_role_menu` VALUES (2, 1024);
INSERT INTO `sys_role_menu` VALUES (2, 1025);
INSERT INTO `sys_role_menu` VALUES (2, 1026);
INSERT INTO `sys_role_menu` VALUES (2, 1027);
INSERT INTO `sys_role_menu` VALUES (2, 1028);
INSERT INTO `sys_role_menu` VALUES (2, 1029);
INSERT INTO `sys_role_menu` VALUES (2, 1030);
INSERT INTO `sys_role_menu` VALUES (2, 1031);
INSERT INTO `sys_role_menu` VALUES (2, 1032);
INSERT INTO `sys_role_menu` VALUES (2, 1033);
INSERT INTO `sys_role_menu` VALUES (2, 1034);
INSERT INTO `sys_role_menu` VALUES (2, 1035);
INSERT INTO `sys_role_menu` VALUES (2, 1036);
INSERT INTO `sys_role_menu` VALUES (2, 1037);
INSERT INTO `sys_role_menu` VALUES (2, 1038);
INSERT INTO `sys_role_menu` VALUES (2, 1039);
INSERT INTO `sys_role_menu` VALUES (2, 1040);
INSERT INTO `sys_role_menu` VALUES (2, 1041);
INSERT INTO `sys_role_menu` VALUES (2, 1042);
INSERT INTO `sys_role_menu` VALUES (2, 1043);
INSERT INTO `sys_role_menu` VALUES (2, 1044);
INSERT INTO `sys_role_menu` VALUES (2, 1045);
INSERT INTO `sys_role_menu` VALUES (2, 1046);
INSERT INTO `sys_role_menu` VALUES (2, 1047);
INSERT INTO `sys_role_menu` VALUES (2, 1048);
INSERT INTO `sys_role_menu` VALUES (2, 1049);
INSERT INTO `sys_role_menu` VALUES (2, 1050);
INSERT INTO `sys_role_menu` VALUES (2, 1051);
INSERT INTO `sys_role_menu` VALUES (2, 1052);
INSERT INTO `sys_role_menu` VALUES (2, 1053);
INSERT INTO `sys_role_menu` VALUES (2, 1054);
INSERT INTO `sys_role_menu` VALUES (2, 1055);
INSERT INTO `sys_role_menu` VALUES (2, 1056);
INSERT INTO `sys_role_menu` VALUES (2, 1057);
INSERT INTO `sys_role_menu` VALUES (2, 1058);
INSERT INTO `sys_role_menu` VALUES (2, 1059);
INSERT INTO `sys_role_menu` VALUES (2, 1060);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `dept_id` int(0) NULL DEFAULT NULL COMMENT 'department ID',
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'user account',
  `nick_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'user name',
  `user_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '00' COMMENT 'user type（00 system user or other）',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `phonenumber` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT 'gender（0m 1f 2unknow）',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0enable 1disable）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '（0using 2deleted）',
  `login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `login_date` datetime(0) NULL DEFAULT NULL,
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 106 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'User information table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 103, 'admin', 'RuoYi', '00', 'ry@163.com', '15888888888', '0', '', '$2b$10$Quy0q9OeeCqYTLwlj3.4IubPlKUljelSaXJ2GU6XSvK5F67SX5wDi', '0', '0', '127.0.0.1', '2024-09-30 13:09:38', '', 'admin', '2024-09-06 03:51:03', 'admin', '2024-09-30 13:09:38');
INSERT INTO `sys_user` VALUES (2, 105, 'ry', 'RuoYi', '00', 'ry@qq.com', '15666666666', '1', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', '2024-09-06 03:51:03', 'Testing people', 'admin', '2024-09-06 03:51:03', 'admin', '2024-09-30 13:53:14');
INSERT INTO `sys_user` VALUES (105, 101, 'test', 'jack', '10', 'aa123@qq.com', '17777777777', '0', '', '$2b$10$OM.WqHuwTbsi5Ptk9zHmm.P6rCOBGUWhVWDaxhhz04PK18axWlNWG', '1', '1', '127.0.0.1', '2024-09-25 10:58:06', 'aaa11wdd', 'admin', '2024-09-30 13:53:17', 'admin', '2024-09-30 12:12:40');

-- ----------------------------
-- Table structure for sys_user_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_post`;
CREATE TABLE `sys_user_post`  (
  `user_id` int(0) NOT NULL,
  `post_id` int(0) NOT NULL COMMENT 'position ID',
  PRIMARY KEY (`user_id`, `post_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Association table of users and position' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_post
-- ----------------------------
INSERT INTO `sys_user_post` VALUES (1, 1);
INSERT INTO `sys_user_post` VALUES (2, 2);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` int(0) NOT NULL,
  `role_id` int(0) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Association table of users and roles' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (2, 2);
INSERT INTO `sys_user_role` VALUES (101, 1);
INSERT INTO `sys_user_role` VALUES (101, 2);

-- ----------------------------
-- Table structure for t_demo_test_one
-- ----------------------------
DROP TABLE IF EXISTS `t_demo_test_one`;
CREATE TABLE `t_demo_test_one`  (
  `test_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `test_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Test Name',
  `test_type` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Test Type',
  `status` int(0) NULL DEFAULT NULL COMMENT 'Status',
  `test_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Content',
  `start_date` datetime(0) NULL DEFAULT NULL COMMENT 'Start Time',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Remark',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'Create By',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT 'Create Time',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT 'Update By',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT 'Update Time',
  PRIMARY KEY (`test_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Demo Test 1' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
