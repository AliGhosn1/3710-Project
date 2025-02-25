import { EvaluateAverageScoreOfPopulation, EvaluateAverageScoreOfSingleSelection } from "./evaluation.js";
import { GetRandomChoice } from "./randomChoice.js";

export const BaseGenericAlgorithim = (initialPopulation, randomChoiceList, iterations, countOfMembersToFormNextIteration, eliteness = 0) => {
    const startTime = new Date().getTime();

    const initialScore = EvaluateAverageScoreOfPopulation(randomChoiceList, initialPopulation);

    // Evaluate the population and improve it iteratively
    for (let i = 0; i < iterations; i++) {
        initialPopulation = ImprovePopulation(initialPopulation, randomChoiceList, countOfMembersToFormNextIteration, eliteness);
    }

    const endTime = new Date().getTime();
    
    return [`BaseGenericAlgorithim(${countOfMembersToFormNextIteration})(${eliteness})`, iterations, initialScore, EvaluateAverageScoreOfPopulation(randomChoiceList, initialPopulation), endTime - startTime];
}

const ImprovePopulation = (population, randomChoiceList, countOfMembersToFormNextIteration, eliteness = 0) => {
    population = SortPopulation(population, randomChoiceList);
    population = population.slice(0, countOfMembersToFormNextIteration);

    for(let i = eliteness; i < population.length; i++) {
        population = ShuffleTwoElements(population, eliteness);
    }

    const populationLength = population.length;
    for(let i = populationLength; i < populationLength * 2 ; i++) {
        population[i] = GetRandomChoice();
    }
    
    return population;
}

const SortPopulation = (population, randomChoiceList) => {
    return population.sort((a, b) => {
        return EvaluateAverageScoreOfSingleSelection(randomChoiceList, b) - EvaluateAverageScoreOfSingleSelection(randomChoiceList, a);
    });
};

const ShuffleTwoElements = (population, eliteness) => {
    if(population.length < 2) {
        return population;
    }

    let index1 = Math.floor(Math.random() * population.length - eliteness) + eliteness;
    let index2 = Math.floor(Math.random() * population.length - eliteness) + eliteness;

    while(index1 === index2) {
        index1 = Math.floor(Math.random() * population.length - eliteness) + eliteness;
        index2 = Math.floor(Math.random() * population.length - eliteness) + eliteness;
    }

    for(let i = 0; i < population[index1].length/2; i++){
        const temp = population[index1][i];
        population[index1][i] = population[index2][i];
        population[index2][i] = temp;
    }

    return population;
}


export const GenericAlgorithimWithRandomBitSwap = (initialPopulation, randomChoiceList, iterations, countOfMembersToFormNextIteration, eliteness = 0) => {
    const startTime = new Date().getTime();

    const initialScore = EvaluateAverageScoreOfPopulation(randomChoiceList, initialPopulation);

    // Evaluate the population and improve it iteratively
    for (let i = 0; i < iterations; i++) {
        initialPopulation = ImprovePopulation(initialPopulation, randomChoiceList, countOfMembersToFormNextIteration, eliteness);
        initialPopulation = SwapRandomBits(initialPopulation, eliteness);
    }

    const endTime = new Date().getTime();
    
    return [`GenericAlgorithimWithRandomBitSwap(${countOfMembersToFormNextIteration})(${eliteness})`, iterations, initialScore, EvaluateAverageScoreOfPopulation(randomChoiceList, initialPopulation), endTime - startTime];
}

const SwapRandomBits = (population, eliteness) => {
    for(let i = eliteness; i < population.length; i++) {
        var index = Math.floor(Math.random() * population[i].length);

        index = Math.floor(Math.random() * population[i].length);

        population[i][index] = !population[i][index];
    }
    return population;
}



