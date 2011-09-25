<?php

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
		echo "\n\t\t\t<li><a href='{$p->url}'$class>" . strip_tags($p->get('title|name')) . "</a>";
		if(count($p->children()) > 0 && $p->id != 3){
			echo '<ul>';
			foreach($p->children as $child){
				if($child->viewable()) {
					$class = strpos($page->path, $child->path) === 0 ? " class='on'" : '';
					echo "\n\t\t\t<li><a href='{$child->url}'$class>" . strip_tags($child->get('title|name')) . "</a>";
				}
				
			}
			echo '</ul>';
			
		}
		"</li>"; 
	}
}
