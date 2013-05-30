<?php

/**
 * ProcessWire 2.x Admin Markup Template
 *
 * Copyright 2010 by Ryan Cramer
 * Teflon Theme 2011 by Soma Philipp Urlich
 *
 * @modified 2012-08-29
 * @version  1.0.3
 */

$searchForm = $user->hasPermission('page-edit') ? $modules->get('ProcessPageSearch')->renderSearchForm() : '';
$bodyClass = $input->get->modal ? 'modal' : '';
$bodyClass .= $page->id == 23 ? ' ProcessLoginForm' : '';
$sitename = $config->siteName ? $config->siteName : $_SERVER['SERVER_NAME'];

if(!isset($content)) $content = '';

$config->styles->prepend($config->urls->adminTemplates . "styles/main.css?v=2");
$config->styles->append($config->urls->adminTemplates . "styles/inputfields.css");
$config->styles->append($config->urls->adminTemplates . "styles/ui.css?v=2");
$config->scripts->append($config->urls->adminTemplates . "scripts/inputfields.js");
$config->scripts->append($config->urls->adminTemplates . "scripts/main.js?v=2");

$config->styles->append($config->urls->adminTemplates . "styles/droppy.css");
$config->scripts->append($config->urls->adminTemplates . "scripts/jquery.droppy.js");
$config->scripts->append($config->urls->adminTemplates . "scripts/jquery.hoverintent.js");
$config->scripts->append($config->urls->adminTemplates . "scripts/jquery.scrollto.min.js");

/*
 * Dynamic phrases that we want to be automatically translated
 *
 * These are in a comment so that they register with the parser, in place of the dynamic __() function calls with page titles.
 *
 * __("Pages");
 * __("Setup");
 * __("Modules");
 * __("Access");
 * __("Admin");
 *
 */

?>
<!DOCTYPE html>
<html lang="<?php echo __('en', __FILE__); // HTML tag lang attribute
	/* this intentionally on a separate line */ ?>">
<head>
	<meta charset="utf-8" />
	<meta name="robots" content="noindex, nofollow" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title><?php echo __(strip_tags($page->get("title|name")), __FILE__); ?> &bull; <?php echo $sitename ?> &bull; ProcessWire</title>

	<script type="text/javascript">
		<?php

		$jsConfig = $config->js();
		$jsConfig['debug'] = $config->debug;
		$jsConfig['urls'] = array(
			'root' => $config->urls->root,
			'admin' => $config->urls->admin,
			'modules' => $config->urls->modules,
			'core' => $config->urls->core,
			'files' => $config->urls->files,
			'templates' => $config->urls->templates,
			'adminTemplates' => $config->urls->adminTemplates,
			);
		?>

		var config = <?php echo json_encode($jsConfig); ?>;
	</script>

	<?php foreach($config->styles->unique() as $file) echo "\n\t<link type='text/css' href='$file' rel='stylesheet' />"; ?>

	<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="<?php echo $config->urls->adminTemplates; ?>styles/ie.css" />
	<![endif]-->

	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo $config->urls->adminTemplates; ?>styles/ie7.css" />
	<![endif]-->

	<?php foreach($config->scripts->unique() as $file) echo "\n\t<script type='text/javascript' src='$file'></script>"; ?>

	<script>
		// overwrite TinyMCE skin setting globally
		// as defined in /wire/modules/Inputfields/InputfieldTinyMCE/InputfieldTinyMCE.js
		// and loaded before
		if('undefined' != typeof InputfieldTinyMCEConfigDefaults) InputfieldTinyMCEConfigDefaults.skin = "default";
	</script>

</head>
<body<?php if($bodyClass) echo " class='$bodyClass'"; ?>>

	<div id="masthead" class="masthead">

		<div class="container">
			<p id="logo">ProcessWire</p>

			<ul id='topnav' class='nav droppy'>
				<li><a id='sitelink' href='<?php echo $config->urls->root; ?>'><?php echo __('Site', __FILE__); ?></a></li>
				<?php include($config->paths->adminTemplates . "topnav.inc"); ?>

			</ul>

			<?php if(!$user->isGuest()): ?>

			<ul id='breadcrumb' class='nav'><?php
				foreach($this->fuel('breadcrumbs') as $breadcrumb) {
					$title = __($breadcrumb->title, __FILE__);
					echo "<li><a href='{$breadcrumb->url}'>{$title}</a><span>&nbsp;</span></li>";
				}
				?>

			</ul>

			<?php endif; ?>

			<?php if(!$user->isGuest()): ?>
			<span id='userinfo_top'>
				<?php echo $user->name?>

				<?php if($user->hasPermission('profile-edit')): ?> :
				<a class='action' href='<?php echo $config->urls->admin; ?>profile/'><?php echo __('profile', __FILE__); ?></a> :
				<?php endif; ?>

				<a class='action' href='<?php echo $config->urls->admin; ?>login/logout/'><?php echo __('logout', __FILE__); ?></a>
			</span>
			<?php endif; ?>


			<?php echo $searchForm; ?>

		</div>
	</div>

	<div id="wrapper-content">
		<?php if(count($notices)) include($config->paths->adminTemplates . "notices.inc"); ?>

		<div id="content" class="content">

			<div class="container">

				<h1 id='title'><?php echo __(strip_tags($this->fuel->processHeadline ? $this->fuel->processHeadline : $page->get("title|name")), __FILE__); ?></h1>

				<?php if(trim($page->summary)) echo "<h2>{$page->summary}</h2>"; ?>
				<?php if($page->body) echo $page->body; ?>


				<?php echo $content?>

			</div>
		</div>

	</div>

	<div id="footer" class="footer">
		<div class="container">
			<p>


			ProcessWire <?php echo $config->version; ?> &copy; <?php echo date("Y"); ?> by Ryan Cramer
			</p>

			<?php if($config->debug && $this->user->isSuperuser()) include($config->paths->adminTemplates . "debug.inc"); ?>
		</div>
	</div>

</body>
</html>
