interface ConcealedWorkData {
  entity: unknown;
  tubes: unknown[];
}

function buildConcealedWorkData(element: unknown): ConcealedWorkData {
  const data: ConcealedWorkData = {
    entity: undefined,
    tubes: []
  };

  data.entity = turnEntityToBom3Entity(element);
  
  const children = element.getChildren();
  
  data.tubes = children.map((child: unknown) => {
    return new B3ConcealedWorkTube(this.context).buildBom3Data(child);
  });

  return data;
}