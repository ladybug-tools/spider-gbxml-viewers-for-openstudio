<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/sandbox/spider-gbxml-gallery/ "View file as a web page." ) </span>


# Spider gbXML Gallery Read Me

<iframe src="https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/sandbox/spider-gbxml-gallery/spider-gbxml-gallery.html" style=height:500px;left-margin:-200px;width:900px;></iframe>

<details open >

<summary>Concept</summary>

This project was started because of a bug in Spider gbXML Viewer for OpenStudio as reported in the NREL site here:

* [Update embeddable_gbxml_editor.html to match new build from @theo-arm #3673]( https://github.com/NREL/OpenStudio/pull/3673 )

I started by manually adding buttons with links for test here in the 'uncompiled' version

* [Embeddable in Iframe gbXML Core Dev 0.05.03-0eiic]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/spider-gbxml-viewer-for-openstudio-2-9-0/fetch-assemble-save/v-0-05-03/embeddable-in-iframe-core-dev.html )

But then realized I would also have to manually add buttons with links to the 'compiled' version. And I also wanted to test the viewers on all th files currently available.

And that is how this was born:

## [Spider gbXML Gallery]( https://www.ladybug.tools/spider-gbxml-viewers-for-openstudio/sandbox/spider-gbxml-gallery/spider-gbxml-gallery.html )

### Features

* Automagically find all the repositories (up to 100) belonging to a GitHub user or organization
* Three organizations are pre-selected
	* NREL
	* Ladybug Tools
	* GreenBuildingXML
* Display the list of repo names in the menu
* When you click on a repo name, the script;
	* Finds all XML files in the GitHub repository
	* Lists the folder names and filenames for all the files found
	* For each file displayed there are three choices
		1. Click any  icon to view raw source code on GitHub.
		2. Click the name to view the file in 3D
			* Note: Tooltips provide file size.
		3. Click the ❐ icon to open the file in Spider gbXML Viewer "Maevia"


### Benefits

* Search through many gbXML files quickly
* Find the file you need easily
* Spot simple errors on the fly
* Invoke a more powerful editor with a single click

</details>

<details>

<summary>To Do / Wish List</summary>

* 2019-09-21 ~ Theo ~ Add input box so you can type in the names of any GitHub user or organization
* 2019-09-21 ~ Theo ~ Build a nicer version of the viewer. Work on mobile. Show levels. And so on
* 2019-09-21 ~ Theo ~ press spacebar to go to next file

</details>

<details>

<summary>Issues</summary>


</details>

<details>

<summary>Change Log</summary>

### 2019-09-21 ~ Theo

* F - First commit

</details>
