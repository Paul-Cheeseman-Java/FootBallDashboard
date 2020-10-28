/*********************************************************************************
  This section is to change the chart sizes based on media queries to enhance the
  responsiveness of the site to the end user devices.

  It is set up to be consistent with bootstraps default setting to provide a 
  consistent experience for the end user.
**********************************************************************************/

//Bar Chart 'Transfer Spending'
var barChartWidth;
var barChartHeight;

//Row Chart 'Value of Seasonal Transfers'
var seasonalFeesHeight;
var seasonalFeesWidth;

//Row Chart 'League Sold To'
var soldToHeight;
var soldToWidth;

//Row Chart 'League Sold From'
var soldFromHeight;
var soldFromWidth;

//To specify size (length) of table
var datatableSize;

/********************************************************/
/* Very Large devices (large desktops 1400px and above) */
/*                    col-lg-*                          */
/********************************************************/
if (window.matchMedia("(min-width: 1400px)").matches) {

    barChartWidth = 790;
    barChartHeight = 235;

    seasonalFeesWidth = 540;
    seasonalFeesHeight = 235;

    soldToWidth = 430;
    soldToHeight = 150;

    soldFromWidth = 430;
    soldFromHeight = 150;

    datatableSize = 50;
    //window.alert("Min screen size of 1400");
}


/***************************************************/
/* Large devices (large desktops 1200px and above) */
/*                    col-lg-*                     */
/***************************************************/
else if ((window.matchMedia("(min-width: 1200px)").matches)  && (window.matchMedia("(max-width: 1399px)").matches)) {

    barChartWidth = 730;
    barChartHeight = 235;

    seasonalFeesWidth = 510;
    seasonalFeesHeight = 235;

    soldToWidth = 400;
    soldToHeight = 150;

    soldFromWidth = 400;
    soldFromHeight = 150;

    datatableSize = 50;
}




/******************************************************/
/* Medium devices (tablets/desktops, 992px to 1199px) */
/*                        col-md-*                    */
/******************************************************/
else if ((window.matchMedia("(min-width: 992px)").matches)  && (window.matchMedia("(max-width: 1199px)").matches)) {
    barChartWidth = 1000;
    barChartHeight = 230;

    datatableSize = "Big";

    seasonalFeesWidth = 985;
    seasonalFeesHeight = 250;

    soldToWidth = 730;
    soldToHeight = 150;

    soldFromWidth = 730;
    soldFromHeight = 150;

    datatableSize = 25;
}


/********************************************/
/* Small devices (tablets, 768px to 991px) */
/*                 col-sm-*                */
/*********************************************/
else if ((window.matchMedia("(min-width: 768px)").matches)  && (window.matchMedia("(max-width: 991px)").matches)) {
    barChartWidth = 750;
    barChartHeight = 200;

    datatableSize = "Small";

    seasonalFeesWidth = 720;
    seasonalFeesHeight = 200;

    soldToWidth = 475;
    soldToHeight = 150;

    soldFromWidth = 475;
    soldFromHeight = 150;

    datatableSize = 15;
}


/*******************************************************************/
/* very Small devices (phones less than 768px but larger than 580) */
/*                 col-xs-*                    */
/*******************************************************************/
else if ((window.matchMedia("(min-width: 581px)").matches)  && (window.matchMedia("(max-width: 767px)").matches)) {

    barChartWidth = 630;
    barChartHeight = 170;

    datatableSize = "Small";

    seasonalFeesWidth = 630;
    seasonalFeesHeight = 210;

    soldToWidth = 630;
    soldToHeight = 150;

    soldFromWidth = 630;
    soldFromHeight = 150;

    datatableSize = 10;

    //Alert to tell users for best orientation
    if(window.innerHeight > window.innerWidth){ 
      alert("To be presented correctly on small mobile devices the charts need to viewed in landscape. Due to this the charts will be removed from your current portrait view. When you change your device orientation to landscape, the charts will automatically reload."); 
    }
}


/***********************************************/
/* very Small devices (phones less than 580px) */
/*                 col-xs-*                    */
/***********************************************/
else if (window.matchMedia("(max-width: 580px)").matches) {

    barChartWidth = 565;
    barChartHeight = 170;

    datatableSize = "Small";

    seasonalFeesWidth = 545;
    seasonalFeesHeight = 210;

    soldToWidth = 540;
    soldToHeight = 150;

    soldFromWidth = 540;
    soldFromHeight = 150;

    datatableSize = 10;

    //Alert to tell users for best orientation
    if(window.innerHeight > window.innerWidth){ 
      alert("To be presented correctly on small mobile devices the charts need to viewed in landscape. Due to this the charts will be removed from your current portrait view. When you change your device orientation to landscape, the charts will automatically reload."); 
    }
}


/******************************************************************************************************************************************************* 	
	Design decision was to make output as responsive as possible (inc graph resizing for different devices) but the pay-off is that a reload is required.
  	As reload only takes around 5 seconds and users are unlikly to repeatedly switch device orientation it was deemed the better approach.
********************************************************************************************************************************************************/
$(window).on("orientationchange", function() {
       location.reload();
});

