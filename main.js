// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//returns a pAequor object from a factory function
const pAequorFactory = (specimenID, dna) => {
  return ({
    specimenID, 
    dna, 

    //change one of the sequences of DNA
    mutate () {

      //get index for change and new sequence value
      let dnaIndex = Math.floor(Math.random() * this.dna.length);
      let newSequence = returnRandBase();

      //if new value is equal to current index, change it to something else
      while (newSequence === this.dna[dnaIndex]) {
        newSequence = returnRandBase();
      }

      //change the sequence
      this.dna[dnaIndex] = newSequence;

      return this.dna;
    },

    //compare to DNA to another object
    compareDNA(specimen2) {

      //output if specimenIDs are the same
      if (this.specimenID === specimen2.specimenID) {
        console.log(`These two specimens have the same ID: ${this.specimenID}`);
      }
      else {

        let common = 0;
        
        //iterate through DNA to find matches
        for (let i = 0; i < 15; i++) {
          
          if (this.dna[i] === specimen2.dna[i]) {
            common++;
          }

        }

        //return percentage of how much they are in common
        return Math.floor(common / 15 * 100);

      }
    }, 

    //return survival likelihood, if C or G bases is greater than 60%
    willLikelySurvive() {

      let cOrG = 0;

      //count c or g's in sequence
      for (let i = 0; i < this.dna.length; i++) {
        if ((this.dna[i] === "C") || (this.dna[i] === "G")) {
          cOrG++;
        }
      }

      return Math.floor(cOrG / 15 * 100) > 60;
    },

    //return complement strand of DNA
    complementStrand() {

      let complementStrandDNA = [];

      //iterate through DNA strand and add to complement strand based on base
      for (let i = 0; i < this.dna.length; i++) {

        switch(this.dna[i]) {
          case "A":
            complementStrandDNA.push("T");
            break;
          case "T":
            complementStrandDNA.push("A");
            break;
          case "G":
            complementStrandDNA.push("C");
            break;
          case "C":
            complementStrandDNA.push("G");
            break;
        }
      }

      return complementStrandDNA;

    }
  });
}

//create 30 instances of pAequor that will survive and store in an array
let specimenArray = [];

for (let i = 1; i <= 30; i++) {

  let specimen = pAequorFactory(i, mockUpStrand);

  //create new strand if specimen will not survive
  while (!specimen.willLikelySurvive()) {
    specimen.dna = mockUpStrand();
  }

  specimenArray.push(specimen);

}

//find the two most related specimens
let specimenA = 1;
let specimenB = 2;
let maxPercent = 0;

//iterate through specimenArray to find the specimens with the most in common
for (let i = 0; i < specimenArray.length; i++) {

  for (let j = i + 1; j < specimenArray.length; j++) {

    if (specimenArray[i].compareDNA(specimenArray[j]) > maxPercent) {
      specimenA = specimenArray[i].specimenID;
      specimenB = specimenArray[j].specimenID;
      maxPercent = specimenArray[i].compareDNA(specimenArray[j]);
    }
  }
}

console.log(`${specimenA} and ${specimenB} have ${maxPercent} % of DNA in common. They are the most alike.`);





