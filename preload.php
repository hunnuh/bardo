<div style="display:none">
<?php
$dirf = 'images';
$dir  = scandir($dirf);
foreach ($dir as $file) {
if (($file != '..') && ($file != '.')) {
    echo "<img src='images/$file' />";
    }
}
?>
</div>