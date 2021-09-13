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
    }
  });
}

let spec1 = pAequorFactory(1, mockUpStrand());
console.log(spec1.dna);
spec1.mutate();
console.log(spec1.dna);








