import urllib2
import xml.etree.ElementTree as ET


with open('states.txt') as f:
  states = f.readlines();

  for state in states:
    state = state.strip()
    print state

    tree = ET.parse('data/%s.kml' % state)
    root = tree.getroot()

    invalidIds = [None, 'HMdb']
    namespace = '{http://www.opengis.net/kml/2.2}'
    solr = "http://localhost:8983/solr/hmdb/update"

    # Document
    for child in root:
      # Placemark
      for pm in child:
        docId = pm.get('id');
        if docId not in invalidIds:
          name = pm.find('%sname' % namespace).text
          desc = pm.find('%sdescription' % namespace).text

          point = pm.find('%sPoint' % namespace)
          coords = point.find('%scoordinates' % namespace).text[:-2]
          coords = coords.split(',')
          coords = "%s,%s" % (coords[1], coords[0])

          add_xml = ET.Element('add');
          xdoc = ET.SubElement(add_xml, 'doc')
          
          field = ET.Element('field', name='id')
          field.text = docId
          xdoc.append(field)

          field = ET.Element('field', name='name')
          field.text = name
          xdoc.append(field)
          
          field = ET.Element('field', name='description')
          field.text = desc
          xdoc.append(field)
          
          field = ET.Element('field', name='coords')
          field.text = coords
          xdoc.append(field)

          try:
            request = urllib2.Request(solr)
            request.add_header('Content-Type', 'text/xml; charset=utf-8');
            request.add_data(ET.tostring(add_xml))
            response = urllib2.urlopen(request).read()
          except:
            print "Invalid location: %s %s" % (docId, name)

