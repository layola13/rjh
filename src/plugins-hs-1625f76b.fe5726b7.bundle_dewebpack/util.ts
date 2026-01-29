export const Util = {
  difference: function<T>(first: T[], second: T[]): T[] {
    const uniqueInFirst: T[] = [];
    const remainingInSecond = [...second];
    
    first.forEach((item: T) => {
      const indexInSecond = second.indexOf(item);
      
      if (indexInSecond < 0) {
        uniqueInFirst.push(item);
      } else {
        remainingInSecond.splice(remainingInSecond.indexOf(item), 1);
      }
    });
    
    return uniqueInFirst.concat(remainingInSecond);
  },
  
  addFunc: function(first: number, second: number): number {
    return Math.abs(first) + Math.abs(second);
  }
};