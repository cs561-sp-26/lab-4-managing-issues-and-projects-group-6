 /*************************************************************************
 * File: createAccount.js
 * This file contains functions that support the "Create Account" Dialog.
 ************************************************************************/

  /*************************************************************************
 * @function createAccountBtn CLICK Handler 
 * @Desc 
 * When the user clicks the "Create Account" button link on the "Log In"
 * page, transition to the "Create Account" dialog.
 * @global GlobalCreateAccountDialog: The "Create Account" dialog
 * @global GlobalLoginPage: The Log In page
 * @global GlobalAcctEmailField: The email field
 *************************************************************************/
GlobalCreateAccountBtn.addEventListener("click",function(e) {
    GlobalLoginPage.classList.add("hidden");
    GlobalCreateAccountDialog.classList.remove("hidden");
    document.title = "Create Account";
    GlobalAcctEmailField.focus();
});

/*************************************************************************
 * @function acctProfilePicField CHANGE Handler 
 * @Desc 
 * When the user finishes interacting with the File picker dialog box,
 * update the user's profile picture based on the selection from the
 * file picker. If the user cancels out of the File Picker, the input
 * element's value will be empty and we set the profile picture to the
 * default picture.
 * @global acctProfilePicField: The "Create Account" form field 
 *         containing the optional profile picture
 * @global acctProfilePicImage: The "Create Account" <img> element that
 *         displays the user's profile picture (possibly the default)
 *************************************************************************/
 GlobalAcctProfilePicField.addEventListener("change",function(e) {
    if (GlobalAcctProfilePicField.value.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(GlobalAcctProfilePicField.files[0]);
        reader.addEventListener("load",function() {
            GlobalAcctProfilePicImage.setAttribute("src",this.result);
        });
    } else {
        GlobalAcctProfilePicImage.setAttribute("src",GlobalDefaultProfilePic);
    }
});

/*************************************************************************
 * @function createAccount 
 * @desc 
 * Given a JavaScript object containing a new account, create the account,
 * return the user to the "Log In" page, and display a toast message
 * indicating that a new account was created.
 * For now, we display the account data in an alert box. Eventually,
 * we will store the data to localStorage.
 * @global loginPage: The "Log In" page
 * @global createAccountDialog: The "Create Account" dialog
 * @global accountCreatedEmail: The field in the toast notification where
 *         we display the email of the new account.
 * @global: accountCreated: The toast notification on the "Log In" page
  *************************************************************************/
function createAccount() {
    //Build account object from form data
    const newAcct = {
        accountInfo: {
            email: GlobalAcctEmailField.value, 
            password: GlobalAcctPasswordField.value,
            securityQuestion: GlobalAcctSecurityQuestionField.value,
            securityAnswer: GlobalAcctSecurityAnswerField.value
        },
        identityInfo: {
            displayName: GlobalAcctDisplayNameField.value,
            profilePic: GlobalAcctProfilePicImage.getAttribute("src"),
        },
        speedgolfInfo: {
            bio: "",
            homeCourse: "",
            firstRound: "",
            personalBest: {strokes: 0, minutes: 0, seconds: 0, course: ""},
            clubs: {},
            clubComments: ""
        },
        rounds: [],
        roundCount: 0
    };    
    //Save account to localStorage as key-value pair
    localStorage.setItem(newAcct.accountInfo.email, 
        JSON.stringify(newAcct));
    //Reset form in case it is visited again
    resetCreateAccountForm();
    //Transition to "Log In" page
    document.title = "Log In to SpeedScore";
    GlobalCreateAccountDialog.classList.add("hidden");
    GlobalLoginPage.classList.remove("hidden");
    GlobalAccountCreatedEmail.textContent = newAcct.email;
    GlobalAccountCreated.classList.remove("hidden");
}
