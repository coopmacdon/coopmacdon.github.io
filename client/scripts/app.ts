"use strict";

// IIFE - Immediately invoked functional expression

(function()
{


    // function AuthGuard() {
    //     let protected_routes = ["contact-list", "edit"];
    //     if (protected_routes.indexOf(location.pathname) > -1) {
    //         if (!sessionStorage.getItem("user")) {
    //
    //             location.href = "/login";
    //         }
    //     }
    // }

    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fa-solid fa-circle-arrow-left"></i> Logout</a>`);
        }

        $("#logout").on("click", function() {
            sessionStorage.clear();
            $("#login").html(`<a class="nav-link" href="login"><i class="fa-solid fa-circle-arrow-left"></i> Login</a>`);
            location.href = "/home";
        });
    }

    function ContactFormValidation(){
        //fullName
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First and Last name.");

        //contactNumber
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number.");

        //emailAddress
        ValidateField("#email", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address.");
    }

    /**
     *
     * This function validates input for contact and edit pages.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string){
        let messageArea = $("#messageArea");
        // let fullNamePattern =  /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;

        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select");
                // "Please enter in a valid first and last name (ex First [Middle] Lastname)"
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageArea.removeClass("class").hide();
            }

        });
    }

    function AddContact(fullName:string,contactNumber:string,emailAddress:string){
        let contact = new core.Contact(fullName,contactNumber,emailAddress);

        if(contact.serialize()){
            let key = contact.fullName.substring(0,1)+ Date.now();
            localStorage.setItem(key,contact.serialize() as string);


        }
        console.log("outside if of add contact function")
    }

    function DisplayHomePage()
    {
        console.log("Called DisplayHomePage...")

        $("#AboutUsBtn").on("click", ()=> {
            
            location.href = "/about";
        } );

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my paragraph</p>`)

        $("main").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph<p/></article>`)

    }

    function DisplayProductPage()
    {
        console.log("Called DisplayProductPage")
    }

    function DisplayServicePage()
    {
        console.log("Called DisplayServicePage")
    }

    function DisplayAboutPage()
    {
        console.log("Called DisplayAboutPage")
    }

    function DisplayContactPage()
    {

        console.log("Called DisplayContactPage");

        $("a[contact-list]").off("click");
        $("a[contact-list]").on("click", function() {

            location.href = "/contact-list";
        });

        ContactFormValidation();
        // TestFullName();
        // ValidateField(fullName);
        // ValidateField(contactNumber);
        // ValidateField(emailAddress);

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckBox") as HTMLInputElement;

        sendButton.addEventListener("click",function (){
            if(subscribeCheckbox.checked){
                let fullName:string = document.forms[0].fullName.value;
                let contactNumber:string = document.forms[0].contactNumber.value;
                let email:string = document.forms[0].email.value;
                AddContact(fullName,contactNumber,email);
            }
        })
    }

    function DisplayContactListPage()
    {
        console.log("Called DisplayContactListPage")

        $("a.delete").on("click", function(event) {

            if(!confirm("Confirm contact Delete")){
                event.preventDefault();
                location.href = "/contact-list"};

            location.href = "/contact-list";
        })

    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...")
        ContactFormValidation();


    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()...")





        $("#cancelButton").on("click", function() {
            document.forms[0].reset();

            location.href = "/home";

        });
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()...")


    }

    function Display404Page() {
        console.log("Called Display404Page()...")
    }




    function Start(){
        console.log("App Started...");

        let page_id = $("body")[0].getAttribute("id");
        CheckLogin()

        switch (page_id) {
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "services":
                DisplayServicePage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                // AuthGuard();
                DisplayContactListPage();
                break;
            case "products":
                DisplayProductPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "edit":
            case"add":
                // AuthGuard();
                DisplayEditPage();
                break;
            case "404":
                Display404Page();
                break;

        }

    }
    window.addEventListener("load", Start)
})()