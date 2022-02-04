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

    while(array.length) pages.push(array.splice(0,5));
    
    for (let j of pages) {
      sorted_data.push(formatDogs(j));
    }

    for(let d in sorted_data){
      let temp=sorted_data
      let prev=parseInt(d)-1

      if(d==0){
        temp[d]=[{...temp[d][0],isAd:true}]
      }
      if(d>0){
      let [a]=sorted_data[d]
      let [b]=sorted_data[prev]

    if(a['class_name']!==b['class_name']){
      temp[d]=[{...temp[d][0],isAd:true}]
    }
    else{
      temp[d]=[{...temp[d][0],isAd:false}]
    }
    sorted_data=temp
  }
}

    return sorted_data;
  }
  function formatDogs(dogs) {
    const categories = [...new Set(dogs.map((dogs) => dogs?.class_name))];
    return categories.reduce((acc, class_name) => {
      const _dogs = dogs.filter((dogs) => dogs?.class_name === class_name);
      const male_dogs = _dogs.filter((dog) => dog?.sex == "Male");
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

  const fromatAdverts=()=>{
    let ads_arr=Array(20).fill(data.ads).flat()
    return(ads_arr) 
 }  

 fromatAdverts()

    const logoKCPB64 = fs.readFileSync(path.join(__dirname, './logo.png'), {encoding: 'base64'});
    const logoKCPSRC = "data:image/jpeg;base64,"+logoKCPB64;

    const logoFCIB64 = fs.readFileSync(path.join(__dirname, './fci.png'), {encoding: 'base64'});
    const logoFCISRC = "data:image/jpeg;base64,"+logoFCIB64;

    const backgroundImgSRCB64 = fs.readFileSync(path.join(__dirname, './Catalouge2.png'), {encoding: 'base64'});
    const backgroundImgSRC = "data:image/jpeg;base64,"+backgroundImgSRCB64;

    const dogImgOne = fs.readFileSync(path.join(__dirname, './dog_1.jpg'), {encoding: 'base64'});
    const dogImgOneSRC = "data:image/jpeg;base64,"+dogImgOne;

    const dogImgTwo = fs.readFileSync(path.join(__dirname, './dog_2.jpg'), {encoding: 'base64'});
    const dogImgTwoSRC = "data:image/jpeg;base64,"+dogImgTwo;

    const dogImgThree = fs.readFileSync(path.join(__dirname, './dog_3.jpg'), {encoding: 'base64'});
    const dogImgThreeSRC = "data:image/jpeg;base64,"+dogImgThree;

    const dogImgFour = fs.readFileSync(path.join(__dirname, './dog_4.jpg'), {encoding: 'base64'});
    const dogImgFourSRC = "data:image/jpeg;base64,"+dogImgFour;
      
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&display=swap" rel="stylesheet">
                  <title>PDF Result Template</title>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                  <link href="http://fonts.cdnfonts.com/css/acknowledgement" rel="stylesheet">
                  <style>
                    *{
                      font-family: 'Source Serif 4', sans-serif;
                      color:whitesmoke;
                      }
               .catalouge-main{
                  padding:50px;
                  background-image:url(${backgroundImgSRC|| "#"});
                  background-repeat: no-repeat;
                  background-size: cover;
                  height:210mm !important;
               }
               .catalouge-main-advert{
                padding:50px;
                height:210mm !important;
               }
               .header{
                  margin:0 12px;
               
               }
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
                 font-size:11px !important;
               }
               ul li,ol li{
                font-size:11px !important;
               }
               h1,h2,h3,h4,h5,h6,span,p,b,strong,i,li{
                 color:black !important;
                 padding-bottom:0 !important;
               }
               b{
                 font-weight:900 !important;
               }
              ol li{
                 margin-bottom:.6rem;
               }
               ul li{
                margin-bottom:.2rem;
               }
          </style>
       </head>
       <body>
       <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
            <center>   
            <h5 style=" margin:0 20px;">${data?.title}</h5>
            </center>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <center>
            <h1 class="text-uppercase" style="font-size:75px !important;"><Strong>G S D C P</Strong></h1>
            </center>
            <h1  style="font-size:30px !important; text-align: center;"><strong>${data?.title}</strong></h1>
            <br/>
            <br/>
               <h5 style="font-size:18px; text-align: center;">${data?.dates}</h5>
               <br/>
               <br/> 
               <br/>
               <h5 style="font-size:30px !important; text-align: center;"><Strong>Judge(s)<br/><br/>${data?.judge_names}</Strong></h5>
               </div>
               <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
               <center>   
               <h5 style=" margin:0 20px;">${data?.title}</h5>
               </center>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <h1  style="text-align: center;">
               <strong>
               GSDCP Managing
               </strong>
               </h1>
               <h1  style="text-align: center;">
               <strong>
               Committee</h1>
               </strong>
               <br/>
               <br/>
               <center>
               <table style="width:80%;">
               ${  
                data?.team.map(({full_name,position_name})=>(
                  `<tr><td><h6>${full_name}</h6></td>
                  <td><h6>${position_name}</h6></td></tr>
                  `
                ))
               }
               </table>
               </center>
                  </div>
                  ${judges_data.map(
                    ({ judge_name, profile_content, image, type,id }) =>
                      `<div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                      <center>   
                      <h5 style=" margin:0 20px;"><strong>${data?.title}</strong></h5>
                      </center>
                       <br/>
                          <h1 style="font-size:40px;  text-align: center;" class="text-uppercase">${judge_name}</h1>
                          <br/>
                          <p align="justify" style="font-size:20px; font-weight:300 !important;">
                           <img style="margin-right:10px;float:left;margin-left:10px; margin-bottom:10px" height="150px" 
                           src=${data?.judge_img[id]}/>
                          ${profile_content}</p>
                          </div>
                          `
                  )}
                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                  <center>
                  <h2><Strong></Strong>DEFINITION OF CLASSES</h2>
                  </center>
                  <p>
                  In all shows organized by the German Shepherd Dog Club of Pakistan, dogs are
                  judged in the following classes:
                  </p>
                  <br>
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>Minor Puppy</b></span> - 6 to 9 months old</p>
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>Puppy</b></span> - 9 to 12 months old</p>
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>Junior</b></span>  - 12 to 18 months old</p>
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>Youth</b></span>  - 18 to 24 months old</p>
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>Open</b></span>  - over 2 years of age</p>
                  
                  <p>Each dog entered is graded and placed by the judge. Dogs competing in the open
                  class are graded Excellent, Very Good, Good, Satisfactory, and Not Satisfactory.
                  </p>
                  <br>
                  <p>
                  Dogs competing in the Junior and Youth classes are graded Very Good, Good,
                      Average, and Not Satisfactory. A Very Good 1 therefore is the maximum
                      grading dogs competing in the Junior and Youth Classes can get.
                  </p>
                  <br>
                  <p>
                  Dogs competing in the Minor Puppy and Puppy classes are graded Very
                  Promising and Promising.
                  </p>
                  <br>
                  <center>
                  <h2>STANDARD ENTRY FORMAT</h2>
                  </center>
                  <center>
                  <table>
                  <tr>
                  <td><p>Entry No.</p></td>
                  <td><p>Name of Exhibit</p></td>
                  <td><p>KP Number</p> </td>
                  <td><p>Tattoo Number</p></td>
                  </tr>
                  <tr>
                  <td></td>
                  <td><p>Date of Birth</p> </td>
                  <td><p>Certifications</p></td>
                  <td><p>HD ED</p></td>
                  </tr>
                  <tr>
                  <td></td>
                  <td><p>Name of Sire – Reg. Number</p></td>
                  <td><p>Name of Dam – Reg. Number</p></td>
                
                  </tr>
                  <tr>
                  <td></td>
                  <td><p>Name of Breeder </p></td>
                  <td><p>Name of Owner</p></td>
                
                  </tr>
                  </table>
                  </center>
                  </div>


                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                    
                  <center> <h1>BREED STANDARD</h1></center>

                
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>ORIGIN:</b></span> Germany.<p> 
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>DATE OF PUBLICATION OF THE OFFICIAL VALID STANDARD:</b></span> 11.08.2010.</p> 
                  <p style="margin-bottom:.6rem!important;"><span style="font-size:13px;"><b>UTILIZATION:</b></span> Versatile working, herding and service dog.</p>
                
                  <p style="margin-bottom:.6rem!important;">

                  <span style="font-size:13px;"><b>Brief Historical Overview:</b> </span>According to the official documentation of the
                  Verein für Deutsche Schäferhunde (SV) e.V. (Society for the German Shepherd
                  Dog, “SV” for short) – legal domicile in Augsburg, Germany, member of the
                  Verband für das Deutsche Hundewesen (VDH, German Kennel Club) – the
                  "SV" as the founding club of the breed is responsible for the breed standard of
                  the German Shepherd Dog. Established in the first General Meeting at
                  Frankfurt/Main on 20 September 1899 according to suggestions by A. Meyer
                  and Max von Stephanitz and in addition to the amendments of the 6th General
                  Meeting on 28 July 1901, the 23rd General Meeting at Cologne/Rhineland on 17
                  September 1909, the Executive Board & Advisory Board Meeting at Wiesbaden
                  on 5 September 1930 and the Breeding Committee & Executive Board Meeting
                  on 25 March 1961, revisions were resolved within the framework of the World
                  Union of German Shepherd Dog Clubs (WUSV) Meeting on 30 August 1976.

                  </p>
                  
                  <p style="margin-bottom:.6rem!important;">
                    Revisions and catalogued measures were resolved with the Enabling Resolution
                    through the Executive Board and Advisory Board from 23/24 March 1991,
                    amended through the Federal Conventions from 25 May 1997 and 31 May/1
                    June 2008.
                    </p>
                    <p style="margin-bottom:.6rem!important;">
                    The German Shepherd Dog, whose methodical breeding was started in 1899
                    after the foundation of the society, had been bred from the central German and
                    southern German breeds of the herding dogs existing at that time with the
                    ultimate objective of creating a working dog inclined to high achievements. In
                    order to achieve this objective, the breed standard of the German Shepherd Dog
                    was determined, which relates to the physical constitution as well as the traits
                    and characteristics.
                    </p>
                                   <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>General appearance: </b></span>The German Shepherd Dog is medium-size, slightly
                    elongated, powerful and well-muscled, with dry bone and firm overall structure.
                    </p>
                  </div>

                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                  <p style="margin-bottom:.6rem!important;">
                    Important Dimensional Ratios: The height at the withers amounts to 60 cm to
                    65 cm for male dogs and 55 cm to 60 cm for female dogs. The trunk length
                    exceeds the dimension at the height at the withers by about 10 – 17 %.
                    </p>

                    <p style="margin-bottom:.6rem!important;">
                    <span style="font-size:14px;"><b>Character:</b></span>The German Shepherd Dog must be well-balanced (with strong
                      nerves) in terms of character, self-assured, absolutely natural and (except for a
                      stimulated situation) good-natured as well as attentive and willing to please. He
                      must possess instinctive behaviour, resilience and self-assurance in order to be
                      suitable as a companion, guard, protection, service and herding dog.
                    </p>

                    <p style="margin-bottom:.6rem!important;">
                    <span style="font-size:14px;"><b>Head:</b></span> The head is wedge-shaped, and in proportion to the body size (length
                      about 40 % at the height at the withers), without being plump or too elongated,
                      dry in the overall appearance and moderately broad between the ears.
                    </p>

                    <p style="margin-bottom:.6rem!important;">
                    Seen from the front and side, the forehead is only slightly arched and without
                    any or with only a slightly indicated middle furrow. The ratio from the cranial
                    region to the facial region is 50 % to 50 %. The width of the cranial region more
                    or less corresponds to the length of the cranial region. The cranial region (seen
                    from above) tapers evenly towards the nasal bridge with gradually sloping, not
                    sharply depicted stop in the wedge-shaped facial region (foreface) of the head.
                    Upper and lower jaws are powerfully developed.
                    </p>
                    <p style="margin-bottom:.6rem!important;">
                    <span style="font-size:14px;"><b>Nose:</b></span> The nasal dorsum is straight, any dip or bulge is undesirable. The lips are
                    taut, close well and are of dark colouring. The nose must be black. 
                    </p>
                 <table>
                 <tr>
                 <td width="15%">
                 <p>
                    <span style="font-size:14px;"><b>Teeth:</b></span>
                    The
                    teeth
                    must be
                    strong,
                    healthy
                    and 
                  </p>
                 </td>
                 <td><img style="height:130px;" src=${dogImgOneSRC}/></td>
                 </tr>
                 </table>
                 <p style="margin:.6rem 0 !important;">
                 complete (42 teeth according to the dental formula). The German Shepherd Dog
                  has a scissor bite, i.e. the incisors must interlock like scissors, whereby the
                  incisors of the upper jaw overlap those of the lower jaw. Occlusal overlay,
                  overbite and retrusive occlusion as well as larger spaces between the teeth (gaps)
                  are faulty. The straight dental ridge of the incisors is also faulty. The jaw bones
                  must be strongly developed so that the teeth can be deeply embedded in the
                  dental ridge.
                 </p>
                  </div>

                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Eyes:</b></span> The eyes are of medium size, almond-shaped, slightly slanted and not
                      protruding. The colour of the eyes should be as dark as possible. Light, piercing
                      eyes are undesirable since they impair the dog’s impression.
                  </p>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Ears:</b></span> The German Shepherd Dog has erect ears of medium size, which are
                      carried upright and aligned (not drawn-in laterally); they are pointed and with
                      the auricle facing forward.
                  </p>
                  <p style="margin-bottom:.6rem!important;">
                      Tipped ears and drooping ears are faulty. Ears carried rearward when moving or
                      in relaxed position are not faulty.
                  </p>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Neck:</b></span> The neck should be strong, well-muscled and without loose neck skin
                      (dewlap). The angulation towards the trunk (horizontal) amounts to approx. 45
                      %.
                  </p>

                  <p align="justify">
                  <span style="font-size:14px;"><b>Body:</b></span>
                  The upper line runs from the
                  base of
                  the neck
                  via the
                  high,
                  long
                  withers and via the straight back towards the slightly sloping croup, without
                  visible interruption. The back is moderately long, firm, strong and wellmuscled.
                  The loin is broad, short, strongly developed and well-muscled. The croup should
                  be long and slightly sloping (approx 23° to the horizontal) and the upper line
                  should merge into the base of the tail without interruption.
                  <img style="float:right; height:130px;" src=${dogImgTwoSRC}/>
                  </p>
                  
                  <p align="justify">
                  The chest should be moderately broad, the lower chest as long and pronounced
                  as possible. The depth of the chest should amount to approx. 45 % to 48 % of
                  the height at the withers. 
                  </p>

                  <p align="justify">
                  The ribs should feature a moderate curvature; a barrel-shaped chest is just as
                  faulty as flat ribs.                  
                  </p>

                  <p align="justify">
                  <span style="font-size:14px;"><b>Tail: </b></span>
                  The tail extends at least to the hock, but not beyond the middle of the hind
                    pastern. It has slightly longer hair on the underside and is carried hanging
                    downward in a gentle curve, whereby in a state of excitement and in motion it is
                    raised and carried higher, but not beyond the horizontal. Operative corrections
                    are forbidden.
                  </p>

                  </div>

                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Limbs:</b></span>
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Forequarters:</b></span> 
                  The forelimbs are straight when seen from all sides, and
                  absolutely parallel when seen from the front.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  Shoulder blade and upper arm are of equal length, and firmly attached to the
                  trunk by means of powerful musculature. The angulation from shoulder blade
                  and upper arm is ideally 90°, but generally up to 110°.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                    The elbows may not be turned out either while standing or moving, and also not
                    pushed in. The forearms are straight when seen from all sides, and absolutely
                    parallel to each other, dry and firmly muscled. The pastern has a length of
                    approx. 1/3 of the forearm, and has an angle of approx. 20° to 22° to the
                    forearm. A slanted pastern (more than 22°) as well as a steep pastern (less than
                    20°) impairs the suitability for work, particularly the stamina. The paws are
                    rounded, well-closed and arched; the soles are hard, but not brittle. The nails are
                    strong and of dark colour.
                  </p>
                 
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Hindquarters: </b></span>The position of hind legs is slightly backwards, whereby the
                  hind limbs are parallel to each other when seen from the rear. Upper leg and
                  lower leg are of approximately the same length and form an angle of approx.
                  120°; the legs are strong and well-muscled. The hocks are strongly developed
                  and firm; the hind pastern stands vertically under the hock.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  The paws are closed, slightly arched; the pads are hard and of dark colour; the
                  nails are strong, arched and also of dark colour.
                  </p>

                   
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b> Gait: </b></span>
                  The German Shepherd Dog is a trotter. The limbs must be coordinated in
                  length and angulations so that the dog can shift the hindquarters towards the
                  trunk without any essential change of the top line and can reach just as far with
                  the forelimbs. Any tendency towards over-angulation of the hindquarters
                  reduces the stability and the stamina, and thereby the working ability. Correct
                  body proportions and angulations results in a gait that is farreaching and flat
                  over the ground which conveys the impression of effortless forward movements.
                  The head pushed forward and the slightly raised tail result in a consistent,
                  smooth trot showing a gently curved, uninterrupted upper line from the ear tips
                  over the neck and back to the end of the tail.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Skin: </b></span>
                  The skin is (loosely) fitting, but without forming any folds.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Hair: </b></span>
                  The German Shepherd Dog is bred in the hair varieties double coat and
                  long and harsh outer coat – both with undercoat
                  </p>
                 
                  </div>
                  

                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Double Coat: </b></span>
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <img style="float:right; height:130px;" src=${dogImgThreeSRC}/>
                  The
                  guard
                  hair
                  should
                  be as
                  dense as
                  possible,
                  particularly harsh and close fitting: short on the head, including the inside of the ears, short on
                  the front side of the legs, paws and toes, some-what longer and more strongly covered in hair
                  on the neck. On the back side of the legs the hair extends to the carpal joint or the hock; it
                  forms moderate ‘trousers’ on the back side of the haunches.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Long And Harsh Outer Coat: </b></span>
                  </p>

                  <p>
                  <img style="float:right; height:130px;" src=${dogImgFourSRC}/>
                  The
                guard
                hair
                should
                be long,
                soft and
                not close
                fitting,
                with
                tufts on
                the ears and legs, bushy trousers and bushy tail with downward formation of
                tuft. Short on the head, including the inside of the ears, on the front side of the
                legs, on the paws and toes, somewhat longer and more strongly covered in hair
                on the neck, almost forming a mane. On the back side of the legs the hair
                extends to the carpal joint or the hock and forms clear trousers on the back side
                of the haunches.
                  </p>
                  </div>

                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Colours: </b></span>
                  Colours are black with reddish-brown, brown and yellow to light grey
                  markings; single-coloured black, grey with darker shading, black saddle and
                  mask. Unobtrusive, small white marks on chest as well as very light colour on
                  insides are permissible, but not desirable. The tip of the nose must be black in all
                  colours. Dogs with lack of mask, light to piercing eye colour, as well as with
                  light to whitish markings on the chest and the insides, pale nails and red tip of
                  tail are considered to be lacking in pigmentation. The undercoat shows a light
                  greyish tone. The colour white is not allowed.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Size/weight: </b></span>
                  </p>
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Male Dogs: </b></span>
                  </p>
                  <p>
                  Height at the withers: 60 cm to 65 cm
                  </p>
                  <p style="margin-bottom:.6rem!important;">
                  Weight: 30 kg to 40 kg
                  </p>
             

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Female Dogs: </b></span>
                  </p>
                  <p>
                  Height at the withers: 55 cm to 60 cm
                  </p>
                  <p style="margin-bottom:.6rem!important;">
                  Weight: 22 kg to 32 kg
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Testicles: </b></span>
                  Male dogs should have two obviously normally developed testicles
                  which are completely in the scrotum.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Faults: </b></span>
                  Any deviation from the aforementioned points should be considered as a
                  fault whose evaluation should be in exact proportion to the degree of deviation.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Serious Faults: </b></span>
                   Deviations from the above-described breed characteristics
                  which impair the working capability.
                  </p>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Faulty Ears: </b></span>
                    Ears set too low laterally, tipped ears, inward constricted ears, ears
                    not firm
                  </p>

                  
                  <p style="margin-bottom:.6rem!important;">
                  Considerable pigment deficiencies. <br/>
                  Severely impaired overall stability.
                  </p>
                  
                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Dental faults: </b></span>
                  All deviations from scissor bite and dental formula insofar as it
                  does not involve eliminating faults (see the following)
                  </p>
                  </div>

                  <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
                  <center>   
                  <h5 style=" margin:0 20px;">${data?.title}</h5>
                  </center>
                  <br>
                  <br>

                  <p style="margin-bottom:.6rem!important;">
                  <span style="font-size:14px;"><b>Eliminating Faults: </b></span>
                  </p>
                      <ol type="a">
                      <li>Dogs with weak character and weak nerves which bite</li>
                      <li>Dogs with proven “severe hip dysplasia”</li>
                      <li>Monorchid or cryptorchid dogs as well as dogs with clearly dissimilar or
                      atrophied testicles</li>
                      <li>Dogs with disfiguring ears or tail faults</li>
                      <li>Dogs with malformations</li>
                      <li>Dogs with dental faults, with lack of:
                          <ul>
                          <li>1 premolar 3 and another tooth, or</li>
                          <li>1 canine tooth, or</li>
                          <li>1 premolar 4, or</li>
                          <li>1 molar 1 or molar 2, or</li>
                          <li>a total of 3 teeth or more</li>
                          </ul>
                      </li>
                      
                      <li>Dogs with jaw deficiencies:
                          <ul>
                          <li>Overshot by 2 mm and more</li>
                          <li>undershot,</li>
                          <li>level bite in the entire incisor region</li>
                          </ul>
                      </li>
                      <li>Dogs with oversize or undersize by more than 1 cm</li>
                      <li>Albinism</li>
                      <li>White hair colour (also with dark eyes and nails)</li>
                      <li>Long Straight Topcoat without undercoat</li>
                      <li>Long-haired (long, soft guard hair without undercoat, mostly parted in the
                        middle of the back, tufts on the ears and legs and on the tail)
                        </li>
                      </ol>
                  </div>
                  ${paginate(data?.Dogs["breed" + 15]).map(
                    (page,ind) => 
                      page.map(({dogs,class_name,isAd},index,arr)=>(
                        `
                       ${
                         isAd?
                       `  <div class="catalouge-main-advert" style="padding:50px !important;page-break-before:always">
                  <img src=${data.ads_img[fromatAdverts()[ind]?.id]} height="100%" width="100%"/>
              </div>`:""
                       }
            
              <div class="catalouge-main" style="padding:50px !important;page-break-before:always">
              <center>   
              <h5 style=" margin:0 20px;">${data?.title}</h5>
              </center>
              <br/>
              <center>
              <div>
              
             ${ dogs.map((dog)=>(
                   `

                   ${

                     dog.map(({dob,sire_name,dam_name,catalog_id,dog_name,KP,hip,elbows,
                      sire_KP,dam_KP,breeder,owners,dog_breed,dam_reg_no,sire_reg_no,hair,microchip,dam_breed,sire_breed,achievements},ind)=>(
                       `
                       ${
                        dog[ind]?.sex!== dog[ind-1]?.sex || dog[ind]?.hair!== dog[ind-1]?.hair?
                          `
                                          <table style="width:80%;">
                                            <tr>
                                            <td width="30%"><strong style="font-size:16px;">${dog[ind]?.class}</strong></td>
                                            <td  width="30%"><strong style="font-size:16px;">${dog[ind]?.sex}</strong></td>
                                            <td  width="30%"><strong style="font-size:16px;">${dog[ind]?.hair!=="1"?'Long-Stock':''}</strong></td>
                                            </tr>
                                            </table>`
                         :''
                       }
                       <table>
                       <tr class="mb-0">
                         <td style="vertical-align:baseline;text-align: center;" width="5%">
                         <p  class="fw-bold p-2">
                         <strong>
                         ${
                          catalog_id.toString().lenght == 1
                            ? "00" + catalog_id
                            : catalog_id.toString().lenght == 2
                            ? "0" + catalog_id
                            : catalog_id
                        }.
                         </strong>
                        
                         <p/>
                         </td>
                  <td width="85%" style="padding-bottom:10px;">
                  <p>
                      <strong class="fw-bold">${class_name=="Open"?dog_breed==1?"* "+dog_name:dog_name:dog_name}</strong> &nbsp; &nbsp;
                      ${KP? "KP " + KP : regestration_no?regestration_no:''}&nbsp; &nbsp;  ${microchip}
                  </p>

                  <p>
                      <strong class="fw-bold">DoB: </strong>
                          ${new Date(dob).toDateString().substring(3).slice(0,7)
                          +","+new Date(dob).toDateString().substring(10)}&nbsp; &nbsp;
                      ${hip?`<strong>HD: </strong>${hip} &nbsp; &nbsp;`:""  }
                      ${elbows?`<strong>ED: </strong>${elbows}`:""  }
                
                      </p>
                      <p> 
                      ${class_name=="Open" && achievements?
                          ` <strong>Ach: </strong>${achievements}`
                      :""}
                      </p>
                         ${
                          ` <p><strong>S: </strong><span>${sire_breed==1?"*":""} ${sire_name||"Unknown"}</span> &nbsp;&nbsp;
                          <strong>M: </strong>
                          <span>${dam_breed==1?"*":""}${dam_name||"Unknown"}</span>
                          </p>`
                         }
                  <p>
                  <strong class="fw-bold">B</strong>:
                  ${breeder ||"Unknown"} &nbsp;&nbsp; <strong class="fw-bold">O</strong>:&nbsp;${owners || "Unknown"}
                  </p>
                  </td>
                  </tr>
                  </table>
                       `
                     ))
                   }  
                  `
              ))}
              </div>
            </table>
           </center>
            </div>
              `
            ))
         
         
         )}
       </body>
    </html>
    `;
};
