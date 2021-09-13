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

          console.log(this.dna[i]);
          console.log(specimen2.dna[i]);
          
          if (this.dna[i] === specimen2.dna[i]) {
            console.log("MATCH");
            common++;
          }

        }

        console.log("Common " + common);
        //output matches
        console.log(`${this.specimenID} and ${specimen2.specimenID} have ${Math.floor(common / 15 * 100)} % of DNA in common.`);

      }
    }
  });
}








