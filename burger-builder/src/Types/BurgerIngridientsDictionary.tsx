import { BurgerInnerIngridientsDictionary } from './BurgerInnerIngridientsDictionary'

export type BurgerIngridientsDictionary = {
    ['bread-top']: number,
    ['bread-bottom']: number
} & BurgerInnerIngridientsDictionary