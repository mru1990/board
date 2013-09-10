<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php include_http_metas() ?>
        <?php include_metas() ?>
        <?php include_title() ?>
        <link rel="shortcut icon" href="/favicon.ico" />

        <?php include_stylesheets() ?>
        <?php include_javascripts() ?>
        
    </head>
    <body>
        <header>
            <?php include_partial('global/header') ?>
        </header>
        
        <div style="margin-top: 70px;" class="container">
            <?php echo $sf_content ?>
        </div>
        
        <footer>
            
        </footer>
    </body>
</html>
