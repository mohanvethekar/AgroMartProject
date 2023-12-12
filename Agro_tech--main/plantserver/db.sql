/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - reactplant
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`reactplant` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `reactplant`;

/*Table structure for table `cartdata` */

DROP TABLE IF EXISTS `cartdata`;

CREATE TABLE `cartdata` (
  `id` varchar(255) default NULL,
  `uploader` varchar(255) default NULL,
  `filename` varchar(255) default NULL,
  `pname` varchar(255) default NULL,
  `pcat` varchar(255) default NULL,
  `pdate` varchar(255) default NULL,
  `pprize` varchar(255) default NULL,
  `quantity` varchar(255) default NULL,
  `buyer` varchar(255) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cartdata` */

insert  into `cartdata`(`id`,`uploader`,`filename`,`pname`,`pcat`,`pdate`,`pprize`,`quantity`,`buyer`) values ('7','admin','static/files/admin/team-3.jpg','xxvxcv','ghghg','2023-03-07','333','2','a');

/*Table structure for table `payment` */

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `pid` varchar(255) default NULL,
  `img` varchar(255) default NULL,
  `title` varchar(255) default NULL,
  `prize` varchar(255) default NULL,
  `quantity` varchar(255) default NULL,
  `date` varchar(255) default NULL,
  `buyer` varchar(255) default NULL,
  `shipaddress` varchar(255) default NULL,
  `status` varchar(255) default 'Order Placed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `payment` */

insert  into `payment`(`pid`,`img`,`title`,`prize`,`quantity`,`date`,`buyer`,`shipaddress`,`status`) values ('1','static/files/admin/farm_background_1.jpg','Product67','67','5','2023-02-10','a','vedika soc sagar nagar vikhroli park site','Delivered'),('1','static/files/admin/farm_background_1.jpg','Product67','67','10','2023-02-11','d','Vashi','Shipped'),('5','static/files/admin/2.jpg','Product34','60','16','2023-02-12','d','Vashi','Delivered'),('7','static/files/admin/team-3.jpg','xxvxcv','333','5','2023-03-26','a','sanpada','Out for delivery'),('1','static/files/admin/farm_background_1.jpg','Product67','2566','2','2023-03-26','a','sanpada','Packed'),('5','static/files/admin/2.jpg','Product34','1254','2','2023-03-26','d','Vikhroli park site sagar nagar','Shipped'),('4','static/files/b/marie.jpg','marrie','5200','2','2023-03-26','d','Vikhroli park site sagar nagar','Order Placed');

/*Table structure for table `productdetails` */

DROP TABLE IF EXISTS `productdetails`;

CREATE TABLE `productdetails` (
  `id` int(255) NOT NULL auto_increment,
  `uploader` varchar(255) default NULL,
  `filename` varchar(255) default NULL,
  `pname` varchar(255) default NULL,
  `pcat` varchar(255) default NULL,
  `pdate` varchar(255) default NULL,
  `pprize` varchar(255) default NULL,
  `description` longtext,
  `instruction` longtext,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `productdetails` */

insert  into `productdetails`(`id`,`uploader`,`filename`,`pname`,`pcat`,`pdate`,`pprize`,`description`,`instruction`) values (1,'admin','static/files/admin/farm_background_1.jpg','Product67','random','2023-02-16','2566','xzcxzczxczxccxc','zxczxczxcxczx'),(3,'a','static/files/admin/ivana-square.jpg','Long hair','fff','2023-02-05','6700','zxczxzxczxcxczx','xzczxczxczxczxcx xnvjndnnkdkd kdjkjsd dkdjds ds'),(4,'b','static/files/b/marie.jpg','marrie','Machine','2023-02-10','5200','ffsdfsdfsdfsf','cxzczxczxczczc   zczxcxxxxxxxxxxxxxxxxxccccccccccc '),(5,'a','static/files/admin/2.jpg','Product34','Beans','2023-02-16','1254','Nice grass','Green grass'),(7,'admin','static/files/admin/team-3.jpg','xxvxcv','ghghg','2023-03-07','333','xcvxcvxcv  vxcv          vxc v xvxv vxv xvxv','cxvxcvxcvcvc v v v cx xvc xcvvxcv '),(8,'a','static/files/admin/team-1.jpg','ssas cascasc','csajc','0004-04-05','1200','Forener product','Kahi nahi');

/*Table structure for table `soilcenter` */

DROP TABLE IF EXISTS `soilcenter`;

CREATE TABLE `soilcenter` (
  `image` varchar(255) default NULL,
  `title` varchar(255) default NULL,
  `address` longtext,
  `area` varchar(255) default NULL,
  `mobile` varchar(255) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `soilcenter` */

insert  into `soilcenter`(`image`,`title`,`address`,`area`,`mobile`) values ('a.jpg','Rancon Projects Pvt Ltd','Kharghar Sector 12,Navi Mumbai','kharghar','5469754896'),('b.jpg','Global Lab','Vasai East,Palghar','palghar','5965745965'),('c.jpg','Technoedge Research Lab','Ambernath MIDC,Thane','thane','5471254696'),('d.jpg','Anazeal Analyticals and Research Pvt Ltd','C 404, TTC Industrial Estate, Turbhe, Navi Mumbai - 400703 (MIDC)','turbhe','5467965325'),('e.jpg','Nabl Accredieted Lab','Ground Floor Amrut Angan Phase 1, Parsik Nagar, Kalwa Thane, Thane - 400605 (Near Reliance Market)','thane','3659475966');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `mobile` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`mobile`,`password`) values (3,'a','yash@gmail.com','9372914050','a'),(4,'d','dasdas99@gmail.com','9930090886','d');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
