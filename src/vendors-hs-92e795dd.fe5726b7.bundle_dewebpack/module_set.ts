function setModuleData(data: unknown): void {
    const database = this.db;
    const currentTransaction = TransactionCenter.getInstance().currentTransaction;
    
    if (currentTransaction) {
        currentTransaction.onDBChanged(database);
        database._dbCache.set(I, data);
    } else {
        database._db.set(I, data);
    }
}