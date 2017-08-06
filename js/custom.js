function calcCalories() {
    
// Global variables
      var imie = document.getElementById("imie").value;
      var plec = $("input[name=plec]:checked").val();
      var aktywnosc = $("input[name=aktywnosc]:checked").val();
      var somatyczny = $("input[name=somatyczny]:checked").val();
      var dieta = $("input[name=dieta]:checked").val();
      var finalnaPrzemianaMaterii;

              
      function policzPodstawowaPrzemiane (waga, wzrost, wiek, plec) {
          var wiek = document.getElementById("wiek").value;
          var wzrost = document.getElementById("wzrost").value;
          var waga = document.getElementById("waga").value;
          var przemiana;

          if (plec == "mezczyzna") {
            przemiana = 66.47 + (13.7 * waga) + (5 * wzrost) - (6.76 * wiek);
          } else if (plec == "kobieta") {
            przemiana = 665.09 + (9.56 * waga) + (1.85 * wzrost) - (4.67 * wiek);
          }
          return przemiana;
      };
      
      function policzPrzemianeDlaAktywnosci(przemiana, tryb) {
          var tabela = {
            'ak1': 1.0,
            'ak2': 1.2,
            'ak3': 1.4,
            'ak4': 1.6,
            'ak5': 1.8,
            'ak6': 2.0
          };
          if (!tabela[tryb]) {
            console.log('Nie znaleziono trybu ' + tryb);
            return 0;
          }
          return przemiana * tabela[tryb];
      };

      function policzSomatycznaPrzemiane(przemiana, tryb) {
        var tabela = {
          'so1': 0.1,
          'so2': 0.15,
          'so3': 0.2
        };
        if (!tabela[tryb]) {
          console.log('Nie znaleziono trybu ' + tryb);
          return 0;
        }
        return przemiana * tabela[tryb];
      };

      var podstawowaPrzemianaMaterii = policzPodstawowaPrzemiane(waga, wzrost, wiek, plec);
      var calkowitaPrzemianaMaterii = policzPrzemianeDlaAktywnosci(podstawowaPrzemianaMaterii, aktywnosc);
      var somatycznaPrzemianaMaterii = policzSomatycznaPrzemiane(calkowitaPrzemianaMaterii, somatyczny);

// Diet goal
      if (dieta=="masa") {
        finalnaPrzemianaMaterii= calkowitaPrzemianaMaterii+ somatycznaPrzemianaMaterii;
      } else {
        finalnaPrzemianaMaterii= calkowitaPrzemianaMaterii+ (-somatycznaPrzemianaMaterii);
      };
      
// Proteins, carbs and fats
        var bialko= (finalnaPrzemianaMaterii* 0.3)/4;
        var weglowodany= (finalnaPrzemianaMaterii*0.55)/4;
        var tluszcze= (finalnaPrzemianaMaterii*0.15)/9;
  
// Final score
      alert("Cześć " + imie + ", Twoje faktyczne dziennie zapotrzebowanie w kalorie wynosi " + calkowitaPrzemianaMaterii.toFixed(2) + "\n\n" + "Jeżeli Twoim celem jest " + dieta + ", to twoje zapotrzebowanie dziennie powinno wyglądać tak: " + finalnaPrzemianaMaterii.toFixed(2) + "\n\n" + "Pamietaj zeby uwzglednic w diecie " + bialko.toFixed(2) + " gram bialka, " + weglowodany.toFixed(2) + " gram weglowodanow i " + tluszcze.toFixed(2) + " gram tluszczy.");
};