import { GetRandomChoices } from "./randomChoice.js";
import { BaseGenericAlgorithim, GenericAlgorithimWithRandomBitSwap } from "./GenericAlgorithims.js";
import { HillClimbing } from "./HillClimbing.js";
import { GetDateForFileName } from "./general.js";
import xlsx from 'xlsx';

const iterations = 10000;
const WorkBook = xlsx.utils.book_new();

const initialPopulation = GetRandomChoices();
const randomChoiceList = GetRandomChoices();

const GenericAlgorithimData = [
    ['Name(countOfMembersToFormNextIteration)(eliteMemberCount)', 'Iterations', 'InitialScore', 'FinalScore', 'Time(ms)'],  
];
const HillClimbingData = [
    ['Name', 'InitialScore', 'FinalScore', 'Time(ms)']
];

for(let i = 1; i <= 10; i++) {
    for(let j = 0; j <= i; j++) {
        GenericAlgorithimData.push(BaseGenericAlgorithim(JSON.parse(JSON.stringify(initialPopulation)), randomChoiceList, iterations, i, j));
        GenericAlgorithimData.push(GenericAlgorithimWithRandomBitSwap(JSON.parse(JSON.stringify(initialPopulation)), randomChoiceList, iterations, i, j));
        GenericAlgorithimData.push(['']);
    }
}

HillClimbingData.push(HillClimbing(JSON.parse(JSON.stringify(initialPopulation[0])), randomChoiceList));


const GenericAlgorithimDataSheet = xlsx.utils.aoa_to_sheet(GenericAlgorithimData);  
const HillClimbingDataSheet = xlsx.utils.aoa_to_sheet(HillClimbingData);

xlsx.utils.book_append_sheet(WorkBook, GenericAlgorithimDataSheet, 'GenericAlgorithimData');
xlsx.utils.book_append_sheet(WorkBook, HillClimbingDataSheet, 'HillClimbingData');

xlsx.writeFile(WorkBook, "Results_" + GetDateForFileName() + ".xlsb");
