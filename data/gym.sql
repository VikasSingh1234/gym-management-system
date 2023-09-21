-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2023 at 04:04 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(3) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(-10, 'admin@gms', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `assignedtrainer`
--

CREATE TABLE `assignedtrainer` (
  `id` int(11) NOT NULL,
  `memberid` int(11) NOT NULL,
  `trainerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignedtrainer`
--

INSERT INTO `assignedtrainer` (`id`, `memberid`, `trainerid`) VALUES
(6, 30, 10);

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `cid` int(10) NOT NULL,
  `memberid` int(10) NOT NULL,
  `trainerid` int(10) NOT NULL,
  `sender` text NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`cid`, `memberid`, `trainerid`, `sender`, `message`) VALUES
(107, 30, 10, 'member', 'Hello Sir'),
(108, 30, 10, 's', 'han beta bolo'),
(109, 30, 10, 'member', 'kaise hai aap '),
(110, 30, 10, 's', 'mai theek hu'),
(111, 30, 10, 's', 'tu bta '),
(112, 30, 10, 'member', 'mai bhi theek');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `verifycode` int(10) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `email`, `password`, `phone`, `verifycode`, `verified`) VALUES
(30, 'naman@naman', '1234', 12346, 65454, 1),
(32, 'vikas@member', '1234', 2314678945, 3423, 1);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `registerid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `address1` text NOT NULL,
  `address2` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `currentweight` int(11) NOT NULL,
  `goalweight` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `healthcondition` text NOT NULL,
  `personaltraining` varchar(200) NOT NULL,
  `shoulder` int(5) DEFAULT NULL,
  `chest` int(5) DEFAULT NULL,
  `waist` int(5) DEFAULT NULL,
  `hip` int(5) DEFAULT NULL,
  `bicep` int(5) DEFAULT NULL,
  `thigh` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`registerid`, `id`, `firstname`, `lastname`, `address1`, `address2`, `city`, `state`, `currentweight`, `goalweight`, `age`, `height`, `healthcondition`, `personaltraining`, `shoulder`, `chest`, `waist`, `hip`, `bicep`, `thigh`) VALUES
(26, 30, 'naman', 'puri', 'puri', 'niwas', 'nadaun', 'himachal', 90, 90, 40, 500, 'All Ok', 'Personal', 4, 3, 43, 43, 34, 43),
(27, 32, 'vikas', 'singh', '123', '456', 'patiala', 'punjab', 90, 90, 32, 32, 'Ok', 'Personal', 44, 33, 22, 55, 22, 33);

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trainer`
--

INSERT INTO `trainer` (`id`, `name`, `email`, `password`, `phone`) VALUES
(6, 'Akshat Srivastava', 'akshat@trainer', '1234', 1234567890),
(7, 'Naman Puri', 'namanpuri@trainer', '1232', 2192120000),
(8, 'Vikas singh', 'vikas@trainer', 'abcd', 8569456123),
(9, 'Bulbul Chobey', 'bulbul@trainer', '1234', 9345682456),
(10, 'Rajat Kumar', 'rajat@trainer', '1234', 2324324234);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignedtrainer`
--
ALTER TABLE `assignedtrainer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`registerid`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignedtrainer`
--
ALTER TABLE `assignedtrainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `cid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `registerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
