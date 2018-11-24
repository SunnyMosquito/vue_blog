CREATE TABLE `comments_info` (
    `id` varchar(32) NOT NULL COMMENT '评论主键id',
    `pid` varchar(32) DEFAULT '' COMMENT '父评论id',
    `owner_id` varchar(32) NOT NULL COMMENT '评论人的id',
    `owner_name` varchar(32) NOT NULL COMMENT '评论人的昵称',
    `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `owner_id` (`owner_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '评论表' 

CREATE TABLE `comment` (
    `id` varchar(50) NOT NULL,
    `post_id` varchar(50) NOT NULL COMMENT '笔记Id',
    `user_id` varchar(50) NOT NULL COMMENT '回复人',
    `content` varchar(500) DEFAULT NULL COMMENT '回复内容',
    `create_date` datetime NOT NULL COMMENT '创建时间',
    `like_count` int COMMENT '赞数',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 ROW_FORMAT = DYNAMIC COMMENT = '评论表' 

CREATE TABLE `reply` (
    `id` varchar(50) NOT NULL,
    `comment_id` varchar(50) NOT NULL COMMENT '评论Id',
    `from_user_id` varchar(50) NOT NULL COMMENT '回复人',
    `to_user_id` varchar(50) NOT NULL COMMENT '回复对象',
    `reply_msg` varchar(500) DEFAULT NULL COMMENT '回复内容',
    `create_date` datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `reply_fk1` (`comment_id`),
    CONSTRAINT `reply_fk1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8 ROW_FORMAT = DYNAMIC COMMENT = '回复表'