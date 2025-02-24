import { EvaluateAverageScoreOfPopulation, EvaluateAverageScoreOfSingleSelection } from "./evaluation.js";
import { GetRandomChoices, GetRandomChoice } from "./randomChoice.js";

export const BaseGenericAlgorithim = (randomChoiceList, iterations) => {
    const startTime = new Date().getTime();

    // Create the initial population
    var population = GetRandomChoices();
    const initialScore = EvaluateAverageScoreOfPopulation(randomChoiceList, population);

    // Evaluate the population and improve it iteratively
    for (let i = 0; i < iterations; i++) {
        population = ImprovePopulation(population, randomChoiceList);
    }

    const endTime = new Date().getTime();

    return{
        initialScore: initialScore,
        finalScore: EvaluateAverageScoreOfPopulation(randomChoiceList, population),
        time: endTime - startTime
    }
}

const ImprovePopulation = (population, randomChoiceList) => {
    population = SortPopulation(population, randomChoiceList);
    population = population.slice(0, population.length / 2);

    for(let i = 0; i < population.length; i++) {
        population = ShuffleTwoElements(population);
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

const ShuffleTwoElements = (population) => {
    const index1 = Math.floor(Math.random() * population.length);
    let index2 = Math.floor(Math.random() * population.length);

    while(index1 === index2) {
        index2 = Math.floor(Math.random() * population.length);
    }

    for(let i = 0; i < population[index1].length/2; i++){
        const temp = population[index1][i];
        population[index1][i] = population[index2][i];
        population[index2][i] = temp;
    }

    return population;
}


