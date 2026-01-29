import { loadLightLine } from './lightLineLoader';
import { CabinetStyle } from './cabinetStyle';
import { processTransactions } from './transactionProcessor';

interface TransactionManager {
  commit(transaction: unknown): void;
}

interface App {
  transManager: TransactionManager;
}

interface HSAppInstance {
  getApp(): App;
}

declare const HSApp: {
  App: HSAppInstance;
};

interface CabinetStyleInstance {
  isEmpty(): boolean;
  loadStyles(): Promise<void>;
}

export default function processCabinetTransactions(
  cabinetStyleParam: CabinetStyleInstance | undefined,
  transactionData: unknown,
  lightLineConfig: unknown,
  additionalParam: unknown
): Promise<void> {
  const transManager = HSApp.App.getApp().transManager;

  return loadLightLine(cabinetStyleParam, lightLineConfig).then((lightLineResult) => {
    const cabinetStyle = cabinetStyleParam || CabinetStyle.getCabinetStyle();
    let styleLoadPromise: Promise<void> = Promise.resolve();

    if (cabinetStyle.isEmpty()) {
      styleLoadPromise = cabinetStyle.loadStyles();
    }

    return styleLoadPromise.then(() => {
      const style = cabinetStyle;
      const transactions = processTransactions(
        transManager,
        lightLineResult,
        style,
        transactionData,
        additionalParam
      );

      transactions.forEach((transaction) => {
        transManager.commit(transaction);
      });
    });
  });
}