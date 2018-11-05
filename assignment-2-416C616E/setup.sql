GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'yelp_site'@'%' IDENTIFIED BY 'password';

-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 15, 2018 at 12:30 AM
-- Server version: 5.7.21
-- PHP Version: 7.0.29-1~dotdeb+8.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yelp_site`
--
--CREATE DATABASE `yelp_site`;
USE `yelp_site`;

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `yelp_site`.`businesses` (
  `id` int(11) NOT NULL,
  `ownerID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(64) NOT NULL,
  `state` varchar(64) NOT NULL,
  `zip` int(11) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `category` varchar(64) NOT NULL,
  `subcategory` varchar(64) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `businesses`
--

INSERT INTO `yelp_site`.`businesses` (`id`, `ownerID`, `name`, `address`, `city`, `state`, `zip`, `phone`, `category`, `subcategory`, `website`, `email`) VALUES
(0, 0, 'Block 15', '300 SW Jefferson Ave.', 'Corvallis', 'OR', 97333, '541-758-2077', 'Restaurant', 'Brewpub', 'http://block15.com', ''),
(1, 1, 'Corvallis Brewing Supply', '119 SW 4th St.', 'Corvallis', 'OR', 97333, '541-758-1674', 'Shopping', 'Brewing Supply', 'http://www.lickspigot.com', ''),
(2, 2, 'Robnett\'s Hardware', '400 SW 2nd St.', 'Corvallis', 'OR', 97333, '541-753-5531', 'Shopping', 'Hardware', '', ''),
(3, 3, 'First Alternative Co-op North Store', '2855 NW Grant Ave.', 'Corvallis', 'OR', 97330, '541-452-3115', 'Shopping', 'Groceries', '', ''),
(4, 4, 'WinCo Foods', '2335 NW Kings Blvd.', 'Corvallis', 'OR', 97330, '541-753-7002', 'Shopping', 'Groceries', '', ''),
(5, 5, 'Fred Meyer', '777 NW Kings Blvd.', 'Corvallis', 'OR', 97330, '541-753-9116', 'Shopping', 'Groceries', '', ''),
(6, 6, 'Interzone', '1563 NW Monroe Ave.', 'Corvallis', 'OR', 97330, '541-754-5965', 'Restaurant', 'Coffee Shop', '', ''),
(7, 7, 'The Beanery Downtown', '500 SW 2nd St.', 'Corvallis', 'OR', 97333, '541-753-7442', 'Restaurant', 'Coffee Shop', '', ''),
(8, 8, 'Local Boyz', '1425 NW Monroe Ave.', 'Corvallis', 'OR', 97330, '541-754-5338', 'Restaurant', 'Hawaiian', '', ''),
(9, 9, 'Darkside Cinema', '215 SW 4th St.', 'Corvallis', 'OR', 97333, '541-752-4161', 'Entertainment', 'Movie Theater', 'http://darksidecinema.com', ''),
(10, 10, 'The Book Bin', '215 SW 4th St.', 'Corvallis', 'OR', 97333, '541-752-0040', 'Shopping', 'Book Store', '', ''),
(11, 11, 'Cyclotopia', '435 SW 2nd St.', 'Corvallis', 'OR', 97333, '541-757-9694', 'Shopping', 'Bicycle Shop', '', ''),
(12, 12, 'Corvallis Cyclery', '344 SW 2nd St.', 'Corvallis', 'OR', 97333, '541-752-5952', 'Shopping', 'Bicycle Shop', '', ''),
(13, 13, 'Oregon Coffee & Tea', '215 NW Monroe Ave.', 'Corvallis', 'OR', 97333, '541-752-2421', 'Shopping', 'Tea House', 'http://www.oregoncoffeeandtea.com', ''),
(14, 14, 'Spaeth Lumber', '1585 NW 9th St.', 'Corvallis', 'OR', 97330, '541-752-1930', 'Shopping', 'Hardware', '', ''),
(15, 15, 'New Morning Bakery', '219 SW 2nd St.', 'Corvallis', 'OR', 97333, '541-754-0181', 'Restaurant', 'Bakery', '', ''),
(16, 3, 'First Alternative Co-op South Store', '1007 SE 3rd St.', 'Corvallis', 'OR', 97333, '541-753-3115', 'Shopping', 'Groceries', '', ''),
(17, 7, 'The Beanery Monroe', '2541 NW Monroe Ave.', 'Corvallis', 'OR', 97330, '541-757-0828', 'Restaurant', 'Coffee Shop', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `yelp_site`.`photos` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `businessID` int(11) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `data` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photos`
--

INSERT INTO `yelp_site`.`photos` (`id`, `userID`, `businessID`, `caption`, `data`) VALUES
(0, 7, 8, 'some text', '01010101'),
(1, 25, 2, '', '010010101110101010110'),
(2, 26, 1, 'Hops', '010010101110101010110'),
(3, 21, 14, '', '010010101110101010110'),
(4, 28, 18, 'Sticky Hands', '010010101110101010110'),
(5, 21, 9, 'Popcorn!', '010010101110101010110'),
(6, 26, 8, '', '010010101110101010110'),
(7, 25, 18, 'Big fermentor', '010010101110101010110'),
(8, 20, 2, '', '010010101110101010110'),
(9, 6, 15, 'Cake!', '010010101110101010110');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `yelp_site`.`reviews` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `businessID` int(11) NOT NULL,
  `dollars` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  `review` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `yelp_site`.`reviews` (`id`, `userID`, `businessID`, `dollars`, `stars`, `review`) VALUES
(0, 7, 8, 1, 5, 'Cheap, delicious food.'),
(1, 25, 2, 1, 4, 'How many fasteners can one room hold?'),
(2, 26, 1, 1, 5, 'Joel, the owner, is super friendly and helpful.'),
(3, 21, 14, 2, 4, ''),
(4, 28, 18, 1, 4, 'Good beer, good food, though limited selection.'),
(5, 21, 9, 1, 5, 'A Corvallis gem.'),
(6, 26, 8, 1, 5, 'Yummmmmmm!'),
(7, 25, 18, 2, 5, ''),
(8, 20, 2, 2, 4, ''),
(9, 6, 15, 2, 5, 'Try the hazlenut torte.  It\'s the best!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businesses`
--
ALTER TABLE `yelp_site`.`businesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `yelp_site`.`photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `yelp_site`.`reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userID` (`userID`,`businessID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `yelp_site`.`businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `yelp_site`.`photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `yelp_site`.`reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
