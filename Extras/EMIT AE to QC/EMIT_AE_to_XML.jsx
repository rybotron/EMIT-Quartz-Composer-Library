/*
EMIT AE to XML Script for the EMIT Quartz Composer Library
Built by Rybotron - Ryan Berkey
www.rybotron.com
www.facebook.com/rybotronic
*/

(function writeXML( OBJ ){

    function formatProperties( propValue, frameTime ){
        var propReturn;
        propReturn = '<x>' + propValue[0] + '</x>';
        propReturn += '<y>' + propValue[1] + '</y>';
        propReturn += '<z>' + propValue[2] + '</z>';
        return propReturn;
    }

    var comp = app.project.activeItem;  
    var layers = comp.selectedLayers;

    // Get the absolute path for After Effects, the Scripts folder path, and the desktop path
    var AEPath = ( new File( $.fileName ) ).parent.fullName; 
    var scriptsPath = ( new File( $.fileName ) ).parent.fullName;
    var desktopPath = Folder.desktop.fullName;

    // Create the EMIT AE Folder with an XML subfolder
    var EMITPath = desktopPath + '/EMIT AE Loader';
    var XMLPath = EMITPath + '/xml';
    var EMITFolder = new Folder( EMITPath );
    var xmlFolder = new Folder( XMLPath );
    EMITFolder.create();
    xmlFolder.create();

    // Copy the QC File to the EMIT AE folder on the desktop
    var QCFilePath = '/EMIT AE XML Loader.qtz';
    var QCFile = Folder( scriptsPath + QCFilePath );
    QCFile.copy( EMITPath + QCFilePath );

    var file = new File( XMLPath + '/EMIT_AE_Export.xml' );

    if ( file.open("w") ) {

        var header;
        header = '<?xml version="1.0" encoding="ISO-8859-1"?>\n'
        header += '<composition>\n';
        header += '<settings>\n';
        header += '<name>' + comp.name + '</name>\n';
        header += '<width>' + comp.width + '</width>\n';
        header += '<height>' + comp.height + '</height>\n';
        header += '<aspect>' + comp.width / comp.height + '</aspect>\n';
        header += '<duration>' + comp.duration + '</duration>\n';
        header += '<frameRate>' + comp.frameRate + '</frameRate>\n';
        header += '<frameDuration>' + comp.frameDuration + '</frameDuration>\n';
        header += '<numLayers>' + layers.length + '</numLayers>\n';
        header += '</settings>\n';

        file.write(header);

        file.writeln('<layers>');
        for ( var l = 0; l < layers.length; l++ ){

            var layer = layers[l];
            file.writeln('<layer>');

            // Adds a layers settings section to the XML with the name, width, height, & artwork file path
            var layerSettings;
            layerSettings = '<name>' + layer.name + '</name>\n';

            // If the layer source is imported artwork and not a solid or null...
            if( layer.source.file ){
            // Create an artwork folder in the EMIT AE Folder on the desktop to copy the artwork into
                if( typeof artworkFolder === 'undefined' ){
                    var artworkPath, artworkFolder;
                    artworkPath = EMITPath + '/artwork';
                    artworkFolder = new Folder( artworkPath );
                    artworkFolder.create();
                }
                // Get layer's artwork location on the harddrive and copy it to an artwork folder in the EMIT AE folder
                var layerFile = Folder( layer.source.file.fullName );
                layerFile.copy( artworkPath + '/' + layer.source.file.name );
                layerSettings += '<path>artwork/' + layer.source.file.name.toString() + '</path>\n';
            }

            layerSettings += '<width>' + layer.width + '</width>\n';
            layerSettings += '<height>' + layer.height + '</height>\n';
            file.write(layerSettings);

            // Loop through transform properties to get keyframe values
            file.writeln('<transform>');
            var anchorPointText = '<anchor>';
            for (var a = 0; a < comp.duration; a += comp.frameDuration) {
                // anchorPointText += '<anchorPoint>';
                anchorPointText += '<frame>' + formatProperties( layer.transform.anchorPoint.valueAtTime(a, false) ) + '</frame>';
                // anchorPointText += '</anchorPoint>';
                if ( layer.transform.anchorPoint.isTimeVarying ) continue;
                else break;
            }
            anchorPointText += '</anchor>';
            file.write( anchorPointText );

            var positionText = '<position>';
            for (var p = 0; p < comp.duration; p += comp.frameDuration) {
                // positionText += '<position>';
                positionText += '<frame>' + formatProperties( layer.transform.position.valueAtTime(p, false) ) + '</frame>';
                // positionText += '</position>';
                if ( layer.transform.position.isTimeVarying ) continue;
                else break;
            }
            positionText += '</position>';
            file.write( positionText );

            var scaleText = '<scale>';
            for (var s = 0; s < comp.duration; s += comp.frameDuration) {
                // scaleText += '<scale>';
                scaleText += '<frame>' + formatProperties( layer.transform.scale.valueAtTime(s, false) ) + '</frame>';
                // scaleText += '</scale>';
                if ( layer.transform.scale.isTimeVarying ) continue;
                else break;
            }
            scaleText += '</scale>';
            file.write( scaleText );

            var rotationText = '<rotation>';
            for (var r = 0; r < comp.duration; r += comp.frameDuration) {
                var rotationTimeVarying;
                // rotationText += '<rotation>';
                rotationText += '<frame>';
                if( layer.threeDLayer ){
                    rotationTimeVarying = layer.transform.xRotation.isTimeVarying || layer.transform.yRotation.isTimeVarying || layer.transform.zRotation.isTimeVarying;

                    rotationText += '<x>' + layer.transform.xRotation.valueAtTime(r, false) + '</x>';
                    rotationText += '<y>' + layer.transform.yRotation.valueAtTime(r, false) + '</y>';
                    rotationText += '<z>' + layer.transform.zRotation.valueAtTime(r, false) + '</z>';
                }
                else{
                    rotationTimeVarying = layer.transform.rotation.isTimeVarying;
                    rotationText += '<x>0</x><y>0</y><z>' + layer.transform.rotation.valueAtTime(r , false) + '</z>';
                }
                rotationText += '</frame>';
                // rotationText += '</rotation>';
                if ( rotationTimeVarying ) continue;
                else break;
            }
            rotationText += '</rotation>';
            file.write( rotationText );

            var opacityText = '<opacity>';
            for (var t = 0; t < comp.duration; t += comp.frameDuration) {
                // opacityText += '<opacity>';
                opacityText += '<frame>' + layer.transform.opacity.valueAtTime(t, false) + '</frame>';
                // opacityText += '<opacity>';
                if ( layer.transform.opacity.isTimeVarying ) continue;
                else break;
            }
            opacityText += '</opacity>';
            file.write( opacityText );

            file.writeln('</transform>')
            file.writeln('</layer>');
        }
        file.writeln('</layers>');
        file.writeln('</composition>');
        file.close();
    }
    // QCFile.execute();
})(this);