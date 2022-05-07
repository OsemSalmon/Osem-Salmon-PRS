-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 23, 2022 at 11:41 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `osemsalmonprs`
--

-- --------------------------------------------------------

--
-- Table structure for table `tableusers`
--

CREATE TABLE `tableusers` (
  `userid` int(11) NOT NULL,
  `userFullName` varchar(128) NOT NULL,
  `userEmail` varchar(128) NOT NULL,
  `userName` varchar(128) NOT NULL,
  `userPassword` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tableusers`
--

INSERT INTO `tableusers` (`userid`, `userFullName`, `userEmail`, `userName`, `userPassword`) VALUES
(1, 'Muhamad Zulkarnain', 'zulkarnain@gmail.com', 'fuisligo', '$2y$10$DqkCpoFGl/3ZLPdl9g63ZecNuQ8mE0Aeq6LldPTQjXRwuV8vqiZCO'),
(2, 'Muhamad Aliff Fahmi bin Mohamad Asri', 'fahmialiff00@gmail.com', 'AdelaideMeyrin', '$2y$10$qsTILzv215p8XgEeE1YGCuYepd.RVHxBc1qVpuH40Zg57chfgdeRK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tableusers`
--
ALTER TABLE `tableusers`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tableusers`
--
ALTER TABLE `tableusers`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
