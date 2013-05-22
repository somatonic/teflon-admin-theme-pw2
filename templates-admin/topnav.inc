<?php

function formatVersion($version) {
	return preg_replace('/(\d)(?=\d)/', '$1.', str_pad("$version", 3, "0", STR_PAD_LEFT));
}

$section = 'none';
$modulesArray = array();
foreach($modules as $module) $modulesArray[$module->className()] = 1;

foreach($modules->getInstallable() as $module) $modulesArray[basename($module, '.module')] = 0;
ksort($modulesArray);

$modulesArraySections = array();

foreach($modulesArray as $name => $installed) {
	//if(strpos($name, $section) !== 0) {
		if(!preg_match('/^([A-Za-z][a-z]+)/', $name, $matches)) continue;
		$section = $matches[1];
		$interfaces = @class_implements($name, false);
		$configurable = (is_array($interfaces) && in_array('ConfigurableModule', $interfaces)) ? 1 : 0;
		$info = $modules->getModuleInfo($name);
		$version = formatVersion($info['version']);
		//$translatedtitle = $info['title'];
		if($installed) $editurl = $config->urls->admin . "module/edit?name=" . $name;
			else $editurl = $config->urls->admin . "module/#" . $name;
		$modulesArraySections[$section][] = array('name'=>$name,'installed' => $installed, 'options' => $configurable, 'url' => $editurl, 'version' => $version);
	//}
}

// print_r($modulesArraySections);

foreach($pages->get($wire->config->adminRootPageID)->children("check_access=0") as $p) {

	if(!$p->viewable()) continue;

	$showItem = $user->isSuperuser() ? true : false;
	$info = array();

	if(!$showItem) {
		$checkPages = $p->numChildren ? $p->children("check_access=0") : array($p);
		foreach($checkPages as $child) {
			if($child->viewable()) {
				$showItem = true;
				break;
			}
		}
	}

	if($showItem) {
		$class = strpos($page->path, $p->path) === 0 ? " class='on'" : '';
		$title = strip_tags((string)$p->get('title|name'));
		$title = __($title, dirname(__FILE__) . '/default.php'); // translate from context of default.php
		echo "\n\t\t\t\t<li><a href='{$p->url}'$class>$title</a>";
		if(count($p->children("check_access=0")) > 0 && $p->id != 3){
			echo "\n\t\t\t\t\t<ul>";
			foreach($p->children("check_access=0") as $subchild){
				if($subchild->viewable()) {
					$class = strpos($page->path, $subchild->path) === 0 ? " class='on'" : '';
					 if($subchild->process) {
						$info = wire('modules')->getModuleInfo($subchild->process);
						$subtitle = $info['title'];
					} else {
						$subtitle = $subchild->title;
					}
					echo "\n\t\t\t\t\t\t<li><a href='{$subchild->url}'$class>" . $subtitle . "</a></li>";
				}
			}
			echo "\n\t\t\t\t\t</ul>";

		}

		if($p->id == 21){
			echo "\n\t\t\t\t\t<ul>";
			foreach($modulesArraySections as $section => $m){
				echo "\n\t\t\t\t\t<li><a href=''>{$section}</a>";
				echo "\n\t\t\t\t\t\t<ul>";
				foreach($m as $module){
					$options = '';
					$class = '';
					if($module['options'] == 1) $options = '<span class="ui-icon ui-icon-gear"></span>';
					if($module['installed'] == 0) $class .= 'notinstalled';
					$version = $module['version'];
					echo "\n\t\t\t\t\t\t\t<li><a rel='".$module['name']."' class='$class' href='".$module['url']."'>".$module['name']." ($version) $options</a></li>";
				}
				echo "\n\t\t\t\t\t\t</ul>";
				echo "\n\t\t\t\t\t</li>";
			}
			echo "\n\t\t\t\t\t</ul>";
		}
		echo "</li>";
	}
}
