
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
  
      fetch("/MandalData", {
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
