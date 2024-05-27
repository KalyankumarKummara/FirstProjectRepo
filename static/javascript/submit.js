async function submit() {


  var form = new FormData();
  var Documents = document.getElementById("documents");
     console.log(Documents);
  if (!Documents.files[0]) {
    alert("please enter the all the details")
  }
  else {
    form.append("file", Documents.files[0], Documents.value);

    var settings = {
      "url": "/uploadfile",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "accept": "application/json",

      },


      "processData": false,
      "minetype": "multipart/form-data",
      "content-Type": "application/json",
      "data": form
    };
  }
  const response = await axios(settings);
  console.log(response);


  var Phases = document.getElementById("Phases").value;
  var District = document.getElementById("District_name").value;
  var Constituency = document.getElementById("Constituency_name").value;
  var Mandal = document.getElementById("Mandal_name").value;
  var Village = document.getElementById("Village_name").value;
  var Colony = document.getElementById("Colony_name").value;
  var Documents = response.data.filename[0];
  var Phone_no = document.getElementById("Phone_number").value;
  var Population = document.getElementById("Village_population").value;
  var Survey_no = document.getElementById("Survey_no").value;
  if (
    Phases !== "" &&
    District !== "" &&
    Constituency !== "" &&
    Mandal !== "" &&
    Village !== "" &&
    Colony !== "" &&
    Phone_no !== "" &&
    Population !== "" &&
    Survey_no !== ""
) {

  var myHeaders = new Headers();
  myHeaders.append("content-Type", "application\json");
  var raw = JSON.stringify(
    {
      Phases: Phases,
      District: District,
      Constituency: Constituency,
      Mandal: Mandal,
      Village: Village,
      Colony: Colony,
      Documents: Documents,
      Phone_no: Phone_no,
      Population: Population,
      Survey_no: Survey_no,
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
    url: "/BhajanaMandhiralu",
    headers: {
      "content-Type": "application/json",
    },
    data: raw,
  };

    const response2 = await axios(config);
    const resp = response2.data;

  console.log(resp);


  if (resp == "Success") {

    alert("Details saved Successfully !");
    location.href = "/BhajanaMandhiralu";
  } else {
    alert("Error while Saving the Details !");
  }

}else{
  alert("please enter all the details !");
}
}

document.addEventListener("DOMContentLoaded", function () {
  var d1 = document.getElementById("District_name");
  var select = document.getElementById("Mandal_name");

  function clearOptions() {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  }

  function Dropdown() {
    function datavalue() {
      var selectedDistricts = Array.from(d1.selectedOptions).map(
        (option) => option.value);
      return { Districts: selectedDistricts };
    }

    fetch("/GetMandals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datavalue()),
    })
      .then((response) => response.json())
      .then((data) => {
        var mandaldata = data;
        console.log(mandaldata);

        clearOptions();

        for (var i = 0; i < mandaldata.mandallist.length; i++) {
          var opt = document.createElement("option");
          var last = mandaldata.mandallist[i];
          opt.text = opt.value = last;
          select.add(opt);
        }

        document.getElementById("Mandal_name").fstdropdown.rebind();
      });
  }

  d1.addEventListener("change", Dropdown);
});


function numevent(e){
  var k;
  document.all ? k = e.keycode : k = e.which;
  return(k > 47 && k < 58);
  }
  
  function specialchar(e){
      var k;
      document.all ? k =e.keycode : k = e.which;
      return ((k > 43 && k < 58)||(k > 64 && k < 91) || (k > 96 && k < 123))
  }
  
  function charevent(e){
      var k;
      document.all ? k =e.keycode : k = e.which;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 44 && k < 47) || k == 32)
  }
  
  
