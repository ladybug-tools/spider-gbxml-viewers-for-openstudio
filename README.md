<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/ "View file as a web page." ) </span>


# Spider gbXML Viewers for OpenStudio

Source code and help for Spider gbXML Viewers included with NREL's OpenStudio progam


## [Spider gbXML Viewer for OpenStudio 2.9.0]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/spider-gbxml-viewer-for-openstudio-2-9-0/v-0-06-00/embeddable_gbxml_editor.html )
* embeddable_gbxml_editor.html
* Nothig happens when you load this file because init() and animate() are disabled so they may first called by the app doing the hosting

## [Spider gbXML Viewer test page]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/spider-gbxml-viewer-for-openstudio-2-9-0/v-0-06-00/embeddable-in-iframe-core.html )

* Popup viewer embedded in an Iframe
* Buttons load drawings via iframe.contentWindow.GBX.parseFile( gbxml-text );


## OpenStudio Requirements / 2019-09-02

* Our app users may not be online so we need the JavaScript dependencies to be directly copy/pasted into the html rather than loaded online
* We don’t want example files because that might confuse the users (e.g. wait that’s not my model, what’s happening?)
* We don’t yet support a workflow where the user could fix the file in the app so we would want to hide the fixer menus
* We need some type of method (e.g. setGbXml) that I can call from the app to pass in our gbXML file as a string


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

