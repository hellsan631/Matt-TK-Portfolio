<?php include_once './includes/defines.php'; ?>
<!DOCTYPE html>
<html>
<head>
<?php
	echo SEO;
?>
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
		<li class="menu-item"><a href="<?php echo AJAX_CHAR; ?>tour/start"><span>Tour</span></a></li>
		<li class="menu-item"><a href="<?php echo AJAX_CHAR; ?>portfolio/grid"><span>Portfolio</span></a></li>
		<li class="menu-item"><a href="<?php echo AJAX_CHAR; ?>profile/who"><span>Profile</span></a></li>
		<li class="menu-item"><a href="<?php echo AJAX_CHAR; ?>blog/web"><span>Blog</span></a></li>
		<li class="menu-item"><a href="<?php echo AJAX_CHAR; ?>contact/business"><span>Contact</span></a></li>
	</ul>
</nav>

<section id="content-con">
	<nav id="content-menu">
		<?php include './content/menu/portfolio.php'; ?>
	</nav>
	<section id="content">
		<?php include './_listeners/grid.php'; ?>
	</section>
</section>

<div id="background">
	<div id="nodice">
	</div>
</div>

<script defer src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script>
var splitkey = "<?php echo AJAX_SPLIT; ?>";
var ajaxkey = "<?php echo AJAX_CHAR; ?>";
</script>
<script defer src="./js/index.js" ></script>

</body>
</html>