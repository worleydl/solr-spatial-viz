import urllib

baseUrl = "http://www.hmdb.org/gpx/kml.asp?State=%s"
with open('states.txt') as f:
  content = f.readlines();

  for state in content:
    state = state.strip();

    kml = urllib.URLopener()
    print "Retreiving %s" % state
    kml.retrieve(baseUrl % state, "data/%s.kml" % state)

