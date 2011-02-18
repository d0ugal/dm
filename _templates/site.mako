<%inherit file="base.mako" />
<!DOCTYPE html>
<html>
<head>

    ${self.head()}

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

    <link rel="icon" href="/favicon.ico" type="image/x-icon" />

    <link rel="stylesheet" href="/media/style/blueprint/screen.css" type="text/css" media="screen, projection" />
    <link rel="stylesheet" href="/media/style/blueprint/print.css" type="text/css" media="print" />
    <!--[if lt IE 8]>
    <link rel="stylesheet" href="/media/style/blueprint/ie.css" type="text/css" media="screen, projection" />
    <![endif]-->

    <link href='http://fonts.googleapis.com/css?family=PT+Serif+Caption' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=PT+Serif' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Molengo' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'>

    <link href="/media/style/style.css" rel="stylesheet" type="text/css" />
    <!--[if lt IE 8]>
    <link rel="stylesheet" href="/media/style/uglyhacks.css" type="text/css" media="screen, projection" />
    <![endif]-->

    <link rel="alternate" type="application/rss+xml" title="Dougal Matthews Everything " href="/s/all/" />

    <meta name="google-site-verification" content="GNt31_M2DlGd--mcA_1JjGH46qPSDdpnSiWi7Y_9Ltk" />
    <meta name="verify-v1" content="d4ZT12Eg5dza8IxtDZlqiZoC0EzBnLxeYeK2PTiaIrU=" />
    <meta name="msvalidate.01" content="08FE3976E4596314289973311F691DC2" />
    <meta name="y_key" content="ef34f6756bc76371" />

</head>
<body>

    <div id="header_wrapper">

        <div id="header" class="container ">

            ${self.header()}

        </div>

    </div>

    <div id="content_wrapper">

        <div id="content" class="container prepent-top">

            ${next.body()}	

        </div>

    </div>

    <div id="footer_wrapper">

        ${self.footer()}

    </div>



</body>
</html>

<%def name="head()">
  <%include file="head.mako" />
</%def>
<%def name="header()">
  <%include file="header.mako" />
</%def>
<%def name="footer()">
  <%include file="footer.mako" />
</%def>
