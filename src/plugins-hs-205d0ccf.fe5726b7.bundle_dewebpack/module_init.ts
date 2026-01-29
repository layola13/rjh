async function moduleInit(config: unknown): Promise<void> {
  const xmlResource = await getXMLResourceAsync('.advancedSnapshotHolder');
  
  this._$().append(xmlResource.html());
  
  a.default.init();
  i.default.init(config);
}

function getXMLResourceAsync(selector: string): Promise<{ html(): string }> {
  return new Promise((resolve) => {
    getXMLResource(r, (resource: { html(): string }) => {
      resolve(resource);
    }, selector);
  });
}