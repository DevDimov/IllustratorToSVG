var sourceFolder, files, fileType, sourceDoc, targetFile, svgSaveOpts;

// Select the source folder
sourceFolder = Folder.selectDialog('Select the folder with Illustrator files you want to convert to SVG');

// If a valid folder is selected
if ( sourceFolder != null ) {
    files = new Array();
    fileType = prompt('Select type of Illustrator files to you want to process', '*.ai');
	
    // Get all files matching the pattern
    files = sourceFolder.getFiles(fileType);
	
    if (files.length > 0) {
        var type = ExportType.SVG;
        for ( i = 0; i < files.length; i++ ) {
	    sourceDoc = app.open(files[i]); // returns the document object
							
            // Save file in the source folder 
            targetFile = new File(sourceFolder);
			
	    // Call function getSVGOptions to get the ExportOptionsSVG for the files
	    svgSaveOpts = getSVGOptions();
			
	    // Save as svg
            sourceDoc.exportFile(targetFile, type, svgSaveOpts);
            sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
            sourceDoc = null; 
	}
	alert('All files saved as SVG in ' + sourceFolder);
    }
    else {
        alert('No matching files found');
    }
}

function getSVGOptions() {
    var exportOptions = new ExportOptionsSVG();
    exportOptions.embedRasterImages = true;
    exportOptions.embedAllFonts = true;
    exportOptions.preserveEditability = true;
    return exportOptions;
}
