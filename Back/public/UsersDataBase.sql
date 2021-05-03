--
-- Data Base: `INNOCV_Users`
--
​
-- --------------------------------------------------------
​
​
DROP DATABASE IF EXISTS innocvUsers;
CREATE DATABASE innocvUsers;
USE innocvUsers;
​
--
-- Estructure table Users
--
​
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(500) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  PRIMARY KEY (id)
);
​
-- --------------------------------------------------------

--
-- Data Dumpig
--
​
INSERT INTO `users` (`id`,`avatar`,`name`,`email`,`birthdate`) VALUES
(1, 'https://media-exp1.licdn.com/dms/image/C4E03AQFtVi2FQrcfhw/profile-displayphoto-shrink_200_200/0/1611493550527?e=1623888000&v=beta&t=DL3KLFpZfPa3ev5yclxs7vjqn8CsS2brV9Vn_0apBm4','Luis Vegas','luisvegas@gmail.com','1988-09-29'),
(2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHTzMp1dn6DNYq02jLkLit0z2u5np8TDb7Q&usqp=CAU','Ana Diaz','a.diaz@gmail.com', '1991-12-21'),
(3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOmjVA3Z3TEYcuxJLnlfx_s5RhqQBdI-3Kw&usqp=CAU','John Parker','parker@yahoo.es','1985-05-17'),
(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMOIYML4djySBcylt2rwXvbvn7ZpMpEnJqeA&usqp=CAU','Fernando Matias','fer.matias@gmail.com' ,'1981-02-08'),
(5, 'https://media-exp1.licdn.com/dms/image/C4D03AQHotsU9vFmfWA/profile-displayphoto-shrink_200_200/0/1520965114937?e=1623888000&v=beta&t=H9E8vX6Avws1HNoZT7i_AVW80AR_w2Irzl-bQmJfV0U','Peter Smith','smithpm@outlook.es' ,'2001-07-09'), 
(6, 'https://bisite.usal.es/archivos/carlossoriadf_0.png','Jose Perez','jose67@yahoo.es', '1967-02-24'),
(7, 'https://media-exp1.licdn.com/dms/image/C5603AQGrPEjfhDpWxA/profile-displayphoto-shrink_400_400/0/1523346660251?e=1625702400&v=beta&t=8B-TmCsbz-2scsbW8IM63sP3cr_1xjinerKD_U1l9yU','Sofia Alonso','sofi.a@gmail.com', '1995-01-16'),
(8, 'https://bisite.usal.es/archivos/carlossoriadf_0.png','Carlos Sanchez','cs2002@gmail.com', '2002-08-22'),
(9, 'https://media-exp1.licdn.com/dms/image/C4D03AQFKLGnF_zigyA/profile-displayphoto-shrink_400_400/0/1571728088916?e=1625702400&v=beta&t=LMKRbvJdecfdNobcmcf85xPd9UtuOfIu4jBvTTwDFYI','Luca Martín','lukita93@yahoo.es', '1993-11-03');
