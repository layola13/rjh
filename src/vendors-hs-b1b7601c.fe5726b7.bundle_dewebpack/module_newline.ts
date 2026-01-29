function newLine(this: any): any {
  const parentText = this.parent('Text');
  
  this.dom.newLined = true;
  
  return this.dy(parentText.dom.leading * parentText.attr('font-size')).attr('x', parentText.x());
}