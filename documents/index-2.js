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

    for(let d in sorted_data){
    
      let temp=sorted_data
      let prev=parseInt(d)-1

   
     
    if(d>0){
      let [a]=sorted_data[d]

      let [b]=sorted_data[prev]

    if(a['class_name']!==b['class_name']){
      temp[d-1]=[{...temp[d-1][0],isAd:true}]
    }
    else{
      temp[d-1]=[{...temp[d-1][0],isAd:false}]
    }
    sorted_data=temp
  }
 
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
    
    const dogImgOne = fs.readFileSync(path.join(__dirname, './dog_1.jpg'), {encoding: 'base64'});
    const dogImgOneSRC = "data:image/jpeg;base64,"+dogImgOne;


    


    return paginate(data?.Dogs["breed" + 15])
    
};
