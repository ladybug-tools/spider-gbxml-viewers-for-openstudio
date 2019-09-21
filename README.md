<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/ "View file as a web page." ) </span>


# Spider gbXML Viewers for OpenStudio

Source code and help for Spider gbXML Viewers included with [NREL]( https://www.nrel.gov/ )'s [OpenStudio]( http://nrel.github.io/OpenStudio-user-documentation/tutorials/tutorial_gbxmlimport/ ) program.

_The following files are a work-in-progress and not yet available in a working version of OpenStudio._


## [Spider gbXML Viewer v0.0.06.01 for OpenStudio 2.9.0]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/spider-gbxml-viewer-for-openstudio-2-9-0/v-0-06-01/embeddable_gbxml_editor.html )

<img src="https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/images/2019-09-10-spider-in-os.png" style=width:100%; >

* File: embeddable_gbxml_editor.html
* Nothing happens when you load this file because init() and animate() required by Three.js are disabled so they may first called by the app doing the hosting - in this case from within OpenStudio.



### Features

This file is living proof that the Spider code is viable in workflows based on mature and complex systems.

* Load gbXML files in a speedy fashion
* Display in real-time interactive 3D
* Click on a surface to view a subset of its data
* Adjust opacity and reset to home view
* Toggle
	* Rotation
	* Wireframe view
	* Axes
	* Bounding box
	* Edges
* View file statistics
* Sliding menu

### Usage

In order to test "embeddable_gbxml_editor.html" files with OpenStudio, copy a file into the ```bin``` folder of your OpenStudio installation. Start a new session and the file will appear the next time you invoke the gbXML Viewer from the geometry tab.

See the OpenStudio Advanced Tutorial [Working with gbXML]( http://nrel.github.io/OpenStudio-user-documentation/tutorials/tutorial_gbxmlimport/ ) for more details.

## [Spider gbXML Gallery for OpenStudio ]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/sandbox/spider-gbxml-gallery/spider-gbxml-gallery.html )

* Lots of fun here

## [Spider gbXML Viewer test page]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/spider-gbxml-viewer-for-openstudio-2-9-0/v-0-06-01/embeddable-in-iframe-core.html )


<img src="https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/images/2019-09-10-Spider-gbXML-Viewer-for-OpenStudio-v0.06.00-dev.png" style=width:100%; >

* Popup viewer embedded in an Iframe
* Allows you to test the runnable version of 'embeddable_gbxml_editor.html' outside of OpebStudio
* Buttons load drawings via iframe.contentWindow.GBX.parseFile( gbxml-text );

## [Fetch Assemble Save]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/spider-gbxml-viewer-for-openstudio-2-9-0/fetch-assemble-save/v-0-05-02/fetch-assemble-save-gbxml-core.html )

* The script that gathers the source code files, glues them together and allows you to save the single file to disk

## OpenStudio Requirements / 2019-09-02

_From email sent by Dan Macumber_

* Our app users may not be online so we need the JavaScript dependencies to be directly copy/pasted into the html rather than loaded online
* We don’t want example files because that might confuse the users (e.g. wait that’s not my model, what’s happening?)
* We don’t yet support a workflow where the user could fix the file in the app so we would want to hide the fixer menus
* We need some type of method (e.g. setGbXml) that I can call from the app to pass in our gbXML file as a string

 This is where the application currently initializes the gbXML viewer and passes in the file as a string to the setGbXml method.  I am happy to change that method name if needed, for your testing with the current version of the app it is expecting the method setGbXml.


* https://github.com/NREL/OpenStudio/blob/develop/openstudiocore/src/openstudio_lib/GeometryEditorView.cpp#L611

<details>

<summary title="Better title for this section?" >Links of interest</summary>

## gbXML Home Page

* <http://www.gbxml.org/>

> gbXML is an industry supported schema for sharing building information between disparate building design software tools.


### gbXML GitHub Presence
* <https://github.com/GreenBuildingXML>
	* <https://github.com/GreenBuildingXML/gbXML-Schema>
	* <https://github.com/GreenBuildingXML/Sample-gbXML-Files>
	* [Spider gbXML Viewer fork]( https://github.com/GreenBuildingXML/spider )

> Repositories for all things gbXML including the schema, validator source code, test cases, and a fork of the Spider gbXML Viewer


### gbXML Schema as a document

* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html>

> Schema GreenBuildingXML_Ver6.01.xsd / the core definition of gbXML in a format that is easier to read than the source code.


### More gbXML References

* <https://en.wikipedia.org/wiki/Green_Building_XML>

> The Green Building XML schema (gbXML) is an open schema developed to facilitate transfer of building data stored in Building Information Models (BIM) to engineering analysis tools. gbXML is being integrated into a range of software CAD and engineering tools and supported by leading 3D BIM vendors. gbXML is streamlined to transfer building properties to and from engineering analysis tools to reduce the interoperability issues and eliminate plan take-off time.


* <https://twitter.com/gbXML>
* The gbXML open schema helps facilitate the transfer of building properties stored in 3D building information models (BIM) to engineering analysis tools.


## DOE / NREL / OpenStudio

* [US Department of Energy]( https://www.energy.gov/ )
* [National Renewable Energy Laboratory]( https://www.nrel.gov/ )
	* The National Renewable Energy Laboratory is a national laboratory of the U.S. Department of Energy, Office of Energy Efficiency and Renewable Energy, operated by the Alliance for Sustainable Energy, LLC.
	* https://github.com/NREL
* [OpenStudio]( https://www.openstudio.net/ )
	* OpenStudio is a cross-platform collection of software tools to support whole building energy modeling using EnergyPlus and advanced daylight analysis using Radiance.
	* https://github.com/NREL/OpenStudio

### OpenStudio User Docs / Advanced Tutorials / Working with gbXML

* [OpenStudio User Documentation]( https://nrel.github.io/OpenStudio-user-documentation/ )

* [Working with gbXML]( https://nrel.github.io/OpenStudio-user-documentation/tutorials/tutorial_gbxmlimport/ )

> gbXML is an industry supported file format for sharing building information between disparate building design software tools. The OpenStudio Application can import and export gbXML files through the File->Import and File->Export menus.

NREL include a very basic version of the Spider gbXML Viewer in current releases of OpenStudio. The Ladybug Tools / Spider team is proud to be included in the project and makes best efforts to support users.

<img src="https://www.ladybug.tools/spider-gbxml-tools/images/openstudio-imported-gbxml.jpg" width=800 >

_Screen capture NREL tutorial on Spider gbXML Viewer running in OpenStudio 2.8.0_


### Get old Chromium builds

For older versions of Chromium

* https://sourceforge.net/projects/crportable/files/

See also ChromiumPortable_45.0.2453.0.paf.exe.txt file in assets folder. Drop the '.txt' at the end of the file name.


#### Using Chromium ~r45

* Do not use let or const
* Do not use default function parameters

</details>

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

