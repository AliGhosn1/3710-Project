import { EvaluateAverageScoreOfSingleSelection } from "./evaluation.js";

export const HillClimbing = (initialValue, randomChoiceList) => {
    const startTime = new Date().getTime();

    const initialScore = EvaluateAverageScoreOfSingleSelection(randomChoiceList, initialValue);
    let currentValue = JSON.parse(JSON.stringify(initialValue));

    for(let i = 0; i < initialValue.length; i++) {
        let neighbours = GenerateNeighbours(currentValue);
        let bestScore = -100000;
    
        for(let j = 0; j < neighbours.length; j++) {
            let currentNeighbourScore = EvaluateAverageScoreOfSingleSelection(randomChoiceList, neighbours[j]);
            if(currentNeighbourScore > bestScore) {
                bestScore = currentNeighbourScore;
                currentValue = JSON.parse(JSON.stringify(neighbours[j]));
            }
        }
    }

    const endTime = new Date().getTime();
    
    return [`HillClimbing`, initialScore, EvaluateAverageScoreOfSingleSelection(randomChoiceList, currentValue), endTime - startTime];
}

const GenerateNeighbours = (initialValue) => {
    let neightbours = [];
    for(let i = 0; i < initialValue.length; i++) {
        let newSet = JSON.parse(JSON.stringify(initialValue));
        newSet[i] = newSet[i] === 0 ? 1 : 0;
        neightbours.push(newSet);
    }

    return neightbours;
}