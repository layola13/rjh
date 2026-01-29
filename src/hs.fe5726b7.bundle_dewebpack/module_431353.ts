const ParametricStairTransactions = {
    ChangeParametricStairProperty: "hsw.transaction.parametricstair.changeparametricstairproperty",
    ReplaceParametricStair: "hsw.transaction.parametricstair.replaceparametricstair"
} as const;

Object.freeze(ParametricStairTransactions);

export default ParametricStairTransactions;

export type ParametricStairTransactionType = typeof ParametricStairTransactions[keyof typeof ParametricStairTransactions];