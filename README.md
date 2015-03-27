##Overview
This project is a quick example demonstrating how to visualize Solr results on a map view.

The data used in this project is provided by HMDB, OpenLayers is utilized to render the map.

Check out the Solr service to see how Solr results are translated into data that OpenLayers can use.  The particular functions are toMarkers and toGeoJson.

##Solr
A configuration is provided for Solr, simply create a collection using it to get going.

##Ingestion
I've provided some scripts for pulling data and ingesting it into Solr.  This worked at the time of writing but I can't guarantee it will work in the future.

##Frontend
To get going with the frontend simply carry out the following steps:

npm install

bower install

grunt serve

(You may need to modify the Solr URL in the Solr service to match your local environment)


