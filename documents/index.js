const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  const today = new Date();

  var judges_data = [];

  if (data) {
    for (let j of data?.judge_ids) {
      let content = data?.judge_paragraphs[j?.judge_id];
      let image = data?.judge_img[j?.judge_id];

      const temp = {
        id: j?.judge_id,
        type: j.type,
        judge_name: data?.judge_names_array[j?.judge_id],
        profile_content: content,
        image: image,
      };
      judges_data.push(temp);
    }
  }

  function paginate(array) {
    var pages = [];
    var count = 0;
    var page = 0;
    var sorted_data = [];

    if (array) {
      for (let i in array) {
        count = count + 1;
      }
      for (let i = 0; i <= count / 5; i++) {
        if (page > 1) {
          pages.push(array.slice(page * 5 - 5, page * 5));
        } else {
          pages.push(array.slice(0, 5));
        }
        page = page + 1;
      }
    }

    for (let j of pages) {
      sorted_data.push(formatDogs(j));
    }

    return sorted_data;
  }

  function formatDogs(dogs) {
    const categories = [...new Set(dogs.map((dogs) => dogs.class_name))];
    return categories.reduce((acc, class_name) => {
      const _dogs = dogs.filter((dogs) => dogs.class_name === class_name);
      const male_dogs = _dogs.filter((dog) => dog.sex == "Male");
      const female_dogs = _dogs.filter((dog) => dog.sex == "Female");
      var f_count = 0;
      var m_count = 0;

      for (let f of female_dogs) {
        f_count = f_count + 1;
      }
      for (let m of male_dogs) {
        m_count = m_count + 1;
      }

      if (f_count > 0 && m_count > 0) {
        return [
          ...acc,
          { class_name: class_name, dogs: [female_dogs, male_dogs] },
        ];
      } else if (f_count > 0 && m_count == 0) {
        return [...acc, { class_name: class_name, dogs: [female_dogs] }];
      } else if (f_count == 0 && m_count > 0) {
        return [...acc, { class_name: class_name, dogs: [male_dogs] }];
      }
    }, []);
  }

      function formatBreeds(breeds){
         const categories = [...new Set(breeds.map(breeds=> breeds.group_id))]
         return categories.reduce((acc, group_id)=> {
            const _breeds = breeds.filter(breed=> breed.group_id === group_id)
         return [...acc, {group_id: group_id, breeds: _breeds}]
         }, [])
      }
      
      const fromatAdverts=()=>{
         let b_groups=formatBreeds(data.breeds)
         var groupCount=0;
         var AdsCount=0;
         var ads_arr=[]

         for(let l in b_groups){
               groupCount=groupCount+1
         }
         for(let l in data.ads){
            AdsCount=AdsCount+1
         }

        if(AdsCount==0){
           return false
        }
         else if(groupCount>AdsCount){
           ads_arr=Array(10).fill(data.ads).flat()
            return ads_arr
         }
        else{
          return data.ads
         }
      }  

    const logoKCPB64 = fs.readFileSync(path.join(__dirname, './logo.png'), {encoding: 'base64'});
    const logoKCPSRC = "data:image/jpeg;base64,"+logoKCPB64;

    const logoFCIB64 = fs.readFileSync(path.join(__dirname, './fci.png'), {encoding: 'base64'});
    const logoFCISRC = "data:image/jpeg;base64,"+logoFCIB64;

    const backgroundImgSRCB64 = fs.readFileSync(path.join(__dirname, './Catalouge2.png'), {encoding: 'base64'});
    const backgroundImgSRC = "data:image/jpeg;base64,"+backgroundImgSRCB64;
      
console.log(fromatAdverts())

  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <link rel="preconnect" href="https://fonts.googleapis.com">
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
         <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
                  <title>PDF Result Template</title>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                  <link href="http://fonts.cdnfonts.com/css/acknowledgement" rel="stylesheet">
                  <style>
                    *{
                      font-family: 'Roboto', sans-serif;
                      }
               .catalouge-main{
                  padding:50px;
                  background-image:url(${backgroundImgSRC});
                  background-repeat: no-repeat;
                  background-size: cover;
                  height:200mm !important;
               }
               .header{
                  margin:0 12px;
               
               }
               b{font-weight:bold !important;}
               .header img{
                  display:inline-block;
               }

               p{
                  margin-bottom:0 !important;
               }
               h1{
                 font-size:24px !important;
               }
               h2{
                 font-size:22px !important;
               }
               h3{
                 font-size:20px !important;
               }
               h4{
                 font-size:18px !important;
               }
               h5{
                 font-size:16px !important;
               }
               h6{
                 font-size:14px !important;
               }
               p{
                 font-size:13px !important;
               }
          </style>
       </head>
       <body>
       <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
            <center>
            <table  class="header" width="100%">
            <tr>
            <td>  <img src=${logoKCPSRC} height="80"/></td>
            <td aling="center">   
            <center>   
            <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
            </center>
            </td>
            <td>  <img src=${logoFCISRC} height="80"/></td>
            </tr>    
            </table>
            </center>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">${data.title}</h1>
            <br/>
            <br/>
               <h5 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">JUDGES: ${data.judge_names}</h5>
               <br/>
               <br/> 
               <br/>
               <h5 class="text-uppercase"    style="text-align: center;font-family: 'Acknowledgement', sans-serif;">VENUE:  ${data.venue}</h5>
               <br/>
               <br/>
               <br/>
               <h5 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">DATE:  ${data.dates}</h5>
               </div>
               
       ${judges_data.map(
         ({ judge_name, profile_content, image, type,id }) =>
           `<div class="catalouge-main" style="padding:50px !important;page-break-before:always">
            <center>
            <table  class="header" width="100%">
            <tr>
            <td>  <img src=${logoKCPSRC} height="80"/></td>
            <td aling="center">   
            <center>   
            <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
            </center>
            </td>
            <td>  <img src=${logoFCISRC} height="80"/></td>
            </tr>     
            </table>
            </center>
            <br/>
               <h1 style="font-size:40px;  text-align: center;font-family: 'Acknowledgement', sans-serif;" class="text-uppercase">${judge_name}</h1>
               <br/>
               <p align="justify" style="font-size:20px; font-weight:300 !important;">
                <img style="margin-right:10px;float:left;margin-left:10px; margin-bottom:10px" height="150px" 
                src=${data?.judge_img[id]}/>
               ${profile_content}</p>
               </div>
               `
       )}

      ${formatBreeds(data?.breeds).map(({breeds},ind)=>(

         `
         ${fromatAdverts()?`
         <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
            <img src=${data.ads_img[fromatAdverts()[ind]?.id]} height="100%" width="100%"/>
         </div>`:null}
         ${
         breeds.map(
        ({ id, breed, group_id, description, image, countryName }, ind) =>
          `
            <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
            <center>
            <table   class="header" width="100%" >
            <tr>
            <td>  <img src=${logoKCPSRC} height="80"/></td>
            <td aling="center">   
            <center>   
            <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
            </center>
            </td>
            <td>  <img src=${logoFCISRC} height="80"/></td>
            </tr>       
            </table>
            </center>
            <br/>
            <br/>
            <center>
            <p class="text-uppercase" style="font-size:28px; font-weight:800;font-family: 'Acknowledgement', sans-serif;">
            ${breed || ""}
            </p> 
            </center>
            <table style="width:100%; margin:20px 0;">
            <tr>
            <td align="left" style="width:50%">
            <p  style="font-size:22px; font-weight:800;">
              <strong class="fw-bold">Country of Origin: </strong>${countryName || ""}
            </p>
            </td>
            <td align="right" >
            <p style="font-size:22px; font-weight:800;">
            <span class="fw-bold">FCI GROUP:</span> ${group_id || ""}
            </p>
            </td>
            </tr>
            </table>
               <p align="justify" style="font-size:25px; font-weight:300 !important;">
                <img style="margin-right:10px;float:right;margin-left:10px; margin-bottom:10px"
                  height="150" src=${data.breed_img[id]}/>
               ${data?.breed_paragraphs[id]}</p>
               </div>
               ${paginate(data?.Dogs["breed" + id]).map(
                 (page) => `
               <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
               <center>
               <table  class="header" width="100%" >
               <tr>
            <td>  <img src=${logoKCPSRC} height="80"/></td>
            <td aling="center">   
            <center>   
            <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
            </center>
            </td>
            <td>  <img src=${logoFCISRC} height="80"/></td>
            </tr>      
               </table>
               </center>
               <br/>
               <center>
               ${page.map(
                 ({ dogs,class_name }) =>
                     dogs.map(
                       (dog,ind) =>
                         `
                         <table style="width:80%;">
                         <tr>
                         <td align="left">
                         <p class="text-uppercase" style="font-family: 'Acknowledgement', sans-serif; font-size:22px; font-weight:800;">${
                           dog[0].sex
                            }</p>
                            </td>
                         <td align="left" width="70%"><p class="text-uppercase" style="font-family: 'Acknowledgement', sans-serif;font-size:22px; font-weight:800;">
                         ${class_name.replace("Class","")}</p></td>
                        
                         </tr>
                            </table>
                            <table width="90%">
                            ${
                              dog
                   ? dog.map(
                     (
                       {
                         KP,
                         regestration_no,
                         dog_name,
                         sire_name,
                         sire_KP,
                         dam_KP,
                         sire_reg_no,
                         dam_reg_no,
                         owners,
                         breeder,
                         dam_name,
                         dob,
                         sex,
                         catalog_id,
                        },
                         ind
                       ) =>(
                         `
                         <tr class="mb-0">
                         <td style="vertical-align:baseline;text-align: center;" width="5%">
                         <p  class="fw-bold p-2">
                         ${
                           catalog_id.toString().lenght == 1
                             ? "00" + catalog_id
                             : catalog_id.toString().lenght == 2
                             ? "0" + catalog_id
                             : catalog_id
                         })
                         <p/>
                         </td>
                  <td width="85%" style="padding-bottom:10px;">
                  <p>
                  <span class="fw-bold">${dog_name}</span>, ${
                           KP?"["+  "KP " + KP +"]": regestration_no?"["+regestration_no+"]":''
                         }, ${new Date(dob).toDateString().substring(3).slice(0,7)
                          +","+new Date(dob).toDateString().substring(10)}</p>
                         ${
                      
                          ` <p ><b>${sire_name||"Unknown"}</b>, ${
                            sire_KP ?"["+ "KP " +  sire_KP +"]": sire_reg_no?"["+sire_reg_no+"]":""
                          } X <b>${dam_name||"Unknown"}</b>, ${
                            dam_KP ?"["+ "KP " + dam_KP +"]" : dam_reg_no?"["+dam_reg_no+"]":""
                          }</p>`
                         }
                  <p ><span class="fw-bold">B</span>:
                   ${breeder ||"Unknown"},&nbsp; <span class="fw-bold">O</span>:&nbsp;${owners || "Unknown"}</p>
                  </td>
                  </tr>
                  `
                     ))
                   : ''
               } `
                     )
                  )}
                  </table>
                 </center>
                  </div>`
               )}
               `
      ) }
      `))}
       </body>
    </html>
    `;
};
