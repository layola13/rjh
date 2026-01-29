import { loadTopLine } from './loadTopLine';
import { CabinetStyle } from './CabinetStyle';
import { TransactionManager } from './types/TransactionManager';
import { Transaction } from './types/Transaction';
import { TopLineData } from './types/TopLineData';
import createTransactions from './createTransactions';

export default async function processTopLineTransactions(
  cabinetStyle: CabinetStyle | undefined,
  additionalParam: unknown
): Promise<void> {
  const transManager: TransactionManager = HSApp.App.getApp().transManager;

  const topLineData: TopLineData = await loadTopLine(cabinetStyle);

  const style: CabinetStyle = cabinetStyle ?? CabinetStyle.getCabinetStyle();
  
  let loadPromise: Promise<void> = Promise.resolve();
  
  if (style.isEmpty()) {
    loadPromise = style.loadStyles();
  }

  await loadPromise;

  const transactions: Transaction[] = createTransactions(
    transManager,
    topLineData,
    style,
    additionalParam
  );

  transactions.forEach((transaction: Transaction) => {
    transManager.commit(transaction);
  });
}