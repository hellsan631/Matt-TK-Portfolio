<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>My Website</title>

<link href="./css/index.css" rel="stylesheet" type="text/css" />

</head>
<body>

<header id="body-header">
	<div id="nameplate"><h1>Mathew Kleppin</h1></div>
</header>

<nav id="menu-con">
	<header id="menu-header"></header>
	<ul>
		<li class="menu-item"><a href="#:portfolio/grid"><span>Portfolio</span></a></li>
		<li class="menu-item"><a href="#:profile/who"><span>Profile</span></a></li>
		<li class="menu-item"><a href="#:blog/web"><span>Blog</span></a></li>
		<li class="menu-item"><a href="#:contact/business"><span>Contact</span></a></li>
	</ul>
</nav>

<section id="content-con">
	<nav id="content-menu">
		<?php include 'content/menu/portfolio.php'; ?>
	</nav>
	<section id="content">
		<?php include '_listeners/grid.php'; ?>
	</section>
</section>

<div id="background">
	<div id="nodice">
	</div>
</div>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="./js/index.js" ></script>

</body>
</html>