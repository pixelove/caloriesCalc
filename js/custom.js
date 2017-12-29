function calcCalories() {
    
// Global variables
      var name = document.getElementById("name").value;
      var sex = $("input[name=sex]:checked").val();
      var activity = $("input[name=activity]:checked").val();
      var somatic = $("input[name=somatic]:checked").val();
      var diet = $("input[name=diet]:checked").val();
      var finalMetabolism;

              
      function countBasicMetabolism (weight, height, age, sex) {
          var age = document.getElementById("age").value;
          var height = document.getElementById("height").value;
          var weight = document.getElementById("weight").value;
          var metabolism;

          if (sex == "man") {
            metabolism = 66.47 + (13.7 * weight) + (5 * height) - (6.76 * age);
          } else if (sex == "woman") {
            metabolism = 665.09 + (9.56 * weight) + (1.85 * height) - (4.67 * age);
          }
          return metabolism;
      };
      
      function countActivityMetabolism(metabolism, mode) {
          var table = {
            'activity1': 1.0,
            'activity2': 1.2,
            'activity3': 1.4,
            'activity4': 1.6,
            'activity5': 1.8,
            'activity6': 2.0
          };
          if (!table[mode]) {
            console.log('Sorry, could not find mode ' + mode);
            return 0;
          }
          return metabolism * table[mode];
      };

      function countSomaticMetabolism(metabolism, mode) {
        var table = {
          'ecto': 0.1,
          'endo': 0.15,
          'mezo': 0.2
        };
        if (!table[mode]) {
          console.log('Nie znaleziono modeu ' + mode);
          return 0;
        }
        return metabolism * table[mode];
      };

      var basicMetabolism = countBasicMetabolism(weight, height, age, sex);
      var almostCompleteMetabolism = countActivityMetabolism(basicMetabolism, activity);
      var somaticMetabolism = countSomaticMetabolism(almostCompleteMetabolism, somatic);

// Diet goal
      if (diet=="gain") {
        finalMetabolism= almostCompleteMetabolism+ somaticMetabolism;
      } else {
        finalMetabolism= almostCompleteMetabolism+ (-somaticMetabolism);
      };
      
// Proteins, carbs and fats
        var proteins= (finalMetabolism* 0.3)/4;
        var carbohydrates= (finalMetabolism*0.55)/4;
        var fats= (finalMetabolism*0.15)/9;
  
// Final score
      alert("Hi, " + name + "! Your daily calories intake is around " + almostCompleteMetabolism.toFixed(2) + ", but when your goal is " + diet + ", your daily calories intake should be " + finalMetabolism.toFixed(2) + "\n\n" + "Also, remember to include in your diet " + proteins.toFixed(0) + " grams of proteins, " + carbohydrates.toFixed(0) + " grams of carbohydrates and " + fats.toFixed(0) + " grams of fats.");
};









