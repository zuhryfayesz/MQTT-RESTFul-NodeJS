-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 16, 2016 at 07:20 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `books`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE IF NOT EXISTS `book` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `BookName` varchar(1000) NOT NULL,
  `AuthorName` varchar(1000) NOT NULL,
  `Price` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `BookName`, `AuthorName`, `Price`) VALUES
(1, 'Node js', 'Author 1', '350'),
(2, 'Angular js', 'Author 2', '555'),
(3, 'HTML5', 'Author 3', '435'),
(4, 'CSS3', 'Author 4', '356'),
(5, 'Zuhry UI/UX guide', 'Zuhry Fayesz', '500'),
(6, 'Galla', 'Saman', '5000');

-- --------------------------------------------------------

--
-- Table structure for table `mqtt`
--

CREATE TABLE IF NOT EXISTS `mqtt` (
  `payload` varchar(255) DEFAULT NULL,
  `message_topic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mqtt`
--

INSERT INTO `mqtt` (`payload`, `message_topic`) VALUES
('Hello Zuhry', 'zuhry'),
('hi', 'zuhry'),
('Hello Zuhry', 'zuhry'),
('Hello Zuhry', 'zuhry'),
('get', 'zuhry'),
('fight', 'zuhry'),
('Hello Zuhry', 'zuhry');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
