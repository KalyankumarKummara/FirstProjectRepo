async function Signin() {
    var Username = document.getElementById("Username").value;
    var Password = document.getElementById("Password").value;
    var captchaInput = document.getElementById("captcha-input").value;
    var captchaCode = document.getElementById("captcha");
    if(Username !=="" &&
        Password !=="" &&
        captchaInput !==""){
            if(captchaInput!=sessionStorage.getItem('captchaCode'))
            {
                alert("Enter a valid captcha")
                return false;
            }
        
            

        var myHeaders = new Headers();
        myHeaders.append("content-Type", "application\json");
        var raw = JSON.stringify(
            {
              Username : Username,
              Password : Password,
           });
           var requests = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        console.log(raw);
        var config = {
            method: "post",
            url: "/Login",
            headers: {
                "content-Type": "application/json",
            },
            data: raw,
        };
        
        const response = await axios(config);
        const resp = response.data;
        console.log(resp);
        if (resp == "Success") {

            alert("Login Successful !");
            location.href = "/BhajanaMandhiralu";
        } else {
            alert("Invalid Credentials");

        }
        
    }else{
        alert("Please enter all the details !");
    }    
    

  }    $(document).ready(function () {
    // Generate captcha on page load
    generateCaptcha();
    // Handle captcha refresh button click
    $("#refresh-captcha").click(function () {
        generateCaptcha();
        $("#captcha-input").val("");
    });
    // Handle form submit
    $("#captcha-form").submit(function (event) {
        event.preventDefault();

        // Validate captcha
        var captchaInput = $("#captcha-input").val();
        var captchaCode = sessionStorage.getItem("captchaCode");
        if (captchaInput != captchaCode) {
            alert("Invalid captcha code. Please try again.");
            generateCaptcha();
            $("#captcha-input").val("");
            return;
        }
        // Form validation successful, submit form
        alert("Form submitted successfully.");
        $("#captcha-form").trigger("reset");
        generateCaptcha();
    });

    // Define the function generateCaptcha()
    function generateCaptcha() {
        // Get the canvas element with ID captcha and create an instance of its canvas rendering context
        var a = $("#captcha")[0],
            b = a.getContext("2d");

        // Clear the canvas
        b.clearRect(0, 0, a.width, a.height);

        // Define the string of characters that can be included in the captcha
        var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            e = "",
            g = -20,
            h = 20,
            i = h - g,
            j = 20,
            k = 30,
            l = k - j;

        // Generate each character of the captcha
        for (var m = 0; m < 6; m++) {
            // Select random letter from the pool to be part of the captcha
            var n = f.charAt(Math.floor(Math.random() * f.length));
            e += n;

            // Set up the text formatting
            b.font = j + Math.random() * l + "px Arial";
            b.textAlign = "center";
            b.textBaseline = "middle";

            // Set the color of the text
            b.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";

            // Add the character to the canvas
            var o = g + Math.random() * i;
            b.translate(20 + m * 30, a.height / 2);
            b.rotate(o * Math.PI / 180);
            b.fillText(n, 0, 0);
            b.rotate(-1 * o * Math.PI / 180);
            b.translate(-(20 + m * 30), -1 * a.height / 2);
        }

        // Set the captcha code in session storage
        sessionStorage.setItem("captchaCode", e);
    }


})

