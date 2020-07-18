import { DNA } from "./dna";

export function Population() {
  let population = [];
  let mutationRate = 0.01; // Mutation rate
  let totalPopulation = 200; // Total Population
  let generations = 100000; // Number of Generations Between Updates
  let target1 = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
  let target2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
  let target3 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];
  let fittest = null;
  let maxFit = 0;

  let target = [...target1, ...target2, ...target3];
  for (let i = 0; i < totalPopulation; i++) {
    population[i] = new DNA(target.length);
  }

  for (let i = 0; i < generations; i++) {
    // set the number of times to update the GA between beats
    for (let i = 0; i < population.length; i++) {
      population[i].calcFitness(target);
      if (population[i].fitness > maxFit) {
        maxFit = population[i].fitness;
        fittest = population[i].genes;
      }
    }

    let matingPool = []; // ArrayList which we will use for our "mating pool"

    for (let i = 0; i < population.length; i++) {
      let nnnn = population[i].fitness * 100; // Arbitrary multiplier, we can also use monte carlo method
      for (let j = 0; j < nnnn; j++) {
        // and pick two random numbers
        matingPool.push(population[i]);
      }
    }

    for (let i = 0; i < population.length; i++) {
      let a = Math.floor(Math.random() * matingPool.length);
      let b = Math.floor(Math.random() * matingPool.length);
      let partnerA = matingPool[a];
      let partnerB = matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(mutationRate);
      population[i] = child;
    }
  }
  return fittest;
}
