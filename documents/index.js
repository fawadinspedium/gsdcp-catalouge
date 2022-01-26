const axios = require("axios");
const fs=require('fs');
const path=require('path');

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
      const male_dogs = _dogs.filter((dog) => dog?.sex === "Male");
      const female_dogs = _dogs.filter((dog) => dog?.sex === "Female");
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
          { class_name: class_name, dogs: [female_dogs,male_dogs] },
        ];
      } else if (f_count > 0 && m_count == 0) {
        return [...acc, { class_name: class_name, dogs: [female_dogs] }];
      } else if (f_count == 0 && m_count > 0) {
        return [...acc, { class_name: class_name, dogs: [male_dogs] }];
      }
    }, []);
  }
    const logoKCPB64 = fs.readFileSync(path.join(__dirname, './logo.png'), {encoding: 'base64'});
    const logoKCPSRC = "data:image/jpeg;base64,"+logoKCPB64;

    const logoFCIB64 = fs.readFileSync(path.join(__dirname, './fci.png'), {encoding: 'base64'});
    const logoFCISRC = "data:image/jpeg;base64,"+logoFCIB64;

    const backgroundImgSRCB64 = fs.readFileSync(path.join(__dirname, './Catalouge2.png'), {encoding: 'base64'});
    const backgroundImgSRC = "data:image/jpeg;base64,"+backgroundImgSRCB64;
      
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
                      color:whitesmoke;
                      }
               .catalouge-main{
                  padding:50px;
                  background-image:url(${backgroundImgSRC|| "#"});
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
               h1,h2,h3,h4,h5,h6,span,p,b,strong,i{
                 color:black !important;
               }
          </style>
       </head>
       <body>
       <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
            <center>   
            <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
            </center>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">${data?.title}</h1>
            <br/>
            <br/>
               <h5 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">JUDGES: ${data?.judge_names}</h5>
               <br/>
               <br/> 
               <br/>
               <h5 class="text-uppercase"    style="text-align: center;font-family: 'Acknowledgement', sans-serif;">VENUE:  ${data?.venue}</h5>
               <br/>
               <br/>
               <br/>
               <h5 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">DATE:  ${data?.dates}</h5>
               </div>
               <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
               <center>   
               <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
               </center>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <h1 class="text-uppercase" style="text-align: center;font-family: 'Acknowledgement', sans-serif;">
               GSDCP Managing
               Committee</h1>
               <br/>
               <br/>
               <center>
               <table style="width:80%;">
               ${  
                data?.team.map(({full_name,position_name})=>(
                  `<tr><td><h2>${full_name}</h2></td>
                  <td><h2>${position_name}</h2></td></tr>
                  `
                ))
               }
               </table>
               </center>
                  </div>
                  ${paginate(data?.Dogs["breed" + 15]).map(
           (page) => `
         <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
         <center>   
         <h5 style="font-famaily:Acknowledgement; margin:0 20px;">${data?.title}</h5>
         </center>
         <br/>
         <center>
         <div>
         ${
            page.map(({dogs})=>(
              dogs.map((dog)=>(
                   `
                   ${
                     dog[0]?
                     `
                     <table>
                     <tr>
                     <td width="30%"><h1>${dog[0]?.class}</h1></td>
                     <td  width="30%"><h1>${dog[0]?.sex}</h1></td>
                     <td  width="30%"><h1>${dog[0]?.hair!=="Stock Hair"?'Long-Stock':''}</h1></td>
                     </tr>
                     </table>
                   `
                     :'<span style="display:none;"></span>'
                   }
                   ${
                     dog.map(({dob,sire_name,dam_name,catalog_id,dog_name,KP,
                      sire_KP,dam_KP,breeder,owners,dam_reg_no,sire_reg_no,hair},ind)=>(
                       `
                       ${
                        ind!==0&&dog[ind]?.sex!== dog[ind-1]?.sex && ind!==0&&dog[ind]?.hair!== dog[ind-1]?.hair ?
                          `
                          <table>
                                            <tr>
                                            <td width="30%"><h1>${dog[ind]?.class}</h1></td>
                                            <td  width="30%"><h1>${dog[ind]?.sex}</h1></td>
                                            <td  width="30%"><h1>${dog[ind]?.hair!=="Stock Hair"?'Long-Stock':''}</h1></td>
                                            </tr>
                                            </table>`
                         :''
                       }
                       <table>
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
                  </table>
                       `
                     ))
                   }  
                  `
              ))
            ))
         }
         </div>
            </table>
           </center>
            </div>`
         )}
       </body>
    </html>
    `;
};
