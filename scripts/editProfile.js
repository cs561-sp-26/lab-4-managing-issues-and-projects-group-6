/*************************************************************************
 * File: editProfile.js
 * This file contains functions that support the "Account and Profile
 * Settings" Dialog.
 ************************************************************************/

 /*************************************************************************
 * @function profilePicField CHANGE Handler 
 * @Desc 
 * When the user finishes interacting with the File picker dialog box,
 * update the user's profile picture based on the selection from the
 * file picker. If the user cancels out of the File Picker, the input
 * element's value will be empty and we set the profile picture to the
 * default picture.
 * @global profilePicField: The "Update Profile" form field 
 *         containing the optional profile picture
 * @global profilePicImage: The "Update Profile" <img> element that
 *         displays the user's profile picture (possibly the default)
 *************************************************************************/
  GlobalProfilePicField.addEventListener("change",function(e) {
    if (GlobalProfilePicField.value.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(GlobalProfilePicField.files[0]);
        reader.addEventListener("load",function() {
            GlobalProfilePicImage.setAttribute("src",this.result);
        });
    } else {
        GlobalProfilePicImage.setAttribute("src",GlobalDefaultProfilePic);
    }
});

