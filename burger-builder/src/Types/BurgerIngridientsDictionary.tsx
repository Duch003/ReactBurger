import { BurgerInnerIngridientsDictionary } from './BurgerInnerIngridientsDictionary'

export type BurgerIngridientsDictionary = {
    ['bread-top']: number,
    ['bread-bottom']: number,
    [index: string]: number
} & BurgerInnerIngridientsDictionary