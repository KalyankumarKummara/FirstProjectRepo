async function Register() {
    var Username = document.getElementById("Username").value;
    var Email = document.getElementById("Email").value;
    var Password = document.getElementById("Password").value;
    var ConfirmPassword = document.getElementById("ConfirmPassword").value;
    function isValidEmail(Email) {
        const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        return re.test(String(Email).toLowerCase());
      }

    if (Username !== "" &&
        Email !== "" &&
        Password !== "" &&
        ConfirmPassword != "") {
       

        if(!isValidEmail(Email)){
            alert('Provide a valid email address');
            return false;
        } 
        
        if (Password.length < 8) {
            alert('Password must be atleast 8 characters');
            return false;
        }
        else if (ConfirmPassword !== Password) {
            alert("password must be same!");
            return false;
        }

    
        var myHeaders = new Headers();
        myHeaders.append("content-type", "application/json");
        var raw = JSON.stringify({
            Username: Username,
            Email: Email,
            Password: Password,
            ConfirmPassword: ConfirmPassword,
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
            url: "/Register",
            headers: {
                "content-Type": "application/json",
            },
            data: raw,
        };

        const response = await axios(config);
        const resp = response.data;

        console.log(resp);
        
           if (resp == "Success") {

            alert("Registered Successfully !");
            location.href = "/Login";
          } else {
            alert("Error while Saving the Details !");
     
        }
    }else{
        alert("please enter all the details !")
      }
     
    
}
function text(e) {
    var k;
    document.all ? k = e.keycode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123));
}