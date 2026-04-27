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
/*************************************************************************
 * @function resetupdateProfileForm 
 * @Desc 
 * When the user exits the "Update Profile" Dialog, reset the form to
 * blank in case the form is visited again.
 * @global GlobalProfileEmailFiled: Form's email field
 * @global GlobalProfilePasswordField: Form's password field
 * @global GlobalProfileDisplayNameField: Form's display name field
 * @global GlobalProfileSecurityQuestionField: Form's security q field
 * @global GlobalProfileSecurityAnswerField: Form's security answ field
 * @global GlobalProfileErrBox: <div> containing the error messages
 * @global GlobalProfileEmailErr: Error message for email field
 * @global GlobalProfilePasswordErr: Error message for password field
 * @global GlobalProfileDisplaynameErr: Error message for display name field
 * @global GlobalProfileSecurityQuestionErr: Error message for security q field
 * @global GlobalProfileSecurityAnswerErr: Error message for security answ field
 *************************************************************************/
 function resetUpdateProfileForm() {
    //Hide errors
    GlobalProfileErrBox.classList.add("hidden");
    GlobalProfileEmailErr.classList.add("hidden");
    GlobalProfileDisplayNameErr.classList.add("hidden");
    GlobalProfileSecurityQuestionErr.classList.add("hidden");
    GlobalProfileSecurityAnswerErr.classList.add("hidden");
    //Blank out account info
    GlobalProfileEmailField.value = "";
    GlobalProfilePasswordField.value = "";
    GlobalProfileSecurityQuestionField.value = "";
    GlobalProfileSecurityAnswerField.value = "";
    //Blank out Identity info
    GlobalProfileDisplayNameField.value = "";
    GlobalProfilePicField.value = "";
    GlobalProfilePicImage.setAttribute("src",GlobalDefaultProfilePic);
    //Blank out Speedgolf info
    GlobalProfileBioField.value = "";
    GlobalProfileFirstRoundField.value = "";
    GlobalProfileHomeCourseField.value = "";
    GlobalProfileBestStrokesField.value = "";
    GlobalProfileBestMinutesField.value = "";
    GlobalProfileBestSecondsField.value = "";
    GlobalProfileBestCourseField.value = "";
    for (let i = 0; i < GlobalAllClubs.length; ++i) {
        document.getElementById("sg"+ GlobalAllClubs[i]).checked = false;
    }
    GlobalProfileClubCommentsField.value = "";
    //Set first focusable item.
    GlobalFirstFocusableUpdateProfileItem.set(GlobalProfileEmailField);
    //Expand only the first accordion panel
    GlobalAccountSettingsBtn.classList.remove("collapsed");
    GlobalAccountSettingsPanel.classList.add("show");
    GlobalProfileSettingsBtn.classList.add("collapsed");
    GlobalProfileSettingsPanel.classList.remove("show");
    GlobalsgSettingsBtn.classList.add("collapsed");
    GlobalsgSettingsPanel.classList.remove("show");
}
