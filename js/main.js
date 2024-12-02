var siteName=document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");

var webSites=[];

if(localStorage.getItem("bookmark")!==null){
    webSites=JSON.parse(localStorage.getItem("bookmark"));
    displayUrl();
}
function addWebsite(){
        if(validateForm(siteName)&&validateForm(siteUrl)){
            var webSite={
                name:siteName.value,
                url:siteUrl.value,
            }
            webSites.push(webSite);
        localStorage.setItem("bookmark",JSON.stringify(webSites));
        
        console.log(webSites);
        
        displayUrl()
        clearForm()
        }
        else
         {
            showAlert()
            }
   
}


function clearForm(){
    siteName.value="";
    siteUrl.value="";
}

function displayUrl(){
    var cartoona=``;
    for(var i=0; i<webSites.length;i++)
    {
        cartoona +=`<tr > 
                <th scope="row">${i+1}</th>
                <td >${webSites[i].name}</td>
                <td><button onclick="visiteSite('${webSites[i].url}')" class="btn btn-outline-success btn-sm">Visit</button></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-outline-danger btn-sm  ">Delete</button></td>
                </tr>
                `

    }
    document.getElementById("tableRow").innerHTML=cartoona;
}

function deleteSite(deleteIndex){
    webSites.splice(deleteIndex,1);
    localStorage.setItem("bookmark",JSON.stringify(webSites));

    displayUrl()
}

function visiteSite(visitedUrl){
    console.log(visitedUrl);
    
    window.open(visitedUrl,'_blank')
}

function validateForm(element){
    var regex={
        siteName:/^[A-Z].{3}/,
        siteUrl:/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.([a-z]{2,})(\/[a-zA-Z0-9#]+\/?)*/,
    }
    if(regex[element.id].test(element.value)==true){
        
        element.classList.replace("is-invalid","is-valid");
        element.nextElementSibling.classList.replace("d-block","d-none");

        return true
       
    }
    else
    {
       element.classList.add("is-invalid");
       element.nextElementSibling.classList.replace("d-none","d-block");
       return false
    }
}


function showAlert() {
    Swal.fire({
        title: 'Warning!',
        html: `
            <p>Site name or URL is invalid. Please check the following requirements:</p>
            <ul style="text-align: left; margin-left: 20px;">
                <li>The site name must start with an uppercase letter and contain at least 3 characters. </li>
                <li>The URL must be valid (e.g., https://example.com).</li>
            </ul>
        `,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3498db',
    });
}
