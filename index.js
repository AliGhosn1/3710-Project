import { GetRandomChoices } from "./randomChoice.js";
import { BaseGenericAlgorithim } from "./GenericAlgorithims.js";

const randomChoiceList = GetRandomChoices();
const results = BaseGenericAlgorithim(randomChoiceList, 1000000);

console.log(results);