(function cameraStart() {
    
    var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#show-picture"),
        saveImage = document.querySelector("#save--image");
    
    var cloudinary = require('cloudinary').v2;
        // var Jimp = require('jimp');

    if (takePicture && showPicture) {
        // Set events
        takePicture.onchange = function (event) {
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;

                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);

                    // Set img src to ObjectURL
                    

                    // cloudinary.image(imgURL, {
                    //     overlay:"images/frame.png"
                    // });
                    

                    // cloudinary.image(imgURL, {
                    //     overlay:"images:frame.png"
                    // });

                    cloudinary.saveImage(imgURL, {
                        overlay:"images:frame.png"
                    });

                    showPicture.src = imgURL;

                    // Save the image to local gallery
                    saveImage.onclick = function () {
                        var gh = showPicture.src;
                        var a = document.createElement('a');
                        a.href = gh;
                        a.download = 'image.png';

                        a.click()
                    };

                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        // Display error message
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }


        };   
    }
})();
