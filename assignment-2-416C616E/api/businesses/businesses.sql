-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 13, 2018 at 03:28 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
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

INSERT INTO `businesses` (`id`, `ownerID`, `name`, `address`, `city`, `state`, `zip`, `phone`, `category`, `subcategory`, `website`, `email`) VALUES
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
(17, 7, 'The Beanery Monroe', '2541 NW Monroe Ave.', 'Corvallis', 'OR', 97330, '541-757-0828', 'Restaurant', 'Coffee Shop', '', ''),
(18, 0, 'Block 15 Brewery & Tap Room', '3415 SW Deschutes St.', 'Corvallis', 'OR', 97333, '541-752-2337', 'Restaurant', 'Brewpub', 'http://block15.com', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
