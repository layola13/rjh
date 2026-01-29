function setModule(value: unknown): void {
    const database = this.db;
    const currentTransaction = TransactionCenter.getInstance().currentTransaction;
    
    if (currentTransaction) {
        currentTransaction.onDBChanged(database);
        database._dbCache.set(I, value);
    } else {
        database._db.set(I, value);
    }
}