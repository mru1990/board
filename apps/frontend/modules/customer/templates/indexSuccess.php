<div class="row">
    <?php foreach ($customers as $item): ?>
        <div class="span2">
            <img src="http://placehold.it/170x220" alt="" class="img-rounded">
        </div>
        <div class="span4">
            <blockquote>
                <p><?php echo $item->getName()?></p>
                <small><cite title="Source Title"><?php echo $item->getCity()?>, Germany <i class="icon-map-marker"></i></cite></small>
            </blockquote>
            <p>
                <i class="icon-envelope"></i> <?php echo $item->getEmail()?> <br>
                <i class="icon-globe"></i> <?php echo $item->getUrl()?> <br>
                <i class="icon-gift"></i> <?php echo $item->getType() ?>
            </p>
        </div>
    <?php endforeach; ?>
</div>