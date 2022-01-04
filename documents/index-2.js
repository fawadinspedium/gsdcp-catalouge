const axios = require("axios");

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
         const categories = [...(breeds.map(breeds=> breeds.group_id))]
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

         if(groupCount>AdsCount){
           ads_arr=Array(10).fill(data.ads).flat()
            return ads_arr
         }
         else{
            return data.ads
         }
      }  
      
  return paginate(data?.Dogs["breed" + 24])
  
};
