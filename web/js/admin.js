$(document).ready(function()
{
  $(function() {
    $("#menu a").button();
    $("#menu ul").buttonset();
  });
  
  $("a[rel^='lightbox']").fancybox();
});